import axios from "axios";
import { BASE_URL } from './requestConfig'

const JugadoresEndpoints = {
    JUGADORES_CON_JUEGOS_EN_COMUN: "/to do/",
};

const getJuegadoresConJuegosEnComun = async (idJuego) => {
    response = await axios.get(
        `${BASE_URL}${JugadoresEndpoints.JUGADORES_CON_JUEGOS_EN_COMUN}${idJuego}`
    );

    return response.data;
};

export const JugadoresService = { getJuegadoresConJuegosEnComun };
