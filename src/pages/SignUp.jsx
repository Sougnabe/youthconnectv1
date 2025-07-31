import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (password !== confirmPassword) {
      setError("Les mots de passe ne correspondent pas.");
      return;
    }

    if (password.length < 6) {
      setError("Le mot de passe doit contenir au moins 6 caractères.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setSuccess("Compte créé avec succès !");
      setTimeout(() => navigate('/'), 1500); // redirection après 1.5s
    } catch (err) {
      if (err.code === 'auth/email-already-in-use') {
        setError("Cet email est déjà utilisé.");
      } else {
        setError("Une erreur est survenue. Veuillez réessayer.");
      }
    }
  };

  return (
    <div style={styles.container}>
      <h2>Créer un compte</h2>
      {error && <p style={styles.error}>{error}</p>}
      {success && <p style={styles.success}>{success}</p>}
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="email"
          placeholder="Adresse email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={styles.input}
        />
        <input
          type="password"
          placeholder="Confirmer le mot de passe"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={styles.input}
        />
        <button type="submit" style={styles.button}>S'inscrire</button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 400,
    margin: 'auto',
    padding: 20,
    border: '1px solid #ccc',
    borderRadius: 10,
    marginTop: 50,
    backgroundColor: '#f9f9f9',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: 12,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 5,
    border: '1px solid #ddd',
  },
  button: {
    padding: 10,
    fontSize: 16,
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    borderRadius: 5,
    cursor: 'pointer',
  },
  error: {
    color: 'red',
  },
  success: {
    color: 'green',
  },
};
