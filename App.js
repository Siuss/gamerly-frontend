import React from 'react';
import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native-web'; // Importa componentes de react-native-web
import FotoDePerfil from './src/componentes/atomos/fotoDePerfil/FotoDePerfil';
import { BusquedaDeJugadores } from "./src/componentes/vistas/BusquedaDeJugadores";
import Parrafo from './src/componentes/atomos/parrafo/Parrafo';
import HeaderTitle from './src/componentes/header/headerTitle';
import NavBar from "./src/componentes/bloques/Navbar";

export default function App() {
  const titulo = 'Home';
  return (
    <View style={styles.container}>
      <HeaderTitle title={titulo} />
      {/* <FotoDePerfil src='https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg' />
      <BusquedaDeJugadores />*/}
 
      <StatusBar style="auto" /> 
     
      <NavBar />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
