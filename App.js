import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { Card } from "./src/componentes/bloques/Card";
import Busqueda from "./src/componentes/bloques/Busqueda";
import React from 'react';
import AppRutas from './src/componentes/rutas/rutas'

const App = () => {
  return (
    <View style={styles.container}>
      <Busqueda/>
      <Card
        nombreUsuario="Nanami"
        foto="https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg"
        amigos={["andylarquy", "solidfox"]}
      />
      <StatusBar style="auto" />
        <NavBar/>
    </View>
      <AppRutas />
  );
}

export default App;

