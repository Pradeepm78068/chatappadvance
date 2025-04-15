import React, { useState } from 'react';
import './styles/signup.css';
import { Link } from 'react-router-dom'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    const [Name, setName] = useState("");
    const [Mail, setMail] = useState("");
    const [PassWord, setPassword] = useState("");
    const Navigate = useNavigate();
    const handleButton = (event) => {
        event.preventDefault(); 
        axios.post('https://chatapp-7rxi.onrender.com/register', { Name, Mail, PassWord })
            .then(res => {
                console.log(res);
                Navigate('/')
            })
            .catch(err => console.log("hi",err))
    }

    return (
        <div className="container">
            <h3>SignUp</h3>
            <form onSubmit={handleButton}>
                <label> Name:
                    <input type="text" placeholder="Enter name" name="Name" autoComplete='off' onChange={(e) => setName(e.target.value)} required />
                </label>
                <br />
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
                Already have an account? <Link to="/"><button>Login</button></Link>
            </div>
        </div>
    );
}
