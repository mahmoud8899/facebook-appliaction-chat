import "./index.css"
import { Fragment, useEffect, useState } from "react"
import {
    Adress_action,
    Unfollowersr_action,
    Follower_action,

} from "../../redux/Action/Auth_action"
import { useDispatch } from "react-redux"
import { ADD_IMAGE, ADD_LOADING, ADD_IMAGE_FAIL } from "../../redux/Action/types"
import axios from "axios"
import { Link } from "react-router-dom"
import Title from "../Title/index"
const Follow = ({ userid, success, dmatchId, userInfo, userList }) => {

    const [close, setColse] = useState(false)
    const dispatch = useDispatch()
    const [followare, setFolloware] = useState([])
    const [followingList, setFollowingList] = useState([])
    // console.log('followingList',followingList)
    // console.log('w', followare)
    const [error, setError] = useState()



    const [postData, setPostData] = useState({ city: '', land: '', work: '', description: '' })
    const [uploading, setUploading] = useState(false)
    // close ...
    const HandleClose = () => {

        setColse(!close)
    }



    // uploading ... image from user.....
    const Handleuploading = async e => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            dispatch({ type: ADD_LOADING })
            axios.post(`/api/user/loading/${dmatchId}/`, formData, config)
            dispatch({ type: ADD_IMAGE })
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
            dispatch({ type: ADD_IMAGE_FAIL })
        }
    }



    const HandleAdress = e => {
        e.preventDefault()
        console.log(postData)
        dispatch(Adress_action(dmatchId, postData))
    }



    // followare List.... 
    useEffect(() => {


        const followare = async () => {

            try {
                const { data } = await axios.get(`/api/user/friend/${dmatchId}/`)
                setFolloware(data)
            } catch (error) {

                setError(error.response.data.message)
            }
        }

        followare()
        // eslint-disable-next-line
    }, [])


    // followaing... 
    //localhost:4000/api/user/followingList/60802d049fc6dc2440277d9f
    useEffect(() => {


        const followingList = async () => {

            try {
                const { data } = await axios.get(`/api/user/followingList/${dmatchId}/`)
                setFollowingList(data)
            } catch (error) {

                setError(error.response.data.message)
            }
        }

        followingList()

        // eslint-disable-next-line
    }, [])



    return (

        <>
            {error && <h1>{error}</h1>}
            <span className="follew">
                <Title title={userid.username} />
                <span className="profile_image" >


                    <span className="photo">
                        <span className="image_prive">
                            {
                                userid.image ?
                                    (<img src={userid.image} className="profile_photo" alt={userid.username} />)
                                    :
                                    <img src="https://manskkp.lv/assets/images/users/default-user.png" className="profile_photo" alt="nice" />
                            }




                            {userInfo ?

                                userid._id === userInfo._id ? (<>
                                    <i className="fas fa-camera-retro uploading"></i>
                                    <input type="file" className="file_upload" onChange={Handleuploading} /></>) : <div />

                                : null}

                            {uploading && (<p>Loading...</p>)}







                        </span>
                        <span className="name_profile_foll">
                            <h1 className="name_profile_my">{userid.username}</h1>


                            {userInfo ?
                                userid.followers.includes(userInfo._id)
                                    ? (<p className="followers_Aadd_text" onClick={() => dispatch(Unfollowersr_action({ _id: userid._id }))}  >UnFolloware</p>)
                                    : (<p className="followers_Aadd_text" onClick={() => dispatch(Follower_action({ _id: userid._id }))}  >Followare</p>)
                                : null
                            }

                        </span>
                    </span>


                    {userid.adress ? (
                        <span className="adress">
                            <span className="adress_box">
                                <p className="adress_1">Ctiy : <p>{userid.adress.city}</p></p>
                                <p className="adress_1">Land :  <p>{userid.adress.description}</p></p>
                                <p className="adress_1">Work :  <p>{userid.adress.land}</p></p>
                                <p className="adress_1">discription :  <p>{userid.adress.work}</p></p>










                            </span>
                        </span>
                    ) : null}
                    {userInfo ? userInfo._id === userid._id ? (<> <button type="submit" className="edit_adress" onClick={HandleClose}  >Edit</button></>) : (<div />) : null}


                </span>

                <span className="followers_first">

                    <p>followers</p>

                    {followare.map((follow, followIndex) => (
                        <Fragment key={followIndex}>
                            <div className="like_first">

                                <Link to={`/profile/${follow._id}`}>
                                    {follow?.image ?
                                        (<img src={follow?.image} className="image_like" alt={follow?.username} />)
                                        : <img src="https://manskkp.lv/assets/images/users/default-user.png" className="image_like" alt={follow?.username} />
                                    }
                                </Link>
                                <p className="like_1" >{follow?.username}: ddd</p>

                            </div>
                        </Fragment>
                    ))}

                </span>


                <span className="followers_first">
                    <p>following   </p>

                    {followingList.map((follow, followIndex) => (
                        <Fragment key={followIndex}>
                            <div className="like_first">

                                <Link to={`/profile/${follow._id}`}>
                                    {follow?.image ?
                                        (<img src={follow?.image} className="image_like" alt={follow?.username} />)
                                        : <img src="https://manskkp.lv/assets/images/users/default-user.png" className="image_like" alt={follow?.username} />
                                    }
                                </Link>
                                <p className="like_1" >{follow?.username}: ddd</p>

                            </div>
                        </Fragment>
                    ))}

                </span>


            </span>

            <span className={close ? "edit open" : "edit"}>

                <span className="edit_clos">
                    <p className="edit_text">Edit</p>

                    <p className="clos" onClick={HandleClose}>close x </p>

                </span>

                {success && (<p>Update Your Adress...</p>)}

                <form className="form_edit" onSubmit={HandleAdress}>
                    <input
                        className="input_edit"
                        type="text"
                        placeholder="Ctiy"
                        name="city"
                        onChange={(e) => setPostData({ ...postData, city: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' ? HandleAdress(e) : null}
                        value={postData.city}

                    />
                    <input
                        className="input_edit"
                        type="text"
                        placeholder="Land"
                        name="land"
                        onChange={(e) => setPostData({ ...postData, land: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' ? HandleAdress(e) : null}
                        value={postData.land}
                    />
                    <input
                        className="input_edit"
                        type="text"
                        placeholder="Work"
                        name="work"
                        onChange={(e) => setPostData({ ...postData, work: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' ? HandleAdress(e) : null}
                        value={postData.work}
                    />
                    <textarea
                        className="input_edit"
                        type="text"
                        placeholder="discription"
                        name="description"
                        onChange={(e) => setPostData({ ...postData, description: e.target.value })}
                        onKeyPress={(e) => e.key === 'Enter' ? HandleAdress(e) : null}
                        value={postData.description}
                    />
                    <button type="submit" className="button_submit">Edit</button>
                </form>

            </span>




        </>
    )
}


export default Follow

/*
                    {userList.length >= 0 ? userList.map((user, index) => {
                        for (let i = 0; i < userid.followers.length; i++) {
                            if (userid.followers[i] === user._id) {
                                return <Fragment key={index} >
                                    <div className="like_first">

                                       <Link to={`/profile/${user._id}`}>
                                       {user.image ?
                                            (<img src={user.image} className="image_like" alt={user.username} />)
                                            : <img src="https://manskkp.lv/assets/images/users/default-user.png" className="image_like" alt={user.username} />
                                        }
                                       </Link>
                                        <p className="like_1" >{user.username}: ddd</p>

                                    </div>

                                </Fragment>
                            }
                        }

                    }) : null}


                    {userList.length >= 0 ? userList.map((user, index) => {
                        for (let i = 0; i < userid.following.length; i++) {
                            if (userid.following[i] === user._id) {
                                return <Fragment key={index} >
                                    <div className="like_first">

                                    <Link to={`/profile/${user._id}`}>
                                    {user.image ?
                                            (<img src={user.image} className="image_like" alt={user.username} />)
                                            : <img src="https://manskkp.lv/assets/images/users/default-user.png" className="image_like" alt={user.username} />
                                        }


                                    </Link>
                                    <p className="like_1" >{user.username}</p>

                                    </div>

                                </Fragment>
                            }
                        }

                    }) : null}


*/