import axios from "axios";
import { BASE_URL } from './requestConfig'

const JuegosEndpoints = {
    LISTA_JUEGOS: "/listaJuegos",
};

const getJuegos = async () => {
   const response = await axios.get(
        `${BASE_URL}${JuegosEndpoints.LISTA_JUEGOS}`, { params: { numero: 10 } }
    );

    return response.data;
  
};

const getJuegosPorNombre = async (Nombre) => {
    const response = await axios.get(
        `${BASE_URL}${JuegosEndpoints.LISTA_JUEGOS}/${Nombre}`,
    );

    return response.data;
}
export const JuegosService = { getJuegos,getJuegosPorNombre };//
