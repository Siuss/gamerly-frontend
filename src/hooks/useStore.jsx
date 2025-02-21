import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ChatService } from "../services/ChatService";

const useStore = create((set) => ({
    user: null,
    token: null,
    isLoggedIn: false,
    unreadMessagesCount: 0,

    getIdUsuarioLogueado: async () => {
        try {
            const usuarioStr = await AsyncStorage.getItem("usuario");
            const usuario = JSON.parse(usuarioStr);

            if (!usuario || (!usuario.id && usuario.id !== 0)) {
                console.warn("⚠ El usuario no tiene ID válido", usuario);
                return null;
            }

            return usuario.id;
        } catch (error) {
            console.error("❌ Error al obtener ID de usuario:", error);
            return null;
        }
    },

    getUsuarioLogueado: async () => {
        try {
            const usuarioStr = await AsyncStorage.getItem("usuario");
            return usuarioStr ? JSON.parse(usuarioStr) : null;
        } catch (error) {
            console.error("❌ Error al obtener usuario:", error);
            return null;
        }
    },

    logoutStorage: async () => {
        await AsyncStorage.removeItem("usuario");
        await AsyncStorage.removeItem("token");
        set({ isLoggedIn: false, user: null, token: null });
    },

    getToken: async () => {
        return await AsyncStorage.getItem("token") || null;
    },

    setUsuarioLogueado: async (userData, token) => {
        console.log("📝 Guardando usuario en AsyncStorage:", userData);

        // Store the full user data to retrieve later
        await AsyncStorage.setItem("usuario", JSON.stringify(userData));

        // Store the token
        await AsyncStorage.setItem("token", token);

        set({ user: userData, token, isLoggedIn: true });

        // Actualizar el contador de mensajes no leídos
        useStore.getState().actualizarContadorMensajesNoLeidos();

        useStore.getState().iniciarIntervaloDeActualizacion();
    },

    setUnreadMessagesCount: (count) => set({ unreadMessagesCount: count }),


    getUnreadMessagesCount: () => {
        return useStore.getState().unreadMessagesCount;
    },

    iniciarIntervaloDeActualizacion: () => {
        const intervalo = setInterval(() => {
            useStore.getState().actualizarContadorMensajesNoLeidos();
        }, 500);

        return () => clearInterval(intervalo);
    },

    actualizarContadorMensajesNoLeidos: async () => {
        try {
            const idUsuarioLogueado = JSON.parse(
                await AsyncStorage.getItem("usuario")
            ).id;

            const listaChats = await ChatService.getChatsDelUsuario(idUsuarioLogueado);


            const totalNoLeidos = listaChats.reduce((total, chat) => {
                return (
                    total +
                    chat.mensajes.filter(
                        (mensaje) => mensaje.idReceptor === idUsuarioLogueado && !mensaje.leido
                    ).length
                );
            }, 0);
            set({ unreadMessagesCount: totalNoLeidos });
        } catch (error) {
            console.error("Error al actualizar mensajes no leídos:", error);
        }
    },
}));


export default useStore;
