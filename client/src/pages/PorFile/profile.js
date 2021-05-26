import "./index.css"
import CreatePost from "./CreatePost"
import Follow from "./Follow"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { UserId_Action ,userList_action} from "../../redux/Action/Auth_action"
import {visPostOnly_action} from  "../../redux/Action/post_Action"
const ProFil = ({ match }) => {

    const dmatchId = match.params.id
    // dispatch 
    const dispatch = useDispatch()

    const listUsers = useSelector((state) => state.listUsers)
    const { userList } = listUsers
    

    // check userInfo  
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // userid 
    const userIdxp = useSelector((state) => state.userIdxp)
    const { userid } = userIdxp

    // add adress 
    const addadress = useSelector((state) => state.addadress)
    const { success } = addadress


    // image = 
    const imageUpl = useSelector((state) => state.imageUpl)
    const { succes: succesImage } = imageUpl

    // create post... 
    const createPost = useSelector((state)=>state.createPost)
    const {succes:succesCreatePost} =createPost

    // visa Post user Only 
    const onlyUserID = useSelector((state)=>state.onlyUserID)
    const {OnlyUser} = onlyUserID

    // post delete ... 
    const postdelete = useSelector((state)=>state.postdelete)
    const { success:successPostdelete} = postdelete
    

    // create comment... 
    const createComment = useSelector((state)=>state.createComment)
    const {success:successCreateComment} = createComment

    // delete comment.. 
    const deletecomment = useSelector((state)=>state.deletecomment)
    const {success:successDeletecomment} = deletecomment


    // Followare     
    const followareID = useSelector((state)=>state.followareID)
    const {success:successfollowareID} = followareID
   // unFolloware 
   const unFolloware  =useSelector((state)=>state.unFolloware)
   const {success:successunFolloware} = unFolloware


     // add Like .. 
  const addLike= useSelector((state)=> state.addLike)
  const {success:successAddLike} =addLike

    useEffect(() => {

        if (dmatchId) {
            dispatch(UserId_Action(dmatchId))
            dispatch(visPostOnly_action(dmatchId))
            dispatch(userList_action())

        } 
        // eslint-disable-next-line
    }, [ 
        dmatchId,
         success,
          succesImage,
          successCreateComment,
          successDeletecomment,
          succesCreatePost,
          successPostdelete,
          successfollowareID,
          successunFolloware,
          successAddLike,

        ])




    return (
        <div className="Profile_allt">
           
            <CreatePost
             userInfo={userInfo}
             OnlyUser={OnlyUser}
             userList={userList}
              />
            <Follow
                userid={userid}
                dmatchId={dmatchId}
                success={success}
                userInfo={userInfo}
                userList={userList}
                
            />
        </div>
    )
}


export default ProFil