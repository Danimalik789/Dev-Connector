import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import Spinner from "../common/Spinner";
import PostItem from "../posts/PostItem";
import { getPost } from "../../actions/postActions";
import CommentForm from "./CommentForm";
import CommentFeed from "./CommentFeed";

const Post = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPost(id));
  }, [dispatch, id]);

  const { post, loading } = useSelector((state) => state.post);

  let postContent;

  if (post === null || loading || Object.keys(post).length === 0) {
    postContent = <Spinner />;
  } else {
    postContent = (
      <div>
        <PostItem post={post} showActions={false} />
        <CommentForm postId={post._id} />
        <CommentFeed postId={post._id}  comments={post.comments} />
      </div>
    );
  }
 
  return (
    <div className="post">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <Link to="/feed" className="btn btn-light mb-3">
              Back To Feed
            </Link>
            {postContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
