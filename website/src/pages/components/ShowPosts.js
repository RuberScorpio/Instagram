import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import Posts from "./Posts";
import Sorting  from "../../services/Sorting";
import "../../styles/ShowPosts.css";

function GetAllPosts() {

    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order] = useState("newest");

    useEffect (() => {
        getAllPosts();
    }, [])
    
    const getAllPosts = async () => {
        
        let response = await axios.get(
            "http://localhost:5555/posts",
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken")
                }
            })
            
            console.log(response.data, "Response")
            
            if(response?.data?.error) {
                toast.error(response.data.error);
            } else if(response?.data) {
                setPosts(Sorting.sortPosts(order, response.data))
            }
        setLoading(false);
        console.log("comments", response?.data)
    }

    if(loading) {
      return <></>
    }

    const deletePost = (id) => {
        setPosts(
            posts.filter((post) => post.id !== id)
        )
    }
        
    return (
        <>
            <h2>Posts</h2>
            <div className='Order'>
                <button type="button" className='ButtonShowPosts'
                onClick={() => setPosts(Sorting.sortPosts("newest", [...posts]))}
                >Newest</button>
                <button type="button" className='ButtonShowPosts'
                onClick={() => setPosts(Sorting.sortPosts("oldest", [...posts]))}
                >Oldest</button>
            </div>
                    {posts?.map((post) => {
                        return (
                            <Posts posts={post} deletePost={deletePost} />
                        )
                    })}
        </>
    )
}

export default GetAllPosts
