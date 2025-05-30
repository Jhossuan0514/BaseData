/* eslint-disable @typescript-eslint/no-unused-vars */
import User from "@/models/user";
import { connectDB } from "@/libs/mongodb";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { email, password } = await request.json();

  try {
    await connectDB();
    
    // Buscar usuario por email
    const userFound = await User.findOne({ email }).select("+password");
    
    if (!userFound) {
      return NextResponse.json(
        { message: "Email not found" },
        { status: 401 }
      );
    }
    
    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, userFound.password);
    
    if (!passwordMatch) {
      return NextResponse.json(
        { message: "Invalid password" },
        { status: 401 }
      );
    }
    
    // Si todo es correcto, devolver el usuario (sin password)
    const { password: _, ...userWithoutPassword } = userFound.toObject();
    
    return NextResponse.json(userWithoutPassword);
    
  } catch (error) {
    console.log(error);
    
    if (error instanceof Error) {
      return NextResponse.json(
        { message: error.message },
        { status: 500 }
      );
    }
  }
}