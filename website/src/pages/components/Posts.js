import React, { useContext, useEffect, useState } from 'react';
import "../../styles/Posts.css";
import axios from 'axios';
import { AuthContext } from '../../services/AuthContext';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import DateService from '../../services/Date';
import LikeSection from './LikeSection'
import CommentsSection from './CommentsSection';


function Posts(props) {

  const {login} = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {

    if(props?.posts?.title) {
      setLoading(false) 
    }

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

  if(loading) {
    return <></>
  }

  return (
    <div className='Posts' id={props?.id}>
      <h2>{props?.posts?.title}</h2>
      <p>{props?.posts?.description}</p>
      <p>{DateService.formatDate(props?.posts?.createdAt)}</p>
      <div className='Buttons'>
        <button type="button" className='ButtonPosts' 
          onClick={() => {navigate("/user/" + username)}}>
          {username}
        </button>
        <LikeSection 
          postId={props?.posts?.id} 
          likes={props?.posts?.postsLikes}
        />
        <button type="button" className='ButtonPosts' 
          onClick={() => {setToggle(!toggle)}}>
            Comments
        </button>
        {
          login.username === username ?
          <button type='button' className='ButtonPosts' onClick={onDelete}>
            Delete
          </button>
          : <></>
        }
      </div>
        {
          toggle ?
          <CommentsSection postId={props?.posts?.id} /> 
          : <></>
        }
    </div>
  )
}
export default Posts