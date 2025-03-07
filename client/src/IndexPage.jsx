import React, { useEffect } from 'react'
import './styles/IndexPage.css';
import { useUser } from "./UserContext";
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function IndexPage() {
  const { user } = useUser();
  useEffect(() => {
     toast.success("Login successful") 
  }, [])

  return (

    <div id="main-div">

      <h1>Hello {user || "Guest"}!! 😁</h1>
      <Link to="/LoginWithCode">
        <button className="container2" >
          <h1 >Login with Group Name</h1>
        </button>
      </Link>
      <Link to="/Creategroup">
        <button className="container2"  >
          <h1 >Create Chat Group</h1>
        </button> </Link>
      <ToastContainer />

    </div>
  )
}
