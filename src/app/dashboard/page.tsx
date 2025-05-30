'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

export default function Dashboard() {
  const router = useRouter();

  const goToLogin = () => router.push('/login');
  const goToSignUp = () => router.push('/register');

  return (
    <main style={styles.main}>
      <section style={styles.card}>
        <h1 style={styles.title}>
          Bienvenido al <span style={styles.highlight}> Panel de control</span>
        </h1>
        <p style={styles.subtitle}>
          Funciones principales
        </p>
        <div style={styles.buttonContainer}>
         <button onClick={goToLogin} style={{ ...styles.button, ...styles.profileButton }}>
            Apartado de Inicio de secion
          </button>
         <button onClick={goToSignUp} style={{ ...styles.button, ...styles.settingsButton }}>
            Apartado de Registro
          </button>
        </div>
      </section>
    </main>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  main: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg, rgb(6, 17, 61), #15aabf)',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    padding: '0 20px',
  },
  card: {
    backgroundColor: 'white',
    padding: '40px 60px',
    borderRadius: '12px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    maxWidth: '420px',
    textAlign: 'center',
  },
  title: {
    fontSize: '2.6rem',
    marginBottom: '12px',
    color: '#333',
    fontWeight: '700',
  },
  highlight: {
    color: '#4c6ef5',
  },
  subtitle: {
    fontSize: '1.15rem',
    color: '#555',
    marginBottom: '36px',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '16px',
  },
  button: {
    flex: 1,
    padding: '14px 0',
    fontSize: '1.1rem',
    fontWeight: '600',
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease, color 0.3s ease',
  },
  profileButton: {
    backgroundColor: '#4c6ef5',
    color: 'white',
  },
  settingsButton: {
    backgroundColor: '#15aabf',
    color: 'white',
  },
};
