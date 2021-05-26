import ListUsers from "./ListUsers/ListUsers"
import "./Messager.css"
import Messagerall from "./Messagerall/Messagerall"
import { useSelector, useDispatch } from "react-redux"
import React, { useEffect, useState } from "react"
import axios from "axios"
import { userList_action } from "../../redux/Action/Auth_action"

import io from "socket.io-client"

const socket = io.connect('http://localhost:4000/')

const Messager = () => {
    // user info ..
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    // Online Users. > > > . <
    const [userOnline, setUserOnline] = useState([])
    //   console.log('online here Only...', userOnline )

    const [sistaUpdate, setSistaUpdate] = useState(null)
    //console.log('sistaUpdate',sistaUpdate)


    const [conversation, setConversation] = useState([])
    // console.log('conversation', conversation)
    const [chatId, setChatId] = useState(null)
    const [messagerChat, setMessagerChat] = useState([])


    useEffect(() => {
        if (userInfo) {
            if (socket) {

                console.log('Success Socket from Client... ')

                socket.emit('join', (userInfo._id))

                socket.on('getUser', users => {
                    setUserOnline(users)
                })
            }

            if (socket) {

                socket.on('LastMess', (data) => {
                    setSistaUpdate({
                        sender: data.senderId,
                        text: data.text,
                        date: Date.now()
                    })
                })
            }





        }
    }, [userInfo])




    useEffect(() => {

        sistaUpdate && chatId?.users?.includes(sistaUpdate.sender) &&
            setMessagerChat(prev => [...prev, sistaUpdate])

    }, [sistaUpdate, chatId])



    // userList 
    const listUsers = useSelector((state) => state.listUsers)
    const { userList } = listUsers
    // console.log('listUsers',userList)

    const dispatch = useDispatch()


    // dispatch userlist... 
    useEffect(() => {

        dispatch(userList_action())

    }, [dispatch])




    // console.log('messagerChat',messagerChat)
    // userList ..... 
    useEffect(() => {
        if (userInfo) {

            const Conversation = async () => {
                try {
                    const { data } = await axios.get(`/chat/chat/user/${userInfo._id}`)
                    setConversation(data)

                } catch (error) {

                    return console.error(error)
                }
            }
            Conversation()



        }
    }, [userInfo])







    // here Message from user... 
    useEffect(() => {
        if (userInfo) {
            const showMessage = async () => {
                try {
                    const { data } = await axios.get(`/chat/chat/${chatId._id}`)
                    setMessagerChat(data.messag)
                    // console.log('d',data)
                } catch (error) {
                    return console.error(error)
                }
            }

            showMessage()

        }
    }, [userInfo, chatId])





    // users list Image.. 
    const [imageSetImage, setImageSetImage] = useState([])
    const [mett, setMett] = useState('')
    // console.log('mett', mett)

    useEffect(() => {
        if (userInfo) {
            const newtoo = imageSetImage.filter((user) => user._id !== userInfo._id)
            setMett(newtoo)
        }
    }, [userInfo, imageSetImage])










    return (

        <span className="Home_messager">



            <span className="lefte_list_Users">


                <span className="first_navbar_calling">
                    <p>chat</p>
                    <span className="first_navbar_cicons">
                        <p className="list_icons">
                            <i className="fas fa-ellipsis-h"></i>
                        </p>
                        <p className="list_icons">
                            <i className="fas fa-video"></i>
                        </p>

                        <p className="list_icons">
                            <i className="far fa-edit"></i>
                        </p>



                    </span>
                </span>

                <span className="search_list">
                    <input className="search_list_Search" placeholder="Search Messenger" />
                    <i className="fas fa-search"></i>
                </span>


                {conversation?.map((conversation) => (
                    <span onClick={() => setChatId(conversation)}>
                        <ListUsers
                            conversation={conversation}
                            userInfo={userInfo}
                            userOnline={userOnline}

                        />


                    </span>

                ))}



            </span>









            <Messagerall
                chatId={chatId}
                messagerChat={messagerChat}
                userInfo={userInfo}
                imageSetImage={imageSetImage}
                setImageSetImage={setImageSetImage}
                userList={userList}
                mett={mett}
                setMessagerChat={setMessagerChat}
                socket={socket}
                userOnline={userOnline}
            />




        </span>

    )
}


export default Messager