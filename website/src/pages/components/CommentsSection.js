import Sorting  from "../../services/Sorting";
import CommentCreate from "./CommentCreate";
import ShowComments from "./ShowComments";
import { toast } from "react-toastify";
import axios from 'axios';
import { AuthContext } from '../../services/AuthContext';
import React, { useEffect, useState, useContext } from 'react';

function CommentsSection(props) {

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const {login} = useContext(AuthContext);

  useEffect (() => {
    getAllComments();
}, [props])

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
            setComments(Sorting.sortComments("newest", response.data))
        }
    setLoading(false);
}

if(loading) {
  return <></>
}

  const onCreate = (comment) => {
    setComments(
      [
        {
          ...comment,
          user: {
            username: login.username
          }
        },
        ...comments
      ]
    )
  }

  return (
    <div className='CommentsSection'>
        <ShowComments comments={comments}/>
        <CommentCreate postId={props?.postId} onCreate={onCreate}/>
    </div>
  )
}

export default CommentsSection