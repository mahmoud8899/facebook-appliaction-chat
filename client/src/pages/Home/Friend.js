import {  useState } from "react"
import "./style.css"



const Friend = () => {


 


    const [clickm, setClickm] = useState(false)


    const HandlChat = ()=>{
        setClickm(!clickm)
    }

    return (
        <div className="rigth_user">
            <span className="chat_userid">

                <span className="chat_close">

                    <p className="chat_text_list">Chat</p>
                    <span className="chat_text_list_icons">
                        <i className="fas fa-minus" onClick={HandlChat}></i>
                        <i className="fas fa-times-circle"></i>
                    </span>

                </span>




                <span className={clickm ? "chat_List_allrr open" :"chat_List_allrr"}>

                    <span className="user_image">
                        <img src="https://img.freepik.com/free-photo/fashion-portrait-woman-with-natural-make-up_176420-7615.jpg?size=626&ext=jpg" alt="" className="chat_List_allrr_imag" />
                        <p className="chat_List_allrr_text" >Mahmoud Talat</p>
                        <span className="Oline_class"></span>
                    </span>

 

                </span>



            </span>
        </div >
    )
}


export default Friend


/*
            {
                error ? <h1>{error}</h1>
                    : loading ? <h1>Loading</h1>
                        : userList && userList.length >= 0 ?
                            userList.map((user, i) => {
                                return <Fragment key={i}>

                                    <span className="kompis">
                                       <Link to={`/profile/${user._id}`}> {user.image ? (<img src={user.image} className="firend_image" alt="nice" />) :
                                            <img src="https://manskkp.lv/assets/images/users/default-user.png" alt={user.username} className="firend_image" />
                                        }</Link>
                                        <p className="kompis_name">{user.username}</p>



                                            {userInfo && (
                                            <>

                                                {user.followers.includes(userInfo._id) ? (

                                                    <p className="foll" onClick={()=> dispatch(Unfollowersr_action({_id: user._id}))}>unfollower</p>


                                                    ) : (
                                                        <p className="foll" onClick={()=> dispatch(Follower_action({_id :user._id}))}>follower</p>
                                                    )}
                                                </>

                                            )}

                                    </span>

                                </Fragment >
                            }) : <div />
            }
*/