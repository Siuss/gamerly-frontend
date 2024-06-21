import axios from "axios";
import { BASE_URL } from './requestConfig'

const JuegosEndpoints = {
    LISTA_JUEGOS: "/listaJuegos",
};

const getJuegos = async () => {
    response = await axios.get(
        `${BASE_URL}${JuegosEndpoints.LISTA_JUEGOS}`, { params: { numero: 5 } }
    );

    return response.data;
};

export const JuegosService = { getJuegos };
