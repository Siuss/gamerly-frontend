import axios from "axios";
import { BASE_URL } from "./requestConfig";

const JugadoresEndpoints = {
  JUGADORES_CON_JUEGOS_EN_COMUN: "/jugadoresPorJuego/",
  PERFIL_USUARIO: "/detalle/",
  AMIGOS: "/amigos/",
  BUSQUEDA_AVANZADA: "/buscar/",
};

const getJugadoresConJuegosEnComun = async (idJuego) => {
  const response = await axios.get(
    `${BASE_URL}${JugadoresEndpoints.JUGADORES_CON_JUEGOS_EN_COMUN}${idJuego}`
  );

  return response.data;
};

const getPerfilUsuario = async (idUsuario) => {
  const response = await axios.get(
    `${BASE_URL}${JugadoresEndpoints.PERFIL_USUARIO}${idUsuario}`
  );

  return response.data;
};

const getAmigosDelUsuario = async (idUsuario) => {
  const response = await axios.get(
    `${BASE_URL}${JugadoresEndpoints.AMIGOS}${idUsuario}`
  );

  return response.data;
};

const borrarAmigo = async (idUsuario, idAmigo) => {
  const response = await axios.post(
    `${BASE_URL}/${idUsuario}${JugadoresEndpoints.AMIGOS}${idAmigo}`
  );

  return response.data;
};

const getJugadoresBusqueda = async (filtros, idJuego) => {
  const response = await axios.post(
    `${BASE_URL}${JugadoresEndpoints.BUSQUEDA_AVANZADA}${idJuego}`,
    filtros
  );

  return response.data;
};

export const JugadoresService = {
  getJugadoresConJuegosEnComun,
  getPerfilUsuario,
  getAmigosDelUsuario,
  borrarAmigo,
  getJugadoresBusqueda,
};
