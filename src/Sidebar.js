import React, { useEffect, useRef, useState } from "react";
import "./Sidebar.css";
import ChatIcon from "@material-ui/icons/Chat";
import DonutLargeIcon from "@material-ui/icons/DonutLarge";
import { Avatar, IconButton } from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SearchIcon from "@material-ui/icons/Search";
import SidebarChat from "./SidebarChat";
import { useStateValue } from "./StateProvider";
import DropdownMenu from "./DropdownMenu";
import { CSSTransition } from "react-transition-group";
import db from "./firebase";

function Sidebar() {
  const [{ user }, dispatch] = useStateValue();
  const [dropdown, toggleDropdown] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [roomName, setRoomName] = useState([]);
  const iconBtn = useRef(null);
  const dropdownClose = useRef(null);

  useEffect(() => {
    //initially get JUST rooms????
    async function fetchRooms() {
      try {
        const response = await instance.get("/rooms/:roomId/messages/sync");
        console.log("my data", response.data);
        setRooms(response.data);
      } catch (e) {
        console.log("There was a problem.");
      }
    }
    fetchPosts();
  }, [rooms]);

  useEffect(() => {
    //Alert if clicked on outside of element
    function handleClickOutside(event) {
      if (
        dropdownClose.current &&
        !dropdownClose.current.contains(event.target) &&
        !iconBtn.current.contains(event.target)
        //check if chevron is clicked
      ) {
        toggleDropdown(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownClose.current]);

  const toggleMenu = () => {
    toggleDropdown(!dropdown);
  };
  const addRoom = () => {
    //db adding stuff, axios
    async function createRoom() {
      try {
        const response = await instance.post("/create-new-room", {
          /* 
          roomName,
  messageContents: [],

  name: firebase name,
  timestamp: String,
  received: True,
          
          */
        });
        console.log("my data", response.data);
      } catch (e) {
        console.log("There was a problem.");
      }
    }
    createRoom();
  };
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
          <IconButton>
            <ChatIcon />
          </IconButton>
          <IconButton ref={iconBtn} onClick={toggleMenu}>
            <MoreVertIcon />
          </IconButton>
          <CSSTransition
            in={dropdown}
            unmountOnExit
            timeout={300}
            classNames="menu-primary"
          >
            <>{dropdown && <DropdownMenu ref={dropdownClose}></DropdownMenu>}</>
          </CSSTransition>
        </div>
      </div>
      <div className="sidebar__search">
        <div className="sidebar__searchContainer">
          <SearchIcon />
          <form action="">
            <input
              value={roomName}
              onChange={(e) => setRoomName(e.target.value)}
              type="text"
              placeholder="Search or start new chat"
            />
            <button onClick={addRoom} type="submit">
              Add a room
            </button>
          </form>
        </div>
      </div>
      <div className="sidebar__chats">
        {/** rooms.map(room =-> (
         * room.name, last message in array
         *
         * )) */}
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
        <SidebarChat />
      </div>
    </div>
  );
}

export default Sidebar;
