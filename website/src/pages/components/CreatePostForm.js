import React from 'react'
import axios from 'axios';
import "../../styles/CreatePostForm.css";

function CreatePostForm() {

    
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
