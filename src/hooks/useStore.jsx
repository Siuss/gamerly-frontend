import { create } from "zustand";

const useStore = create((set) => {
    const userId = localStorage.getItem("userId");
    const user = JSON.parse(localStorage.getItem("user")) || {};
    return {
        isLoggedIn: !!userId,
        userId,
        user,
        login: (newUserId, newUser) => {
            set({ isLoggedIn: true, userId: newUserId, user: newUser });
            localStorage.setItem("userId", newUserId);
            localStorage.setItem("user", JSON.stringify(newUser));
        },
        logout: () => {
            localStorage.removeItem("userId");
            localStorage.removeItem("userFotoPerfil");
            localStorage.removeItem("nombreApellido");
            localStorage.removeItem("user");
            set({ isLoggedIn: false, userId: null, user: {} });
        },
        setUser: (userData) => {
            localStorage.setItem("userId", userData.id);
            localStorage.setItem("userFotoPerfil", userData.foto);
            localStorage.setItem("user", JSON.stringify(userData));
            set({ user: userData });
        },
    };
});

export default useStore;
