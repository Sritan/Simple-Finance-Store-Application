import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pilots = () => {
    const [pilots, setPilots] = useState([]);
    const [newPilot, setNewPilot] = useState({
        uname: '',
        first_name: '',
        last_name: '',
        address: '',
        bdate: '',
        taxID: '',
        service: '',
        salary: '',
        licenseID: '',
        experience: ''
    });
    const [unameToRemove, setUnameToRemove] = useState('');

    useEffect(() => {
        fetchAllPilots();
    }, []);

    const fetchAllPilots = async () => {
        try {
            const response = await axios.get("http://localhost:8802/drone_pilot");
            setPilots(response.data);
        } catch (error) {
            console.error("Error fetching drone pilots:", error);
        }
    };

    const handleAddPilot = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8802/drone_pilot', newPilot);
            setNewPilot({
                uname: '',
                first_name: '',
                last_name: '',
                address: '',
                bdate: '',
                taxID: '',
                service: '',
                salary: '',
                licenseID: '',
                experience: ''
            });
            fetchAllPilots();
        } catch (error) {
            console.error("Error adding drone pilot:", error);
        }
    };

    const handleRemovePilot = async () => {
        try {
            await axios.delete('http://localhost:8802/drone_pilot', {
                data: { uname: unameToRemove }
            });
            setUnameToRemove('');
            fetchAllPilots();
        } catch (error) {
            console.error("Error removing drone pilot:", error);
        }
    };

    return (
        <div>
            <h1>Drone Pilot Directory</h1>
            <form onSubmit={handleAddPilot}>
                <input type="text" placeholder="Username" value={newPilot.uname} onChange={e => setNewPilot({ ...newPilot, uname: e.target.value })} />
                <input type="text" placeholder="First Name" value={newPilot.first_name} onChange={e => setNewPilot({ ...newPilot, first_name: e.target.value })} />
                <input type="text" placeholder="Last Name" value={newPilot.last_name} onChange={e => setNewPilot({ ...newPilot, last_name: e.target.value })} />
                <input type="text" placeholder="Address" value={newPilot.address} onChange={e => setNewPilot({ ...newPilot, address: e.target.value })} />
                <input type="text" placeholder="Birth Date (YYYY-MM-DD)" value={newPilot.bdate} onChange={e => setNewPilot({ ...newPilot, bdate: e.target.value })} />
                <input type="text" placeholder="Tax ID" value={newPilot.taxID} onChange={e => setNewPilot({ ...newPilot, taxID: e.target.value })} />
                <input type="number" placeholder="Service" value={newPilot.service} onChange={e => setNewPilot({ ...newPilot, service: e.target.value })} />
                <input type="number" placeholder="Salary" value={newPilot.salary} onChange={e => setNewPilot({ ...newPilot, salary: e.target.value })} />
                <input type="text" placeholder="License ID" value={newPilot.licenseID} onChange={e => setNewPilot({ ...newPilot, licenseID: e.target.value })} />
                <input type="number" placeholder="Experience" value={newPilot.experience} onChange={e => setNewPilot({ ...newPilot, experience: e.target.value })} />
                <button type="submit">Add Pilot</button>
            </form>

            <div>
                <input type="text" placeholder="Enter username to remove" value={unameToRemove} onChange={e => setUnameToRemove(e.target.value)} />
                <button onClick={handleRemovePilot}>Remove Pilot</button>
            </div>

            <table className="table">
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>License ID</th>
                        <th>Experience</th>
                    </tr>
                </thead>
                <tbody>
                    {pilots.map(pilot => (
                        <tr key={pilot.uname}>
                            <td>{pilot.uname}</td>
                            <td>{pilot.licenseID}</td>
                            <td>{pilot.experience}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Pilots;
