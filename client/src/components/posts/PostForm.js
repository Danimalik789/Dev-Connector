import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import TextAreaFieldGroup from "../common/TextAreaFieldGroup";
import { addPost } from "../../actions/postActions";

const PostForm = () => {
  const [text, setText] = useState("");
  const [errors, setErrors] = useState([]);

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const error = useSelector((state) => state.errors);

  useEffect(() => {
    if (error) {
      setErrors(error);
    }
  }, [error]);

  const onSubmit = (e) =>{
    e.preventDefault();

    const { user } = auth;

    const newPost = {
        text,
        name: user.name,
        avatar: user.avatar
    }
    dispatch(addPost(newPost))
    setText('')
  }

  const onChange = (e) => {
    setText(e.target.value)
  }

  return (
    <div className="post-form mb-3">
      <div className="card card-info">
        <div className="card-header bg-info text-white">Say Something...</div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <TextAreaFieldGroup
                placeholder="Create a post"
                name="text"
                value={text}
                onChange={onChange}
                error={errors.text}
              />
            </div>
            <button className="btn btn-dark">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PostForm;
