import { create } from "zustand";

const defaultToastDurationMs = 2000;
const INTERNAL_SERVER_ERROR = 500;

const useToastStore = create((set) => ({
  toast: null,
  show: (variant, text, duration = defaultToastDurationMs) =>
    set({ toast: { variant, text, duration } }),
  hide: () => set({ toast: null }),
}));

export const errorToast = (error) => {
  const response = error.response ? error.response : "Error de dominio";
  const status = error.response ? response.status : 400;
  const message = response.data ? response.data.message : error.message;

  const mensajeError =
    status >= INTERNAL_SERVER_ERROR
      ? "Ocurrió un error. Consulte al administrador del sistema"
      : status === undefined
      ? "Ocurrió un error al conectarse al backend. Consulte al administrador del sistema"
      : message;

  if (status >= INTERNAL_SERVER_ERROR) {
    console.error(error);
  }

  useToastStore.getState().show("error", mensajeError);
};

export default useToastStore;