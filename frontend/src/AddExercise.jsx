import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'
import 'bootstrap/dist/css/bootstrap.min.css';
import './General.css';
//this file just adds an exercise using the workout.models' exercise schema
function NewExercises () {
    const [exercise, setExercise] = useState('');  
    const [equipment, setEquipment] = useState(''); 
    const [exerciseType, setExerciseType] = useState(''); 
    const [majorMuscle, setMajorMuscle] = useState(''); 
    const [minorMuscle, setMinorMuscle] = useState(''); 
    const [example, setExample] = useState(''); 
    const [notes, setNotes] = useState(''); 
    const [modifications, setModifications] = useState('');
    
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        

        axios.post('http://localhost:5001/exercise-list/add-exercise/', {Exercise: exercise, Equipment: equipment, Exercise_Type:exerciseType, Major_Muscle:majorMuscle, Minor_Muscle: minorMuscle, Example: example, Notes:notes, Modifications:modifications})
        .then(result => {console.log(result)
        if(result.data=== "Exercise successfully created"){
          navigate('/exercise-list/')  
        }
        else if (result.data === "Exercise already exists") {
            window.alert("Exercise already exists");
        }
        
        })
        .catch(err => console.log(err))
    }

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25"
            >
                <h2>New Exercise</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <label htmlFor="email">
                        <strong>Exercise*</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Exercise Name"
                        autoComplete="off"
                        
                        className="form-control rounded-0"
                        onChange={(e) => setExercise(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email">
                        <strong>Equipment*</strong>
                    </label>
                    <input
                        
                        placeholder="Enter Equipment Name"
                        autoComplete="off"
                        type="text"
                        className="form-control rounded-0"
                        onChange={(e) => setEquipment(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email">
                        <strong>Exercise Type*</strong>
                    </label>
                    <input
                        
                        placeholder="Enter Exercise Type"
                        type="text"
                        className="form-control rounded-0"
                        onChange={(e) => setExerciseType(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email">
                        <strong>Major Muscle*</strong>
                    </label>
                    <input
                        placeholder="Enter Major Muscle"
                        type="text"
                        className="form-control rounded-0"
                        onChange={(e) => setMajorMuscle(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email">
                        <strong>Minor Muscle</strong>
                    </label>
                    <input
                        placeholder="Enter Minor Muscle"
                        type="text"
                        className="form-control rounded-0"
                        onChange={(e) => setMinorMuscle(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email">
                        <strong>Example</strong>
                    </label>
                    <input
                        placeholder="Enter example image link"
                        type="text"
                        className="form-control rounded-0"
                        onChange={(e) => setExample(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email">
                        <strong>Notes</strong>
                    </label>
                    <input
                        placeholder="Enter Notes"
                        type="text"
                        className="form-control rounded-0"
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="email">
                        <strong>Modifications</strong>
                    </label>
                    <input
                        placeholder="Enter Modifications"
                        type="text"
                        className="form-control rounded-0"
                        onChange={(e) => setModifications(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Add Exercise
                </button>
                </form>
            </div>
            <Link to="../exercise-list" style={{ textDecoration: 'none', color: 'black' }}>
                <div className = "dashButton d-flex flex- justify-content-center align-items-center">
                <div> Exercise List </div>
                </div>
            </Link>
        </div>
    );
}

export default NewExercises;