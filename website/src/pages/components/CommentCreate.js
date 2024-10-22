import React, { useState } from 'react'
import axios from 'axios';
import { toast } from "react-toastify";

function CommentCreate(props) {
    
    const [comment, setComment] = useState("")
    
    const createComment = async (e) => {
        e.preventDefault();

        
        let response = await axios.post("http://localhost:5555/postsComments",
            {
                comment: comment,
                postId: props?.postId 
            },
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken"),
                }
            }
        )
        toast.success("Comment has been Created")
        props?.onCreate(response?.data)
        props?.addComment()
        setComment("")
    }

  return (
    <form className='CommentCreate' onSubmit={createComment}>
        <textarea type="text" placeholder="Comment"
        value={comment}
        onChange={(e) => setComment(e.target.value)}/>
        <button type="submit">Publish</button>
    </form>
  )
}

export default CommentCreate