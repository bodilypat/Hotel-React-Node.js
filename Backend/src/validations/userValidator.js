//src/validations/userValidator.js 

const { body, param, query, validationResult } = require('express-validator');

/* 
** Handle Validation Errors Middlware
 */
const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            message: 'Validation failed',
            errors: errors.array()
        });
    }
    next();
};

/*  
** Register Validation 
 */
const registerValidation = [
    body('username')
        .notEmpty().withMessage('Username is required')
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email')   
        .trim()
        .notEmpty().withMessage('Email is required')
        .isEmail().withMessage('Invalid email format'),
    body('password')
        .notEmpty().withMessage('Password is required')
        .isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    validate
];

/* 
** Update Profile Validation 
*/
const updateProfileValidation = [
    body('username')
        .optional()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Invalid email format'),
    validate
];

/* 
** Change Password Validation
*/
const changePasswordValidation = [
    body('currentPassword')
        .notEmpty().withMessage('Current password is required'),
    body('newPassword')
        .notEmpty().withMessage('New password is required')
        .isLength({ min: 6 }).withMessage('New password must be at least 6 characters long'),
    validate
];

/* 
** Admin Update User Validation 
*/
const adminUpdateUserValidation = [
    param('id')
        .notEmpty().withMessage('User ID is required')
        .isMongoId().withMessage('Invalid User ID format'),
    body('username')
        .optional()
        .isLength({ min: 3 }).withMessage('Username must be at least 3 characters long'),
    body('email')
        .optional()
        .trim()
        .isEmail().withMessage('Invalid email format'),
    body('role')
        .optional()
        .isIn(['user', 'admin']).withMessage('Role must be either user or admin'),
    validate
];


module.exports = {
    registerValidation,
    updateProfileValidation,
    changePasswordValidation,
    adminUpdateUserValidation
};

