import { create } from "zustand"; 
import AsyncStorage from "@react-native-async-storage/async-storage";

// Se usa AsyncStorage porque localStorage no va a funcionar en mobile, solo en web
const useStore = create((set) => {
    return {
        getIdUsuarioLogueado: async () => JSON.parse(await AsyncStorage.getItem("usuario"))?.id || {},
        getUsuarioLogueado: async () => JSON.parse(await AsyncStorage.getItem("usuario")) || {}, 
        logout: async () => {
            await AsyncStorage.removeItem("usuario");
            set({ isLoggedIn: false, userId: null, user: {} });
        },
        setUsuarioLogueado: async (userData) => {
            await AsyncStorage.setItem("usuario", JSON.stringify(userData));
            set({ user: userData });
        },
    };
});

export default useStore;
