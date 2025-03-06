import React from 'react'
import Signup from './signup'
import Login from './Login'
import IndexPage from './IndexPage';
import Chatbox from './Chatbox'; 
import LoginWithCode from './LoginWithCode';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import CreateGroup from './CreateGroup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<Signup/>}> </Route>
        <Route path='/' element={<Login/>}> </Route>
        <Route path='/indexpage' element={<IndexPage/>}/>
              <Route path="/LoginWithCode" element={<LoginWithCode/>}/>
               <Route path="/Chatbox" element={<Chatbox/>}/>
               <Route path="/Creategroup" element={<CreateGroup/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
