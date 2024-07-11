import React, { useState, useEffect } from "react";
import { Modal } from "../atomos/modal/Modal";
import { StyleSheet, View } from "react-native";
import { CardChat } from "../bloques/CardChat";
import { Boton } from "../atomos/boton/Boton";
import { JugadoresService } from "../../services/JugadoresService";
import { useToast } from "../../hooks/useToast";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import hexToRgba from "hex-to-rgba";
import { Color } from "../../estilos/colores";
import { ChatService } from "../../services/ChatService";
import { useNavigation } from "@react-navigation/native";
import { rutas } from "../rutas/rutas"

export const ModalNuevoChat = ({ chats, visible, onOcultar, ...props }) => {
  const navigation = useNavigation();
  const [amigos, setAmigos] = useState([]);
  const { show } = useToast();

  const handleCancelar = () => {
    onOcultar();
  };

  const traerAmigos = async () => {
    const idUsuarioLogueado = await getUsuarioLogueadoId();
    const amigosEncontrados = await JugadoresService.getAmigosDelUsuario(
      idUsuarioLogueado
    );

    const idsUsuariosConChatAbierto = chats.map((chat) => chat.idUsuario);
    const amigosSinChat = amigosEncontrados.filter(
      (amigo) => !idsUsuariosConChatAbierto.includes(amigo.id)
    );

    setAmigos(amigosSinChat);
  };

  const handleChatClick = async (amigoId) => {
    const idUsuarioLogueado = await getUsuarioLogueadoId();
    console.log(idUsuarioLogueado, amigoId)
    const nuevoChat = await ChatService.crearChat(idUsuarioLogueado, amigoId);
    console.log('supuesto nuevo chatid', nuevoChat.id)
    navigation.navigate(rutas.chat, nuevoChat.id);
  };

  useEffect(() => {
    traerAmigos();
  }, []);

  return (
    <Modal
      visible={visible}
      onClose={onOcultar}
      style={styles.modal}
      {...props}
    >
      {amigos.map((amigo) => (
        <CardChat
          key={amigo.id}
          id={amigo.id}
          onChatClick={handleChatClick}
          style={styles.cardChat}
          nombre={amigo.nombre}
          foto={amigo.foto}
        />
      ))}
      <View style={styles.boton}>
        <Boton
          textStyle
          variante="primario"
          outline="secundario"
          onPress={handleCancelar}
        >
          Volver
        </Boton>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: "75%",
    display: "flex",
    gap: 16,
    borderRadius: 12,
  },
  cardChat: {
    backgroundColor: hexToRgba(Color.secundario, 0.2),
  },
  boton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
});
