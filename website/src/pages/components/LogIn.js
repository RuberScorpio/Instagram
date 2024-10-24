import React, { useContext } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/AuthContext';
import { toast } from "react-toastify";

import "../../styles/LogIn.css"

import Validation from '../../services/Validation';

function LogIn(props) {

  const navigate = useNavigate();
  const {setLogin} = useContext(AuthContext);

  async function onLogIn(e) {

    e.preventDefault();

    console.log("E", e.target[0].value, e.target[1].value);

    if(!e.target[0].value){
      toast.success("Put your email or username")
      return;
   };

    if(!e.target[1].value){
      toast.success("Put your passord")
      return;
   };

    let response = await axios.post("http://localhost:5555/users/login",
      {
        ...(Validation.isMail(e.target[0].value) ? {email: e.target[0].value} : {username: e.target[0].value}),
        password: e.target[1].value 
      }
    )
    
    if(response?.data?.error) {
      toast.error("Error", response.data.error);
    } else if(response?.data?.status) {
      setLogin({
        email: response?.data?.email,
        username: response?.data?.username,
        status: response?.data?.status
      });
      localStorage.setItem("AuthToken", response?.data?.authToken);
      navigate("/home");
      toast.success("You have logged in", response )
    }
  }

  return (
    <body className='BodyLogin'>
      <form className='Login' onSubmit={onLogIn}>
          <h1>Fintstagram</h1>
          <h2>Login</h2>
          <input type="text" placeholder="Email o Username"/>
          <input type="password" placeholder="Password"/>
          <button type="submit">Login</button>
          <button
          type="button"
          onClick={() => props.changeToSignUp()}
          >Signup</button>
      </form>
    </body>
  )
}

export default LogIn