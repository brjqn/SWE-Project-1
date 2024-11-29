import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import './General.css';
//this file just adds an exercise using the workout.models' exercise schema
function NewExercises () {
    const [Exercise, setExercise] = useState()
    const [Equiptment, setEquiptment] = useState()
    const [Exercise_Type, setExercise_Type] = useState()
    const [Major_Muscle, setMajor_Muscle] = useState()
    const [Minor_Muscle, setMinor_Muscle] = useState()
    const [Example, setExample] = useState()
    const [Notes, setNotes] = useState()
    const [Modifications, setModifications] = useState()
    
    
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault()

        

        axios.post('http://localhost:5001/exercise-list/add-exercise/', {Exercise, Equiptment, Exercise_Type, Major_Muscle, Minor_Muscle, Example, Notes, Modifications})
        .then(result => {console.log(result)
        navigate('/exercise-list/')
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
                        <strong>Equiptment*</strong>
                    </label>
                    <input
                        
                        placeholder="Enter Equiptment Name"
                        autoComplete="off"
                        type="text"
                        className="form-control rounded-0"
                        onChange={(e) => setEquiptment(e.target.value)}
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
                        onChange={(e) => setExercise_Type(e.target.value)}
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
                        onChange={(e) => setMajor_Muscle(e.target.value)}
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
                        onChange={(e) => setMinor_Muscle(e.target.value)}
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
                <label> Exercise List </label>
                </div>
            </Link>
        </div>
    );
}

export default NewExercises;