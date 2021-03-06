import React, { useEffect, useState } from "react"
import "./SidebarChat.css"
import { Avatar } from "@material-ui/core"
import { Link, useHistory, useParams } from "react-router-dom"
import { useStateValue } from "./StateProvider"
import { actionTypes } from "./reducer"

function SidebarChat({ id, roomName, roomSeed, lastMessage }) {
  const [{ user, roomInfo }, dispatch] = useStateValue()
  const history = useHistory()
  const { roomId } = useParams()

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
    } else {
      history.push(roomName)
    }
  }
  // useEffect(() => {
  //   if (!seed) {
  //     Math.floor(setSeed(Math.floor(Math.random() * 5000)))
  //   }
  // }, [])
  const truncate = input => (input?.length > 25 ? `${input.substring(0, 25)}...` : input)
  return (
    // <Link to={`/rooms/${id}`} >
    <div onClick={selectRoom} className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${roomSeed}.svg`} />
      <div className="sidebarChat__info">
        <b>{roomName}</b>
        <p>{id === roomInfo.id && roomInfo.latestMessage ? truncate(roomInfo.latestMessage) : truncate(lastMessage)}</p>
      </div>
    </div>
    // </Link>
  )
}

export default SidebarChat
