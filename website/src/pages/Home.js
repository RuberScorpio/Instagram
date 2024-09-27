import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';


import "../styles/Home.css"

import { AuthContext } from '../services/AuthContext'

function Home() {

 const {login, setAuth} = useContext(AuthContext);
 const navigate = useNavigate();
 
 const onLogout = () => {
  localStorage.removeItem("AuthToken")
  navigate("/entry")
  setAuth(false)
 }

  return (
    <div>Home
      <div>
        { login ? "Logged In" : "Logged Out" }
      </div>
    <button
    type="button"
    onClick={onLogout}
    >LogOut</button>
    </div>
  )
}

export default Home