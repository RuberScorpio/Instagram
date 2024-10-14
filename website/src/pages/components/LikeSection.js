import React, { useState } from 'react';
import "../../styles/Posts.css";
import axios from 'axios';
/* import { toast } from 'react-toastify'; */
import LikeInactive from "../../assets/Heart-Inactive.svg";
import LikeActive from "../../assets/Heart-Active.svg";



function LikeSection({postId}) {

  const [like, setLike] = useState(false)

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

    setLike(!like)
    /* toast.success("You have liked the Post") */
  }

  return (
    <div className='Like'>
      {/* <p>numlikes</p> */}
      <button type="button" className='LikeButton' onClick={changeLike}>
      <img src= {like ? LikeActive : LikeInactive} alt={"LikeSelection"} />
      </button>
    </div>
  )
}
export default LikeSection