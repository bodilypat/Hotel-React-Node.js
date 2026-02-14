//src/pages/Billing.jsx 

import React from 'react';
import BillingForm from '../components/billing/BillingForm';
import BillingTable from '../components/billing/BillingTable';

const Billing = () => {
    const [bills, setBills] = React.useState([]);

    const generateBill = (billingData) => {
        const newBill = {
            id: bills.length + 1,
            ...billingData
        };
        setBills([...bills, newBill]);
    };

    return (
        <div className="billing-page">
            <h1>Billing Management</h1>
            <BillingForm onGenerateBill={generateBill} />
            <BillingTable bills={bills} />
        </div>
    );
};

export default Billing;
