import React from "react";
import AppRutas from "./src/componentes/rutas/AppRutas";
import { StyleSheet } from "react-native";
import ToastManager from "toastify-react-native";
import { Color } from "./src/estilos/colores";

const App = () => {
  return (
    <>
      <ToastManager style={styles.toast} textStyle={styles.toastText} />
      <AppRutas />
    </>
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
