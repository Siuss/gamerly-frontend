import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Resenias } from "../vistas/Reseñas";
import { BusquedaDeJugadores } from "../vistas/BusquedaDeJugadores";
import { HeaderTitle } from "../header/headerTitle";

const Stack = createStackNavigator();

const AppRutas = () => {
  const titulo = 'Busqueda Jugadores';
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="busquedaDeJugadores"
        screenOptions={{
          header: (props) => <HeaderTitle {...props} title={titulo}/>
        }}
      >
        <Stack.Screen titulo="reseñas" name="resenias" component={Resenias} />
        <Stack.Screen titulo="busquedaDeJugadores" name="busquedaDeJugadores" component={BusquedaDeJugadores} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRutas;
