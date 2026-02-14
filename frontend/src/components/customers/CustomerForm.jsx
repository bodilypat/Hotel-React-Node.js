//src/components/customers/CustomerForm.jsx

import { useState } from 'react';

const CustomerForm = ({ onSubmit, initialData = {} }) => {
    const [customer, setCustomer] = useState({
        name: initialData.name || '',
        email: initialData.email || '',
        phone: initialData.phone || '',
        address: initialData.address || '',
        idType: initialData.idType || '',
        idNumber: initialData.idNumber || '',
        totalBookings: initialData.totalBookings || 0,
    });

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    };  

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(customer);
    };

    return (
        <form onSubmit={handleSubmit} className="customer-form">
            <input type="text" name="name" placeholder="Name" value={customer.name} onChange={handleChange} required />
            <input type="email" name="email" placeholder="Email" value={customer.email} onChange={handleChange} required />
            <input type="text" name="phone" placeholder="Phone" value={customer.phone} onChange={handleChange} required />
            <input type="text" name="address" placeholder="Address" value={customer.address} onChange={handleChange} />
            <input type="text" name="idType" placeholder="ID Type" value={customer.idType} onChange={handleChange} />
            <input type="text" name="idNumber" placeholder="ID Number" value={customer.idNumber} onChange={handleChange} />
            <input type="number" name="totalBookings" placeholder="Total Bookings" value={customer.totalBookings} onChange={handleChange} />
            <button type="submit">Submit</button>
        </form>
    );
};

export default CustomerForm;
