import { create } from "zustand";

const useThemeStore = create((set) => ({
  theme: "dark", // Por defecto
  setTheme: (theme) => set({ theme }),
}));

export default useThemeStore;