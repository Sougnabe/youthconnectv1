import React, { useState, useEffect } from 'react';
import { db, auth } from '../firebase';
import { collection, addDoc, onSnapshot, query, orderBy, serverTimestamp } from 'firebase/firestore';

export default function Forum() {
  const [messages, setMessages] = useState([]);
  const [newMsg, setNewMsg] = useState('');
  const user = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'messages'), orderBy('createdAt'));
    const unsubscribe = onSnapshot(q, snapshot => {
      let msgs = [];
      snapshot.forEach(doc => msgs.push(doc.data()));
      setMessages(msgs);
    });
    return () => unsubscribe();
  }, []);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!user) return alert('Connecte-toi pour envoyer un message');
    if (newMsg.trim() === '') return;
    await addDoc(collection(db, 'messages'), {
      text: newMsg,
      author: user.email,
      createdAt: serverTimestamp()
    });
    setNewMsg('');
  };

  return (
    <div style={{maxWidth: 700, margin:'auto'}}>
      <h1>Forum de discussion</h1>
      <div style={{border: '1px solid #ccc', height: '300px', overflowY: 'scroll', padding: '10px'}}>
        {messages.map((m, i) => (
          <div key={i} style={{marginBottom: '10px'}}>
            <strong>{m.author || 'Anonyme'}</strong>: {m.text}
          </div>
        ))}
      </div>

      {user ? (
        <form onSubmit={sendMessage} style={{marginTop: '10px'}}>
          <input
            type="text"
            value={newMsg}
            onChange={e => setNewMsg(e.target.value)}
            placeholder="Écris un message..."
            style={{width: '80%', padding: '8px'}}
          />
          <button type="submit" style={{padding: '8px 15px'}}>Envoyer</button>
        </form>
      ) : (
        <p>Connecte-toi pour participer au forum.</p>
      )}
    </div>
  );
}
