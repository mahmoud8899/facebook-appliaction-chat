import React, { Fragment } from "react"
import "./style.css"
const Likes = ({ userList, post }) => {



  return (
    <span className="hen">


      {userList?.map((user) =>
        post?.likes?.map((like) => (
          like === user?._id ?
            <Fragment key={like}>
              <div className="like_first" key={user._id}>

                {user.image ?
                  (<img src={user?.image} className="image_like" alt={user?.username} />)
                  : <img src="https://manskkp.lv/assets/images/users/default-user.png" className="image_like" alt={user?.username} />
                }
                <p className="like_1" >{user.username}</p>

              </div>
            </Fragment>
            : null
        ))
      )}



    </span>
  )
}


export default Likes
