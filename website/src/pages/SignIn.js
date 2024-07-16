import React from 'react'
import axios from "axios";
import "../styles/SignIn.css"

function SignIn() {

  async function onSignUp(e) {

    e.preventDefault();

    console.log("E", e.target[0].value, e.target[1].value);

    let response = await axios.post(
      "http://localhost:5555/users",
      {
        email: e.target[0].value,
        password: e.target[1].value
      }
    )
    console.log(response.data);
  }

  return (
    <form className='signin' onSubmit={onSignUp}>
        <h1>Fintstagram</h1>
        <input type="email" placeholder="Email"/>
        <input type="password" placeholder="Password"/>
        <button type="submit">Sign Up</button>
    </form>
  )
}

export default SignIn