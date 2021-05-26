import { comment_delete_action, } from "../../redux/Action/post_Action"
import { useDispatch } from "react-redux"
import "./style.css"

const RemoveAndEdit = ({ comment, userInfo, post }) => {

const dispatch = useDispatch()

    return (
        <>
            {userInfo ? comment.user === userInfo._id ?
                <>
                    <i className="fas fa-trash-alt" onClick={() =>
                        dispatch(comment_delete_action(post._id, comment._id))

                    }></i>
                    <i className="far fa-edit" onClick={()=> console.log(comment._id, post._id)}></i>
                </>
                : null : null}


                <div className="update_comment">

                    
                </div>

        </>



    )
}

export default RemoveAndEdit