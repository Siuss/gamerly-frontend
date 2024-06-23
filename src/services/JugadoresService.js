import axios from "axios";
import { BASE_URL } from './requestConfig'

const JugadoresEndpoints = {
    JUGADORES_CON_JUEGOS_EN_COMUN: "/jugadoresPorJuego/",
    PERFIL_USUARIO: "/detalle/",
};

const getJuegadoresConJuegosEnComun = async (idJuego) => {
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

export const JugadoresService = { getJuegadoresConJuegosEnComun, getPerfilUsuario };
