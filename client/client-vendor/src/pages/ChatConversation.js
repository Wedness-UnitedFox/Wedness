import React from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import ChatRoom from './ChatRoom';


const ChatConversations = () => {
    const history = useHistory()
    let { path, url } = useRouteMatch()
    
    return (
        <>
        <div className="d-flex" style={{width: "400px", height: "400px"}}>
            <div className="border" style={{width: "400px"}}>
                <h1>Conversations:  </h1>
                <hr />
                <ul>
                    <li><Link to={`${url}/1`}>Chat#1</Link></li>
                    <li><Link to={`${url}/2`}>Chat#2</Link></li>
                    <li><Link to={`${url}/3`}>Chat#3</Link></li>
                    <li><Link to={`${url}/4`}>Chat#4</Link></li>
                </ul>
            </div>
            <div className="border">
                <Switch>
                    <Route path={`${path}/:id`}><ChatRoom/></Route>
                </Switch>
            </div>
        </div>
        </>
    )
}

export default ChatConversations