import { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './General.css';
import { UserContext } from "./UserContext";

function TrackWorkout () {
    const [exerciseName, setExerciseName] = useState()
    const [assignedDate, setAssignedDate] = useState()  
    const [weight, setWeight] = useState()
    const [repetitions, setRepetitions] = useState()  
    const [time, setTime] = useState()  
    const {currentUser} = useContext(UserContext)
    const [exerciseList, setExerciseList] = useState([]);
    
    useEffect(() => {
        const fetchData = async() =>{
            try{
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/track-workout`);
                setExerciseList(response.data);
                
            }
            catch(error){
                console.error('Error fetching data:', error);
            }
        };
        fetchData();
    }, []);

    const handleSelectChange = (event) => {
        setExerciseName(event.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault()

        
        const numericWeight = parseFloat(weight);
        const numericRepetitions = parseInt(repetitions, 10);
        const numericTime = parseFloat(time);
        const formattedDate = new Date(assignedDate); 

        
        if (!exerciseName) {
            alert("Please enter an exercise name.");
            return;
        }
        

        axios.post(`${import.meta.env.VITE_BACKEND_URL}/track-workout`, {email: currentUser, ExerciseName:exerciseName, assigned_date: formattedDate, weight: numericWeight, repetitions: numericRepetitions, time: numericTime})
        .then(result => {
            console.log(result);
            setExerciseName(''); 
            setAssignedDate(''); 
            setWeight(''); 
            setRepetitions('');
            setTime('');
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Create Goal</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label htmlFor="name">
                            <strong>Exercise Name*</strong>
                        </label>
                        <select
                            id="dropdown"
                            value={exerciseName}
                            onChange={handleSelectChange}
                            className="form-control rounded-0"
                        >
                            <option value="">Select an Exercise</option>
                            {exerciseList.map((exercise) => (
                                <option key={exercise.name} value={exercise.name}>
                                    {exercise.name || exercise.Exercise}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-2">
                        <label htmlFor="assignedDate">
                            <strong>Date*</strong>
                        </label>
                        <input
                            type="date" 
                            placeholder="Select Date"
                            value = {assignedDate}
                            className="form-control rounded-0"
                            onChange={(e) => setAssignedDate(e.target.value)}
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="weight">
                            <strong>Weight</strong>
                        </label>
                        <input
                            type="number" 
                            placeholder="Enter Weight"
                            value = {weight}
                            autoComplete="off"
                            className="form-control rounded-0"
                            onChange={(e) => setWeight(e.target.value)}
                            min="0" 
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="repetitions">
                            <strong>Repetitions</strong>
                        </label>
                        <input
                            type="number"  
                            
                            placeholder="Enter Repetitions"
                            value = {repetitions}
                            autoComplete="off"
                            className="form-control rounded-0"
                            onChange={(e) => setRepetitions(e.target.value)}
                            min="1" 
                        />
                    </div>
                    <div className="mb-2">
                        <label htmlFor="time">
                            <strong>Time</strong>
                        </label>
                        <input
                            type="number"  
                            value = {time}
                            placeholder="Enter Time"
                            autoComplete="off"
                            className="form-control rounded-0"
                            onChange={(e) => setTime(e.target.value)}
                            min="0"  
                            step= "any"
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Add Goal
                    </button>
                </form>
            </div>
            <Link to="../dashboard" style={{ textDecoration: 'none', color: 'black' }}>
                <div className="dash-button d-flex flex- justify-content-center align-items-center">
                    <span>Dashboard</span>
                </div>.
            </Link>
        </div>
    );
}

export default TrackWorkout;
