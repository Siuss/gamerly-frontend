import React, { useEffect } from "react";
import AppRutas from "./src/componentes/rutas/AppRutas";
import { LogBox, StyleSheet } from "react-native";
import { Color } from "./src/estilos/colores";
import { ToastProvider } from "./src/providers/toast-provider/ToastProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NotificacionesService } from "./src/services/NotificacionesService";

const App = () => {
  LogBox.ignoreAllLogs()

  useEffect(() => {
    NotificacionesService.obtenerTokenDeNotificaciones();
    console.log('Obteniendo token de notificaciones', NotificacionesService.obtenerTokenDeNotificaciones());
  }, []);


  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AppRutas />
      </ToastProvider>
    </SafeAreaProvider>
  );
};

export default App;
