import React, { useEffect, useState } from "react"
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core"
import { Link, useHistory } from "react-router-dom"
import { useStateValue } from "./StateProvider"
import { actionTypes } from "./reducer"

function SidebarChat({ id, roomName, roomSeed }) {
  const [{ user, roomInfo }, dispatch] = useStateValue()
  const history = useHistory()
  const selectRoom = () => {
    if (id) {
      history.push(`/rooms/${id}`)
      dispatch({
        action: "SET_ROOM",
        value: {
          roomName,
          seed: roomSeed
        }
      })
      dispatch({ type: actionTypes.TOGGLE_CHAT })
      //toggle class
      // console.log("ohh yea", document.getElementsByClassName("chat"))
      // if (!document.getElementsByClassName("chat")[0].classList.contains("chat-toggle")) {
      //   document.getElementsByClassName("chat")[0].classList.add("chat-toggle")
      // } else {
      //   document.getElementsByClassName("chat")[0].classList.remove("chat-toggle")
      // }
    } else {
      history.push(roomName)
    }
  }
  // useEffect(() => {
  //   if (!seed) {
  //     Math.floor(setSeed(Math.floor(Math.random() * 5000)))
  //   }
  // }, [])
  return (
    // <Link to={`/rooms/${id}`} >
    <div onClick={selectRoom} className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${roomSeed}.svg`} />
      <div className="sidebarChat__info">
        <b>{roomName}</b>
        <p>{roomInfo.latestMessage}</p>
      </div>
    </div>
    // </Link>
  )
}

export default SidebarChat
