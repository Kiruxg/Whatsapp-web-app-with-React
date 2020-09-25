import React, { useEffect, useRef, useState } from "react"
import "./Sidebar.css"
import AddIcon from "@material-ui/icons/Add"
import DonutLargeIcon from "@material-ui/icons/DonutLarge"
import { Avatar, IconButton } from "@material-ui/core"
import MoreVertIcon from "@material-ui/icons/MoreVert"
import SearchIcon from "@material-ui/icons/Search"
import SidebarChat from "./SidebarChat"
import { useStateValue } from "./StateProvider"
import DropdownMenu from "./DropdownMenu"
import { CSSTransition } from "react-transition-group"
import Axios from "./axios"

function Sidebar() {
  const [{ user, roomInfo }, dispatch] = useStateValue()
  const [dropdown, toggleDropdown] = useState(false)
  const [rooms, setRooms] = useState()
  const [roomName, setRoomName] = useState("")
  const [seed, setSeed] = useState("")
  const iconBtn = useRef(null)
  const dropdownClose = useRef(null)

  useEffect(() => {
    //dispatch messageContent array of each room
    async function fetchRooms() {
      try {
        const response = await Axios.get("/rooms/")
        setRooms(response.data)
        console.log("dd", response.data)
      } catch (e) {
        console.log("There was a problem.")
      }
    }
    fetchRooms()
  }, [])

  useEffect(() => {
    //Alert if clicked on outside of element
    function handleClickOutside(event) {
      if (
        dropdownClose.current &&
        !dropdownClose.current.contains(event.target) &&
        !iconBtn.current.contains(event.target)
        //check if chevron is clicked
      ) {
        toggleDropdown(false)
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [dropdownClose.current])

  const toggleMenu = () => {
    toggleDropdown(!dropdown)
  }
  const addRoom = () => {
    //db adding stuff, axios
    const roomName = prompt("Please enter a room name:")
    if (roomName) {
      // Math.floor(setSeed(Math.floor(Math.random() * 5000)))
      console.log(Math.floor(Math.random() * 5000))
      async function createRoom() {
        try {
          const response = await Axios.post("/rooms/new", {
            roomName,
            roomSeed: Math.floor(Math.random() * 5000),
            messageContents: [],
            name: user?.displayName,
            timestamp: new Date().toUTCString()
          })
          setRooms([...rooms, response.data])
          console.log("resource 201", response.data)
        } catch (e) {
          console.log("There was a problem.")
        }
      }
      createRoom()
    }
  }
  return (
    <div className="sidebar">
      <div className="sidebar__header">
        <div className="sidebar__headerLeft">
          <Avatar src={user?.photoURL} />
        </div>
        <div className="sidebar__headerRight">
          <IconButton>
            <DonutLargeIcon />
          </IconButton>
          <IconButton onClick={addRoom}>
            <AddIcon />
          </IconButton>
          <IconButton ref={iconBtn} onClick={toggleMenu}>
            <MoreVertIcon />
          </IconButton>
          <CSSTransition in={dropdown} unmountOnExit timeout={300} classNames="menu-primary">
            <>{dropdown && <DropdownMenu ref={dropdownClose}></DropdownMenu>}</>
          </CSSTransition>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <form action="">
            <input value={roomName} onChange={e => setRoomName(e.target.value)} className="inputstyling" type="text" placeholder="Search or start new room" />
            <button type="submit">Add a room</button>
          </form>
        </div>
      </div>
      <div className="sidebar__chats">
        {rooms?.map(room => (
          <SidebarChat key={room._id} id={room._id} roomName={room.roomName} roomSeed={room.roomSeed} />
        ))}
        {/* <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat /> */}
      </div>
    </div>
  )
}

export default Sidebar
