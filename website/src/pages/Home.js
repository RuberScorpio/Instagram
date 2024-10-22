import React, {useState, useEffect} from 'react'
import CreatePostForm from './components/CreatePostForm';
import ShowPosts from './components/ShowPosts';
import Menu from './components/Menu';
import "../styles/Home.css"
import { useLocation } from 'react-router-dom';

function Home() {

 const [menu, setMenu] = useState("Show");
 const location = useLocation()
 const {state} = location;

 useEffect(() => {

  if(state){
    setMenu(state?.menuState)
    console.log("menu", location) 
  }
 }, [location])

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
      />
</div>
  )
}

export default Home

