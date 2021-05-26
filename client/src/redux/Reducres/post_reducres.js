import {

    ADD_POST_USER_LOADING,
    ADD_POST_USER_SUECCSEE,
    ADD_POST_FAIL,

    
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

} from "../Action/types"


// put update post... 
export const PostUpdateReducres = (state = { },action) =>{
    switch(action.type){
           case ADD_POST_UPDATE_LOADING : return {loading: true}
           case ADD_POST_UPDATE_SUCCESS : return  {success: true}
           
           case ADD_POST_UPDATE_FAIL : return {error: action.payload}
        default : return state
    }
}
// add Like 
export const AddLikeReducres = (state ={Likes : []}, action)=>{
switch(action.type){
    case ADD_USER_LIKE_LOADING: return {loading :true}
    case ADD_USER_LIKE_SUCCESS : return {success: true}
    case ADD_USER_LIKE_FAIL : return {error:action.payload}
    default :return state
}
}



// delete 
export const CommentDeleteReducres = (state= {},action)=>{
    switch(action.type){
        case ADD_USER_COMMENT_DELETE_LOADING: return {loading: true}
        case ADD_USER_COMMENT_DELETE_SUCCESS : return {success: true}
        case ADD_USER_COMMENT_DELETE_FAIL : return {error: action.payload}
        default : return state
    }
}

// update comment.====>
export const CommentUpdateReducres = (state = {}, action) =>{
    switch(action.type){
        case ADD_COMMENT_UPDATE_LOADING: return {loading: true}
        case ADD_COMMENT_UPDATE_SUCCESS : return {succes: true}
        case ADD_COMMENT_UPDATE_FAIL : return{error :action.payload}
        default : return state
    }
}

// create comment... 
export const commentCreateReducres = (state = {},action) =>{
    switch(action.type){
        case ADD_USER_COMMENT_LOADING :return {loading: true}
        case ADD_USER_COMMENT_SUCCESS : return {success: true}
        case ADD_USER_COMMENT_FAIL : return {error:action.payload}
        default : return state
    }
}


// post Only user ... 
export const PostOnlyUserReducres = (state = {OnlyUser : []}, action) =>{
    switch(action.type){
        case ADD_USER_POST_LOADING : return {...state, loading: true}
        case ADD_USER_POST_SUCCESS : return {OnlyUser: action.payload}
        case ADD_USER_POST_FAIL : return {error : action.payload}
        default : return state
    }
}


// delete Post.. 
export const DeletePostReducres = (state = {}, action) => {
    switch (action.type) {
        case ADD_POST_REMOVE_LOADING: return { loading: true }
        case ADD_POST_REMOVE_SUCCESS: return { success: true }
        case ADD_POST_REMOVE_FAIL: return { error: action.payload }
        default: return state
    }
}

// visa Post
export const postReducres = (state = { post: [] }, action) => {
    switch (action.type) {
        case ADD_VISA_POST_SUECCES: return {post: action.payload }
        case ADD_VISA_POST_FAIL: return { error: action.payload }
        default: return state
    }
}




// Create Post.. 
export const CreateRedcures = (state = {}, action) => {
    switch (action.type) {
        case ADD_POST_USER_LOADING: return {loading: true }
        case ADD_POST_USER_SUECCSEE: return {succes: true }
        case ADD_POST_FAIL: return { error: action.payload }
        default: return state
    }
}