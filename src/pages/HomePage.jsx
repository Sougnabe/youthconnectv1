// src/pages/HomePage.jsx
import { db } from '../firebase';
import { addDoc, collection, getDocs, query, orderBy, Timestamp } from "firebase/firestore";
import { useState, useEffect } from "react";

function HomePage() {
  const [posts, setPosts] = useState([]);
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [posting, setPosting] = useState(false);

  const loadPosts = async () => {
    setLoading(true);
    try {
      const postsQuery = query(collection(db, "posts"), orderBy("createdAt", "desc"));
      const querySnapshot = await getDocs(postsQuery);
      const loaded = [];
      querySnapshot.forEach(doc => loaded.push(doc.data()));
      setPosts(loaded);
    } catch (error) {
      console.error("Erreur chargement posts:", error);
    }
    setLoading(false);
  };

  const submitPost = async () => {
    if (!company.trim() || !jobTitle.trim() || !jobDescription.trim()) {
      alert("Merci de remplir tous les champs avant de publier.");
      return;
    }
    setPosting(true);
    try {
      await addDoc(collection(db, "posts"), {
        company: company.trim(),
        jobTitle: jobTitle.trim(),
        jobDescription: jobDescription.trim(),
        createdAt: Timestamp.now()
      });
      setCompany('');
      setJobTitle('');
      setJobDescription('');
      await loadPosts();
      alert("Annonce publiée avec succès !");
    } catch (error) {
      alert("Erreur lors de la publication.");
      console.error(error);
    }
    setPosting(false);
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = timestamp.toDate ? timestamp.toDate() : timestamp;
    return date.toLocaleDateString('fr-FR', { 
      day: 'numeric', month: 'long', year: 'numeric', 
      hour: '2-digit', minute: '2-digit' 
    });
  };

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1 style={styles.title}>🎯 Bienvenue sur <span style={styles.highlight}>Youth Connect</span></h1>
        <p style={styles.subtitle}>
          La plateforme qui connecte les étudiants aux entreprises pour trouver emploi ou stage.
        </p>
      </header>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📝 Publier une annonce d'emploi ou de stage</h2>
        <input 
          type="text" 
          placeholder="Nom de l'entreprise" 
          value={company} 
          onChange={e => setCompany(e.target.value)} 
          style={styles.input}
          disabled={posting}
        />
        <input 
          type="text" 
          placeholder="Intitulé du poste" 
          value={jobTitle} 
          onChange={e => setJobTitle(e.target.value)} 
          style={styles.input}
          disabled={posting}
        />
        <textarea
          placeholder="Description du poste"
          value={jobDescription}
          onChange={e => setJobDescription(e.target.value)}
          rows={5}
          style={styles.textarea}
          disabled={posting}
        />
        <button 
          onClick={submitPost} 
          style={styles.button} 
          disabled={posting || !company.trim() || !jobTitle.trim() || !jobDescription.trim()}
        >
          {posting ? "Publication..." : "Publier"}
        </button>
      </section>

      <section style={styles.section}>
        <h2 style={styles.sectionTitle}>📢 Dernières annonces</h2>
        {loading ? (
          <p>Chargement des annonces...</p>
        ) : posts.length === 0 ? (
          <p style={styles.noPosts}>Aucune annonce disponible pour le moment.</p>
        ) : (
          posts.map((post, i) => (
            <article key={i} style={styles.postCard}>
              <h3 style={styles.jobTitle}>{post.jobTitle}</h3>
              <p><strong>Entreprise :</strong> {post.company}</p>
              <p style={styles.jobDescription}>{post.jobDescription}</p>
              <small style={styles.date}>Publié le {formatDate(post.createdAt)}</small>
            </article>
          ))
        )}
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '900px',
    margin: 'auto',
    padding: '30px 20px',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    color: '#333',
    backgroundColor: '#fafafa',
    minHeight: '100vh',
  },
  nav: {
    marginBottom: '30px',
    display: 'flex',
    gap: '25px',
    borderBottom: '2px solid #ddd',
    paddingBottom: '12px',
  },
  link: {
    textDecoration: 'none',
    color: '#28a745',
    fontWeight: '600',
    fontSize: '1.1rem',
    transition: 'color 0.3s ease',
  },
  header: {
    marginBottom: '40px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.8rem',
    marginBottom: '8px',
  },
  highlight: {
    color: '#28a745',
  },
  subtitle: {
    fontSize: '1.2rem',
    color: '#555',
    maxWidth: '700px',
    margin: '0 auto',
  },
  section: {
    marginBottom: '40px',
    backgroundColor: '#fff',
    padding: '25px 30px',
    borderRadius: '12px',
    boxShadow: '0 6px 14px rgba(0,0,0,0.07)',
  },
  sectionTitle: {
    fontSize: '1.8rem',
    marginBottom: '15px',
    borderBottom: '2px solid #28a745',
    paddingBottom: '6px',
    color: '#28a745',
  },
  input: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '1rem',
    marginBottom: '12px',
    borderRadius: '8px',
    border: '1px solid #ccc',
    boxSizing: 'border-box',
  },
  textarea: {
    width: '100%',
    padding: '12px 15px',
    fontSize: '1rem',
    borderRadius: '8px',
    border: '1px solid #ccc',
    resize: 'vertical',
    boxSizing: 'border-box',
    marginBottom: '12px',
  },
  button: {
    padding: '12px 30px',
    fontSize: '1.1rem',
    fontWeight: '600',
    backgroundColor: '#28a745',
    border: 'none',
    borderRadius: '8px',
    color: 'white',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
    disabled: {
      backgroundColor: '#94d3a2',
      cursor: 'not-allowed',
    }
  },
  postCard: {
    backgroundColor: '#e9f5ec',
    padding: '20px',
    borderRadius: '8px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
  },
  jobTitle: {
    margin: '0 0 8px 0',
    color: '#1e7e34',
  },
  jobDescription: {
    whiteSpace: 'pre-wrap',
    lineHeight: '1.5',
    marginBottom: '10px',
  },
  date: {
    color: '#777',
    fontSize: '0.85rem',
  },
  noPosts: {
    color: '#888',
    fontStyle: 'italic',
    textAlign: 'center',
  }
};

export default HomePage;
