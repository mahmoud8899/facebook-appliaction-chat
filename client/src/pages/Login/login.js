import "./Login.css"
import { Link } from "react-router-dom"
import { Action_Login, FeacBookAction, oauthGoogle } from "../../redux/Action/Auth_action"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Title from "../Title/index"
import FacebookLogin from "react-facebook-login"
import GoogleLogin from "react-google-login"
import InstagramLogin from 'react-instagram-login';

const Login = ({ location, history }) => {

    const dispatch = useDispatch()

    const [postData, setPostDate] = useState({ email: '', password: '' })
    // user info.....
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo, loading, error } = userLogin

    // facbook login in .... 
    // const   FacebookID = useSelector((state)=>state.FacebookID)
    // const {success:successFacebookID} = FacebookID

    // google.... login 
    const loginGoole = useSelector((state) => state.loginGoole)
    const { success: successloginGoole } = loginGoole

    const redirect = location.search ? location.search.split('=')[1] : '/'
    useEffect(() => {

        if (userInfo) {
            history.push(redirect)
        }

        // eslint-disable-next-line
    }, [dispatch, userInfo, history, redirect, successloginGoole])


    // login in  user.... 
    const HandleLogin = (e) => {
        e.preventDefault()

        dispatch(Action_Login(postData))
        console.log(postData)

    }

    // facbook login ... 
    const responseFacebook = (req) => {

        if (
            req.accessToken === undefined ||
            req.email === undefined ||
            req.userID === undefined ||
            req.name === undefined ||
            req.picture.data.url === undefined

        ) {

            console.log('undefined')
        } else {
            console.log('token:', req.accessToken)
            console.log('email:', req.email)
            console.log('userID', req.userID)
            console.log('name:', req.name)
            console.log('image', req.picture.data.url)
            dispatch(FeacBookAction({ email: req.email, username: req.name, image: req.picture.data.url, facebookId: req.userID }))

        }
    }


    // google login ... 
    const responseGoogle = (req) => {


        if (req.profileObj === undefined ||
            req.profileObj.email === undefined
            || req.profileObj.name === undefined
            || req.profileObj.imageUrl === undefined
            || req.profileObj.googleId === undefined
        ) {
            console.log('no')
        } else {
            console.log('email', req.profileObj.email)
            console.log('name', req.profileObj.name)
            console.log('image', req.profileObj.imageUrl)
            console.log('googleId', req.profileObj.googleId)

            dispatch(oauthGoogle({ email: req.profileObj.email, username: req.profileObj.name, image: req.profileObj.imageUrl, googleId: req.profileObj.googleId }))

        }
    }


    const responseInstagram = () => {

    }



    return (
        <div className="input_login">

            {successloginGoole && <h1> okej Goole...</h1>}

            <Title title="login " description="hello" />
            <span className="first_login">
                <h1>Login</h1>
                {loading && (<h1>Loading...</h1>)}
                {error && (<h1>{error}</h1>)}
            </span>

            <form className="form" onSubmit={HandleLogin}>
                <input
                    type="email"
                    className="input_login_input"
                    placeholder="Emil enter"
                    name="email"
                    onChange={(e) => setPostDate({ ...postData, email: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' ? HandleLogin(e) : null}
                    value={postData.email}
                    required
                />
                <input
                    type="password"
                    className="input_login_input"
                    placeholder="Password.."
                    onChange={(e) => setPostDate({ ...postData, password: e.target.value })}
                    onKeyPress={(e) => e.key === 'Enter' ? HandleLogin(e) : null}
                    value={postData.password}
                    required

                />
                <button type="submit" className="button_input" >Login....</button>
                <span className="like">
                    <p><Link className="like1" to="/singup">If you do not have an account, you can register on the site</Link></p>
                </span>

                <span className="icons_google">
                    <h1>Welcome back.</h1>




                    <div className="google_link">
                        <FacebookLogin
                            appId="205793998018030"
                            autoLoad={false}
                            fields="name,email,picture"
                            callback={responseFacebook}
                            cssClass="now"
                            icon="fa-facebook"
                        />
                    </div>

                    <div className="google_link">
                        <GoogleLogin
                            clientId="835149893481-5h9ukujqrghbbghsl6g79gi8pptkbvuf.apps.googleusercontent.com"
                            buttonText="Login"
                            onSuccess={responseGoogle}
                            onFailure={responseGoogle}
                            cookiePolicy={'single_host_origin'}
                            className="now_google"
                        />
                    </div>

                    <div className="google_link">
                        <InstagramLogin
                            
                            clientId="825319138383043"
                            buttonText="Login"
                            onSuccess={responseInstagram}
                            onFailure={responseInstagram}
                            cookiePolicy={'single_host_origin'}
                            className="now_google"
                        />


                    </div>

                </span>


            </form>


        </div>
    )
}


export default Login



/*
835149893481-5h9ukujqrghbbghsl6g79gi8pptkbvuf.apps.googleusercontent.com
*/
