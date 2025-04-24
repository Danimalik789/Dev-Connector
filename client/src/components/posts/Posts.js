import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import PostForm from './PostForm'
import PostFeed from './PostFeed'
import Spinner from '../common/Spinner'
import { getPosts } from '../../actions/postActions'

const Posts = () => {
  const dispatch = useDispatch();
  const {posts, loading} = useSelector((state) => state.post)

  useEffect(() => {
    dispatch(getPosts())
  },[dispatch])






let postContent;

if (posts === null || loading) {
  postContent = <Spinner/>
} else {
  postContent = <PostFeed posts={posts}/>
}
  


  return (
    <div className='feed'>
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <PostForm  />
                    {postContent}
                </div>
            </div>
        </div>
      
    </div>
  )
}

export default Posts;
