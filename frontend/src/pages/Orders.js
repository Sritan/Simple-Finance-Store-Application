import React, { useState, useEffect } from 'react';
import axios from 'axios';

const OrderManagement = () => {
    const [orders, setOrders] = useState([]);
    const [orderLines, setOrderLines] = useState([]);
    const [newOrder, setNewOrder] = useState({
        orderID: '',
        sold_on: '',
        purchased_by: '',
        carrier_store: '',
        carrier_tag: '',
        barcode: '',
        price: '',
        quantity: ''
    });
    const [newOrderLine, setNewOrderLine] = useState({
        orderID: '',
        barcode: '',
        price: '',
        quantity: ''
    });

    useEffect(() => {
        fetchAllOrders();
    }, []);

    useEffect(() => {
        fetchOrderLines();
    }, []);

    const fetchAllOrders = async () => {
        try {
            const response = await axios.get("http://localhost:8802/orders");
            setOrders(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const fetchOrderLines = async () => {
        try {
        const response = await axios.get(`http://localhost:8802/order_lines`);
        setOrderLines(response.data);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleNewOrderChange = e => {
        setNewOrder({ ...newOrder, [e.target.name]: e.target.value });
    };

    const handleAddOrder = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8802/begin_order', newOrder);
            setNewOrder({ orderID: '', sold_on: '', purchased_by: '', carrier_store: '', carrier_tag: '', barcode: '', price: '', quantity: '' });
            fetchAllOrders();
        } catch (error) {
            console.error("Error adding order:", error);
        }
    };

    const handleNewOrderLineChange = e => {
        setNewOrderLine({ ...newOrderLine, [e.target.name]: e.target.value });
    };

    const handleAddOrderLine = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8802/add_order_line', newOrderLine);
            setNewOrderLine({ orderID: '', barcode: '', price: '', quantity: '' });
            fetchOrderLines();
        } catch (error) {
            console.error("Error adding order line:", error);
        }
    };

    const handleDeliverOrder = async (orderID) => {
        try {
            await axios.post('http://localhost:8802/deliver_order', { orderID });
            fetchAllOrders();
            fetchOrderLines();
        } catch (error) {
            console.error("Error delivering order:", error);
        }
    };

    const handleCancelOrder = async (orderID) => {
        try {
            await axios.delete('http://localhost:8802/cancel_order', { data: { orderID } });
            fetchAllOrders();
            fetchOrderLines();
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };

    return (
        <div>
            <h1>Order Management</h1>
            <form onSubmit={handleAddOrder}>
                <input name="orderID" value={newOrder.orderID} onChange={handleNewOrderChange} placeholder="Order ID" />
                <input name="sold_on" value={newOrder.sold_on} onChange={handleNewOrderChange} placeholder="Sold On (Date)" />
                <input name="purchased_by" value={newOrder.purchased_by} onChange={handleNewOrderChange} placeholder="Purchased By (Customer ID)" />
                <input name="carrier_store" value={newOrder.carrier_store} onChange={handleNewOrderChange} placeholder="Carrier Store" />
                <input name="carrier_tag" value={newOrder.carrier_tag} onChange={handleNewOrderChange} placeholder="Carrier Tag" />
                <input name="barcode" value={newOrder.barcode} onChange={handleNewOrderChange} placeholder="Barcode" />
                <input name="price" value={newOrder.price} onChange={handleNewOrderChange} placeholder="Price" />
                <input name="quantity" value={newOrder.quantity} onChange={handleNewOrderChange} placeholder="Quantity" />
                <button type="submit">Begin Order</button>
            </form>

            <form onSubmit={handleAddOrderLine}>
                <input name="orderID" value={newOrderLine.orderID} onChange={handleNewOrderLineChange} placeholder="Order ID" />
                <input name="barcode" value={newOrderLine.barcode} onChange={handleNewOrderLineChange} placeholder="Barcode" />
                <input name="price" value={newOrderLine.price} onChange={handleNewOrderLineChange} placeholder="Price" />
                <input name="quantity" value={newOrderLine.quantity} onChange={handleNewOrderLineChange} placeholder="Quantity" />
                <button type="submit">Add Order Line</button>
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Sold On</th>
                        <th>Purchased By</th>
                        <th>Carrier Store</th>
                        <th>Carrier Tag</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map(order => (
                        <tr key={order.orderID}>
                            <td>{order.orderID}</td>
                            <td>{order.sold_on}</td>
                            <td>{order.purchased_by}</td>
                            <td>{order.carrier_store}</td>
                            <td>{order.carrier_tag}</td>
                            <td>
                                <button onClick={() => handleDeliverOrder(order.orderID)}>Deliver Order</button>
                                <button onClick={() => handleCancelOrder(order.orderID)}>Cancel Order</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {/*
            <table className="table">
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Barcode</th>
                        <th>Price</th>
                        <th>Quantity</th>
                    </tr>
                </thead>
                <tbody>
                    {orderLines.map(lines => (
                        <tr key={lines.orderID}>
                            <td>{lines.orderID}</td>
                            <td>{lines.barcode}</td>
                            <td>{lines.price}</td>
                            <td>{lines.quantity}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            */}
        </div>
    );
};

export default OrderManagement;
