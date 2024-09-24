import React from 'react';
import axios from "axios";
import "../../styles/SignUp.css"

function SignUp(props) {

  async function onSignUp(e) {

    e.preventDefault();

    console.log("E", e.target[0].value, e.target[1].value, e.target[2].value);

    if(!e.target[0].value){
      console.log("Put your email")
      return;
   };

    if(!e.target[1].value){
     console.log("Put your username")
     return;
   };

    if(!e.target[2].value){
      console.log("Put your passord")
      return;
   };

    let response = await axios.post(
      "http://localhost:5555/users",
      {
        email: e.target[0].value,
        username: e.target[1].value,
        password: e.target[2].value
      }
    )
    console.log(response.data);
  }

  return (
    <form className='signup' onSubmit={onSignUp}>
        <h1>Fintstagram</h1>
        <h2>SignUp</h2>
        <input type="email" placeholder="Email"/>
        <input type="text" placeholder="Username"/>
        <input type="password" placeholder="Password"/>
        <button type="submit">Sign Up</button>
        <button
        type="button"
        onClick={() => props.changeToLogIn()}
        >LogIn</button>
    </form>
  )
}

export default SignUp