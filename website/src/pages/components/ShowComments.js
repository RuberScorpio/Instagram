import React, { useEffect, useState } from 'react';
import Comment from './Comment';
import Sorting  from "../../services/Sorting";

function GetAllComments(props) {

    const [comments, setComments] = useState([]);

    useEffect(() => {
        if(props?.comments){
            setComments(props?.comments);
        }
    }, [props])

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