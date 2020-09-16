import React, { useEffect, useState } from "react";
import "./SidebarChat.css";
import { Avatar } from "@material-ui/core";

function SidebarChat() {
  const [seed, setSeed] = useState("");

  useEffect(() => {
    Math.floor(setSeed(Math.floor(Math.random() * 5000)));
  }, []);
  return (
    <div className="sidebarChat">
      <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
      <div className="sidebarChat__info">
        <b>Room name</b>
        <p>Last message sent.</p>
      </div>
    </div>
  );
}

export default SidebarChat;
