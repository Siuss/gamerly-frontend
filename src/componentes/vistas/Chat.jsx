import React, { useState, useCallback, useRef } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { BurbujaChat } from "../bloques/BurbujaChat";
import { Color } from "../../estilos/colores";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import { ChatService } from "../../services/ChatService";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Ionicons } from "@expo/vector-icons";
import { Parrafo } from "../atomos/parrafo/Parrafo";

const REFRESCO_CHAT_MS = 500;

const ChatScreen = () => {
  const intervalRef = useRef(null);
  const navigation = useNavigation();
  const [chat, setChat] = useState({});
  const [perfilAmigo, setPerfilAmigo] = useState({});
  const [inputMensaje, setInputMensaje] = useState("");
  const { params: idChat } = navigation.getState().routes.at(-1);

  const [mensajes, setMensajes] = useState([]);

  const handleNavigateBack = () => {
    const rutaAnterior = navigation.getState().routes.at(-2);
    navigation.navigate(rutaAnterior.name, rutaAnterior.params);
  };

  const handleEnviarMensaje = async () => {
    setInputMensaje("");
    if (!inputMensaje.trim()) return;
    const idUsuarioLogueado = await getUsuarioLogueadoId();
    await ChatService.enviarMensaje(
      chat.id,
      idUsuarioLogueado,
      perfilAmigo.id,
      inputMensaje.trim()
    );
    await traerChat();
  };

  const traerChat = async () => {
    const idUsuarioLogueado = await getUsuarioLogueadoId();
    const nuevoChat = await ChatService.leerChat(idUsuarioLogueado, idChat);

    if (nuevoChat.usuario1.id === idUsuarioLogueado) {
      setPerfilAmigo(nuevoChat.usuario2);
    } else {
      setPerfilAmigo(nuevoChat.usuario1);
    }

    setChat(nuevoChat);

    setMensajes(
      nuevoChat.mensajes.map((mensaje) => ({
        id: mensaje.id,
        fecha: mensaje.fecha,
        contenido: mensaje.contenido,
        esPropio: mensaje.idCreador === idUsuarioLogueado,
      }))
    );
  };

  useFocusEffect(
    useCallback(() => {
      traerChat();

      // eslint-disable-next-line no-undef, react-hooks/exhaustive-deps
      intervalRef.current = setInterval(traerChat, REFRESCO_CHAT_MS);

      return () => {
        // eslint-disable-next-line no-undef
        clearInterval(intervalRef.current);
      };

      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={handleNavigateBack}
          style={styles.botonVolver}
        >
          <Ionicons name="arrow-back" size={24} color={Color.blanco} />
        </TouchableOpacity>
        <FotoDePerfil src={perfilAmigo.foto} height={48} width={48} />
        <Parrafo variante="blancoM" style={styles.nombre}>
          {perfilAmigo.nombre}
        </Parrafo>
      </View>
      <ScrollView style={styles.chatContainer}>
        {mensajes.map((mensaje) => (
          <BurbujaChat
            key={mensaje.id}
            mensaje={mensaje.contenido}
            fecha={mensaje.fecha}
            esPropio={mensaje.esPropio}
          />
        ))}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mensaje..."
          placeholderTextColor={Color.gris}
          value={inputMensaje}
          onChangeText={setInputMensaje}
        />
        <TouchableOpacity
          style={styles.botonEnviar}
          onPress={handleEnviarMensaje}
        >
          <Ionicons name="send" size={24} color={Color.secundario} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutro,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.primario,
    padding: 16,
    borderBottomRightRadius: 16,
    borderBottomLeftRadius: 16,
  },
  botonVolver: {
    marginRight: 16,
  },
  nombre: {
    marginLeft: 16,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Color.primario,
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Color.neutro,
    color: Color.blanco,
    padding: 10,
    borderRadius: 20,
    borderColor: Color.bordeBoton,
    borderWidth: 1,
  },
  botonEnviar: {
    marginLeft: 8,
  },
});

export default ChatScreen;
