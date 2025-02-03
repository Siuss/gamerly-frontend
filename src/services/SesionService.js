import api from "./apiConfig.js";
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

// const signUp = async (nuevoUsuario) => {
//   const response = await api.post(
//     `${SesionEndpoints.CREAR_CUENTA}`,
//     nuevoUsuario
//   );

//   return response.data;
// };

// const login = async (credenciales) => {
//   const response = await api.post(
//     `${SesionEndpoints.LOGIN}`,
//     credenciales,{
//       timeout: 500 //ms
//     }
//   );

//   return response.data;
// };

const eliminarCuenta = async (id) => {
  const response = await api.delete(
    `${SesionEndpoints.ELIMINAR_CUENTA}${id}`
  );
  return response.data;
};

const solicitarClave = async (email) => {
  const response = await api.post(
    `${SesionEndpoints.SOLICITUD_CLAVE}${email}`
  );
  return response.data;
};

const verificarCodigoDeRecuperacion = async (token) => {
  const response = await api.post(
    `${SesionEndpoints.VERIFICAR_CODIGO_RECUPERACION}${token}`
  );
  return response.data;
};

const nuevaClave = async (email, contrasenia) => {
  const response = await api.post(
    `${SesionEndpoints.NUEVA_CLAVE}`,
    { email, contrasenia }
  );
  return response.data;
};

export const SesionService = {
  eliminarCuenta,
  // login,
  // signUp,
  solicitarClave,
  verificarCodigoDeRecuperacion,
  nuevaClave
};
