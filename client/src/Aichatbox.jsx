import React, { useState } from 'react';
import './styles/Chatbox.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function Chatbox() {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState([]);
  const name = JSON.parse(sessionStorage.getItem("user") || "Guest");
  

  const handleClick = () => {
    if(chat.trim()!==""){
    socket.emit("message",{ text: chat, sender: name , room: groupName});
    setMessages((prevMessages) => [...prevMessages, { text: chat, sender: name }]);
      setChat("");
      toast.success("This is a success message!")
    }
  };

  return (
    <div id="main-container">
      <div id="Room-id">
        Group: {groupName}
        <span id="uname">User: {name}</span>
      </div>
      <div id="chatcontainer">
        <div id="cb">
          {messages.map((msg, index) => (
            <div key={index} className={`message-box ${msg.sender === name ? "sent" : "received"}`}>
              <span className="sender-name">{msg.sender}: </span>
              <span className="message-text">{msg.text}</span>
            </div>
          ))}
        </div>
        <input
          id="typebox"
          placeholder="Type here..."
          value={chat}
          onChange={(e) => setChat(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleClick();
          }}
        />
        <button id="sendbutton" onClick={handleClick}>
          Send
        </button>
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
}
