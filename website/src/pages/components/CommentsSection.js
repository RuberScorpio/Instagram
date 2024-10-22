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
    setComments(Sorting.sortComments("newest", props?.comments))
    setLoading(false);
}, [props])

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
        <CommentCreate postId={props?.postId} onCreate={onCreate} addComment={() => {props?.addcomment()}}/>
        <ShowComments comments={comments}/>
    </div>
  )
}

export default CommentsSection