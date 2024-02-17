import React, { useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Nav from "./Nav";

function Chat() {
  const location = useLocation();
  const { state } = location;

  const navigate = useNavigate();

  const chatinput = useRef(null);
  const [userChat, setUserChat] = useState([]);
  const [user_input, setNewChat] = useState("");

  function chat() {
    let newChat = chatinput.current.value;
    const newChatuser = { user_input };
    fetch("http://127.0.0.1:8000/chat/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(newChatuser),
    })
      .then((result) => {
        return result.json();
      })
      .then((res) => {
        setUserChat((prevChat) => [...prevChat, res]);
      })
      .catch((error) => {
        setUserChat((prevChat) => [
          ...prevChat,
          "Sorry!! failed to fetch data.<Br/> Please try again later.",
        ]);
      });

    setUserChat((prevChat) => [...prevChat, newChat]);

    chatinput.current.value = null;
  }

  function logout() {
    navigate("/");
  }

  return (
    <div>
      <Nav logout={logout} />
      <div className="container-fluid">
        <div className="row chat-row">
          <div className="col-md-3">
            <span className="chat-username">Welcome {state.param}</span>
          </div>
        </div>
      </div>
      <div className="container chatbox">
        <div className="row chatbody">
          <div className="col-md-8 offset-md-2 chatbar">
            {userChat.map((message) => (
              <div
                dangerouslySetInnerHTML={{
                  __html: message.replace(/\n/g, "<br>"),
                }}
                className="chat-text"
              />
            ))}
          </div>
        </div>
        <div className="row">
          <div className="col-md-6 offset-md-2 mainchat">
            <input
              type="text"
              className="form-control input-chat"
              placeholder="type here..."
              ref={chatinput}
              onChange={(e) => {
                setNewChat(e.target.value);
              }}
            />
          </div>
          <div className="col-md-2 mainchat">
            <button
              type="button"
              className="btn chat-btn form-control"
              onClick={chat}
            >
              Chat
            </button>
          </div>
        </div>
      </div>
      <div className="container-fluid feedback">
        <div className="row">
          <div className="col-md-2 col-sm-4">
            <div className="feedbackbox">Contact</div>
          </div>
          <div className="col-md-2 offset-md-8 col-sm-4 offset-sm-3">
            <div className="feedbackbox">FeedBack</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chat;
