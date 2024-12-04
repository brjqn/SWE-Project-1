import React, { useState, useEffect, useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { UserContext } from './UserContext'; // Import UserContext
import { useNavigate } from 'react-router-dom';

function ViewAndEditGoals() {
    const { currentUser } = useContext(UserContext); // Access the logged-in user's email
    const [userData, setUserData] = useState({ name: '', goalArray: [] }); // State for user data
    const [message, setMessage] = useState(''); // State for success/error messages
    const [showConfirm, setShowConfirm] = useState(false); // State for showing the confirmation modal
    const [goalToDelete, setGoalToDelete] = useState(null); // State to store the goal to be deleted
    const navigate = useNavigate();

    // Fetch user profile on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/user/profile`, {
                    params: {
                        email: currentUser,
                    },
                });
                setUserData(response.data); // Set user data including goalArray
            } catch (error) {
                console.error('Error fetching user profile:', error);
            }
        };

        if (currentUser) {
            fetchProfile();
        }
    }, [currentUser]);

    // Function to delete a goal
    const handleDeleteGoal = async () => {
        try {
            const response = await axios.delete(`${import.meta.env.VITE_BACKEND_URL}/api/user/goal`, {
                data: { email: currentUser, goalId: goalToDelete }, // Pass email and goalId in the request body
            });

            setMessage(response.data.message); // Set the success message
            setUserData((prevState) => ({
                ...prevState,
                goalArray: prevState.goalArray.filter((goal) => goal._id !== goalToDelete), // Remove the deleted goal from state
            }));

            // Clear the goal to delete and hide the modal
            setGoalToDelete(null);
            setShowConfirm(false);

            // Clear the success message after 3 seconds
            setTimeout(() => {
                setMessage('');
            }, 3000);
        } 
        catch (error) {
            console.error('Error deleting goal:', error);
            setMessage('Failed to delete goal. Please try again.');

            // Clear the error message after 3 seconds
            setTimeout(() => {
                setMessage('');
            }, 3000);
        }
    };


    const handleConfirmDelete = (goalId) => {
        setGoalToDelete(goalId); // Set the goal to delete
        setShowConfirm(true); // Show the confirmation modal
    };

    const handleGraphOfProgress = (goalId) => {
        navigate(`/graph-of-progress/${goalId}`); // Navigate to ViewProgress.jsx with the goal ID
    };

    const handleAddProgress = (goalId) => {
        navigate(`/add-progress/${goalId}`); // Navigate to AddProgress.jsx with the goal ID
    };

    return (
        <div className="container my-4">
            <h1 className="text-center mb-4">Your Goals</h1>
            {message && <p className="text-center text-success">{message}</p>}
            <div className="row">
                {userData.goalArray.length > 0 ? (
                    userData.goalArray.map((goal) => (
                        <div className="col-md-4 mb-4" key={goal._id}>
                            <div className="card h-100">
                                <div className="card-body">
                                    <h5 className="card-title">{goal.ExerciseName}</h5>
                                    <p className="card-text">
                                        <strong>Date:</strong>{' '}
                                        {new Date(goal.assigned_date).toLocaleDateString('en-US', { timeZone: 'UTC' })} <br />
                                        <strong>Weight:</strong> {goal.weight || 'N/A'} lbs <br />
                                        <strong>Repetitions:</strong> {goal.repetitions || 'N/A'} <br />
                                        <strong>Time:</strong> {goal.time || 'N/A'} minutes
                                    </p>
                                    <button
                                        className="btn btn-danger"
                                        onClick={() => handleConfirmDelete(goal._id)}
                                    >
                                        Delete
                                    </button>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => handleGraphOfProgress(goal._id)}
                                    >
                                        Graph of Progress
                                    </button>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handleAddProgress(goal._id)}
                                    >
                                        Add Progress
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-center">No goals found. Add some goals to get started!</p>
                )}
            </div>
            {/* Confirmation Modal */}
            {showConfirm && (
                <dialog
                className="modal show d-block"
                open // The 'open' attribute makes the dialog visible
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            >
                <div className="modal-dialog" aria-labelledby="modalTitle" aria-hidden="true">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 id="modalTitle" className="modal-title">Confirm Deletion</h5>
                            <button
                                type="button"
                                className="close"
                                onClick={() => setShowConfirm(false)}
                                aria-label="Close"
                            >
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <div className="modal-body">
                            <p>Are you sure you want to delete this goal? This action cannot be undone.</p>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() => setShowConfirm(false)}
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                className="btn btn-danger"
                                onClick={handleDeleteGoal}
                            >
                                Confirm Delete
                            </button>
                        </div>
                    </div>
                </div>
            </dialog>
            )}
        </div>
    );
}

export default ViewAndEditGoals;