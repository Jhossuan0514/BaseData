"use client"; // Indica que este componente se ejecuta en el cliente (necesario para usar eventos como onSubmit)

import axios from "axios"; // Importamos axios para hacer peticiones HTTP
import { FormEvent } from "react"; // Importamos el tipo FormEvent para tipar el evento del formulario

// Componente funcional RegisterPage
function RegisterPage() {

  // Función que se ejecuta cuando el usuario envía el formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que se recargue la página al enviar el formulario

    // Obtenemos los datos del formulario usando FormData
    const formData = new FormData(e.currentTarget);

    try {
      // Enviamos los datos del formulario al backend mediante POST a /api/auth/signup
      const res = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname")
      });

      // Mostramos en consola la respuesta del servidor
      console.log(res);

    } catch (error) {
      // Si hay un error, lo mostramos en la consola
      console.log(error);
    }
  };

  return (
    // Contenedor principal centrado con fondo gris claro
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Formulario estilizado con Tailwind y manejador de envío */}
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        {/* Título del formulario */}
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {/* Campo para el nombre completo */}
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-gray-700 font-medium mb-2">
            Full Name
          </label>
          <input
            type="text"
            name="fullname"
            id="fullname"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* Campo para el correo electrónico */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* Campo para la contraseña */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 font-medium mb-2">
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-500"
            required
          />
        </div>

        {/* Botón de envío del formulario */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Register
        </button>
      </form>
    </div>
  );
}

export default RegisterPage; // Exportamos el componente para poder usarlo en la aplicación
