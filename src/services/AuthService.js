import axios from "axios";
import { BASE_URL } from "@env";

const SesionEndpoints = {
  CREAR_CUENTA: "/auth/user",
  LOGIN: "/auth/login",
  OAUTH: "/auth/oauth",
};

const signUp = async (nuevoUsuario) => {
  const response = await axios.post(
    `${BASE_URL}${SesionEndpoints.CREAR_CUENTA}`,
    nuevoUsuario
  );
  return response.data;
};

const login = async (credenciales) => {
  const response = await axios.post(
    `${BASE_URL}${SesionEndpoints.LOGIN}`,
    credenciales,
    {
      timeout: 5000, // Aumenté el timeout para evitar problemas de conexión
    }
  );
  return response.data; // Asumiendo que el backend devuelve el token directamente

};

const oAuthLogin = async (usuario) => {
  const response = await axios.post(
    `${BASE_URL}${SesionEndpoints.OAUTH}`,
    usuario
  );
  return response.data;
};

export const AuthService = {
  signUp,
  login,
  oAuthLogin,
};