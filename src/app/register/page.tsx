"use client"; // Indica que este componente se ejecuta en el cliente (necesario para manejar eventos como onSubmit)

import axios from "axios"; // Importamos axios para realizar peticiones HTTP
import { FormEvent, useState } from "react"; // Importamos tipos para eventos de formulario y useState para manejar estado

// Componente funcional RegisterPage
function RegisterPage() {
  // Estado para mostrar un mensaje de éxito al enviar el formulario
  const [successMessage, setSuccessMessage] = useState("");

  // Función que se ejecuta cuando el usuario envía el formulario
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Evita que se recargue la página

    // Extraemos los datos del formulario con FormData
    const formData = new FormData(e.currentTarget);

    try {
      // Enviamos los datos al backend mediante POST
      const res = await axios.post("/api/auth/signup", {
        email: formData.get("email"),
        password: formData.get("password"),
        fullname: formData.get("fullname")
      });

      // Mostramos la respuesta en consola
      console.log(res);

      // Mostramos mensaje de éxito
      setSuccessMessage("¡Formulario enviado correctamente!");
    } catch (error) {
      // En caso de error, mostramos el error en consola
      console.log(error);

      // Limpiamos el mensaje de éxito (por si existía previamente)
      setSuccessMessage("");
    }
  };

  // Retornamos el formulario
  return (
    // Contenedor principal centrado con fondo gris claro
    <div className="min-h-screen flex items-center justify-center bg-gray-100">

      {/* Formulario estilizado con Tailwind CSS */}
      <form
        onSubmit={handleSubmit} // Se ejecuta cuando el usuario envía el formulario
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md text-black" // Fondo blanco, texto negro, bordes redondeados y sombra
      >
        {/* Título del formulario */}
        <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>

        {/* Si hay mensaje de éxito, se muestra en verde */}
        {successMessage && (
          <div className="mb-4 text-green-600 text-center font-medium">
            {successMessage}
          </div>
        )}

        {/* Campo para el nombre completo */}
        <div className="mb-4">
          <label htmlFor="fullname" className="block text-black font-medium mb-2">
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
          <label htmlFor="email" className="block text-black font-medium mb-2">
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
          <label htmlFor="password" className="block text-black font-medium mb-2">
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

        {/* Botón de envío */}
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

// Exportamos el componente para usarlo en otras partes de la aplicación
export default RegisterPage;

