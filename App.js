import React from "react";
import AppRutas from "./src/componentes/rutas/AppRutas";
import { StyleSheet } from "react-native";
import { Color } from "./src/estilos/colores";
import { ToastProvider } from "./src/providers/toast-provider/ToastProvider";
import { SafeAreaProvider } from "react-native-safe-area-context";

const App = () => {
  return (
    <SafeAreaProvider>
      <ToastProvider>
        <AppRutas />
      </ToastProvider>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  toast: {
    backgroundColor: Color.primario,
  },
  toastText: {
    color: Color.blanco,
  },
});

export default App;
