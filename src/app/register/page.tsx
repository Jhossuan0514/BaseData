'use client';

import axios from 'axios';
import { FormEvent, useState } from 'react';
import Link from 'next/link';

function RegisterPage() {
  // Estados del componente
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false); // Controla el estado de envío

  // Maneja el envío del formulario de registro
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const formData = new FormData(e.currentTarget);

    try {
      // Envía los datos al endpoint de registro
      await axios.post('/api/auth/signup', {
        email: formData.get('email'),
        password: formData.get('password'),
        fullname: formData.get('fullname'),
      });

      // Mensaje de éxito si todo sale bien
      setSuccessMessage('¡Registro exitoso! Ya puedes iniciar sesión.');
    } catch (error) {
      // Manejo de errores diversos
      if (error instanceof Error && error.message) {
        setErrorMessage(error.message);
      } else if (
        typeof error === 'object' &&
        error !== null &&
        'response' in error
      ) {
        const axiosError = error as { response: { data?: { message?: string } } };
        setErrorMessage(axiosError.response.data?.message || 'Error desconocido.');
      } else {
        setErrorMessage('Ocurrió un error al registrar.');
      }
    } finally {
      setLoading(false); // Oculta el estado de carga
    }
  };

  return (
    <main style={styles.main}>
      {/* Formulario de registro */}
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>
          Crear cuenta en <span style={styles.highlight}>Unisalle</span>
        </h1>
        <p style={styles.subtitle}>Ingresa tus datos para registrarte.</p>

        {/* Estado de carga */}
        {loading && (
          <div style={styles.info}>Enviando formulario...</div>
        )}

        {/* Mensaje de éxito */}
        {successMessage && (
          <div style={styles.success}>{successMessage}</div>
        )}

        {/* Mensaje de error */}
        {errorMessage && (
          <div style={styles.error}>{errorMessage}</div>
        )}

        {/* Campo de nombre completo */}
        <div style={styles.inputGroup}>
          <label htmlFor="fullname" style={styles.label}>Nombre completo</label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            required
            style={styles.input}
            disabled={loading}
          />
        </div>

        {/* Campo de email */}
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Correo electrónico</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            style={styles.input}
            disabled={loading}
          />
        </div>

        {/* Campo de contraseña */}
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Contraseña</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            style={styles.input}
            disabled={loading}
          />
        </div>

        {/* Botón de registro */}
        <button
          type="submit"
          disabled={loading}
          style={{
            ...styles.button,
            backgroundColor: loading ? '#a0aec0' : '#4c6ef5',
            cursor: loading ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? 'Registrando...' : 'Registrarse'}
        </button>

        {/* Enlace a la página de login */}
        <p style={styles.registerText}>
          ¿Ya tienes una cuenta?{' '}
          <Link href="/login" style={styles.link}>
            Inicia sesión aquí
          </Link>
        </p>
      </form>
    </main>
  );
}

export default RegisterPage;

// Estilos 
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
    padding: '40px 40px',
    borderRadius: '12px',
    boxShadow: '0 12px 30px rgba(0,0,0,0.15)',
    maxWidth: '420px',
    width: '100%',
    textAlign: 'left',
  },
  title: {
    fontSize: '2rem',
    marginBottom: '10px',
    color: '#333',
    fontWeight: '700',
    textAlign: 'center',
  },
  highlight: {
    color: '#4c6ef5',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#555',
    marginBottom: '24px',
    textAlign: 'center',
  },
  info: {
    backgroundColor: '#e0f2ff',
    color: '#0077cc',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  success: {
    backgroundColor: '#e6ffed',
    color: '#2e7d32',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  error: {
    backgroundColor: '#ffe5e5',
    color: '#cc0000',
    padding: '10px',
    borderRadius: '8px',
    marginBottom: '16px',
    textAlign: 'center',
  },
  inputGroup: {
    marginBottom: '18px',
  },
  label: {
    display: 'block',
    fontWeight: '600',
    marginBottom: '6px',
    color: '#333',
  },
  input: {
    width: '100%',
    padding: '10px 12px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    fontSize: '1rem',
    outline: 'none',
    color: '#333',             
    backgroundColor: 'white',
  },
  button: {
    width: '100%',
    padding: '12px',
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    transition: 'background-color 0.3s ease',
    marginTop: '10px',
  },
  registerText: {
    marginTop: '16px',
    textAlign: 'center',
    fontSize: '0.95rem',
    color: '#555',
  },
  link: {
    color: '#4c6ef5',
    textDecoration: 'underline',
    fontWeight: 500,
  },
};
