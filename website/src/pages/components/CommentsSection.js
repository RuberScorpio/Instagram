import React from 'react'
import CommentCreate from "./CommentCreate";
import ShowComments from "./ShowComments";

function CommentsSection(props) {
  return (
    <div className='CommentsSection'>
        <ShowComments postId={props?.postId} />
        <CommentCreate postId={props?.postId}/>
    </div>
  )
}

export default CommentsSection