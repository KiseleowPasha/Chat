import React, { useState } from "react";
import chatsJSON from "../../db/chats.json";
import Chat from "../chat/chat";
import {  Switch, Route, Link} from "react-router-dom"
import "./chats.css";
function Chats(){
    const [chats, setChats] = useState(chatsJSON);

    return  <div className="chats">
                <div className="select-chat">
                    {chats.map(chat => <Link key={chat.id} to={`/chats/${chat.id}`}>{chat.title}</Link>)}
                </div>
                <div className="chat">
                    <Switch>
                        <Route path="/chats/:id">
                            <Chat/>
                        </Route>
                    </Switch>
                </div>
            </div> 
    
}

export default Chats