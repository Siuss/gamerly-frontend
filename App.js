
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FotoDePerfil from './src/componentes/atomos/fotoDePerfil/FotoDePerfil';
import Parrafo from './src/componentes/atomos/parrafo/Parrafo';
import HeaderTitle from './src/componentes/header/headerTitle';
import { BusquedaDeJugadores } from "./src/componentes/vistas/BusquedaDeJugadores";

export default function App() {
  const titulo = 'Home';
  return (
    <View style={styles.container}>
      <HeaderTitle title={titulo} />
      <FotoDePerfil src='https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg'/>
      <Parrafo variante='blancoS' subrayado>hola confundido</Parrafo>
      <BusquedaDeJugadores />;
      <StatusBar style="auto" />
    </View>
  )}