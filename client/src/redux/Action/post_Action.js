import {

    ADD_POST_USER_LOADING,
    ADD_POST_USER_SUECCSEE,
    ADD_POST_FAIL,


    ADD_VISA_POST_LOADING,
    ADD_VISA_POST_SUECCES,
    ADD_VISA_POST_FAIL,

    ADD_POST_REMOVE_SUCCESS,
    ADD_POST_REMOVE_LOADING,
    ADD_POST_REMOVE_FAIL,




    ADD_USER_POST_LOADING,
    ADD_USER_POST_SUCCESS,
    ADD_USER_POST_FAIL,

    ADD_USER_COMMENT_LOADING,
    ADD_USER_COMMENT_SUCCESS,
    ADD_USER_COMMENT_FAIL,



    ADD_USER_COMMENT_DELETE_LOADING,
    ADD_USER_COMMENT_DELETE_SUCCESS,
    ADD_USER_COMMENT_DELETE_FAIL,

    ADD_USER_LIKE_LOADING,
    ADD_USER_LIKE_SUCCESS,
    ADD_USER_LIKE_FAIL,


    ADD_POST_UPDATE_LOADING,
    ADD_POST_UPDATE_SUCCESS,
    ADD_POST_UPDATE_FAIL,


    ADD_COMMENT_UPDATE_LOADING,
    ADD_COMMENT_UPDATE_SUCCESS,
    ADD_COMMENT_UPDATE_FAIL,



} from "./types"

import axios from "axios"




// post update.... 
export const PostUpdate_action = (id, user) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_POST_UPDATE_LOADING })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/post/update/${id}/`, user, config)
        dispatch({ type: ADD_POST_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_POST_UPDATE_FAIL,
            payload: error.response
                && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}



// PUT ... like and remove like.... 
// PUT localhost:8000/api/post/addlike/6076e4c59f751a26a8e014f2
export const AddLike_action = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_USER_LIKE_LOADING })
        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.put(`/api/post/addlike/${user._id}/`, user, config)
        dispatch({ type: ADD_USER_LIKE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_LIKE_FAIL,
            payload: error.response
                && error.response.data.message
                ? error.response.data.message
                : error.message,
        })
    }
}



// Delete comment 
// localhost:8000/api/post/comment/6070837bf6da7a35f43c8b1f/607094b29a28dd034047cefc
export const comment_delete_action = (post, comment,) => async (dispatch, getState) => {

    try {
        dispatch({ type: ADD_USER_COMMENT_DELETE_LOADING })
        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.delete(`/api/post/comment/${post}/${comment}/`, config)
        dispatch({ type: ADD_USER_COMMENT_DELETE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_COMMENT_DELETE_FAIL
            , pyload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// Update comment ... .
// put localhost:8000/api/post/editcomment/607ecdf4f4262935e85ed057/607ed1e0f4262935e85ed05d
export const UpdateComment_action = (post_id, comment_id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_COMMENT_UPDATE_LOADING })
        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }

        const { data } = await axios.put(`/api/post/editcomment/${post_id}/${comment_id}/`, config)
        dispatch({ type: ADD_COMMENT_UPDATE_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_COMMENT_UPDATE_FAIL
            , pyload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// add comment ...      
// post localhost:8000/api/post/6070837bf6da7a35f43c8b1f/comment/
export const commentPost_action = (id, user) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_USER_COMMENT_LOADING })

        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.post(`/api/post/${id}/comment/`, user, config)
        dispatch({ type: ADD_USER_COMMENT_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USER_COMMENT_FAIL
            , pyload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// visa post to User.. 
// GET localhost:8000/api/post/607048ec07bd5c0cfc6dea48
export const visPostOnly_action = (id) => async (dispatch) => {
    try {
        dispatch({ type: ADD_USER_POST_LOADING })
        const { data } = await axios.get(`/api/post/${id}/`)
        dispatch({ type: ADD_USER_POST_SUCCESS, payload: data })

    } catch (error) {
        dispatch({
            type: ADD_USER_POST_FAIL
            , pyload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}




// Delelet Post..
//localhost:8000/api/delete/post/6070818586288f33e4130fcd
export const DeletePost_action = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_POST_REMOVE_LOADING })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.delete(`/api/delete/post/${id}/`, config)
        dispatch({ type: ADD_POST_REMOVE_SUCCESS, payload: data })
    } catch (error) {

        dispatch({
            type: ADD_POST_REMOVE_FAIL
            , pyload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}




// GET localhost:8000/api/post/
// visa Post... 
export const visaPost_action = () => async (dispatch) => {
    try {
        dispatch({ type: ADD_VISA_POST_LOADING })
        const { data } = await axios.get(`/api/post/`)
        dispatch({ type: ADD_VISA_POST_SUECCES, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_VISA_POST_FAIL,
            payload: error.response
                && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}



// post create...
// localhost:8000/api/create/
export const CreatePost_action = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_POST_USER_LOADING })
        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.post(`/api/create/`, user, config)
        dispatch({ type: ADD_POST_USER_SUECCSEE, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_POST_FAIL,
            payload: error.response
                &&
                error.response.data.message
                ?
                error.response.data.message
                : error.message

        })
    }
}