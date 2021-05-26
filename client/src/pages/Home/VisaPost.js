import { Fragment, useState } from "react"
import "./style.css"
import axios from "axios"
import {
  DeletePost_action,
  commentPost_action,
} from "../../redux/Action/post_Action"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import Likes from "./Likes"
import AddLikes from "./AddLikes"
import RemoveAndEdit from "./RemoveAndEdit"
import { ReactVideo } from "reactjs-media";
import Search from "../NavBar/Search"
import { Route } from "react-router-dom"
const VisaPost = ({ post, userInfo, userList, setUserAllt, HandlePage }) => {
  const dispatch = useDispatch()

  // this is create comment and image all.... here... 
  const [commentPost, setCommentPost] = useState({ comment: '', image: '' })
  const [uploadingImage, setUploadingImage] = useState(false)



  // uploading Image... 
  // POST localhost:8000/api/
  const HandleImafe = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploadingImage(true)
    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`
        }
      }
      const { data } = await axios.post(`/api/`, formData, config)
      setCommentPost({ image: data })
      setUploadingImage(false)
    } catch (error) {
      console.log(error)
      setUploadingImage(false)
    }

  }

  // Handel comment.. 
  const HandelComment = (e, id) => {
    e.preventDefault()
    dispatch(commentPost_action(id, commentPost))

    cloer()
  }


  const cloer = () => {
    setCommentPost({ image: '', comment: '' })

  }


  /*
  
                  <span className="icons_remove">

                  {userInfo ?

                    post.user._id === userInfo._id ?
                      <>
                        <i className="fas fa-trash-alt"
                          onClick={() => dispatch(DeletePost_action(post._id))}
                        ></i>
                        <i className="far fa-edit" onClick={() => setUserAllt(post._id)}></i>
                      </>
                      : null
                    : null}

                </span>
  */

  return (
    <div className="postandfriend">
      <Route render={({ history }) => <Search history={history} />} />
      {post && post.length >= 0 ? (
        post.map((post, index) => {

          return <Fragment key={index}>
            <span className="post">
              <span className="first_post_name">
                <Link className="link" to={`/profile/${post.user._id}`}>
                  <img src={post.user.image} className="post_create_name" alt="nice" />
                  <p className="name_image">{post.user.username}</p>
                  <p className="date_image">{post.createdAt.substring(0, 20)}</p>
                </Link>



                {userInfo ?
                      post.user._id === userInfo._id ?

                <span className="icons_remove">
                  <i className="fas fa-ellipsis-v"></i>

                  
                   
                    

                      <span className="xp_now">
                          <i className="fas fa-trash-alt"
                            onClick={() => dispatch(DeletePost_action(post._id))}
                          ></i>
                          <i className="far fa-edit" onClick={() => setUserAllt(post._id)}></i>
                          </span>

                       


                    
                 
                </span>

: null
: null}

              </span>


              <span className="post_text">
                <p className="text">{post.discription}</p>


                {post.video ?

                  <>
                    <div className="video">
                      <ReactVideo
                        src={post.video}
                        primaryColor="red"
                        className="video"
                        poster="https://www.example.com/poster.png"

                      />
                    </div>
                  </>
                  : null
                }








                {post.image ? (<img src={post.image} className="post_create_text" alt="helod" onClick={() => HandlePage(post.image)} />) : <div />}
              </span>

              <span className="icons_post">
                <AddLikes post={post} userInfo={userInfo} />
                <i className="fas fa-comment"><span>{post.commentus.length}</span></i>
                <i className="fas fa-share"></i>
              </span>

              <Likes post={post} userList={userList} />




              {
                post.commentus &&
                  post.commentus.length >= 0 ?
                  post.commentus.map((comment, index) => {

                    return <Fragment key={index}>
                      <span className="comment">
                        <span className="comment_user">
                          {comment.image_user ? (<img src={comment.image_user} className="comment_image" alt="comment" />) : null}
                          <p className="name_comment">{comment.name}</p>
                          <RemoveAndEdit
                            comment={comment}
                            userInfo={userInfo}
                            post={post}
                          />

                        </span>
                        <span className="comment_ver">
                          <p className="name_comment_ver">{comment.comment}</p>
                          {comment.image ? (<img src={comment.image} className="comment_image_comment" alt="comment" />) : null}
                          <p>{comment.createdAt.substring(0, 20)}</p>
                        </span>
                      </span>

                    </Fragment>


                  }) : null

              }





              {userInfo ? (
                <span className="skrive">
                  <textarea
                    className="skrive_2"
                    placeholder="message"
                    name="comment"
                    onChange={(e) => setCommentPost({ ...commentPost, comment: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' ? HandelComment(e, post._id) : null}
                    value={commentPost.comment}
                  />
                  <span className="icons">
                    <i className="fas fa-camera-retro">
                      <input
                        type="file"
                        className="file_comment"
                        name="image"
                        onChange={HandleImafe}

                      />
                      {uploadingImage && <p>Loading...</p>}
                    </i>
                  </span>
                </span>

              ) : null}





            </span>


          </Fragment>
        })
      ) : (<h1>no</h1>)}


    </div>
  )
}


export default VisaPost