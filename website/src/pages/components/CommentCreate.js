import React from 'react'
import axios from 'axios';
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

function CommentCreate(props) {

    const navigate = useNavigate();

    const createComment = async (e) => {
            e.preventDefault();
        
        await axios.post("http://localhost:5555/postsComments",
            {
                comment: e.target[0].value,
                postId: props?.postId 
            },
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken"),
                }
            }
          )
          toast.success("Comment has been Created")
          navigate("/showcomments")  
    }

  return (
    <form className='CommentCreate' onSubmit={createComment}>
        <textarea type="text" placeholder="Comment"/>
        <button type="submit">Publish</button>
    </form>
  )
}

export default CommentCreate