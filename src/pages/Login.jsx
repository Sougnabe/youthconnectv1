import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error,setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err) {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div style={{maxWidth:400, margin:'auto'}}>
      <h2>Connexion</h2>
      {error && <p style={{color:'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input type="email" placeholder="Email" required value={email} onChange={e=>setEmail(e.target.value)}/>
        <input type="password" placeholder="Mot de passe" required value={password} onChange={e=>setPassword(e.target.value)}/>
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
}
