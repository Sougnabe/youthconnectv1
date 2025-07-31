import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
  deleteDoc,
  doc
} from 'firebase/firestore';

export default function Forum() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, snapshot => {
      const msgs = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user) return alert('You must be logged in to send a message.');
    if (newMsg.trim() === '') return;
    try {
      await addDoc(collection(db, 'messages'), {
        text: newMsg,
        author: user.email,
        createdAt: serverTimestamp()
      });
      setNewMsg('');
    } catch (err) {
      alert("Failed to send message");
      console.error(err);
    }
  };

  const deleteMessage = async (id, author) => {
    if (!user || user.email !== author) {
      return alert("You can only delete your own messages.");
    }
    try {
      await deleteDoc(doc(db, 'messages', id));
    } catch (err) {
      alert("Failed to delete message");
      console.error(err);
    }
  };

  return (
    <div style={{ maxWidth: 700, margin: 'auto' }}>
      <h1>Community Forum</h1>
      <div style={{
        border: '1px solid #ccc',
        height: '300px',
        overflowY: 'scroll',
        padding: '10px',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        {messages.map((m) => (
          <div key={m.id} style={{ marginBottom: '10px' }}>
            <strong>{m.author || 'Anonymous'}</strong>: {m.text}
            {user && m.author === user.email && (
              <button
                onClick={() => deleteMessage(m.id, m.author)}
                style={{
                  marginLeft: '10px',
                  color: 'red',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer'
                }}
              >
                Delete
              </button>
            )}
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={sendMessage} style={{ marginTop: '10px' }}>
          <input
            type="text"
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            placeholder="Write a message..."
            style={{
              width: '80%',
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button type="submit" style={{
            padding: '8px 15px',
            marginLeft: '10px',
            backgroundColor: '#007BFF',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}>
            Send
          </button>
        </form>
      ) : (
        <p style={{ marginTop: '10px', fontStyle: 'italic' }}>
          Log in to participate in the forum.
        </p>
      )}
    </div>
  );
}
