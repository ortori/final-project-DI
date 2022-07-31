import style from "./Conversation.module.css";
import { Link } from "react-router-dom";
import Button from "../UI/Form/Button";
import Input from "../UI/Form/Input";
import { useSelector, useDispatch } from "react-redux";
import {
  setMessageValue,
  sendMessage,
  getMessages,
} from "../../features/messagesSlice";
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { AiFillMessage } from "react-icons/ai";
import Loader from "../loader/Loader";

const Conversation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { messageValue, receiverUserId, messages, receiverUsername, loading } =
    useSelector((state) => state.messages);

  useEffect(() => {
    scrollRef?.current.scrollIntoView();
  }, [messages]);

  useEffect(() => {
    if (!receiverUserId) {
      navigate("/home/messages", { replace: true });
    }

    dispatch(getMessages());

    const loadMessagesInterval = setInterval(() => {
      dispatch(getMessages());
    }, 10000);

    return () => {
      clearInterval(loadMessagesInterval);
    };
  }, []);
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(sendMessage(messageValue));
    dispatch(setMessageValue(""));
  };
  return (
    <div className={style.container}>
      <div className={style["heading-container"]}></div>
      <h1 className={style["main-heading"]}>
        <AiFillMessage size="1.5em" color="#2B7A0B" /> {receiverUsername}
      </h1>
      <Link to="/home/messages" className={style.link}>
        <Button label="Go Back" width="100px" margin="0" />
      </Link>
      <div className={style["messages-container"]}>
        {loading && <Loader />}
        {messages.map((message) => {
          return (
            <div
              className={
                style[
                  `${
                    message.from_user_id === receiverUserId
                      ? "other"
                      : "current"
                  }-user-message`
                ]
              }
              key={message.messages_id}
            >
              <p>{message.message_content}</p>
              <p className={style["message-date"]}>
                {new Date(message.date).toLocaleString("he-il")}
              </p>
            </div>
          );
        })}
        <div ref={scrollRef}></div>
      </div>
      <form className={style["send-message-form"]} onSubmit={submitHandler}>
        <Input
          required
          placeholder="Search users..."
          width="90%"
          value={messageValue}
          onChange={(e) => dispatch(setMessageValue(e.target.value))}
        />
        <Button color="#BF9742" type="submit" label="SEND" width="80px" />
      </form>
    </div>
  );
};

export default Conversation;
