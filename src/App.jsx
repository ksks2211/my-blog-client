import React, { useState } from 'react';
import TodoList from './components/TodoList'
import Login from './components/Login'
import { Box } from '@mui/material'
import { BrowserRouter, Routes, Route,Navigate } from 'react-router-dom'
import LoginContext from './context/LoginContext';
import SignUp from './components/SignUp';
import CopyRight from './components/CopyRight'
import {signout} from './api/SecurityApi'

export default function AppRouter(){ 
  
  const [ login , setLogin ] = useState(localStorage.getItem("ACCESS_TOKEN") ? true : false);


  const logIn = ()=>{
    setLogin(true);
  }
  const logOut = ()=>{
    signout();
    setLogin(false)      
  }


  return (    
    <LoginContext.Provider value={ { login,logIn,logOut } }>
      <div>
        <BrowserRouter>
          <div>
            <Routes>
              <Route path="/login" element={ !login ? <Login/> : <Navigate to="/"/>}/>
              <Route path="/" element={ login ? <TodoList/> : <Navigate to="/login" />}/>
              <Route path='/signup' element={ <SignUp/>}/>
            </Routes>
          </div>
          <Box mt={5}>
            <CopyRight/>
          </Box>
        </BrowserRouter>
      </div>
    </LoginContext.Provider>
  )
}