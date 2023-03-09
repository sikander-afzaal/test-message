import { useEffect, useRef, useState } from "react";
import styles from "./App.module.css";
import EmojiPicker from "emoji-picker-react";
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
      yourMsg: false,
      profileImg: "/user.png",
    },
    {
      messages: [
        "I am fine",
        "How are you",
        "How is the weather there",
        "How is the weather there",
      ],
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
  const [emojiPickerToggle, setEmojiPickerToggle] = useState(false);
  const [messageInput, setMessageInput] = useState("");
  const chatWrapperRef = useRef(null);
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
  useEffect(() => {
    chatWrapperRef.current.scrollTop = chatWrapperRef.current.scrollHeight;
  }, [dummyChat]);

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
        <div ref={chatWrapperRef} className={styles.chatRoom}>
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
            <div type="button" className={styles.emojiWrapper}>
              <button className={styles.emoji}>
                <img
                  onClick={() => setEmojiPickerToggle((prev) => !prev)}
                  src="/emoji.png"
                  alt=""
                />
              </button>
              <div className={styles.emojiPicker}>
                {emojiPickerToggle && (
                  <EmojiPicker
                    theme="dark"
                    width={300}
                    height={350}
                    onEmojiClick={(e) =>
                      setMessageInput((prev) => (prev += e.emoji))
                    }
                  />
                )}
              </div>
            </div>
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
