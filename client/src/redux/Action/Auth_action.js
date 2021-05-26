import {
    ADD_USER_LOADING,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    ADD_USER_RESET,


    ADD_LOGOUT,

    ADD_USER_SINGUP_LOGIN,
    ADD_USER_SINGUP_SECCESS,
    ADD_USER_SINGUP_FAIL,



    ADD_USERLIST_LOADING,
    ADD_USERLIST_SUCCESS,
    ADD_USERLIST_FAIL,

    ADD_USERID_LOADING,
    ADD_USERID_SUCCESS,
    ADD_USERID_FAIL,


    ADD_USER_ADRESS_LOADING,
    ADD_USER_ADRESS_SUCCESS,
    ADD_USER_ADRESS_FAIL,



    ADD_USER_FOLLOWE_LOADING,
    ADD_USER_FOLLOWE_SUCCESS,
    ADD_USER_FOLLOWE_FAIL,

    ADD_USER_UNFOLLOWE_LOADING,
    ADD_USER_UNFOLLOWE_SUCCESS,
    ADD_USER_UNFOLLOWE_FAIL,

    FAECBOOK_LODING,
    FAECBOOK_FAIL,


    ADD_USER_GOOGLE_LODING,
    ADD_USER_GOOGLE_FAIL,


    ADD_STORY_LOADING,
    ADD_STORY_SUCCESS,
    ADD_STORY_FAIL,

} from "./types"

import axios from "axios"

///api/allstory/

export const IamgeStory_action = () => async (dispatch) => {
    try {
        dispatch({ type: ADD_STORY_LOADING })

        const{data} = await axios.get(`/api/allstory/`,)
        dispatch({ type: ADD_STORY_SUCCESS, payload : data })
    } catch(error) {
        dispatch({
            type: ADD_STORY_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}








// PUT localhost:8000/api/user/unfollowers/60704b980b72e51e34a6772a
// unfollowers
export const Unfollowersr_action = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_USER_UNFOLLOWE_LOADING })
        const {userLogin: {userInfo}} = getState()
        const config = {headers : {Authorization: `Bearer ${userInfo.token}`}}
        const{data} = await axios.put(`/api/user/unfollowers/${user._id}/`, user, config)
        dispatch({ type: ADD_USER_UNFOLLOWE_SUCCESS, payload : data })
    } catch(error) {
        dispatch({
            type: ADD_USER_UNFOLLOWE_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// PUT/// localhost:8000/api/user/followers/60744066a3109b24704ed02e
// Follower
export const Follower_action = (user) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_USER_FOLLOWE_LOADING })
        const {userLogin: {userInfo}} = getState()
        const config = {headers : {Authorization: `Bearer ${userInfo.token}`}}
        const{data} = await axios.put(`/api/user/followers/${user._id}/`,user, config)
        dispatch({ type: ADD_USER_FOLLOWE_SUCCESS, payload : data })
    } catch (error){
        dispatch({
            type: ADD_USER_FOLLOWE_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// PUT Adres...
//localhost:8000/api/user/addadress/60743fbea3109b24704ed02c
export const Adress_action = (id, user) => async (dispatch, getState) => {
    try {
        dispatch({ type: ADD_USER_ADRESS_LOADING })
        const { userLogin: { userInfo } } = getState()
        const config = { headers: { Authorization: `Bearer ${userInfo.token}` } }
        const { data } = await axios.put(`/api/user/addadress/${id}/`, user, config)
        dispatch({ type: ADD_USER_ADRESS_SUCCESS, payload: data })
    } catch (error) {

        dispatch({
            type: ADD_USER_ADRESS_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}

// GET USERID...
//localhost:8000/api/user/profile/6070484098649f2de0913fa5
export const UserId_Action = (user) => async (dispatch) => {

    try {
        dispatch({ type: ADD_USERID_LOADING })
        const { data } = await axios.get(`/api/user/profile/${user}/`)
        dispatch({ type: ADD_USERID_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USERID_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// userList GET..
//localhost:8000/api/users
export const userList_action = (keyword = '') => async (dispatch) => {
    try {
        dispatch({ type: ADD_USERLIST_LOADING })
        const { data } = await axios.get(`/api/users/?keyword=${keyword}`)
        dispatch({ type: ADD_USERLIST_SUCCESS, payload: data })
    } catch (error) {
        dispatch({
            type: ADD_USERLIST_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// login in Goole ....
// post login in ...
export const oauthGoogle = (user) => async (dispatch) => {

    try{
        dispatch({type:ADD_USER_GOOGLE_LODING})
        const config = {
            headers: {
                'Accept': 'application/json'
            },
        }
        const {data} = await axios.post(`/api/user/google/`, user,  config)
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error){
        dispatch({
            type: ADD_USER_GOOGLE_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })

    }
}



// Facebook... login in .... 
// POST /api/user/faecbook/
export const FeacBookAction = (user) => async (dispatch) =>{

    try{
        dispatch({type: FAECBOOK_LODING})
        const config = {
            headers :{
                'Content-Type': 'application/json'
            }
        }

        const {data}  = await axios.post(`/api/user/faecbook/`, user, config)
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    }catch(error){
        dispatch({
            type: FAECBOOK_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// singup
// POST localhost:8000/api/singup/
export const SingUp_action = (user) => async (dispatch) => {

    try {
        dispatch({ type: ADD_USER_SINGUP_LOGIN })
        const { data } = await axios.post(`/api/singup/`, user)
        dispatch({ type: ADD_USER_SINGUP_SECCESS })
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {
        dispatch({
            type: ADD_USER_SINGUP_FAIL,
            payload: error.response &&
                error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}


// logout...
export const lOgout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    dispatch({ type: ADD_LOGOUT })
    dispatch({ type: ADD_USER_RESET })
}


//POST LOGIN IN ...
// localhost:8000/api/login/
export const Action_Login = (user) => async (dispatch) => {
    try {
        dispatch({ type: ADD_USER_LOADING })

        const { data } = await axios.post(`/api/login/`, user)
        dispatch({ type: ADD_USER_SUCCESS, payload: data })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (error) {

        dispatch({
            type: ADD_USER_FAIL,
            payload: error.response
                && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}
