import React, { useContext } from 'react'
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../services/AuthContext';

import "../../styles/LogIn.css"

import Validation from '../../services/Validation';

function LogIn(props) {

  const navigate = useNavigate();
  const {setAuth} = useContext(AuthContext);

  async function onLogIn(e) {

    e.preventDefault();

    console.log("E", e.target[0].value, e.target[1].value);

    if(!e.target[0].value){
      console.log("Put your email or username")
      return;
   };

    if(!e.target[1].value){
      console.log("Put your passord")
      return;
   };

    let response = await axios.post("http://localhost:5555/users/login",
      {
        ...(Validation.isMail(e.target[0].value) ? {email: e.target[0].value} : {username: e.target[0].value}),
        password: e.target[1].value 
      }
    )

    console.log("Res", response )

    if(response?.data?.error) {
      console.log("Error", response.data.error);
    } else if(response?.data?.status) {
      setAuth({
        email: response?.data?.email,
        username: response?.data?.username,
        status: response?.data?.status
      });
      localStorage.setItem("AuthToken", response?.data?.authToken);
      navigate("/home");
    }
  }

  return (
    <form className='login' onSubmit={onLogIn}>
        <h1>Fintstagram</h1>
        <h2>LogIn</h2>
        <input type="text" placeholder="Email o Username"/>
        <input type="password" placeholder="Password"/>
        <button type="submit">LogIn</button>
        <button
        type="button"
        onClick={() => props.changeToSignUp()}
        >SignUp</button>
    </form>
  )
}

export default LogIn