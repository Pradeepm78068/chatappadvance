import React, { useState } from 'react'
import './styles/LoginWithCode.css'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function CreateGroup() {
  const [Name, setName] = useState("")
  const navigate = useNavigate();
  const handleclick = (e) => {
    setName(e.target.value)
  }
  const onSubmit = (e) => {
    e.preventDefault();

    if (Name.trim() !== "") {
      axios.post("http://localhost:3001/createGroup", { Name })
        .then(res => {
          if (res.data.message === "already registered") {
            alert("Group name already exists");
          }
          else {
            navigate("/LoginWithCode");
          }
        }
        ).catch(err => console.log(err))
    }
  }
  return (
    <div id="main-div">
      <p>Enter the Group Name:</p>
      <input type="text" onChange={handleclick} />
      <button className="container1" onClick={onSubmit}>Create Group</button>
    </div>
  )
}
