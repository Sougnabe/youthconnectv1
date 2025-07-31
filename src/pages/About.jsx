import React from 'react';

const AboutPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎯 About <span style={styles.highlight}>Youth Connect</span></h1>
        <p style={styles.text}>
          <strong>Youth Connect</strong> is a dynamic platform that connects students with businesses by offering
          internship, job, mentorship, and real-world project collaboration opportunities. It aims to bridge the gap
          between education and the job market, especially in Africa.
        </p>

        <h2 style={styles.subtitle}>🌍 Our Mission</h2>
        <p style={styles.text}>
          We firmly believe that youth are the driving force of change. Youth Connect’s mission is to:
        </p>
        <ul style={styles.list}>
          <li>🔗 Build bridges between school and the professional world</li>
          <li>📚 Promote equal access to opportunities</li>
          <li>💼 Strengthen professional skills</li>
          <li>🌱 Inspire a new generation of leaders</li>
        </ul>

        <h2 style={styles.subtitle}>🤝 What We Offer</h2>
        <ul style={styles.list}>
          <li>✅ Connections with local and global companies</li>
          <li>✅ A platform for internships and job offers</li>
          <li>✅ Access to mentors and development programs</li>
          <li>✅ Visibility for student talent</li>
        </ul>

        <h2 style={styles.subtitle}>👥 Our Team</h2>
        <p style={styles.text}>
          Behind Youth Connect is a passionate team of young developers, educators, and entrepreneurs united by one vision:
          to make the professional future more accessible, more human, and more inclusive.
        </p>

        <h2 style={styles.subtitle}>💡 Why Choose Youth Connect?</h2>
        <p style={styles.text}>
          Because we understand students’ challenges, we offer a solution that is tailored, human, and proactive.
          Every profile deserves to be seen. Every talent deserves a chance.
        </p>

        <div style={styles.cta}>
          <p style={styles.text}><strong>Join our community today and start building your future! 🚀</strong></p>
          <button style={styles.button}>Get Started</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#eef2f7',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '3rem',
    borderRadius: '16px',
    maxWidth: '900px',
    boxShadow: '0 8px 24px rgba(0, 0, 0, 0.1)',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '2.5rem',
    color: '#2c3e50',
  },
  highlight: {
    color: '#0984e3',
  },
  subtitle: {
    marginTop: '2rem',
    fontSize: '1.6rem',
    color: '#34495e',
  },
  text: {
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.6',
  },
  list: {
    marginTop: '1rem',
    paddingLeft: '1.5rem',
    fontSize: '1rem',
    color: '#555',
    lineHeight: '1.5',
  },
  cta: {
    marginTop: '2.5rem',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#0984e3',
    color: '#fff',
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontSize: '1rem',
    marginTop: '1rem',
  },
};

export default AboutPage;
