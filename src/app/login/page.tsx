'use client';

import { FormEvent, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

function LoginPage() {
  // Estados del componente
  const [errorMessage, setErrorMessage] = useState(''); // Para mostrar errores
  const [showPassword, setShowPassword] = useState(false); // Para alternar visibilidad de contraseña
  const [isSubmitting, setIsSubmitting] = useState(false); // Para desactivar mientras se envía

  // Maneja el envío del formulario de login
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    setIsSubmitting(true);
    setErrorMessage('');

    try {
      // Enviar datos al backend
      await axios.post('/api/auth/login', {
        email: formData.get('email'),
        password: formData.get('password'),
      });

      // Redirige al dashboard si todo salió bien
      window.location.href = '/dashboard';
    } catch (error) {
      console.error(error);

      // Manejo de errores provenientes de Axios
      if (
        typeof error === 'object' &&
        error !== null &&
        'isAxiosError' in error &&
        axios.isAxiosError(error) &&
        error.response
      ) {
        const message = error.response.data?.message;
        setErrorMessage(message || 'Error al iniciar sesión.');
      } else {
        setErrorMessage('Error inesperado al iniciar sesión.');
      }
    } finally {
      setIsSubmitting(false); // Habilita el formulario nuevamente
    }
  };

  return (
    <main style={styles.main}>
      {/* Formulario de login */}
      <form onSubmit={handleSubmit} style={styles.card}>
        <h1 style={styles.title}>
          Iniciar Sesión en <span style={styles.highlight}> Formularios Unisalle</span>
        </h1>
        <p style={styles.subtitle}>Ingresa tus credenciales para continuar.</p>

        {/* Muestra el mensaje de error si existe */}
        {errorMessage && (
          <div style={styles.error}>{errorMessage}</div>
        )}

        {/* Campo de email */}
        <div style={styles.inputGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input
            type="email"
            name="email"
            id="email"
            required
            disabled={isSubmitting}
            style={styles.input}
          />
        </div>

        {/* Campo de contraseña con botón para mostrar/ocultar */}
        <div style={styles.inputGroup}>
          <label htmlFor="password" style={styles.label}>Contraseña</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? 'text' : 'password'}
              name="password"
              id="password"
              required
              disabled={isSubmitting}
              style={{ ...styles.input, paddingRight: '40px' }}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              tabIndex={-1}
              style={styles.eyeButton}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            ...styles.button,
            backgroundColor: isSubmitting ? '#a0aec0' : '#4c6ef5',
            cursor: isSubmitting ? 'not-allowed' : 'pointer',
          }}
        >
          {isSubmitting ? 'Ingresando...' : 'Iniciar Sesión'}
        </button>

        {/* Enlace hacia registro */}
        <p style={styles.registerText}>
          ¿No tienes una cuenta?{' '}
          <Link href="/register" style={styles.link}>
            Regístrate aquí
          </Link>
        </p>
      </form>
    </main>
  );
}

export default LoginPage;

// Estilos inline adaptados del HomePage
const styles: { [key: string]: React.CSSProperties } = {
  main: {
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'linear-gradient(135deg,rgb(6, 17, 61), #15aabf)',
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
  eyeButton: {
    position: 'absolute',
    top: '50%',
    right: '10px',
    transform: 'translateY(-50%)',
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
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
