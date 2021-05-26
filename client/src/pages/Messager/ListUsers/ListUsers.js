
import axios from "axios"
import React, { useEffect, useState } from "react"



const ListUsers = ({ userInfo, conversation ,userOnline }) => {




    const [userChat, setUserChat] = useState([])


     //console.log('userOnline',userOnline)
   


    useEffect(() => {
        if (userInfo) {



            const nexrc = conversation.users.find((user) => user !== userInfo._id)



            const AddUserList = async () => {


                try {
                    const { data } = await axios.get(`/api/user/profile/${nexrc}/`)
                  
                    setUserChat(data)
                } catch (error) {
                    return console.error(error)
                }
            }

            AddUserList()

            //console.log('nexrc', nexrc)
            // setUserChat(nexrc)
        }

    }, [conversation, userInfo])








    return (




        <span className="list_users_ner">





            <span className="first_list_users" >
                <img src={userChat?.image} className="imaG_users" alt="" />
                <span className="list_ringt">
                    <p className="name_text">{userChat?.username}</p>
                    <p className="sistaMessage">{conversation.lastMessag}</p>
                    
                </span>

                {userOnline?.map((user)=>(
                        user.userId === userChat?._id  ? <p className="green"></p> : null
                ))}

            </span>












        </span>


    )
}


export default ListUsers


/*



    const [userChat, setUserChat] = useState([])

    console.log('x',userChat)


    useEffect(() => {
        if (userInfo) {

            const AddUserList = async () => {

                const nexrc =  await conversation?.map((conversation) => {

                    return conversation?.users?.find((user) => user !== userInfo._id)
                })

                try{
                    const {data} = await axios.get(`/api/user/profile/${nexrc}/`)
                    console.log('data',data)
                 setUserChat(data)
                }catch(error){
                    return console.error(error)
                }
            }

            AddUserList()

            //console.log('nexrc', nexrc)
           // setUserChat(nexrc)
        }

    }, [conversation, userInfo])



   <span className="first_list_users">
                        <img src={user?.image} className="imaG_users" alt="" />

                        <span className="list_ringt">
                            <p className="name_text">{user?.username}</p>
                            <p className="sistaMessage">tack </p>
                        </span>

                    </span>
*/