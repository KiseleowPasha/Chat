import React from "react";
import { HashRouter as Router } from "react-router-dom";
import Chats from "./components/chats/chats";

function App(){
    return  <Router>
                <Chats/>
            </Router>
}

export default App;