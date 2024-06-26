import axios from "axios";
import { BASE_URL } from './requestConfig'

const JugadoresEndpoints = {
    JUGADORES_CON_JUEGOS_EN_COMUN: "/jugadoresPorJuego/",
    PERFIL_USUARIO: "/detalle/",
    AMIGOS: "/amigos/"
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
}

const getAmigosDelUsuario = async (idUsuario) => {
    response = await axios.get(
        `${BASE_URL}${JugadoresEndpoints.AMIGOS}${idUsuario}`
    );

    return response.data;
}

const borrarAmigo = async (idUsuario, idAmigo) => {
    response = await axios.post(
        `${BASE_URL}/${idUsuario}${JugadoresEndpoints.AMIGOS}${idAmigo}`
    );

    return response.data;
}

export const JugadoresService = { getJugadoresConJuegosEnComun, getPerfilUsuario, getAmigosDelUsuario, borrarAmigo };
