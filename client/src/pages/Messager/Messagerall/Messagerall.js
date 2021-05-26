import { useEffect, useRef, useState } from "react"
import { format } from "timeago.js"
import Picker from 'emoji-picker-react';
import Peer from "simple-peer"


const Messagerall = ({ chatId,
    messagerChat, userInfo,
    imageSetImage, setImageSetImage,
    userList, mett, setMessagerChat,
    socket,
    userOnline
}) => {


    // filter User socker id...
    useEffect(() => {
        if (userInfo) {

            const nowxe = userOnline?.map((user) =>
                user.userId === userInfo._id ? user.socketId : null

            )
            setMetoo(nowxe)
            // console.log(nowxe)

        }
    }, [userInfo, userOnline])

    const [metoo, setMetoo] = useState(null)
    // console.log('metoo', metoo)


    useEffect(() => {



        if (chatId) {
            const chatUsers = chatId?.users?.map((user) => user)
            setImageSetImage(userList.filter((user) => chatUsers.includes(user._id)))
        }

    }, [chatId, setImageSetImage, userList,])






    const [click, setClick] = useState(false)

    const HandlAllt = () => {
        setClick(!click)
    }


    const setMessageInput = useRef()

    const onEmojiClick = (event, emojiObject) => {

        console.log(emojiObject.emoji)
        setMessageInput.current.value = emojiObject.emoji
    };



    const HandleMessage = async () => {
        //  console.log(setMessageInput.current.value)





        if (socket) {
            if (chatId) {
                const lastUser = chatId?.users?.find((user) => user !== userInfo._id)
                socket.emit('loadingSend', {
                    senderId: userInfo._id,
                    text: setMessageInput.current.value,
                    lastUser,
                    chatId: chatId._id
                })


                socket.on('SendMes', (savesend) => {
                    setMessagerChat([...savesend.messag, messagerChat])
                    //  console.log(savesend.messag)
                })
            }

        }



        setMessageInput.current.value = ''




    }

    const scrollUseRef = useRef()
    useEffect(() => {
        scrollUseRef.current?.scrollIntoView({ behavior: "smooth" })
        // eslint-disable-next-line
    }, [messagerChat])








    // here start calling video ..... >
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)

    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const myVideo = useRef(null)
    const userVideo = useRef()
    const connectionRef = useRef()

    useEffect(() => {

        if (chatId) {
            navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
                setStream(stream)
                myVideo.current.srcObject = stream
            })

            socket.on("callUser", (data) => {
                setReceivingCall(true)
                setCaller(data.from)
                setName(data.name)
                setCallerSignal(data.signal)
            })

        }


    }, [chatId,socket])


    const callUser = (id) => {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			socket.emit("callUser", {
				userToCall: id,
				signalData: data,
                from: metoo,
                name: userInfo.username
			})
		})
		peer.on("stream", (stream) => {
			
				userVideo.current.srcObject = stream
			
		})
		socket.on("callAccepted", (signal) => {
			setCallAccepted(true)
			peer.signal(signal)
		})

		connectionRef.current = peer
	}

	const answerCall =() =>  {
		setCallAccepted(true)
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream: stream
		})
		peer.on("signal", (data) => {
			if(socket){
                socket.emit("answerCall", { signal: data, to: caller })
            }
		})
		peer.on("stream", (stream) => {
			userVideo.current.srcObject = stream
		})

		peer.signal(callerSignal)
		connectionRef.current = peer
	}

	const leaveCall = () => {
		setCallEnded(true)
		connectionRef.current.destroy()
        window.location.reload()
	}
	




    return (

        <>
            {chatId ?

                <span className="ringth_Message">

                    {mett?.map((us, usIndex) => (
                        <span className="top_info_user" key={usIndex}>
                            <img src={us?.image} alt="" className="top_info_user_Imag" />
                            <p className="top_info_user_name">{us?.username}</p>

                            <span className="top_info_user_icons">

                                {callAccepted && !callEnded ? (
                                    <button variant="contained" color="secondary" onClick={leaveCall}>
                                        End Call
                                    </button>
                                ) : (

                                    <i className="fas fa-phone-volume" onClick={() => callUser(us?._id)} ></i>

                                )}
                            </span>




                        </span>

                    ))}




                    <span className="messagerChat">



                        {userInfo ?
                            messagerChat?.map((mess, messIndex) => (
                                <span className={mess?.sender === userInfo._id ? "chat_messager_user1" : "chat_messager_right"} key={messIndex} ref={scrollUseRef}>

                                    <span className={mess?.sender === userInfo._id ? "chat_messager_user1_x" : "chat_messager_user1_right"} >
                                        {imageSetImage?.map((user) => (

                                            mess?.sender === user?._id ?
                                                <img src={user?.image} alt="ds"
                                                    className={mess?.sender === userInfo._id ? "image_user1" : "image_user1_right"}

                                                />

                                                : null

                                        ))}

                                        <p className={mess?.sender === userInfo._id ? "chat_messager_user1_x_left" : "chat_messager_user1_right_right"}>{mess?.text}</p>

                                    </span>

                                    <span className={mess?.sender === userInfo._id ? "timex" : "timex_right"}>{format(mess?.date)}</span>

                                </span>

                            ))

                            : null}


                        <div className="video">
                            {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "300px" }} />}
                        </div>

                        <div className="video">
                            {callAccepted && !callEnded ?
                                <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> :
                                null}
                        </div>

                        {receivingCall && !callAccepted ? (
                            <div className="caller">
                                <h1 >{name} is calling...</h1>
                                <button variant="contained" color="primary" onClick={answerCall}>
                                    Answer
						</button>
                            </div>
                        ) : null}


                    </span>






                    <span className="sista_skrive_input">
                        <span className="icons_skriv">
                            <i className="fas fa-hand-point-right" onClick={HandlAllt}></i>


                        </span>
                        <span className="inpit_skriv">


                            <input
                                className="inpit_skriv_first"
                                placeholder="Aa"
                                ref={setMessageInput}
                                onKeyPress={e => e.key === 'Enter' ? HandleMessage(e) : null}


                            />





                        </span>

                        <span className="icons_skriv_heat">
                            <i className="fas fa-heart" onClick={HandlAllt}></i>
                        </span>

                    </span>
                    <span className={click ? "iconsAllt open" : "iconsAllt"}>

                        <Picker onEmojiClick={onEmojiClick} className="xxxxxxxxxxxxxx" />
                    </span>



                </span>



                : <h1 className="notChat">not new...</h1>}




        </>


    )
}



export default Messagerall

/*

*/
