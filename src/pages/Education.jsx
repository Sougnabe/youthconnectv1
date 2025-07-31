import React from 'react';

const EducationPage = () => {
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>🎓 Educational Resources</h1>
        <p style={styles.text}>
          This section is dedicated to student learning and skill development. Here you’ll find recommended courses, practical tips,
          and free or affordable resources to enhance your academic and professional journey.
        </p>

        <h2 style={styles.subtitle}>📘 Recommended Courses</h2>
        <ul style={styles.list}>
          <li>💻 <strong>Web Development</strong> – HTML, CSS, JavaScript, React, Node.js</li>
          <li>🧠 <strong>Soft Skills</strong> – Communication, critical thinking, leadership</li>
          <li>📊 <strong>Data & Analytics</strong> – Excel, Python, SQL, Power BI</li>
          <li>🌐 <strong>Languages</strong> – Professional English, Academic French</li>
        </ul>

        <h2 style={styles.subtitle}>💼 Student Tips</h2>
        <ul style={styles.list}>
          <li>✅ How to create a strong and impactful resume</li>
          <li>📨 Writing a compelling cover letter</li>
          <li>🎯 Preparing for a job interview</li>
          <li>🧭 Finding your academic or career path</li>
        </ul>

        <h2 style={styles.subtitle}>🧰 Free Resources</h2>
        <ul style={styles.list}>
          <li>🎓 <a href="https://www.coursera.org" target="_blank" rel="noopener noreferrer">Coursera</a> – Online courses from top universities</li>
          <li>🧑‍🏫 <a href="https://www.khanacademy.org" target="_blank" rel="noopener noreferrer">Khan Academy</a> – Free lessons from elementary to college level</li>
          <li>🧪 <a href="https://www.edx.org" target="_blank" rel="noopener noreferrer">edX</a> – Certified online programs</li>
          <li>📚 <a href="https://www.openclassrooms.com" target="_blank" rel="noopener noreferrer">OpenClassrooms</a> – Learn tech skills at your own pace</li>
        </ul>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f4f6f9',
    minHeight: '100vh',
    display: 'flex',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '12px',
    maxWidth: '800px',
    boxShadow: '0 0 20px rgba(0, 0, 0, 0.05)',
  },
  title: {
    marginBottom: '1rem',
    fontSize: '2rem',
    color: '#2c3e50',
  },
  subtitle: {
    marginTop: '2rem',
    fontSize: '1.5rem',
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
    lineHeight: '1.8',
  },
};

export default EducationPage;
