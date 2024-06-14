import axios from "axios";
import { BASE_URL } from "./requestConfig"

const SesionEndpoints = {
    ELIMINAR_CUENTA: "/usuarios/",
    LOGIN: "/login"
}

const login = async (credenciales) => {
    const response = await axios.post(
        `${BASE_URL}${SesionEndpoints.LOGIN}`,
        credenciales
    );

    return response.data;
}

const eliminarCuenta = async (id) => {
    const response = await axios.delete(
        `${BASE_URL}${SesionEndpoints.ELIMINAR_CUENTA}${id}`
    );

    return response.data;
}

//const registrarUsuario = async (datosNuevoUsuario) => {}

export const SesionService = { eliminarCuenta, login }