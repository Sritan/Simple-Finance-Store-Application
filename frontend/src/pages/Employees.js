import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Employees = () => {
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        fetchAllEmployees();
    }, []);

    const fetchAllEmployees = async () => {
        try {
            const response = await axios.get("http://localhost:8802/employee");
            setEmployees(response.data);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };
    return (
        <div>
            <h1>Employee System</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Taxid</th>
                        <th>Service</th>
                        <th>Salary</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(employee => (
                        <tr key={employee.uname}>
                            <td>{employee.uname}</td>
                            <td>{employee.taxID}</td>
                            <td>{employee.service}</td>
                            <td>{employee.salary}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Employees;