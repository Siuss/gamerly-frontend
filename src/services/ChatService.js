import api from "./apiConfig.js"
import { BASE_URL } from "./requestConfig";

const ChatEndpoints = {
  CHATS: "/chats/",
  CHAT: "/chat/",
  LEER_CHAT: "/leer-chat/",
  NUEVO_CHAT: "/nuevo-chat/",
  MENSAJE: "/mensaje/",
};

const crearChat = async (idCreador, idReceptor) => {
  const response = await api.post(
    `/${idCreador}${ChatEndpoints.NUEVO_CHAT}${idReceptor}`
  );

  return response.data;
};

const getChatsDelUsuario = async (idUsuario) => {
  const response = await api.get(
    `${ChatEndpoints.CHATS}${idUsuario}`
  );

  return response.data;
};

const leerChat = async (idUsuario, idChat) => {
  const response = await api.get(`/${idUsuario}${ChatEndpoints.LEER_CHAT}${idChat}`);

  return response.data;
};

const enviarMensaje = async (
  idChat,
  idUsuarioCreador,
  idUsuarioReceptor,
  contenido
) => {
  const response = await api.post(
    `${ChatEndpoints.MENSAJE}${idChat}`,
    { idUsuarioCreador, idUsuarioReceptor, contenido }
  );

  return response.data;
};

export const ChatService = {
  crearChat,
  getChatsDelUsuario,
  enviarMensaje,
  leerChat
};
