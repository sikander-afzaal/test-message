import { useState } from "react";
import styles from "./App.module.css";
import Chat from "./components/Chat/Chat";

const App = () => {
  const [dummyChat, setDummyChat] = useState([
    {
      messages: ["Hello", "How are you"],
      yourMsg: true,
      profileImg: "/user.png",
    },
    {
      messages: ["I am fine", "How are you", "How is the weather there"],
      yourMsg: false,
      profileImg: "/user.png",
    },
    {
      messages: ["I am fine as well"],
      yourMsg: true,
      profileImg: "/user.png",
    },
    {
      messages: ["Hello", "How are you"],
      yourMsg: true,
      profileImg: "/user.png",
    },
    {
      messages: [
        "I am fine",
        "How are you",
        "How is the weather there",
        "How is the weather there",
      ],
      yourMsg: false,
      profileImg: "/user.png",
    },
  ]);
  const [messageInput, setMessageInput] = useState("");
  const sendMsg = (e) => {
    e.preventDefault();
    if (messageInput === "") return;
    let lastMsgSentByYou = true;
    const copyChat = [...dummyChat];
    copyChat.forEach((elem, idx) => {
      if (idx === dummyChat.length - 1) {
        if (elem.yourMsg) {
          elem.messages.push(messageInput);
        } else {
          lastMsgSentByYou = false;
        }
      }
    });
    setDummyChat((prev) => {
      if (!lastMsgSentByYou) {
        return [
          ...prev,
          { yourMsg: true, messages: [messageInput], profileImg: "/user.png" },
        ];
      } else {
        return copyChat;
      }
    });
    setMessageInput("");
  };
  return (
    <div className={styles.wrapper}>
      <div className={styles.chatComp}>
        <div className={styles.chatHeader}>
          <h2>Chat Room</h2>
          <div className={styles.statusBar}>
            <span>Live</span>
            <p>Total Online: 296 Users</p>
          </div>
        </div>
        <div className={styles.chatRoom}>
          {dummyChat.map((elem, idx) => {
            return <Chat {...elem} key={idx + new Date()} />;
          })}
        </div>
        <form onSubmit={sendMsg} className={styles.inputDiv}>
          <input
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            type="text"
          />
          <div className={styles.rightInput}>
            <button type="button" className={styles.emoji}>
              <img src="/emoji.png" alt="" />
            </button>
            <button type="submit" className={styles.send}>
              <img src="/send.png" alt="" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default App;
