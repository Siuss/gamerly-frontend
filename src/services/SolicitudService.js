import api from "./apiConfig"

const SolicitudEndpoint = {
    SOLICITUD_PENDIENTE: "/solicitud-pendiente/",
    SOLICITUD: "/solicitud/",
    AMISTAD: "/amistad/",
    SOLICITUDES_PENDIENTES: "/solicitudes-pendientes/",
    ACEPTAR: "/aceptar",
    RECHAZAR: "/rechazar",
}

const solicitarAmistad = async (idUsuarioCreador, idAmigo, mensaje) => {
    const response = await api.post(
        `${SolicitudEndpoint.SOLICITUD}${idUsuarioCreador}${SolicitudEndpoint.AMISTAD}${idAmigo}`,
        { mensaje }
    );

    return response.data;
}

const getSolicitudPendiente = async (idUsuarioCreador, idAmigo) => {
    const response = await api.get(
        `${SolicitudEndpoint.SOLICITUD_PENDIENTE}${idUsuarioCreador}${SolicitudEndpoint.AMISTAD}${idAmigo}`
    );

    return response.data;
}

const getSolicitudesPendientes = async (idUsuario) => {
    const response = await api.get(
        `${SolicitudEndpoint.SOLICITUDES_PENDIENTES}${idUsuario}`
    );

    return response.data;
}

const aceptarSolicitud = async (idSolicitud) => {
    const response = await api.post(
        `${SolicitudEndpoint.SOLICITUD}${idSolicitud}${SolicitudEndpoint.ACEPTAR}`
    );

    return response.data;
}

const rechazarSolicitud = async (idSolicitud) => {
    const response = await api.post(
        `${SolicitudEndpoint.SOLICITUD}${idSolicitud}${SolicitudEndpoint.RECHAZAR}`
    );

    return response.data;
}

export const SolicitudService = {
    solicitarAmistad,
    getSolicitudPendiente,
    getSolicitudesPendientes,
    aceptarSolicitud,
    rechazarSolicitud
}