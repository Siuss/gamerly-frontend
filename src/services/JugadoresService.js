import api from "./apiConfig.js";
import { BASE_URL } from "./requestConfig";

const JugadoresEndpoints = {
  JUGADORES_CON_JUEGOS_EN_COMUN: "/jugadoresPorJuego/",
  PERFIL_USUARIO: "/detalle/",
  PERFIL_EDICION_USUARIO: "/detalle-edicion/",
  PERFIL: "/perfil",
  AMIGOS: "/amigos/",
  BUSQUEDA_AVANZADA: "/buscar/",
  ESTA_BLOQUEADO: "/esta-bloqueado/",
  BLOQUEADOS: "/bloqueados/",
  BLOQUEAR: "/bloquear/",
  DESBLOQUEAR: "/desbloquear/",
};

const actualizarPerfil = async (perfil) => {
  const response = await api.put(
    `${JugadoresEndpoints.PERFIL}`,
    perfil
  );

  return response.data;
};

const getJugadoresConJuegosEnComun = async (idJuego) => {
  const response = await api.get(
    `${JugadoresEndpoints.JUGADORES_CON_JUEGOS_EN_COMUN}${idJuego}`
  );

  return response.data;
};

const getPerfilUsuario = async (idUsuario) => {
  const response = await api.get(
    `${JugadoresEndpoints.PERFIL_USUARIO}${idUsuario}`
  );

  return response.data;
};

const getPerfilEdicionUsuario = async (idUsuario) => {
  const response = await api.get(
    `${JugadoresEndpoints.PERFIL_EDICION_USUARIO}${idUsuario}`
  );

  return response.data;
};

const getAmigosDelUsuario = async (idUsuario, traerBloqueados = false) => {
  const response = await api.get(
    `${JugadoresEndpoints.AMIGOS}${idUsuario}`,
    {
      params: {
        bloqueados: traerBloqueados,
      },
    }
  );

  return response.data;
};

const borrarAmigo = async (idUsuario, idAmigo) => {
  const response = await api.post(
    `/${idUsuario}${JugadoresEndpoints.AMIGOS}${idAmigo}`
  );

  return response.data;
};

const getJugadoresBusqueda = async (filtros, idJuego) => {
  const response = await api.post(
    `${JugadoresEndpoints.BUSQUEDA_AVANZADA}${idJuego}`,
    filtros
  );

  return response.data;
};

const getUsuarioEstaBloqueado = async (idUsuarioLogueado, idUsuario) => {
  const response = await api.get(
    `/${idUsuarioLogueado}${JugadoresEndpoints.ESTA_BLOQUEADO}${idUsuario}`
  );

  return response.data;
};

const getBloqueados = async (idUsuario) => {
  const response = await api.get(
    `${JugadoresEndpoints.BLOQUEADOS}${idUsuario}`
  );

  return response.data;
};

const bloquearJugador = async (idUsuarioLogueado, idUsuario) => {
  const response = await api.post(
    `/${idUsuarioLogueado}${JugadoresEndpoints.BLOQUEAR}${idUsuario}`
  );

  return response.data;
};

const desbloquearJugador = async (idUsuarioLogueado, idUsuario) => {
  const response = await api.post(
    `/${idUsuarioLogueado}${JugadoresEndpoints.DESBLOQUEAR}${idUsuario}`
  );

  return response.data;
};

export const JugadoresService = {
  actualizarPerfil,
  getJugadoresConJuegosEnComun,
  getPerfilUsuario,
  getPerfilEdicionUsuario,
  getAmigosDelUsuario,
  borrarAmigo,
  getJugadoresBusqueda,
  getUsuarioEstaBloqueado,
  getBloqueados,
  bloquearJugador,
  desbloquearJugador,
};
