import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams, useNavigate } from "react-router-dom";
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    PointElement,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    CategoryScale,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale);

function GraphOfProgress() {
    const { goalId } = useParams(); // Get goalId from the URL
    const [progressArray, setProgressArray] = useState([]);
    const [goal, setGoal] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchGoalData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/goal/${goalId}`);
                setGoal(response.data);
                setProgressArray(response.data.progressArray);
            } 
            catch (error) {
                console.error('Error fetching goal data:', error);
            }
        };

        fetchGoalData();
    }, [goalId]);

    const calculateScore = (progress) => {
        const { weight, repetitions, time } = progress;

        if (weight && !repetitions && !time) return weight;
        if (!weight && repetitions && !time) return repetitions;
        if (!weight && !repetitions && time) return time;

        if (weight && repetitions && !time) return weight * repetitions;
        if (weight && !repetitions && time) return weight * time;
        if (!weight && repetitions && time) return repetitions * time;

        if (weight && repetitions && time) return weight * repetitions * time;

        return 0;
    };

    const handleViewAndEditGoals = () => {
        navigate('../view-and-edit-goals'); // Replace with your actual route
    };

    const goalScore = goal ? calculateScore(goal) : null;


    const data = {
        labels: progressArray.map((entry) =>
            new Date(entry.assignedDate).toLocaleDateString('en-US', { timeZone: 'UTC' })
        ),
        datasets: [
            {
                label: 'Progress Score',
                data: progressArray.map((entry) => calculateScore(entry)),
                fill: false,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `Progress Graph for Goal: ${goal?.ExerciseName || 'Loading...'}`,
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Score',
                },
            },
        },
    };

    if (!progressArray.length) {
        return (
            <div>
                <h1 className="text-center">Loading or No Progress</h1>
                {/* Dashboard Button */}
                <Link to="../dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                    <div className="dash-button d-flex flex-justify-content-center align-items-center">
                        <span>Dashboard</span>
                    </div>
                </Link>
                {/* View and Edit Goals Button */}
                <button onClick={handleViewAndEditGoals} className="other-button">
                    Your Goals
                </button>
            </div>
        );
    }
    
    

    return (
        <div className="container">
            <h1 className="text-center">Graph of Progress</h1>
            {goal && (
                <div className="mb-4 text-center">
                    <h2>{goal.ExerciseName}</h2>
                    <p>
                        <strong>Date to Be Completed By:</strong>{' '}
                        {new Date(goal.assigned_date).toLocaleDateString('en-US', { timeZone: 'UTC' })}
                    </p>
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
                    {goalScore !== null && (
                        <p>
                            <strong>Goal Score:</strong> {goalScore}
                        </p>
                    )}
                </div>
            )}
            <Line data={data} options={options} />
            <Link to="../dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                <div className="dash-button d-flex flex- justify-content-center align-items-center">
                    <span>Dashboard</span>
                </div>.
            </Link>
            {/* View and Edit Goals Button */}
            <button onClick={handleViewAndEditGoals} className="other-button">
                Your Goals
            </button>
        </div>
    );
}

export default GraphOfProgress;
