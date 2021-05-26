import {
    ADD_USER_LOADING,
    ADD_USER_SUCCESS,
    ADD_USER_FAIL,
    ADD_USER_RESET,

    ADD_USER_SINGUP_LOGIN,
    ADD_USER_SINGUP_SECCESS,
    ADD_USER_SINGUP_FAIL,

    
    ADD_USERLIST_SUCCESS,
    ADD_USERLIST_FAIL,

    ADD_USERID_LOADING,
    ADD_USERID_SUCCESS,
    ADD_USERID_FAIL,
   

    ADD_USER_ADRESS_LOADING,
    ADD_USER_ADRESS_SUCCESS,
    ADD_USER_ADRESS_FAIL,

    ADD_LOADING,
    ADD_IMAGE,
    ADD_IMAGE_FAIL,

    ADD_USER_FOLLOWE_LOADING,
    ADD_USER_FOLLOWE_SUCCESS,
    ADD_USER_FOLLOWE_FAIL,

    ADD_USER_UNFOLLOWE_LOADING,
    ADD_USER_UNFOLLOWE_SUCCESS,
    ADD_USER_UNFOLLOWE_FAIL,

    ADD_USER_GOOGLE_LODING,
    ADD_USER_GOOGLE_FAIL,

    FAECBOOK_LODING,
    FAECBOOK_FAIL,


    ADD_STORY_LOADING,
    ADD_STORY_SUCCESS,
    ADD_STORY_FAIL,

} from "../Action/types"


// facebook login ... 
// post... 
export const StoryReducres = (state = { story :[] }, action) =>{

    switch(action.type){
           case ADD_STORY_LOADING : return {loadin: true}
           case ADD_STORY_SUCCESS: return { story: action.payload }
           case ADD_STORY_FAIL : return {error: action.payload}
        default : return state
    }
}

// facebook login ... 
// post... 
export const FacebookReducres = (state = { userInfo: { followers: [], following: []} }, action) =>{

    switch(action.type){
           case FAECBOOK_LODING : return {loadin: true}
           case ADD_USER_SUCCESS: return { userInfo: action.payload }
           case FAECBOOK_FAIL : return {error: action.payload}
        default : return state
    }
}

// gogole ... 
// post...
export const googleReducres = (state = { userInfo: { followers: [], following: []} }, action) =>{

    switch(action.type){
        case ADD_USER_GOOGLE_LODING : return {loading: true}
        case ADD_USER_SUCCESS: return { userInfo: action.payload }
        case ADD_USER_GOOGLE_FAIL : return {error :action.payload}
        default : return  state
    }
}

// UNfolloware 
export const UNFollowareReducres = (state= [], action)=>{
    switch(action.type){
        case ADD_USER_UNFOLLOWE_LOADING : return{loading: true}
        case ADD_USER_UNFOLLOWE_SUCCESS : return {success: true}
        case ADD_USER_UNFOLLOWE_FAIL : return {error:action.payload}
        default : return state
    }
}


// followare 
export const FollowareReducres = (state= [], action)=>{
switch(action.type){
    case ADD_USER_FOLLOWE_LOADING : return{loading: true}
    case ADD_USER_FOLLOWE_SUCCESS : return {success: true}
    case ADD_USER_FOLLOWE_FAIL : return {error:action.payload}
    default : return state
}
}


// image Uploading.....
export const ImageReducres = (state = {}, action)=>{
    switch(action.type){
        case ADD_LOADING : return {ADD_LOADING:true}
        case ADD_IMAGE : return {succes : true}
        case ADD_IMAGE_FAIL : return {error:action.payload}
        default : return state
    }
}

// add adres...
export const adressReducres = (state = {adress:{}}, action) =>{
    switch(action.type){

        case ADD_USER_ADRESS_LOADING : return {loading:true}
        case ADD_USER_ADRESS_SUCCESS : return {adress:action.payload, success : true}
        case ADD_USER_ADRESS_FAIL  : return {error :action.payload}
        default : return state
    }
}
// userid //
export const useridReducres = (state = {userid:{ followers: [],following: [] } }, action)=>{
    switch(action.type){
        case ADD_USERID_LOADING : return {...state,loading : true}
        case ADD_USERID_SUCCESS : return {...state,userid :action.payload}
        case ADD_USERID_FAIL : return {error: action.payload}
        default : return state
    }

}

// userlist ... 
export const UserlisrReducres = (state = {userList : [] }, action)=>{
switch(action.type){
   
    case ADD_USERLIST_SUCCESS : return {...state,userList: action.payload}
    case ADD_USERLIST_FAIL : return {error: action.payload}
    default : return state
}
}

// singup 
export const singUPReducres = (state = { userInfo: { followers: [], following: []} }, action) => {
    switch (action.type) {
        case ADD_USER_SINGUP_LOGIN: return { loading: true }
        case ADD_USER_SINGUP_SECCESS: return { userInfo: action.payload, success: true }
        case ADD_USER_SINGUP_FAIL: return { error: action.payload }
        default: return state
    }
}
// logoin....
export const LoginReducres = (state = { userInfo: { followers: [], following: []} }, action) => {
    switch (action.type) {
        case ADD_USER_LOADING: return { loading: true }
        case ADD_USER_SUCCESS: return { userInfo: action.payload }
        case ADD_USER_FAIL: return { error: action.payload }
        case ADD_USER_RESET: return {}
        default: return state
    }
}