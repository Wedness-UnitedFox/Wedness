import React from 'react';
import firebase from '../services/firebase';
import './ChatMessage.css'

const auth = firebase.auth()


export default function ChatMessage(props) {
  const { text, user, photoURL } = props.chat;
  
  const messageClass = user['_id'] === auth.currentUser.uid ? 'sent' : 'received';
  // const messageClass = user['_id'] === 'fg4udjSXFfUoBTfNr2jWshjtRKQ2' ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={`https://ui-avatars.com/api/?name=${user['name']}`} />
      <p>{text}</p>
    </div>
  </>)
}