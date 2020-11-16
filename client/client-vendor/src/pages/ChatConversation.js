import React from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import ChatRoom from './ChatRoom';
import firebase from '../services/firebase'

const firestore = firebase.firestore

const ChatConversations = () => {
    const history = useHistory()
    const { path, url } = useRouteMatch()
    // console.log(path, url, "Mantapp")

    // const chatRef = firestore.collection('chats').doc()
    // console.log(chatRef, "chat Ref");
    
    return (
        <>
        <div className="d-flex" style={{width: "400px", height: "100%"}}>
            <div className="border" style={{width: "400px"}}>
                <h1>Conversations:  </h1>
                <hr />
                <ul>
                    <li><Link to={`${url}/testing@mail.com`}>Chat#1</Link></li>
                    <li><Link to={`${url}/testing2@mail.com`}>Chat#2</Link></li>

                </ul>
            </div>
            <div className="border">
                <Switch>
                    <Route path={`${path}/:email`} component={ChatRoom} />
                </Switch>
            </div>
        </div>
        </>
    )
}

export default ChatConversations