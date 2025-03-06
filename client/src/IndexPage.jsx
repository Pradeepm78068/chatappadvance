import React from 'react'
import './styles/IndexPage.css';
import { useUser } from "./UserContext";
import {  Link } from 'react-router-dom'
export default function IndexPage() {
  const { user } = useUser();
  return (
    <div id="main-div">
      <h1>Hello {user||"Guest"}!! 😁</h1>
      <Link to="/LoginWithCode">
        <button className="container2" >
          <h1 >Login with Group Name</h1>
        </button>
      </Link>
      <Link to="/Creategroup" state={{ coded: Math.floor(Math.random() * 100000) }}>
        <button className="container2"  >
          <h1 >Create Chat Group</h1>
        </button> </Link>
      
    </div>
  )
}
