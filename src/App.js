import React, { useEffect, useState } from "react"
import "./App.css"
import Sidebar from "./Sidebar"
import Chat from "./Chat"
import Login from "./Login"
import axios from "./axios.js"
import { auth } from "./firebase"
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom"
import { useStateValue } from "./StateProvider"
import { actionTypes } from "./reducer"

function App() {
  const [{ isLoggedIn }, dispatch] = useStateValue()
  // useEffect(() => {
  //   async function fetchMessages() {
  //     await axios.get("/v1/messages/sync").then((response) => {
  //       // console.log(response.data);
  //       setMessages(response.data);
  //     });
  //   }
  //   fetchMessages();
  // }, []);

  //keeps track of user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        //user is logged in
        localStorage.setItem("whatsappToken", JSON.stringify(authUser))

        dispatch({
          type: actionTypes.SET_USER,
          isLoggedIn: Boolean(localStorage.getItem("whatsappToken"))
        })
      } else {
        //user is logged out
        localStorage.removeItem("whatsappToken")
        dispatch({
          type: actionTypes.SET_USER,
          isLoggedIn: Boolean(localStorage.getItem("whatsappToken"))
        })
      }
    })
    return () => {
      unsubscribe() //detach listener
    }
  }, [dispatch])

  // if (!user) {
  //   return (
  //     <Router>
  //       <Redirect to="/login" />
  //       <Route to="/login">
  //         <Login />
  //       </Route>
  //     </Router>
  //   )
  // }
  // return (
  //   <Router>
  //     <div className="app__body">
  //       <Sidebar />
  //       <Switch>
  //         <Route path="/rooms/:roomId">
  //           <Chat />
  //         </Route>
  //         <Route exact path="/">
  //           <Chat />
  //         </Route>
  //       </Switch>
  //     </div>
  //   </Router>
  // )
  // if (!isLoggedIn) {
  //   return (
  //     <Router>
  //       <Redirect to="/login" />
  //       <Route path="/login">
  //         <Login />
  //       </Route>
  //     </Router>
  //   )
  // }
  return (
    // <div className="app">
    //   <Router>
    //     <Route path="/login" component={Login} />
    //     <PrivateRoute path="/rooms/:roomId" component={Chat} />
    //     <PrivateRoute exact path="/" component={Chat} />
    //   </Router>
    // </div>
    // <>
    //   <div className="app">
    //     <Router>
    //       <Route path="/login" component={Login} />

    //       <Switch>
    //         <PrivateRoute path="/rooms/:roomId" component={Chat} />
    //         <PrivateRoute exact path="/" component={Sidebar} />
    //       </Switch>
    //     </Router>
    //   </div>
    // </>
    // <>
    //         <Redirect to="/login" />
    //         <Route path="/login">
    //           <Login />
    //         </Route>
    //       </>
    //   <Route exact path="/">
    //   <Chat />
    // </Route>
    <div className="app">
      <Router>
        {!isLoggedIn ? (
          <Login />
        ) : (
          <>
            <div className="app__body">
              <Sidebar />
              <Switch>
                <Route path="/rooms/:roomId">
                  <Chat />
                </Route>
              </Switch>
            </div>
          </>
        )}
      </Router>
    </div>
    // <div className="app">
    //   <Router>
    //     <div className="app__body">
    //       <Route path="/">
    //         <Sidebar />
    //       </Route>
    //       <Switch>
    //         <Route path="/rooms/:roomId">
    //           <Chat />
    //         </Route>
    //       </Switch>
    //     </div>
    //   </Router>
    // </div>
  )
}

export default App
