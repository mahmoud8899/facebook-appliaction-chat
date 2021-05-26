import { createStore, combineReducers, applyMiddleware } from "redux"
import thunk from "redux-thunk"

import { composeWithDevTools } from "redux-devtools-extension"

import {
    LoginReducres,
    singUPReducres,
    UserlisrReducres,
    useridReducres,
    adressReducres,
    ImageReducres,
    FollowareReducres,
    UNFollowareReducres,
    googleReducres,
    FacebookReducres,
    StoryReducres,


} from "../Reducres/Auth_reducres"

import {
    CreateRedcures,
    postReducres,
    DeletePostReducres,
    PostOnlyUserReducres,
    commentCreateReducres,
    CommentDeleteReducres,
    AddLikeReducres,
    PostUpdateReducres,
    CommentUpdateReducres,

} from "../Reducres/post_reducres"

const reducer = combineReducers({
    userLogin : LoginReducres,
    singUp : singUPReducres,
    FacebookID: FacebookReducres,
    listUsers : UserlisrReducres,
    userIdxp : useridReducres,
    addadress : adressReducres,
    imageUpl : ImageReducres,
    followareID : FollowareReducres,
    unFolloware : UNFollowareReducres,
    loginGoole : googleReducres,
    storyID : StoryReducres,

    createPost : CreateRedcures,
    postvisa : postReducres,
    postUpdate : PostUpdateReducres,
    postdelete :DeletePostReducres,
    onlyUserID :PostOnlyUserReducres,
    createComment : commentCreateReducres,
    updateComment : CommentUpdateReducres,
    deletecomment :CommentDeleteReducres,
    
    addLike :AddLikeReducres,
})


const localStoreUser = localStorage.getItem('userInfo') ?
JSON.parse(localStorage.getItem('userInfo')) : null


const intialState = {
    userLogin : {
        userInfo : localStoreUser
    }
}




const middleware = [thunk]
const store = createStore(reducer, intialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store