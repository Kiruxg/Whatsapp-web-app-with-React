import React, { useEffect, useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import Login from "./Login";
import Pusher from "pusher-js";
import axios from "./axios.js";
import { auth } from "./firebase";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";

function App() {
  const [state, dispatch] = useStateValue();
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    async function fetchMessages() {
      await axios.get("/v1/messages/sync").then((response) => {
        // console.log(response.data);
        setMessages(response.data);
      });
    }
    fetchMessages();
  }, []);
  useEffect(() => {
    var pusher = new Pusher("9c1476dabbd8085397d7", {
      cluster: "us3",
    });
    //event listener
    var channel = pusher.subscribe("messages");
    channel.bind("inserted", (newMessage) => {
      setMessages([...messages, newMessage]); //append to previous messages
      // console.log(messages);
    });
    //unsubscribe listener after every network call
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  //keeps track of user
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        //user is logged in
        dispatch({
          type: actionTypes.SET_USER,
          user: authUser,
        });
      } else {
        //user is logged out
        dispatch({
          type: "SET_USER",
          user: null,
        });
      }
    });
    return () => {
      unsubscribe(); //detach listener
    };
  }, [dispatch]);
  return (
    <div className="app">
      <Router>
        {!state.user ? (
          <Route exact path="/login">
            <Login />
          </Route>
        ) : (
          <div className="app__body">
            <Route exact path="/">
              <Sidebar />
              <Chat messages={messages} />
            </Route>
          </div>
        )}
      </Router>
    </div>
  );
}

export default App;
