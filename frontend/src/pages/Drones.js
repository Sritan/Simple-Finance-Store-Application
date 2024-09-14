import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Drones = () => {
    const [drones, setDrones] = useState([]);
    const [newDrone, setNewDrone] = useState({
        storeID: '',
        droneTag: '',
        capacity: '',
        remainingTrips: '',
        pilot: ''
    });
    const [droneToRemove, setDroneToRemove] = useState({ storeID: '', droneTag: '' });
    const [swapInfo, setSwapInfo] = useState({
        incomingPilot: '',
        outgoingPilot: ''
    });    
    const [repairInfo, setRepairInfo] = useState({
        storeID: '',
        droneTag: '',
        refueledTrips: ''
    });    

    useEffect(() => {
        fetchAllDrones();
    }, []);

    const fetchAllDrones = async () => {
        try {
            const response = await axios.get("http://localhost:8802/drone");
            setDrones(response.data);
        } catch (error) {
            console.error("Error fetching drones:", error);
        }
    };

    const handleAddDrone = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8802/drone', newDrone);
            setNewDrone({ storeID: '', droneTag: '', capacity: '', remainingTrips: '', pilot: '' });
            fetchAllDrones();
        } catch (error) {
            console.error("Error adding drone:", error);
        }
    };

    const handleRemoveDrone = async () => {
        try {
            await axios.delete('http://localhost:8802/drone', {
                data: droneToRemove
            });
            setDroneToRemove({ storeID: '', droneTag: '' });
            fetchAllDrones();
        } catch (error) {
            console.error("Error removing drone:", error);
        }
    };

    const handleSwapDroneControl = async () => {
        if (!swapInfo.incomingPilot || !swapInfo.outgoingPilot) {
            return;
        }
        try {
            await axios.post('http://localhost:8802/swap_drone_control', {
                incomingPilot: swapInfo.incomingPilot,
                outgoingPilot: swapInfo.outgoingPilot
            });
            setSwapInfo({ incomingPilot: '', outgoingPilot: '' });
            fetchAllDrones();
        } catch (error) {
            console.error("Error swapping drone control:", error);
        }
    };

    const handleRepairRefuelDrone = async () => {
        try {
            await axios.post('http://localhost:8802/repair_refuel_drone', {
                drone_store: repairInfo.storeID,
                drone_tag: repairInfo.droneTag,
                refueled_trips: parseInt(repairInfo.refueledTrips, 10)
            });
            setRepairInfo({ storeID: '', droneTag: '', refueledTrips: '' });
            fetchAllDrones();
        } catch (error) {
            console.error("Error repairing and refueling drone:", error);
        }
    };    

    return (
        <div>
            <h1>Drone Management</h1>
            <form onSubmit={handleAddDrone}>
                <input 
                    type="text" 
                    placeholder="Store ID" 
                    value={newDrone.storeID} 
                    onChange={e => setNewDrone({ ...newDrone, storeID: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Drone Tag" 
                    value={newDrone.droneTag} 
                    onChange={e => setNewDrone({ ...newDrone, droneTag: e.target.value })}
                />
                <input 
                    type="number" 
                    placeholder="Capacity" 
                    value={newDrone.capacity} 
                    onChange={e => setNewDrone({ ...newDrone, capacity: e.target.value })}
                />
                <input 
                    type="number" 
                    placeholder="Remaining Trips" 
                    value={newDrone.remainingTrips} 
                    onChange={e => setNewDrone({ ...newDrone, remainingTrips: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Pilot Username" 
                    value={newDrone.pilot} 
                    onChange={e => setNewDrone({ ...newDrone, pilot: e.target.value })}
                />
                <button type="submit">Add Drone</button>
            </form>

            <div>
                <input 
                    type="text" 
                    placeholder="Enter Store ID" 
                    value={droneToRemove.storeID} 
                    onChange={e => setDroneToRemove({ ...droneToRemove, storeID: e.target.value })}
                />
                <input 
                    type="text" 
                    placeholder="Enter Drone Tag" 
                    value={droneToRemove.droneTag} 
                    onChange={e => setDroneToRemove({ ...droneToRemove, droneTag: e.target.value })}
                />
                <button onClick={handleRemoveDrone}>Remove Drone</button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Incoming Pilot Username"
                    value={swapInfo.incomingPilot}
                    onChange={e => setSwapInfo({ ...swapInfo, incomingPilot: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Outgoing Pilot Username"
                    value={swapInfo.outgoingPilot}
                    onChange={e => setSwapInfo({ ...swapInfo, outgoingPilot: e.target.value })}
                />
                <button onClick={handleSwapDroneControl}>Swap Drone Control</button>
            </div>

            <div>
                <input
                    type="text"
                    placeholder="Store ID for Repair"
                    value={repairInfo.storeID}
                    onChange={e => setRepairInfo({ ...repairInfo, storeID: e.target.value })}
                />
                <input
                    type="text"
                    placeholder="Drone Tag for Repair"
                    value={repairInfo.droneTag}
                    onChange={e => setRepairInfo({ ...repairInfo, droneTag: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Trips to Refuel"
                    value={repairInfo.refueledTrips}
                    onChange={e => setRepairInfo({ ...repairInfo, refueledTrips: e.target.value })}
                />
                <button onClick={handleRepairRefuelDrone}>Repair & Refuel Drone</button>
            </div>


            <table className="table">
                <thead>
                    <tr>
                        <th>Store ID</th>
                        <th>Drone Tag</th>
                        <th>Capacity</th>
                        <th>Remaining Trips</th>
                        <th>Pilot</th>
                    </tr>
                </thead>
                <tbody>
                    {drones.map(drone => (
                        <tr key={`${drone.storeID}-${drone.droneTag}`}>
                            <td>{drone.storeID}</td>
                            <td>{drone.droneTag}</td>
                            <td>{drone.capacity}</td>
                            <td>{drone.remaining_trips}</td>
                            <td>{drone.pilot}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Drones;
