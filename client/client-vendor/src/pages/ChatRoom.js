import React, { useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import firebase from '../services/firebase';
import ChatMessage from '../components/ChatMessage';

const auth = firebase.auth()
const firestore = firebase.firestore()


const ChatRoom = () => {
    function SignIn() {
        const email = 'vendor@mail.com'
        const password = '123456'

        auth.signInWithEmailAndPassword(email, password)
        .then(() => {
            console.log('Login berhasil')
        })
        .catch(function(error) {
            // Handle Errors here.
            var errorMessage = error.message;
            var errorCode = error.code;
            console.log(errorMessage, errorCode)
            // ...
        });
    }

    let { id } = useParams()
    const dummy = useRef()
    const chatRef = firestore.collection('chats')
    const query = chatRef.orderBy('createdAt').limit(50)

    const [chats] = useCollectionData(query, {idField: 'id'})
    
    const [formChat, setFormChat] = useState('')

    const sendMessage = async (e) => {
        e.preventDefault();
    
        const { uid, photoURL, displayName } = auth.currentUser;
    
        await chatRef.add({
          text: formChat,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
          _id : Math.random().toString(36).substring(7),
          user: {
            _id: uid,
            name: displayName
          },
          user2: {

          }
        })
        setFormChat('');
        dummy.current.scrollIntoView({ behavior: 'smooth' });
    }
    
    return (
        <div style={{marginTop: "0", width: "1000px", height: "100%"}}>
            <h1 style={{textAlign: "center"}}> Chat {id} Room</h1>
            <button type="button" onClick={SignIn}>Login</button>
            <hr />
            <div className="container" style={{ width: "100%"}}>
                <div className="container" style={{height: "250px", width: "700px", overflow: "scroll"}}>
                    {chats && chats.map(chat => <ChatMessage key={chat.id} chat={chat} />)}   
                    <span ref={dummy}></span>
                </div>
                <div className="container" style={{width: "700px"}}>
                    <form className="form-inline" onSubmit={sendMessage}>
                        <div className="form-group mx-sm-2 mb-2" style={{width: "85%"}}>
                            <input type="text" className="form-control" placeholder="Type here..." value={formChat} onChange={e => setFormChat(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary mx-sm-1 mb-2" disabled={!formChat}>Send</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatRoom