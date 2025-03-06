import React, { useState } from 'react'
import './styles/LoginWithCode.css'
import {  useNavigate } from 'react-router-dom'
import axios from 'axios'
export default function LoginWithCode() {
  const [Name, setName] = useState("")
   const navigate=useNavigate();
  const handleclick = (e) => {
    setName(e.target.value)
  }
  const onSubmit=(e)=>{
   e.preventDefault();
   axios.post("http://localhost:3001/LoginWithCode",{Name}) 
   .then (res=> {
   if (res.data.message ==="Joined"){
    sessionStorage.setItem("groupName", Name);
       navigate("/ChatBox");
      }else
      alert(res.data.message);
      }
).catch(err=>console.log(err)) 
  }
  return (
    <div id="main-div">
      <p>Enter the Chat Code:</p>
      <input type="text" onChange={handleclick} />
      
        <button className="container1" onClick={onSubmit}>Join Room</button>
      </div>
  )
}
