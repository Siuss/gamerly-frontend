import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Resenias } from "../vistas/Reseñas";
import { BusquedaDeJugadores } from "../vistas/BusquedaDeJugadores";
import { HeaderTitle } from "../header/headerTitle";
import NavBar from "../bloques/Navbar";
import { View, StyleSheet } from "react-native";
import { BusquedaAvanzada } from "../vistas/BusquedaAvanzada";
import { VistaPerfil } from "../vistas/VistaPerfil";
import { PerfilJugador } from "../vistas/PerfilJugador";
import { Login } from "../vistas/Login";
import { Inicio } from "../vistas/Inicio";
import { Registro } from "../vistas/Registro";

const Stack = createStackNavigator();
const titlesConfig = {
  resenias: "Reseñas",
  busquedaDeJugadores: "Busqueda Jugadores",
  miPerfil: "Mi Perfil",
  busquedaAvanzada: "Busqueda Avanzada",
  perfilJugador: "Perfil Jugador",
};

export const rutas = {
  amigos: "amigos",
  busquedaDeJugadores: "busquedaDeJugadores",
  comunidad: "comunidad",
  perfilJugador: "perfilJugador",
  resenias: "resenias",
  miPerfil: "miPerfil",
};

const AppRutas = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer style={styles.navigationContainer}>
        <Stack.Navigator
          initialRouteName="inicio"
          screenOptions={({ route }) => ({
            header: (props) => (
              <HeaderTitle {...props} title={titlesConfig[route.name]} />
            ),
          })}
        >
          <Stack.Screen
            titulo="reseñas"
            name="resenias"
            component={Resenias}
          />
          <Stack.Screen
            name="inicio"
            component={Inicio}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="login"
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="registro"
            component={Registro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            titulo="perfilJugador"
            name="perfilJugador"
            component={PerfilJugador}
          />
          <Stack.Screen
            titulo="busquedaDeJugadores"
            name="busquedaDeJugadores"
            component={BusquedaDeJugadores}
          />
          <Stack.Screen
            titulo="miPerfil"
            name="miPerfil"
            component={VistaPerfil}
          />
          <Stack.Screen
            titulo="busquedaAvanzada"
            name="busquedaAvanzada"
            component={BusquedaAvanzada}
          />
        </Stack.Navigator>
        <NavBar style={styles.navBar} />
      </NavigationContainer>
    </View>
  );
};

export default AppRutas;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: "column",
  },
  navigationContainer: {
    display: 'flex',
    flex: 1,
  },
  navBar: {
    height: 50,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
});
