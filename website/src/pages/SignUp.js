import React from 'react'
import axios from "axios";
import "../styles/SignUp.css"

function SignUp() {

  async function onSignUp(e) {

    e.preventDefault();

    console.log("E", e.target[0].value, e.target[1].value, e.target[2].value);

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
        <input type="email" placeholder="Email"/>
        <input type="text" placeholder="Username"/>
        <input type="password" placeholder="Password"/>
        <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignUp