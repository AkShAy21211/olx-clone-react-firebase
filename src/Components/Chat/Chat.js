import React, { useState, useEffect } from 'react';
import { useParams,Link } from 'react-router-dom';
import { addDoc, collection, onSnapshot, serverTimestamp, where, query, orderBy } from "firebase/firestore";
import './Chat.css'; // Import your CSS file
import { auth, db } from '../../firebase/config,';

const Chat = () => {
  const { userId, postId } = useParams();
  const buyerId = localStorage.userId;
  const [messages, setMessages] = useState('');
  const [prevMessages, setPrevMessages] = useState([]);
  const [messagedUsers, setMessagedUsers] = useState([
    {
      name:"achu"
    },
    {
      name:"pacvhu"
    }
  ]);

  const messageRef = collection(db, 'message-olx');

  useEffect(() => {
    const q = query(messageRef, where('userId', '==', buyerId),where('postId','==',postId), orderBy('time'));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      let message = [];
      let users = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        message.push({ ...data, id: doc.id });
       
      });
      setPrevMessages(message);
    });

    return () => unsubscribe();
  }, [buyerId]);
console.log(prevMessages);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messages.trim()) return;

    try {
      await addDoc(messageRef, {
        text: messages,
        createdAt: serverTimestamp(),
        userId: buyerId,
        displayName: auth.currentUser.displayName,
        time: Date.now(),
        postId: postId,
      });
      setMessages("");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="chat-container">
      <div className="sidebar">
        <h5 style={{padding:"20px"}}>Chats</h5>
        <ul style={{listStyle:"none"}}>
          {messagedUsers.map((user) => (
            <li style={{width:"160px",height:"40px",boxShadow:"1px 2px 1px 1px black",marginTop:"5px",padding:"10px",paddingLeft:"20px"}}>
            <Link style={{color:"black"}}>{user.name}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="messages-container container">
        {prevMessages.map((message) => (
          <div key={message.id} className={`message ${message.userId === auth.currentUser.uid ? 'user' : 'seller'}`}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={messages}
          onChange={(e) => setMessages(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSubmit}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
