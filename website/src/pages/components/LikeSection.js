import React, { useContext, useState, useEffect } from 'react';
import "../../styles/Posts.css";
import axios from 'axios';
/* import { toast } from 'react-toastify'; */
import { AuthContext } from '../../services/AuthContext';
import LikeInactive from "../../assets/Heart-Inactive.svg";
import LikeActive from "../../assets/Heart-Active.svg";



function LikeSection({postId, likes}) {

  const {login} = useContext(AuthContext);
  const [like, setLike] = useState(false)
  const [total, setTotal] = useState(-1)

  useEffect (() => {
    setLike(likes?.filter((row) => {
      return login.id === row.userId})[0]?.like)
    setTotal(likes?.filter((row) => {
      return row?.like})?.length)
  }, [likes])

  const changeLike = async () => {

    let response = await axios.post("http://localhost:5555/postsLikes",
      {
        like: !like,
        postId: postId
      },
      {
        headers: {
          authToken: localStorage.getItem("AuthToken")
        }
      }
    )

    setTotal(like ? total-1 : total+1)
    setLike(!like)
    /* toast.success("You have liked the Post") */
  }

  return (
    <div className='Like'>
      <button type="button" className='LikeButton' onClick={changeLike}>
        <img src= {like ? LikeActive : LikeInactive} alt={"LikeSelection"} />
        {total}
      </button>
    </div>
  )
}
export default LikeSection