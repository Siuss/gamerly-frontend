import axios from "axios";
import { BASE_URL } from "@env";

const SesionEndpoints = {
  CREAR_CUENTA: "/auth/user",
  LOGIN: "/auth/login",
};

const signUp = async (nuevoUsuario) => {
  const response = await axios.post(
    `${BASE_URL}${SesionEndpoints.CREAR_CUENTA}`,
    nuevoUsuario
  );
  return response.data;
};

const login = async (credenciales) => {
  try {
    const response = await axios.post(
      `${BASE_URL}${SesionEndpoints.LOGIN}`,
      credenciales,
      {
        timeout: 5000, // Aumenté el timeout para evitar problemas de conexión
      }
    );
    return response.data; // Asumiendo que el backend devuelve el token directamente
  } catch (error) {
    throw error;
  }
};

export const AuthService = {
  signUp,
  login,
};