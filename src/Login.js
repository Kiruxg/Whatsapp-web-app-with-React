import React from "react"
import { Link, Redirect, useHistory } from "react-router-dom"
import "./Login.css"
import { Button } from "@material-ui/core"
import { auth, provider } from "./firebase"
import { useStateValue } from "./StateProvider"
import { actionTypes } from "./reducer"

function Login() {
  const [state, dispatch] = useStateValue()
  const history = useHistory()

  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then(result => {
        console.log(result)
        // dispatch({
        //   type: actionTypes.SET_USER,
        //   user: result.user
        // })
        history.push("/")
      })
      .catch(error => {
        alert(error.message)
      })
  }

  return (
    <div className="login">
      <div className="login__container">
        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1024px-WhatsApp.svg.png" alt="" />
        <h1>Sign in to WhatsApp</h1>
        <Button onClick={signIn}>Sign In with Google</Button>
      </div>
    </div>
  )
}

export default Login
