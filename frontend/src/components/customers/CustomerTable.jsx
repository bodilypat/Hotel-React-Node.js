//src/components/customer/CustomerTable.jsx 

const CustomerTable = ({ customers, deleteCustomer }) => {
    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Total Bookings</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {customers.map((customer, index) => (
                    <tr key={index}>
                        <td>{customer.name}</td>
                        <td>{customer.email}</td>
                        <td>{customer.phone}</td>
                        <td>{customer.totalBookings}</td>
                        <td>
                            <button className="btn btn-primary" onClick={() => alert('Edit functionality not implemented yet')}>Edit</button>
                            <button className="btn btn-danger" onClick={() => deleteCustomer(customer.id)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default CustomerTable;

