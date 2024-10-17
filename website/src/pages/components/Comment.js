import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../services/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import DateService from '../../services/Date';

function Comment(props) {

    const {login} = useContext(AuthContext);
    const [username, setUsername] = useState("");
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {

        if(props?.comments?.comment) {
          setLoading(false) 
        }
    
        if(props?.username) {
          setUsername(props?.username)
        } else if(props?.comments?.user?.username) {
          setUsername(props?.comments?.user?.username);
        }
      }, [props])

      const onDelete = async () => {

        let response = await axios.delete("http://localhost:5555/postsComments/" + props?.comments?.id,
          {
            headers: {
              authToken: localStorage.getItem("AuthToken")
            }
          }
        )
    
        props.deleteComments(props?.comments?.id)
        toast.success("You have Deleted Your Comment")
      }

      if(loading) {
        return <></>
      }

    return (
        <div className='Comment' id={props?.id}>
        <p>{props?.comments?.Comment}</p>
        <p>{DateService.formatDate(props?.comments?.createdAt)}</p>
        <div className='CommentButtons'>
            <button type="button" onClick={() => {navigate("/user/" + username)}}>
            {username}
            </button>
            {
          login.username === username ?
          <button type='button' onClick={onDelete}>
            Delete
          </button>
          : <></>
        }
        </div>
        </div>
    )
}

export default Comment