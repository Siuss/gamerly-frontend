import React, { useCallback, useState } from "react";
import { View, FlatList, StyleSheet } from "react-native";
import { CardChat } from "../bloques/CardChat";
import { Color } from "../../estilos/colores";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import { ChatService } from "../../services/ChatService";
import { useToast } from "../../hooks/useToast";
import { rutas } from "../rutas/rutas";
import { BotonFlotante } from "../atomos/botonFlotante/BotonFlotante";
import { ModalNuevoChat } from "../bloques/ModalNuevoChat";

export const ListaDeChats = () => {
  const { show } = useToast();
  const [chats, setChats] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const handleVisibilidadModal = () => {
    setModalVisible((esVisible) => !esVisible);
  };

  const handleCardClick = (id) => {
    console.log(id)
    navigation.navigate(rutas.chat, id);
  };

  const traerChats = async () => {
    try {
      const idUsuarioLogueado = await getUsuarioLogueadoId();
      const listaChats = await ChatService.getChatsDelUsuario(
        idUsuarioLogueado
      );
      console.log(listaChats)

      const listaChatsAdaptada = listaChats.map((chat) => {
        if (chat.usuario1.id === idUsuarioLogueado) {
          return {
            ...chat.usuario2,
            idUsuario: chat.usuario2.id,
            ultimoMensaje: chat.mensajes.at(-1)?.contenido,
            id: chat.id
          };
        }

        return {
          ...chat.usuario1,
          idUsuario: chat.usuario1.id,
          ultimoMensaje: chat.mensajes.at(-1)?.contenido,
          id: chat.id
        };
      });

      setChats(listaChatsAdaptada);
    } catch {
      show("error", "Hubo un error inesperado intentalo mas tarde");
    }
  };

  useFocusEffect(
    useCallback(() => {
      traerChats();

      return () => {
        setChats([]);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={styles.flatContainer}
        data={chats}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardChat
            key={item.id}
            nombre={item.nombre}
            ultimoMensaje={item.ultimoMensaje}
            foto={item.foto}
            onChatClick={() => handleCardClick(item.id)}
          />
        )}
      />
      <BotonFlotante
        style={styles.botonAgregar}
        name="add"
        onPress={handleVisibilidadModal}
      />
      <ModalNuevoChat
        visible={modalVisible}
        onOcultar={handleVisibilidadModal}
        chats={chats}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 16,
    padding: 16,
    backgroundColor: Color.neutro,
  },
  flatContainer: {
    gap: 16,
  },
  botonAgregar: {
    position: "absolute",
    bottom: 16,
    right: 16,
  },
});
