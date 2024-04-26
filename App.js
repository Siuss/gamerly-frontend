
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import HeaderTitle from './src/componentes/header/headerTitle';
import { BusquedaDeJugadores } from "./src/componentes/vistas/BusquedaDeJugadores";

export default function App() {
  const titulo = 'Home';
  return (
    <View>
      <HeaderTitle title={titulo} />
      <BusquedaDeJugadores />
    </View>
  )}