

import React, { useEffect, useState } from "react"
import axios from "axios"
// Import Swiper styles
import 'swiper/swiper.scss';
import { useDispatch } from 'react-redux';
import {ADD_LOGIN} from "../../redux/Action/types"


const StorImage = ({ userInfo, storyall, HandlePage ,setStoryall}) => {

    const [loadingImage, setLoadingImage] = useState(false)
    const [storyImage, setStoryImage] = useState('')


     const dispatch = useDispatch()
    // create story Image..
    useEffect(() => {
        if (userInfo) {

            if (storyImage) {
                const createStoy = async () => {
                    try {

                        const config = {
                            headers: {
                                Authorization: `Bearer ${userInfo.token}`
                            }
                        }

                    await axios.post(`/api/storyimage/`, {storyImage} , config)
                        
                       dispatch({type:ADD_LOGIN}) 
                    } catch (error) {
                        console.error(error)
                    }
                }

                createStoy()
            }

        }
    }, [userInfo, storyImage,dispatch])


    // loading Image.... 
    const HandleImage = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setLoadingImage(true)

        try {

            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post(`/api/`, formData, config)
            setStoryImage(data)
            setLoadingImage(false)
        } catch (error) {
            setLoadingImage(false)
            console.error(error)
        }

    }

    return (
        <span className="silder_Image">

            {userInfo ?

                <>
                    <span className="silder_Image_create_left">

                        <span className="silder_Image_create_left_box">
                            <img src={userInfo.image} className="silder_Image_create_input" alt={userInfo.username} />
                            <span className="silder_Image_create_icons">
                                <i className="fas fa-plus">
                                    <input
                                        type="file"
                                        className="uploadingImaf"
                                        name="image"
                                        onChange={HandleImage}
                                    />
                                    {loadingImage && <p>Loading...</p>}
                                </i>
                            </span>
                        </span>

                    </span>





                    <div className="profi_create_ringth">

                        {storyall?.map((stor, storIndex) => (



                            <span className="till_xp" key={storIndex}>

                                {stor?.storyImage.map((img) => (
                                    <img src={img} className="silder_Image_profile" alt="profi" key={img._id}
                                        onClick={() => HandlePage(img)}

                                    />
                                ))}

                                <img src={stor?.user?.image} className="silder_Image_now" alt="profi" />


                            </span>



                        ))}
                    </div>






                </>

                : null}


        </span>
    )
}


export default StorImage




/*

*/