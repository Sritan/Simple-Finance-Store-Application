import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Customers = () => {
    const [customers, setCustomers] = useState([]);
    const [newCustomer, setNewCustomer] = useState({
        uname: '',
        first_name: '',
        last_name: '',
        address: '',
        bdate: '',
        rating: '',
        credit: ''
    });
    const [unameToRemove, setUnameToRemove] = useState('');
    const [creditUpdate, setCreditUpdate] = useState({
        unameToUpdate: '',
        creditAmount: ''
    });
    

    useEffect(() => {
        fetchAllCustomers();
    }, []);

    const fetchAllCustomers = async () => {
        try {
            const response = await axios.get("http://localhost:8802/customer");
            setCustomers(response.data);
        } catch (error) {
            console.error("Error fetching customers:", error);
        }
    };

    const handleAddCustomer = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8802/customer', newCustomer);
            setNewCustomer({
                uname: '',
                first_name: '',
                last_name: '',
                address: '',
                bdate: '',
                rating: '',
                credit: ''
            });
            fetchAllCustomers();
        } catch (error) {
            console.error("Error adding customer:", error);
        }
    };

    const handleRemoveCustomer = async () => {
        try {
            await axios.delete('http://localhost:8802/customer', {
                data: { uname: unameToRemove }
            });
            setUnameToRemove('');
            fetchAllCustomers();
        } catch (error) {
            console.error("Error removing customer:", error);
        }
    };

    const handleIncreaseCredits = async () => {
        if (!creditUpdate.unameToUpdate || !creditUpdate.creditAmount) {
            alert('Please fill in all fields for credit update.');
            return;
        }
        try {
            await axios.post('http://localhost:8802/increase_customer_credits', {
                uname: creditUpdate.unameToUpdate,
                amount: Number(creditUpdate.creditAmount)
            });
            setCreditUpdate({ unameToUpdate: '', creditAmount: '' });
            fetchAllCustomers();
        } catch (error) {
            console.error("Error increasing customer credits:", error);
        }
    };
    

    return (
        <div>
            <h1>Customer Directory</h1>
            <form onSubmit={handleAddCustomer}>
                <input 
                    type="text" 
                    placeholder="Username" 
                    value={newCustomer.uname} 
                    onChange={e => setNewCustomer({ ...newCustomer, uname: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="First Name" 
                    value={newCustomer.first_name} 
                    onChange={e => setNewCustomer({ ...newCustomer, first_name: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Last Name" 
                    value={newCustomer.last_name} 
                    onChange={e => setNewCustomer({ ...newCustomer, last_name: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Address" 
                    value={newCustomer.address} 
                    onChange={e => setNewCustomer({ ...newCustomer, address: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Birth Date (YYYY-MM-DD)" 
                    value={newCustomer.bdate} 
                    onChange={e => setNewCustomer({ ...newCustomer, bdate: e.target.value })}
                />
                <input 
                    type="number" 
                    placeholder="Rating" 
                    value={newCustomer.rating} 
                    onChange={e => setNewCustomer({ ...newCustomer, rating: e.target.value })}
                />
                <input 
                    type="number" 
                    placeholder="Credit" 
                    value={newCustomer.credit} 
                    onChange={e => setNewCustomer({ ...newCustomer, credit: e.target.value })}
                />
                <button type="submit">Add Customer</button>
            </form>

            <div>
                <input 
                    type="text" 
                    placeholder="Enter username to remove" 
                    value={unameToRemove} 
                    onChange={e => setUnameToRemove(e.target.value)}
                />
                <button onClick={handleRemoveCustomer}>Remove Customer</button>
            </div>

            <div>
                <input
                type="text"
                placeholder="Username to update credits"
                value={creditUpdate.unameToUpdate}
                onChange={e => setCreditUpdate({ ...creditUpdate, unameToUpdate: e.target.value })}
                />
                <input
                type="number"
                placeholder="Credit amount to add"
                value={creditUpdate.creditAmount}
                onChange={e => setCreditUpdate({ ...creditUpdate, creditAmount: e.target.value })}
                />
                <button onClick={handleIncreaseCredits}>Increase Credits</button>
            </div>


            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Rating</th>
                        <th>Credit</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.uname}>
                            <td>{customer.uname}</td>
                            <td>{customer.rating}</td>
                            <td>{customer.credit}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;
