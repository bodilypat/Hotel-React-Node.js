//src/controllers/userController.js 

const bcrypt = require('bcrypt');
const User = require('../models/User');

/* =========================================
        Register User (Guest/User by Default)
   =========================================
 */
exports.registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Name, email, and password are required' });
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'user', // Default role is 'user'
            isActive: true // Default to active
        });
        res.status(201).json({ message: 'User registered successfully', 
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            } });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/* ======== Get Logged-in User Profile ======== */
exports.getProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');

        if (!user || !user.isActive) {
            return res.status(404).json({ message: 'User not found or deactivated' });
        }
        res.json({ user });
    } catch (error) {
        console.error('Error fetching user profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/* ======== Update Own Profile */
exports.updateProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await User.findById(req.user.id);

        if (!user || !user.isActive) {
            return res.status(404).json({ message: 'User not found or deactivated' });
        }

        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({ message: 'Email already in use' });
            }
            user.name = name || user.name;
            user.email = email || user.email;
        }

        await user.save();
        res.json({ 
            message: 'Profile updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            }
        });
    } catch (error) {
        console.error('Error updating profile:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/* ======== Change Password ======== */
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;

        if (!currentPassword || !newPassword) {
            return res.status(400).json({ message: 'Current and new passwords are required' });
        }

        const user = await User.findById(req.user.id);

        if (!user || !user.isActive) {
            return res.status(404).json({ message: 'User not found or deactivated' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        user.password = await bcrypt.hash(newPassword, 10);
        await user.save();

        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/* ======== Admin: Get All Users (Pagination + Filter) ======== */
exports.getAllUsers = async (req, res) => {
    try {
        const features = new APIFeatures(User.find().select('-password'), req.query)
            .filter()
            .sort()
            .limitFields()
            .paginate();

        const users = await features.query;
        res.json({ 
            results: users.length, 
            pagination: features.pagination,
            data: users.map(user => ({
                id: user._id,
                name: user.name,    
                email: user.email,
                role: user.role,
                isActive: user.isActive
            }))
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/* ======== Admin: Get user by ID ======== */
exports.getUserById = async (req, res) => {
    try {
        const user = await User.findById(req.params.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json({ user });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/* ======== Admin: Update User (Role / Status) ======== */
exports.updateUserByAdmin = async (req, res) => {
    try {
        const { role, isActive } = req.body;

        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        if (role) user.role = role;
        if (typeof isActive === 'boolean') user.isActive = isActive;

        await user.save();
        res.json({
            message: 'User updated successfully',
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                isActive: user.isActive
            }
        });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

/* ======== Admin: Soft Delete (Deactivate) ======== */
exports.deactivateUser = async (req, res) => {
    try {
        // Prevent admin from deactivating themselves
        if (req.user.id === req.params.id) {
            return res.status(400).json({ message: 'You cannot deactivate your own account' });
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            { isActive: false },
            { new: true }
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deactivated successfully', user: {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            isActive: user.isActive
        } });
    } catch (error) {
        console.error('Error deactivating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

