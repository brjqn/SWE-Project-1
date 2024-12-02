import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


function Signup () {
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!name || !email || !password) {
            // Show a pop-up if any fields are empty
            window.alert('All fields are required');
            return;
        }
    
        axios.post(`${import.meta.env.VITE_BACKEND_URL}/register`, { name, email, password })
            .then(result => {
                if (result.data === "Success") {
                    console.log(result);
                    navigate('/login');
                }
                else if (result.data === "Email already exists") {
                    window.alert("Email already exists");
                }
                else if (result.data === "Invalid email format") {
                    window.alert("Invalid email format");
                }
                
            })
            .catch(err => {
                if (err.response && err.response.status === 400) {
                    // Show a pop-up if the email already exists
                    window.alert(err.response.data.message);  // "Email already exists"
                } else {
                    console.error(err);
                    window.alert('An error occurred. Please try again.');
                }
            });
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Register</h2>
                <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Name*</strong>
                    </label>
                    <input
                        type="text"
                        placeholder="Enter Name"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Email*</strong>
                    </label>
                    <input
                        type="email"
                        placeholder="Enter Email"
                        autoComplete="off"
                        name="email"
                        className="form-control rounded-0"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email">
                        <strong>Password*</strong>
                    </label>
                    <input
                        type="password"
                        placeholder="Enter Password"
                        name="password"
                        className="form-control rounded-0"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-success w-100 rounded-0">
                    Register
                </button>
                </form>
                <p>Already Have an Account?</p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">
                    Login
                </Link>
            </div>
        </div>
    );
}

export default Signup;