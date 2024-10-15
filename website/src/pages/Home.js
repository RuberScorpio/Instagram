import React, {useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../services/AuthContext'
import CreatePostForm from './components/CreatePostForm';
import ShowPosts from './components/ShowPosts';
import Menu from './components/Menu';
import "../styles/Home.css"
import { toast } from 'react-toastify';

function Home() {

 const {login, setLogin} = useContext(AuthContext);
 const navigate = useNavigate();
 const [menu, setMenu] = useState("Show");
 
 const onLogout = () => {
  localStorage.removeItem("AuthToken")
  navigate("/entry")
  setLogin(false)
  toast.success("You have logged out")
 }

  return (
<div className='Home'>
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
    <br />
      <Menu
        setMenu={(value) => setMenu(value)}
        menu={menu}
        onLogout={onLogout} 
        username={login.username}
      />
</div>
  )
}

export default Home

