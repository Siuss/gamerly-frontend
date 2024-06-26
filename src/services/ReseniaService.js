import axios from "axios";
import { BASE_URL } from './requestConfig'

const ReseniaEndpoints = {
    AGREGAR_RESENIA: "/crear-resenia/",
    RESENIAS: "/resenias/"
};

const enviarResenia = async (idUsuarioEmisor, idUsuarioReceptor, resenia) => {
    const response = await axios.post(
        `${BASE_URL}${ReseniaEndpoints.AGREGAR_RESENIA}${idUsuarioEmisor}/${idUsuarioReceptor}`, resenia
    );

    return response.data;
};

const getResenias = async (idUsuario) => {
    const response = await axios.get(
        `${BASE_URL}${ReseniaEndpoints.RESENIAS}${idUsuario}`
    );

    return response.data;
}

export const ReseniaService = { enviarResenia, getResenias };
