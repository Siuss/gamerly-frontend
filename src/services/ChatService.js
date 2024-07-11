import axios from "axios";
import { BASE_URL } from "./requestConfig";

const ChatEndpoints = {
  CHATS: "/chats/",
  CHAT: "/chat/",
  NUEVO_CHAT: "/nuevo-chat/",
  MENSAJE: "/mensaje/",
};

const crearChat = async (idCreador, idReceptor) => {
  console.log(
    `${BASE_URL}/${idCreador}${ChatEndpoints.NUEVO_CHAT}${idReceptor}`
  );
  const response = await axios.post(
    `${BASE_URL}/${idCreador}${ChatEndpoints.NUEVO_CHAT}${idReceptor}`
  );

  return response.data;
};

const getChatsDelUsuario = async (idUsuario) => {
  const response = await axios.get(
    `${BASE_URL}${ChatEndpoints.CHATS}${idUsuario}`
  );

  return response.data;
};

const getChatById = async (idChat) => {
  const response = await axios.get(`${BASE_URL}${ChatEndpoints.CHAT}${idChat}`);

  return response.data;
};

const enviarMensaje = async (
  idChat,
  idUsuarioCreador,
  idUsuarioReceptor,
  contenido
) => {
  console.log(`${BASE_URL}${ChatEndpoints.MENSAJE}${idChat}`)
  console.log({ idUsuarioCreador, idUsuarioReceptor, contenido })
  const response = await axios.post(
    `${BASE_URL}${ChatEndpoints.MENSAJE}${idChat}`,
    { idUsuarioCreador, idUsuarioReceptor, contenido }
  );

  return response.data;
};

export const ChatService = {
  crearChat,
  getChatsDelUsuario,
  getChatById,
  enviarMensaje,
};
