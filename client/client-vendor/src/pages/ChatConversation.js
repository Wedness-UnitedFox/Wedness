import React, { useEffect, useState } from 'react';
import { Link, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import ChatRoom from './ChatRoom';
import firebase from '../services/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';


const auth = firebase.auth() 
const firestore = firebase.firestore()

const ChatConversations = () => {
    // const history = useHistory()
    const { path, url } = useRouteMatch()
    
    const chatRef = firestore.collection('chats')
    const query = chatRef.orderBy('createdAt') 
    const [chats] = useCollectionData(query, {idField: 'id'})
    const [conversationNames, setConversationNames] = useState([])
    

    useEffect(()=> {
        console.log(chats?.length,"<<<<<<<<< CHATS");
        const newChat = chats?.filter(d => d.user.vendor === auth.currentUser.email)
        let conversations = []
        console.log("chats",chats?.length);
        if(chats){
            newChat.forEach(chat => {   
                let found = conversations.find(e => e === chat.user.customer)
                if (!found) {  
                    conversations.push(chat.user.customer)
                }
            })
            console.log(conversations) 
            setConversationNames(conversations)
        }
    }, [chats])
    
    return (
        <div className="d-flex" style={{width: "400px", height: "100%"}}>
            <div className="border" style={{width: "400px"}}>
                <h1>Conversations:  </h1>
                <hr />
                <ul> 
                    {conversationNames?.length===0? null:
                        conversationNames.map(name=>{
                           return <li><Link to={`${url}/${name}`}>{name}</Link></li>
                        }) 
                    }
                </ul>
            </div>
            <div className="border">
                <Switch>
                    <Route path={`${path}/:email`} component={ChatRoom} />
                </Switch>
            </div>
        </div>
    )
}

export default ChatConversations