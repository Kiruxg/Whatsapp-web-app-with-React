import React, { useState, useRef, useEffect } from "react";
import "./Chat.css";
import AttachFileIcon from "@material-ui/icons/AttachFile";
import SearchIcon from "@material-ui/icons/Search";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Avatar, IconButton } from "@material-ui/core";
import InsertEmoticonIcon from "@material-ui/icons/InsertEmoticon";
import MicIcon from "@material-ui/icons/Mic";
import Axios from "./axios";

function Chat({ messages }) {
  const chatWindow = useRef();
  const [input, setInput] = useState("");

  useEffect(() => {
    chatWindow.current.scrollTop = chatWindow.current.scrollHeight;
  }, [messages]);

  const addMessage = async (e) => {
    e.preventDefault();

    await Axios.post("/v1/messages/new", {
      name: "kiru",
      message: input,
      timestamp: new Date().toUTCString(),
      received: "false",
    });
    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
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
        {messages.map((message) => {
          return (
            <p
              key={message._id}
              className={`chat__message ${message.recieved && "chat_reciever"}`}
            >
              {message.message}
              <span className="chat__name">{message.name}</span>
              <span className="chat__timestamp">{message.timestamp}</span>
            </p>
          );
        })}
      </div>
      <div className="chat__footer">
        <InsertEmoticonIcon />
        <form action="">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder="Search or start new chat"
          />
          <button onClick={addMessage} type="submit">
            Send a message
          </button>
        </form>
        <MicIcon />
      </div>
    </div>
  );
}

export default Chat;
