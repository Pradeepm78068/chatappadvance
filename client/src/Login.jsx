import React, { useState } from 'react';
import './styles/signup.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useUser } from "./UserContext"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function Login() {
    const [Mail, setMail] = useState("");
    const [PassWord, setPassword] = useState("");
    const navigate = useNavigate();
    const { setUser } = useUser();
    const handleButton = (event) => {
        event.preventDefault(); 
        axios.post('https://chatapp-7rxi.onrender.com/Login', { Mail, PassWord })
            .then(res => {
                console.log(res);
                
                if (res.data.message === "success"){
                
                        setUser(res.data.name);
                    navigate("/IndexPage");
                    } 
                    else
                    toast.error("Invalid mail or password");

            })
            .catch(err =>{ console.log(err);
                toast.error("Something went wrong. Please check your connection.");
            })
    }

    return (
        <div className="container">
            <h3>Login</h3>
            <form onSubmit={handleButton}>
                <label>
                    Email:
                    <input type="email" placeholder="Enter email" name="Email" autoComplete='off' onChange={(e) => setMail(e.target.value)} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" placeholder="Enter password" name="Password" autoComplete='off' onChange={(e) => setPassword(e.target.value)} required />
                </label>
                <br />
                <button type="submit">Submit</button>
            </form>
            <div>
                Didn't have an account? <Link to="/register"><button>Signup</button></Link>
            </div>
            <ToastContainer/>
        </div>
    );
}
