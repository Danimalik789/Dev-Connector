import React from 'react';
import CommentItem from './CommentItem';


const CommentFeed = ({comments, postId}) => {
  return(
    <>
        {comments.map((comment) =>(
            <CommentItem key={comment._id} comment={comment} postId={postId}/>
        ))}
    </>
  )
}

export default CommentFeed;


