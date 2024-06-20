import { create } from "zustand"

const UseStore = create((set) => {
    const userId = localStorage.getItem("userId")
    const user = JSON.parse(localStorage.getItem("user")) || {}
    return {
        isLoggedIn: !!userId,
        userId,
        user,
        login: () => {
            set({ isLoggedIn: true })
            if (userId) {
                localStorage.setItem("userId", userId)
                set({ userId })
            }
        },
        logout: () => {
            localStorage.removeItem("userId")
            localStorage.removeItem("userFotoPerfil")
            localStorage.removeItem("nombreApellido")
            set({ isLoggedIn: false, userId: null, user: {} })
        },
        setUser: (userData) => {
            localStorage.setItem("userId", userData.id)
            localStorage.setItem("userFotoPerfil", userData.foto)
            localStorage.setItem("user", JSON.stringify(userData))
            set({ user: userData,})
        },
    }
})

export default UseStore