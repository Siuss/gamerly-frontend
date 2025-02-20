import { create } from "zustand"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

// Se usa AsyncStorage porque localStorage no va a funcionar en mobile, solo en web
const useStore = create((set) => ({
    user: null,
    token: null,
    isLoggedIn: false,

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
    
        set({ user: userData, token, isLoggedIn: true });}
}));


export default useStore;
