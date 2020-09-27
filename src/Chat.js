import React, { useState, useRef, useEffect } from "react"
import "./Chat.css"
import AttachFileIcon from "@material-ui/icons/AttachFile"
import SearchIcon from "@material-ui/icons/Search"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import { Avatar, IconButton } from "@material-ui/core"
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon"
import MicIcon from "@material-ui/icons/Mic"
import Axios from "./axios"
import Pusher from "pusher-js"
import { useParams } from "react-router-dom"
import { useStateValue } from "./StateProvider"
import { actionTypes } from "./reducer"
import { CSSTransition } from "react-transition-group"
import useWindowDimensions from "./WindowSize"
import ArrowBackIcon from "@material-ui/icons/ArrowBack"

function Chat() {
  const [{ user, roomInfo, toggleChat }, dispatch] = useStateValue()
  const { height, width } = useWindowDimensions()
  const chatWindow = useRef()
  const [messages, setMessages] = useState([])
  const [seed, setSeed] = useState()
  const [roomName, setRoomName] = useState()
  const [input, setInput] = useState("")
  const { roomId } = useParams()

  useEffect(() => {
    if (roomId) {
      //get messageContents in specific doc of collection rooms
      function fetchMessage() {
        Axios.get(`/rooms/${roomId}/messages`).then(response => {
          setMessages(response.data[0].messageContents)
          setSeed(response.data[0].roomSeed)
          setRoomName(response.data[0].roomName)
        })
      }
      fetchMessage()
    }
  }, [roomId])

  useEffect(() => {
    var pusher = new Pusher("9c1476dabbd8085397d7", {
      cluster: "us3"
    })
    //event listener
    var channel = pusher.subscribe("messages")
    channel.bind("inserted", newMessage => {
      console.log("the new message:: ", newMessage)
      // setMessages(messages.push(newMessage))
      if (newMessage.roomId === roomId) {
        setMessages([...messages, newMessage])
        dispatch({
          type: actionTypes.SET_MESSAGE,
          message: newMessage.message
        })
      }
      //append to previous messages
      // console.log(messages);
    })
    //unsubscribe listener after every network call
    return () => {
      channel.unbind_all()
      channel.unsubscribe()
    }
  }, [messages])

  const addMessage = async e => {
    e.preventDefault()
    await Axios.post(`/rooms/${roomId}/messages/new`, {
      name: user.displayName,
      message: input,
      timestamp: new Date().toUTCString(),
      received: false,
      userId: user.uid,
      roomId: roomId
    })
    setInput("")
  }

  useEffect(() => {
    chatWindow.current.scrollTop = chatWindow.current.scrollHeight
  }, [messages])

  return (
    <CSSTransition in={width <= 1000 && toggleChat} timeout={1000} classNames="fade">
      <div className="chat">
        <div className="chat__header">
          {width <= 1000 && toggleChat && (
            <IconButton onClick={() => dispatch({ type: actionTypes.TOGGLE_CHAT })}>
              <ArrowBackIcon />
            </IconButton>
          )}
          {seed ? <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> : <Avatar style={{ visibility: "hidden" }} />}
          {/* <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} /> */}
          <div className="chat__headerInfo">
            <h3>{roomName}</h3>
            <p>last seen {messages[messages.length - 1]?.timestamp || "..."}</p>
          </div>
          <div className="chat__headerRight">
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <AttachFileIcon />
            </IconButton>
            <IconButton>
              <MoreVertIcon />
            </IconButton>
          </div>
        </div>
        <div ref={chatWindow} className="chat__body">
          <div className="chat__bodyContents">
            {messages?.map((message, key) => {
              return (
                <p key={key} className={`chat__message ${message.userId === user.uid && "chat__reciever"}`}>
                  {message.message}
                  <span className="chat__name">{message.name}</span>
                  <span className="chat__timestamp">{message.timestamp}</span>
                </p>
              )
            })}
          </div>
        </div>
        <div className="chat__footer">
          <InsertEmoticonIcon />
          <form action="">
            <input value={input} onChange={e => setInput(e.target.value)} className="inputstyling" type="text" placeholder="Search or start new chat" />
            <button onClick={addMessage} type="submit">
              Send a message
            </button>
          </form>
          <MicIcon />
        </div>
      </div>
    </CSSTransition>
  )
}

export default Chat
