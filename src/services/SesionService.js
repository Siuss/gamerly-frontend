import axios from "axios";
import { BASE_URL } from "./requestConfig"

const SesionEndpoints = {
    ELIMINAR_CUENTA: "/usuarios/"
}

const eliminarCuenta = async (id) => {
    const response = await axios.delete(
        `${BASE_URL}${SesionEndpoints.ELIMINAR_CUENTA}${id}`
    );

    return response.data;
}

export const SesionService = { eliminarCuenta }