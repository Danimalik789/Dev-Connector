import axios from 'axios';

import {ADD_POSTS, GET_ERRORS} from './types'

//ADD Post
export const addPost = postData => dispatch => {
    axios.post('/api/posts', postData)
        .then(res => dispatch({
            type: ADD_POSTS,
            payload: res.data
        })
    )
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        })
    )
}