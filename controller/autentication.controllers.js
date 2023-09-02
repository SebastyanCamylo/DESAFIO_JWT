import * as dotenv from "dotenv";
dotenv.config();
import jwt from "jsonwebtoken";
import bcryptjs from "bcryptjs";

import { autenticationModels } from "../models/autentication.models.js";

const createUser = async (req, res) => {
  const { email, password, rol, lenguage } = req.body;

  try {
    if (!email || !password || !rol || !lenguage)
      throw new Error("All inputs must be completed"); // Todas las entradas deben completarse

    autenticationModels.create(email, password, rol, lenguage);
    res.status(200).json({
      ok: true,
      msg: "User created successfully", // Usuario creado correctamente
    });
  } catch (error) {
    console.error(error);
  }
};

const loginUser = async (req, res) => {
  const email = req.email;
  try {
    const token = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

const getUserInfo = async (req, res) => {
  try {
    const rows = await autenticationModels.getInfo(req.email);

    res.json({ rows });
  } catch (error) {
    console.error(error);
    res.status();
  }
};

export const autenticationController = {
  createUser,
  loginUser,
  getUserInfo,
};
