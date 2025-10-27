import React, { useState } from 'react'
import './styles/LoginWithCode.css'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function LoginWithCode() {
  const [Name, setName] = useState("")
   const navigate=useNavigate();
  const handleclick = (e) => {
    setName(e.target.value)
  }
  const onSubmit=(e)=>{
   e.preventDefault();
   axios.post("http://localhost:3000/LoginWithCode",{Name}) 
   .then (res=> {
   if (res.data.message ==="Joined"){
    sessionStorage.setItem("groupName", Name);
       navigate("/ChatBox");
      }else{
      toast.warning(res.data.message);
    }
      }
).catch(err=>console.log(err)) 
  }
  return (
    <div id="main-div">
      <p>Enter the Chat Code:</p>
      <input type="text" onChange={handleclick} />
      
        <button className="container1" onClick={onSubmit}>Join Room</button>
        <ToastContainer/>
      </div>
  )
}
