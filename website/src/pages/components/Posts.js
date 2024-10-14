import React, { useContext, useEffect, useState } from 'react';
import "../../styles/Posts.css";
import axios from 'axios';
import { AuthContext } from '../../services/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DateService from '../../services/Date';
import LikeSection from './LikeSection'


function Posts(props) {

  const {login} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {

    if(props?.username) {
      setUsername(props?.username)
    } else if(props?.posts?.user?.username) {
      setUsername(props?.posts?.user?.username);
    }
  }, [props])

  const onDelete = async () => {

    let response = await axios.delete("http://localhost:5555/posts/" + props?.posts?.id,
      {
        headers: {
          authToken: localStorage.getItem("AuthToken")
        }
      }
    )

    props.deletePost(props?.posts?.id)
    toast.success("You have Deleted Your Post")
  }

  return (
    <div className='Posts' id={props?.id}>
      <h2>{props?.posts?.title}</h2>
      <p>{props?.posts?.description}</p>
      <p>{DateService.formatDate(props?.posts?.createdAt)}</p>
      <div className='Buttons'>
        <button type="button" className='ButtonPosts' onClick={() => {navigate("/user/" + username)}}>
        {username}
        </button>
        <LikeSection postId={props?.posts?.id} />
        {
          login.username === username ?
          <button type='button' className='ButtonPosts' onClick={onDelete}>Delete</button>
          : <></>
        }
      </div>
    </div>
  )
}
export default Posts