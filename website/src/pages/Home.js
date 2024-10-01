import React, {useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext'
import CreatePostForm from './components/CreatePostForm';
import "../styles/Home.css"

function Home() {

 const {setAuth} = useContext(AuthContext);
 const navigate = useNavigate();
 
 const onLogout = () => {
  localStorage.removeItem("AuthToken")
  navigate("/entry")
  setAuth(false)
 }

  return (
<div className='Home'>
      <h1>Fintstagram</h1>
      <CreatePostForm />
      <button type="button" onClick={onLogout}>Logout</button>
</div>
  )
}

export default Home

