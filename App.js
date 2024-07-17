import React from "react";
import AppRutas from "./src/componentes/rutas/AppRutas";
import { LogBox, StyleSheet } from "react-native";
import { Color } from "./src/estilos/colores";
import { ToastProvider } from "./src/providers/toast-provider/ToastProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  LogBox.ignoreAllLogs()

  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AppRutas />
      </ToastProvider>
    </SafeAreaProvider>
  );
};

export default App;
