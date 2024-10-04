import React from 'react'
import "../../styles/Posts.css";
import axios from 'axios';


function Posts(props) {

  const onDelete = async () => {

    let response = await axios.delete("http://localhost:5555/posts/" + props?.posts?.id,
      {
        headers: {
          authToken: localStorage.getItem("AuthToken")
        }
      }
    )

  }

  return (
    <div className='Posts' id={props?.id}>
    <h2>{props?.posts?.title}</h2>
    <p>{props?.posts?.description}</p>
    <p>{props?.posts?.user?.username}</p>
    <button className='button' onClick={onDelete}>
      Delete
    </button>
    </div>
  )
}
export default Posts