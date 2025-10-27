import React, { useState } from 'react';
import './styles/LoginWithCode.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function CreateGroup() {
  const [Name, setName] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    if (Name.trim() === '') {
      alert('Please enter a group name');
      return;
    }

    axios
      .post('http://localhost:3000/createGroup', { Name })
      .then((res) => {
        if (res.data.message === 'Group already exists') {
          alert('Group name already exists');
        } else if (res.data.message === 'Group created') {
          sessionStorage.setItem('groupName', Name); // Store group name
          navigate('/LoginWithCode');
        } else {
          alert('Unexpected response from server');
        }
      })
      .catch((err) => {
        console.error('Error creating group:', err);
        alert('Failed to create group. Please try again.');
      });
  };

  return (
    <div id="main-div">
      <p>Enter the Group Name:</p>
      <input
        type="text"
        value={Name} 
        onChange={handleChange}
        placeholder="Group name"
      />
      <button className="create-group-button" onClick={onSubmit}>
        Create Group
      </button>
    </div>
  );
}