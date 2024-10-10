import React from 'react'
import axios from 'axios';
import "../../styles/CreatePostForm.css";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function CreatePostForm() {

    const navigate = useNavigate();

    const createPost = async (e) => {
            e.preventDefault();
        
        await axios.post("http://localhost:5555/posts",
            {
                  title: e.target[0].value,
                  description: e.target[1].value,
            },
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken"),
                }
            }
          )
          toast.success("Post has been Created")
          navigate("/showposts")  
    }
        
            return (
                <form className='Form' onSubmit={createPost}>
                    <h2>New Post</h2>
                    <input type="text" placeholder="Title"/>
                    <textarea type="text" placeholder="Description"/>
                    <button type="submit">Publish</button>
                </form>
            )
}

export default CreatePostForm
