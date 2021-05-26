import { useEffect, useState } from "react"
import "./style.css"
import {CreatePost_action ,PostUpdate_action } from "../../redux/Action/post_Action"
import {useDispatch} from "react-redux"
import axios from "axios"
import {Link} from "react-router-dom"
const CreatePost = ({ userInfo ,succes , userAllt, setUserAllt, post }) => {

   const [postData , setPostData] = useState({image :'', video: '', discription: ''})

   const data =  userAllt ? post.find((message)=> message._id === userAllt) : null

   const dispatch = useDispatch()


   useEffect(()=>{

    if(data) setPostData(data)
    else setPostData({image :'', video: '', discription: ''})
   },[data])




   const [uploading, setUploading] = useState(false)
   const HandleIamge = async (e) =>{
     const file = e.target.files[0]
     const formData = new FormData()
     formData.append('image', file)
     setUploading(true)

     try{

      const config = {
        headers : {
          'Content-Type': 'multipart/form-data',
          Authorization : `Bearer ${userInfo.token}`
        }
      }
      const {data} = await axios.post(`/api/`, formData, config)
      setPostData({image : data})
      setUploading(false)
     }catch(error){
      setUploading(false)
      console.error(error)
     }
   }
   


 //  video...
   const HandleVideo = async (e) =>{
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try{

     const config = {
       headers : {
         'Content-Type': 'multipart/form-data',
         Authorization : `Bearer ${userInfo.token}`
       }
     }
     const {data} = await axios.post(`/api/`, formData, config)
     setPostData({video :data})
     setUploading(false)
    }catch(error){
     setUploading(false)
     console.error(error)
    }
  }

   //create Post..
   const HandlePost = e =>{
     e.preventDefault()

     if(userAllt)
     {
      
       dispatch(PostUpdate_action(userAllt, postData))
     }else{
      dispatch(CreatePost_action(postData))
     }

     
     clear()
   }


   const clear = () => {
    setUserAllt(0)
    setPostData({image :'', video: '', discription: ''})
    }

  return (
    <div className="Home">
      {succes && (<h1>Upade...</h1>)}
     
      <div className="rigth">
        <span className="icons_bar">
         <Link to="/message/"> <i className="fab fa-facebook-messenger"></i></Link>
          <i className="fas fa-user-cog"></i>
        </span>
      </div>


      <div className="left">
        {userInfo ? (
          <span className="input">
            <textarea 
            className="input_create"
             placeholder="create Post" 
             onChange={(e)=> setPostData({...postData, discription : e.target.value})}
             onKeyPress={(e)=> e.key === 'Enter' ? HandlePost(e): null}
             name="discription"
             value={postData.discription}
             />
            <img src={userInfo.image} className="image_input" alt={userInfo.username} />
            <span className="icons_input">
              <i className="fas fa-camera-retro">
                <input 
                type="file" 
                className="file_upload_post_first" 
                name="image"
                 onChange={HandleIamge}
                 
                 />
                 {uploading && (<h1>Loading...</h1>)}
              </i>
              <i className="fas fa-video">
                <input 
                type="file"
                 onChange={HandleVideo}
                 className="file_upload_post_first" 
                 name="image"
                 />
                {uploading && (<h1>Loading...</h1>)}
              </i>
            </span>
          </span>
        ) : null}
      </div>
    </div>

  )
}


export default CreatePost