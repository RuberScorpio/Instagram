import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';


import "../styles/Home.css"

import { AuthContext } from '../services/AuthContext'

function Home() {

 const {login} = useContext(AuthContext);
 const navigate = useNavigate();

  return (
    <div>Home
      <div>
        { login ? "Logged In" : "Logged Out" }
      </div>
    <button
    type="button"
    onClick={() => {localStorage.removeItem("login");
    navigate("/entry");
    }}
    >LogOut</button>
    </div>
  )
}

export default Home