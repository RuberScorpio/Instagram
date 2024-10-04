import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext'
import CreatePostForm from './components/CreatePostForm';
import ShowPosts from './components/ShowPosts';
import Menu from './components/Menu';
import "../styles/Home.css"

function Home() {

 const {setAuth} = useContext(AuthContext);
 const navigate = useNavigate();
 const [menu, setMenu] = useState("Show");
 
 const onLogout = () => {
  localStorage.removeItem("AuthToken")
  navigate("/entry")
  setAuth(false)
 }

  return (
<div className='Home'>
    <Menu
      setMenu={(value) => setMenu(value)}
      onLogout={onLogout} 
    />
    <div className='Contents'>
    <h1>Fintstagram</h1>
      {
        menu === "Show"
        ?
        <ShowPosts />
        :
        <CreatePostForm />
      }
    </div>
</div>
  )
}

export default Home

