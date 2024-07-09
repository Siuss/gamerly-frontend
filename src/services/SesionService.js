import axios from "axios";
import { BASE_URL } from "./requestConfig";

const SesionEndpoints = {
  CREAR_CUENTA: "/sign-up",
  ELIMINAR_CUENTA: "/usuarios/",
  LOGIN: "/login",
  DETALLE_USUARIO: "/detalle/",
  SOLICITUD_CLAVE: "/solicitud-clave/",
  VERIFICAR_CODIGO_RECUPERACION: "/verificar-codigo-recuperacion/",
  NUEVA_CLAVE: "/nueva-clave"
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
    credenciales
  );

  return response.data;
};

const eliminarCuenta = async (id) => {
  const response = await axios.delete(
    `${BASE_URL}${SesionEndpoints.ELIMINAR_CUENTA}${id}`
  );
  return response.data;
};

const obtenerDetalleUsuario = async (id) => {
  const response = await axios.get(
    `${BASE_URL}${SesionEndpoints.DETALLE_USUARIO}${id}`
  );
  return response.data;
};

const solicitarClave = async (email) => {
  const response = await axios.post(
    `${BASE_URL}${SesionEndpoints.SOLICITUD_CLAVE}${email}`
  );
  return response.data;
};

const verificarCodigoDeRecuperacion = async (token) => {
  const response = await axios.post(
    `${BASE_URL}${SesionEndpoints.VERIFICAR_CODIGO_RECUPERACION}${token}`
  );
  return response.data;
};

const nuevaClave = async (email, contrasenia) => {
  const response = await axios.post(
    `${BASE_URL}${SesionEndpoints.NUEVA_CLAVE}`,
    { email, contrasenia }
  );
  return response.data;
};

export const SesionService = {
  eliminarCuenta,
  login,
  obtenerDetalleUsuario,
  signUp,
  solicitarClave,
  verificarCodigoDeRecuperacion,
  nuevaClave
};
