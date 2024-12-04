import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function AddProgress() {
    const { goalId } = useParams(); // Get the goal ID from the URL
    const navigate = useNavigate();
    const [goal, setGoal] = useState(null); // To store the goal details
    const [formData, setFormData] = useState({}); // Dynamic form data

    // Fetch the specific goal on component mount
    useEffect(() => {
        const fetchGoal = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/goal/${goalId}`);
                setGoal(response.data); // Set the goal data
            } 
            catch (error) {
                console.error('Error fetching goal details:', error);
                alert('Failed to fetch goal details.');
            }
        };

        fetchGoal();
    }, [goalId]);

    // Handle input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;


        setFormData({
            ...formData,
            [name]: value,
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (goal.weight !== null && formData.weight && parseFloat(formData.weight) > goal.weight) {
            alert("Goal reached! You exceeded the goal weight.");
        }

        if (goal.repetitions !== null && formData.repetitions && parseFloat(formData.repetitions) > goal.repetitions) {
            alert("Goal reached! You exceeded the goal repetitions.");
        }

        if (goal.time !== null && formData.time && parseFloat(formData.time) > goal.time) {
            alert("Goal reached! You exceeded the goal time.");
        }

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/goal/progress`, {
                goalId,
                assignedDate: formData.assignedDate, // Use assignedDate in the request
                weight: formData.weight || null,
                repetitions: formData.repetitions || null,
                time: formData.time || null,
            });
            alert(response.data.message);
            navigate('/view-and-edit-goals'); // Navigate back to the dashboard after success
        } 
        catch (error) {
            console.error('Error adding progress:', error);
            alert('Failed to add progress. Please try again.');
        }
    };

    // If goal is not loaded yet, show a loading message
    if (!goal) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Add Progress to {goal.ExerciseName} goal</h1>
            <div className="mb-4 text-center">
                {goal.repetitions !== null && (
                    <p>
                        <strong>Goal Repetitions:</strong> {goal.repetitions}
                    </p>
                )}
                {goal.time !== null && (
                    <p>
                        <strong>Goal Time (minutes):</strong> {goal.time}
                    </p>
                )}
                {goal.weight !== null && (
                    <p>
                        <strong>Goal Weight:</strong> {goal.weight} lbs
                    </p>
                )}
            </div>
            <form onSubmit={handleSubmit} className="bg-white p-4 rounded shadow">
                <div className="form-group mb-3">
                    <label htmlFor="assignedDate">Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="assignedDate"
                        name="assignedDate"
                        value={formData.assignedDate || ''}
                        onChange={handleInputChange}
                    />
                </div>
                {goal.weight !== null && (
                    <div className="form-group mb-3">
                        <label htmlFor="weight">Weight (lbs)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="weight"
                            name="weight"
                            value={formData.weight || ''}
                            onChange={handleInputChange}
                            min="0"
                        />
                    </div>
                )}
                {goal.repetitions !== null && (
                    <div className="form-group mb-3">
                        <label htmlFor="repetitions">Repetitions</label>
                        <input
                            type="number"
                            className="form-control"
                            id="repetitions"
                            name="repetitions"
                            value={formData.repetitions || ''}
                            onChange={handleInputChange}
                            min="0"
                        />
                    </div>
                )}
                {goal.time !== null && (
                    <div className="form-group mb-3">
                        <label htmlFor="time">Time (minutes)</label>
                        <input
                            type="number"
                            className="form-control"
                            id="time"
                            name="time"
                            value={formData.time || ''}
                            onChange={handleInputChange}
                            min="0"
                            step="any"
                        />
                    </div>
                )}
                <button type="submit" className="btn btn-primary w-100">Add Progress</button>
            </form>
        </div>
    );
}

export default AddProgress;
