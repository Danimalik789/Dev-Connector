import React from "react";
import classnames from "classnames";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deletePost, addLike, removeLike } from "../../actions/postActions";

const PostItem = ({ post, showActions = true }) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  const onDeleteClick = (id) => {
    dispatch(deletePost(id));
  };

  const onLikeClick = (id) => {
    dispatch(addLike(id));
  };

  const onUnlikeClick = (id) => {
    dispatch(removeLike(id));
  };

  const findUserLike = (likes) =>
    likes.some((like) => like.user === auth.user.id);

  return (
    <div className="card card-body mb-3">
      <div className="row">
        <div className="col-md-2">
          <Link to={`/profile/${post.user}`}>
            <img
              className="rounded-circle d-none d-md-block"
              src={post.avatar}
              alt=""
            />
          </Link>
          <br />
          <h4 className="text-center">{post.name}</h4>
        </div>
        <div className="col-md-10">
          <p className="lead">{post.text}</p>
          {showActions ? (<span>
            <button
              onClick={() => onLikeClick(post._id)}
              type="button"
              className="btn btn-dark me-1"
            >
              <i
                className={classnames("fas fa-thumbs-up", {
                  "text-info": findUserLike(post.likes),
                })}
              />
              <span className="badge badge-dark">{post.likes.length}</span>
            </button>

            <button
              onClick={() => onUnlikeClick(post._id)}
              type="button"
              className="btn btn-dark me-1"
            >
              <i className="fas fa-thumbs-down text-white"/>
              
              
            </button>

            <Link to={`/post/${post._id}`} className="btn btn-info me-1">
              Comments
            </Link>
            {post.user === auth.user.id ? (
              <button
                onClick={() => onDeleteClick(post._id)}
                type="button"
                className="btn btn-danger mr-1"
              >
                <i className="fas fa-times" />
              </button>
            ) : null}
          </span>) : null}
        </div>
      </div>
    </div>
  );
};

export default PostItem;
