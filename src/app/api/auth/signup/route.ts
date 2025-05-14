import User from "@/models/user"; // Importar el modelo de User desde la carpeta models
import { connectDB } from "@/libs/mongodb"; // Importar la funcion ConectDB
import bcrypt from "bcryptjs"; // Importacion de libreria para encriptar el password
import { NextResponse } from "next/server";

//manejador de la ruta POST para registrar usuarios
export async function POST(request: Request) {
    
    //extraer directamente las propiedades de fullname, email, passwords del body enviado
    const { fullname, email, password } = await request.json();

    //imprimimos los valores por consola para comprobar su funcionamiento
    console.log(fullname, email, password);

    //validaciones de la contraseña
    if (!password || password.length < 6) {
        return NextResponse.json(
            {
                message: "Password must be at least 6 characters",
            },
            {
                status: 400, //codigo de estado http (bad request)
            }
        );
    }

    //Establecer la conexion con la db en mongoDB
    try {
        await connectDB();

        //Verificamos si hay un usuario con el mismo email
        const userFound = await User.findOne({ email });

        //Si existe un usuario con el mismo email marcamos error 409 (Conflicto de datos)
        if (userFound) return NextResponse.json(
            {
                message: "Email already exists",
            },
            {
                status: 409, //Codigo Http 409 -- conflicto de datos
            }
        );

        //Encriptar el password con bcrypt
        const hashedPassword = await bcrypt.hash(password, 12);

        //crear un nuevo objeto del modelo user con los datos del formulario
        // nota: Se guarda la contraseña encriptada
        const user = new User({
            email,
            fullname,
            password: hashedPassword,
        });

        //Guardar el usuario en Bd y espere que termine el proceso
        const savedUser = await user.save();

        //Imprime el usuario guardado
        console.log(savedUser);

        //Devuelve como respuesta el usuario guardado en formato JSON
        return NextResponse.json(savedUser);

    } catch (error) {
        // si ocurre un error durante el proceso, se captura y se muestra en consola
        console.log(error);

        //Verificar si el error es una instancia valida de la clase Error
        if (error instanceof Error) {
            //Devuelve un mensaje personalizado con el error capturado
            return NextResponse.json(
                {
                    message: error.message,
                },
                {
                    status: 400, // Codigo de http 400 -- Solicitud no valida
                }
            );
        }
    }
}

