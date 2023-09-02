import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import { pool } from "../database/connection.js";
import bcryptjs from "bcryptjs";

const verificationToken = (req, res, next) => {
  try {
    const beareHeaders = req.headers.authorization;
    if (!beareHeaders) throw new Error("Need bearer format token"); // Necesita token de formato de portador
    const token = beareHeaders.split("")[1];
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.email = payload.email;

    next();
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: error.message });
  }
};

const verificationUser = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) throw new Error("Email and password are required"); // Se requiere correo electrónico y contraseña
    const query = "SELECT * FROM usuarios WHERE email = $1";
    const { rows, rowCount } = await pool.query(query, [email]);
    if (rowCount === 0) throw new Error("User doesn't exist"); // El usuario no existe
    const passwordVerification = await bcryptjs.compare(
      password,
      rows[0].password
    );
    if (!passwordVerification) throw new Error("Password failed"); // Error de contraseña
    req.email = rows[0].email;

    next();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

export const autenticationMiddlewares = {
  verificationToken,
  verificationUser,
};
