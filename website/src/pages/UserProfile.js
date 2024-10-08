import React, {useEffect, useState} from 'react'
import { useParams } from "react-router-dom"
import axios from 'axios';
import Posts from "./components/Posts";
import "../styles/UserProfile.css"

function UserProfile() {

   const {username} = useParams();
   const [posts, setPosts] = useState([]);

   useEffect (() => {
      fetchData();
    }, [username])

    const fetchData = async () => {
      let response = await axios.get(
         "http://localhost:5555/posts/" + username,
         {
            headers: {
               authToken: localStorage.getItem("AuthToken")
            }
         }
      )

      setPosts(response?.data)
    }

  return (
   <>
      <div className='Profile'>
      <h1>{username} Profile</h1>
         <h2>Posts</h2>
               {posts.length>=1 && posts?.map((post) => {
                     return (
                        <Posts 
                        posts={post}
                        username={username} />
                     )
               })}
      </div>
   </>
  )
}

export default UserProfile