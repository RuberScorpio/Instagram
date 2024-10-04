import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Posts from "./Posts";

function GetAllPosts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect (() => {
        getAllPosts();
      }, [])

    const getAllPosts = async () => {
        
        let response = await axios.get("http://localhost:5555/posts",
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken"),
                }
            })

        console.log(response, "Eccolo")

        if(response?.data?.error) {
            console.log(response.data.error);
          } else {
            setPosts(response?.data)
          }
          setLoading(false);
    }

    if(loading) {
      return <></>
    }
        
    return (
        <>
        <h2>Posts</h2>
            {posts?.map((post) => {
                return (
                    <Posts posts={post} />
                )
            })}
        </>
    )
}

export default GetAllPosts
