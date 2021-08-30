import React, {useState} from 'react';
import { useParams } from 'react-router';
import messagesJSON from "../../db/chatsMessages.json";
import chatsJSON from "../../db/chats.json";
import "./chat.css";


function Chat(){
    let {id} = useParams();
    const [messages, setMessages] = useState(messagesJSON);
    const [currentMessage, setCurrentMessage] = useState("");
    const [chats, setChats] = useState(chatsJSON);
    const [changeFlag, setChangeFlag] = useState(false); //чтобы чекать, новое сообщение отправляем или изменяем существующее
    const [changedMessageId, setChangedMessageId] = useState(); 

    const title = chats.find(chat => chat.id === parseInt(id)).title;
    const chatMessages = messages.filter(message => message.chatId === parseInt(id));
    const changedMessage = messages.find(message => message.messageId === changedMessageId);

    const onInputChange = ({target}) => setCurrentMessage(target.value);

    const onEnterDown = ({code}) => {
        if(code === "Enter" && currentMessage !== "" && changeFlag === false) {
            setMessages([...messages, {"chatId": parseInt(id), "messageId": Math.random(), "author": "me", "text": currentMessage}]);
            setCurrentMessage("");
        }
            else if(code === "Enter" && currentMessage !== ""){
                        changedMessage.text = currentMessage;
                        setCurrentMessage("");
                        setChangeFlag(false);
                        setChangedMessageId();
            }
    }

    const deleteMessage = id => setMessages(messages.filter(message => message.messageId !== id));

    const changeMessage = id => {
        setChangeFlag(true);
        setChangedMessageId(id);
        setCurrentMessage(messages.find(message => message.messageId === id).text);
    }


    return  <div className="messages">
                <h1>{title}</h1>
                {chatMessages.map(chatMessage => 
                    <div className={chatMessage.author === "me" ? "message me" : "message"} key={chatMessage.messageId}>
                        <p className="message-text">{chatMessage.text}</p>
                        <span className="message-author">{chatMessage.author}</span>
                        {chatMessage.author === "me" ? <div className="message-buttons">
                                                            <span className="message-button" onClick = {() => changeMessage(chatMessage.messageId)}>Изменить</span>
                                                            <span className="message-button" onClick = {() => deleteMessage(chatMessage.messageId)}>Удалить</span>
                                                        </div> : null}

                    </div>
                )}
                <input type="text" onChange={onInputChange} onKeyDown={onEnterDown} value={currentMessage} className="input-message"/>
            </div>
}


export default Chat;