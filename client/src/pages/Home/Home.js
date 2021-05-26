import "./style.css"
import CreatePost from "./CreatePost"
import Friend from "./Friend"
import VisaPost from "./VisaPost"
import { userList_action, IamgeStory_action } from "../../redux/Action/Auth_action"
import { visaPost_action } from "../../redux/Action/post_Action"
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from "react"
import StorImage from "./StoryImage"
import axios from "axios"
import { ADD_LOGIN } from "../../redux/Action/types"
const Home = ({ match }) => {


  const keyword = match.params.keyword

  // user info..... 
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin


  const [storyall, setStoryall] = useState([])
  //console.log('setStoryall',storyall)



  useEffect(() => {


    if (userInfo || ADD_LOGIN) {
      const showStory = async () => {
        try {
          const { data } = await axios.get(`/api/allstory/`)
          setStoryall(data)
          // console.log('data',data)
        } catch (error) {
          console.error(error)
        }
      }
      showStory()
    }
    // eslint-disable-next-line
  }, [ADD_LOGIN, userInfo])


  // dispatch to listUser.... 
  const dispatch = useDispatch()

  // userList 
  const listUsers = useSelector((state) => state.listUsers)
  const { userList, error, loading } = listUsers

  // create Post....
  const createPost = useSelector((state) => state.createPost)
  const { succes } = createPost

  // visa Post 
  const postvisa = useSelector((state) => state.postvisa)
  const { post } = postvisa

  // remove post...
  const postdelete = useSelector((state) => state.postdelete)
  const { success: deleteSuccess } = postdelete


  // create comment.... 
  const createComment = useSelector((state) => state.createComment)
  const { success: commentSuccess } = createComment

  // delete comment ... 
  const deletecomment = useSelector((state) => state.deletecomment)
  const { success: successDeletecomment } = deletecomment

  // add Like .. 
  const addLike = useSelector((state) => state.addLike)
  const { success: successAddLike } = addLike




  // Followare .. 
  const followareID = useSelector((state) => state.followareID)
  const { success: successFollowareID } = followareID

  // uNFolloware.. 
  const unFolloware = useSelector((state) => state.unFolloware)
  const { success: successUnfolloare } = unFolloware



  // Update Post from user... 
  const [userAllt, setUserAllt] = useState(0)


  //console.log('story',story)
  // update Post... 
  const postUpdate = useSelector((stata) => stata.postUpdate)
  const { success: successpostUpdate } = postUpdate
  useEffect(() => {


    dispatch(userList_action(keyword))
    dispatch(visaPost_action())
    dispatch(IamgeStory_action())

    // eslint-disable-next-line
  }, [userInfo,
    succes,
    deleteSuccess,
    commentSuccess,
    successDeletecomment,
    successAddLike,
    successFollowareID,
    successUnfolloare,
    successpostUpdate,
    keyword
  ])




  const [clikeOpen, setClikeOpen] = useState(false)
  const [imagePage, setImagePage] = useState('')

  const HandlePage = (imag) => {

    setImagePage(imag)
    setClikeOpen(true)

    setTimeout(() => {
      setClikeOpen(false)
    }, 7000);
  }


  return (



    <>

      <span className={clikeOpen ? "modle open" : "modle"}>
        <img src={imagePage} alt="noc nice" className="imag_home" />
        <p className="dxcx" onClick={() => setClikeOpen(false)}>X</p>
      </span>



      <p className="xisdfsd">
        <StorImage
          userInfo={userInfo}
          storyall={storyall}
          HandlePage={HandlePage}
          setStoryall={setStoryall}
        />
      </p>





      <CreatePost
        userInfo={userInfo}
        succes={succes}
        userAllt={userAllt}
        setUserAllt={setUserAllt}
        post={post}
        successpostUpdate={successpostUpdate}

      />
      <div className="connection_home">
        <Friend
          userList={userList}
          error={error}
          loading={loading}
          userInfo={userInfo}
        />
        <VisaPost
          post={post}
          userInfo={userInfo}
          userList={userList}
          setUserAllt={setUserAllt}
          HandlePage={HandlePage}

        />
      </div>
    </>
  )
}


export default Home