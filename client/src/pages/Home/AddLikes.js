
import {AddLike_action} from "../../redux/Action/post_Action"
import {useDispatch} from "react-redux"
const AddLikes = ({post,userInfo}) =>{

    const dispatch = useDispatch()
return (
     <>
      {userInfo ? (  <i className="fas fa-thumbs-up"
  onClick={
    (e) => {
        if (post.likes.find((like) => like === userInfo._id)) {

          dispatch(AddLike_action({_id :post._id}))
      
          console.log('remove:', post._id)

        } else {

            
          dispatch(AddLike_action({_id :post._id}))
            console.log('add like:', post._id)
        }
    }
}><span>{post.likes.length}</span></i>) : null}
 </>
)
}


export default AddLikes