
import "./index.css"
import { Fragment, useState } from "react"
import axios from "axios"
import { commentPost_action, comment_delete_action, DeletePost_action, CreatePost_action } from "../../redux/Action/post_Action"
import { useDispatch } from "react-redux"
import Likes from "../Home/Likes"
import AddLikes from "../Home/AddLikes"
import { ReactVideo } from "reactjs-media";
const CreatePost = ({ userInfo, OnlyUser, userList }) => {

    const dispatch = useDispatch()
    const [discription, setDiscription] = useState()
    const [comment, setComment] = useState()
    const [image, setImage] = useState('')
    const [uploadingImage, setUploadingImage] = useState(false)




    // Handle create Post.. 
    const HandleCreatePost = e => {
        e.preventDefault()
        dispatch(CreatePost_action({ discription, image }))
        // console.log(discription,image)
        setDiscription('')
    }



    // handleimage upload...
    const HandleUploading = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        setUploadingImage(true)
        formData.append('image', file)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post(`/api/`, formData, config)
            setImage(data)
            setUploadingImage(false)
        } catch (error) {
            console.error(error)
            setUploadingImage(false)
        }
    }


    // Handl comment... 
    const HandlComment = (e, id) => {
        e.preventDefault()
        // console.log(comment, image, id)
        dispatch(commentPost_action({ _id: id, image, comment }))
        if (setComment.length >= 0) {
            setComment('')
        }

    }


    return (
        <span className="input_create_post_profile">


            <span className="first_input_post">

                {userInfo ? (
                    <>
                        <form onSubmit={HandleCreatePost}>
                            <textarea
                                className="input_create_post_profile_input"
                                placeholder="create Post"
                                name="discription"
                                onChange={(e) => setDiscription(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' ? HandleCreatePost(e) : null}

                            />
                            <img src={userInfo.image} className="input_create_post_profile_image" alt="nice" />
                            <span className="input_create_post_profile_icons">
                                <i className="fas fa-camera-retro">
                                    <input
                                        type="file"
                                        className="uplod_file_post"
                                        onChange={HandleUploading}
                                        name="image"
                                    />
                                </i>
                                <i className="fas fa-video"></i>
                            </span>
                        </form>

                    </>
                ) :
                    null
                }
            </span>



            <div className="postandfriend_profile">
                {OnlyUser && OnlyUser.length >= 0 ?

                    OnlyUser.map((post, index) => {
                        return <Fragment key={index}>
                            <span className="post_profile">
                                <span className="first_post_name">
                                    <img src={post.user.image} className="post_create_name" alt="nice" />
                                    <p className="name">{post.user.username}</p>
                                    <p className="date">{post.createdAt.substring(0, 10)}</p>
                                    {userInfo ?

                                        post.user._id === userInfo._id ?
                                            <>
                                                <i className="fas fa-trash-alt"
                                                    onClick={() => dispatch(DeletePost_action(post._id))}
                                                ></i>
                                                <i className="far fa-edit"></i>
                                            </>
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

                                    {post.image ? (<img src={post.image} className="post_create_text" alt="nice" />) : null}
                                </span>

                                <span className="icons_post">
                                    <AddLikes post={post} userInfo={userInfo} />
                                    <i className="fas fa-comment">{post.commentus.length}</i>
                                    <i className="fas fa-share"></i>
                                </span>

                                <Likes userList={userList} post={post} />

                                {
                                    post.commentus &&
                                        post.commentus.length >= 0 ?
                                        post.commentus.map((comment, index) => {
                                            return <Fragment key={index}>
                                                <span className="comment">

                                                    <span className="comment_user">
                                                        <img src={comment.image_user} className="comment_image" alt="comment" />
                                                        <p className="name_comment">{comment.name}</p>
                                                        <p className="comment_data">{comment.createdAt.substring(0, 10)}</p>
                                                    </span>

                                                    {userInfo ?
                                                        comment.user === userInfo._id ?
                                                            <span className="remove_icons">
                                                                <i className="fas fa-trash-alt" onClick={() => dispatch(comment_delete_action(post._id, comment._id))}></i>
                                                                <i className="far fa-edit"></i>
                                                            </span>
                                                            :
                                                            null
                                                        : null}

                                                    <span className="comment_ver">
                                                        <p className="name_comment_ver">{comment.comment}</p>
                                                        {comment.image ? (<img src={comment.image} className="comment_image_comment" alt="comment" />) : null}

                                                    </span>
                                                </span>
                                            </Fragment>
                                        }) : null
                                }



                                {userInfo ? (
                                    <form onSubmit={HandlComment}>
                                        <span className="skrive">
                                            <textarea
                                                className="skrive_2"
                                                placeholder="message"
                                                name="comment"
                                                onChange={(e) => setComment(e.target.value)}
                                                onKeyPress={(e) => e.key === 'Enter' ? HandlComment(e, post._id) : null}

                                            />
                                            <span className="icons">
                                                <i className="fas fa-camera-retro">
                                                    <input
                                                        type="file"
                                                        className="fileUploading"
                                                        onChange={HandleUploading}
                                                        name="image"
                                                    />
                                                    {uploadingImage && <h1>Uploading...</h1>}
                                                </i>
                                            </span>
                                        </span>
                                    </form>
                                ) : null}

                            </span>
                        </Fragment>
                    })


                    : (<h1>no</h1>)}




            </div>

        </span>
    )

}


export default CreatePost