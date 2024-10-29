import { useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Login() {
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (!email || !password) {
            // Show a pop-up if any fields are empty
            window.alert('All fields are required');
            return;
        }
    
        axios.post('http://localhost:5001/login', {email, password})
        .then(result => {
            console.log(result)
            if (result.data === "Success") {
                navigate('/dashboard')
            }
            else if (result.data === "Email has not been registered") {
                window.alert("Email has not been registered");
            }
            else if (result.data === "Password is Incorrect") {
                window.alert("Password is Incorrect");
            }
        })
        .catch(err => console.log(err))
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
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
                    Login
                </button>
                </form>
            </div>
        </div>
    );
}

export default Login;