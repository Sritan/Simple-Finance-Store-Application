import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Views = () => {
    const [roles, setRoles] = useState([]);
    const [customerCredits, setCustomerCredits] = useState([]);
    const [droneTraffic, setDroneTraffic] = useState([]);
    const [popularProducts, setPopularProducts] = useState([]);
    const [pilotRoster, setPilotRoster] = useState([]);
    const [storeSales, setStoreSales] = useState([]);
    const [orders, setOrders_In_Progress] = useState([]);

    useEffect(() => {
        fetchViews();
    }, []);

    const fetchViews = async () => {
        try {
            const responses = await Promise.all([
                axios.get("http://localhost:8802/roles"),
                axios.get("http://localhost:8802/customer-credits"),
                axios.get("http://localhost:8802/drone-traffic"),
                axios.get("http://localhost:8802/popular-products"),
                axios.get("http://localhost:8802/pilot-roster"),
                axios.get("http://localhost:8802/store-sales"),
                axios.get("http://localhost:8802/order-in-progress")
            ]);
            setRoles(responses[0].data);
            setCustomerCredits(responses[1].data);
            setDroneTraffic(responses[2].data);
            setPopularProducts(responses[3].data);
            setPilotRoster(responses[4].data);
            setStoreSales(responses[5].data);
            setOrders_In_Progress(responses[6].data);
        } catch (error) {
            console.error("Error fetching data from views:", error);
        }
    };

    const createTable = (data, columns) => (
        <table className="table">
            <thead>
                <tr>
                    {columns.map((col, idx) => <th key={idx}>{col}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.map((item, idx) => (
                    <tr key={idx}>
                        {columns.map((col, idx) => <td key={idx}>{item[col]}</td>)}
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div>
            <h1>Database Views</h1>
            <div>
                <h2>Role Distribution</h2>
                <table className="table">
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {roles.map(role_distribution => (
                        <tr key={role_distribution.category}>
                            <td>{role_distribution.category}</td>
                            <td>{role_distribution.total}</td>
                        </tr>
                    ))}
                </tbody>
                </table>

                <h2>Customer Credits</h2>
                <table className="table">
                <thead>
                    <tr>
                        <th>Customer Name</th>
                        <th>Rating</th>
                        <th>Current Credit</th>
                        <th>Credit Already Allocated</th>
                    </tr>
                </thead>
                <tbody>
                    {customerCredits.map(customer_credit_check => (
                        <tr key={customer_credit_check.customer_name}>
                            <td>{customer_credit_check.customer_name}</td>
                            <td>{customer_credit_check.rating}</td>
                            <td>{customer_credit_check.current_credit}</td>
                            <td>{customer_credit_check.credit_already_allocated}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

                <h2>Drone Traffic</h2>
                {createTable(droneTraffic, ['drone_serves_store', 'drone_tag', 'pilot', 'total_weight_allowed', 'current_weight', 'deliveries_allowed', 'deliveries_in_progress'])}

                <h2>Most Popular Products</h2>
                {createTable(popularProducts, ['barcode', 'product_name', 'weight', 'lowest_price', 'highest_price', 'lowest_quantity', 'highest_quantity', 'total_quantity'])}

                <h2>Pilot Roster</h2>
                {createTable(pilotRoster, ['pilot', 'licenseID', 'drone_serves_store', 'drone_tag', 'successful_deliveries', 'pending_deliveries'])}

                <h2>Store Sales Overview</h2>
                {createTable(storeSales, ['store_id', 'sname', 'manager', 'revenue', 'incoming_revenue', 'incoming_orders'])}

                <h2>Orders In Progress</h2>
                {createTable(orders, ['orderID', 'cost', 'num_products', 'payload', 'contents'])}
            </div>
        </div>
    );
};

export default Views;
