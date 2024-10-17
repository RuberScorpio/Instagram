import React, { useEffect, useState } from 'react';
import { toast } from "react-toastify";
import axios from 'axios';
import Comment from './Comment';
import Sorting  from "../../services/Sorting";

function GetAllComments(props) {

    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [order] = useState("newest");

    useEffect (() => {
        getAllComments();
    }, [])
    
    const getAllComments = async () => {
        
        let response = await axios.get(
            "http://localhost:5555/postsComments/" + props?.postId,
            {
                headers: {
                    authToken: localStorage.getItem("AuthToken")
                }
            })
            
            console.log(response.data, "Response")
            
            if(response?.data?.error) {
                toast.error(response.data.error);
            } else if(response?.data) {
                setComments(Sorting.sortComments(order, response.data))
            }
        setLoading(false);
    }

    if(loading) {
      return <></>
    }

    const deleteComment = (id) => {
        setComments(
            comments.filter((comments) => comments.id !== id)
        )
    }

    return (
        <>
            <h2>Comments</h2>
            <div className='Order'>
                <button type="button" className='ButtonShowComments'
                onClick={() => setComments(Sorting.sortComments("newest", [...comments]))}
                >Newest</button>
                <button type="button" className='ButtonShowComments'
                onClick={() => setComments(Sorting.sortComments("oldest", [...comments]))}
                >Oldest</button>
            </div>
                    {comments?.map((comment) => {
                        return (
                            <Comment comments={comment} deleteComment={deleteComment}/>
                        )
                    })}
        </>
  )
}

export default GetAllComments