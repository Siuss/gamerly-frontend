import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Resenias } from "../vistas/Reseñas.jsx";
import { HeaderTitle } from "../header/HeaderTitle.jsx";
import { View, StyleSheet } from "react-native";
import { BusquedaAvanzada } from "../vistas/BusquedaAvanzada.jsx";
import { VistaPerfil } from "../vistas/VistaPerfil.jsx";
import { PerfilJugador } from "../vistas/PerfilJugador.jsx";
import { Login } from "../vistas/Login.jsx";
import { Inicio } from "../vistas/Inicio.jsx";
import { Registro } from "../vistas/Registro.jsx";
import { RecuperarContrasena } from "../vistas/RecuperarContrasena.jsx";
import { Jugadores } from "../vistas/Jugadores.jsx";
import { Amigos } from "../vistas/Amigos.jsx";
import NavBar from "../bloques/Navbar.jsx";
import useNavBarStore from "../../hooks/useNavbarStore.jsx";
import { Juegos } from "../vistas/Juegos.jsx";
import { ReseniaJugador } from "../vistas/ReseniaJugador.jsx";
import { SolicitudesPendientes } from "../vistas/SolicitudesPendientes.jsx";
import { Color } from "../../estilos/colores.js";
import ToastManager from "toastify-react-native";
import { rutas, titlesConfig } from "./rutas.js";
import { ReseniasPendientes } from "../vistas/ReseniasPendientes";

const Stack = createStackNavigator();

const AppRutas = () => {
  const excludeLoading = useNavBarStore((state) => state.excludeLoading);
  useEffect(() => {
    excludeLoading();
  }, [excludeLoading]);

  return (
    <View style={styles.container}>
      <ToastManager style={styles.toast} textStyle={styles.toastText} />
      <NavigationContainer style={styles.navigationContainer}>
        <Stack.Navigator
          initialRouteName="inicio"
          screenOptions={({ route }) => ({
            header: (props) => (
              <HeaderTitle {...props} title={titlesConfig[route.name]} />
            ),
          })}
        >
          <Stack.Screen titulo="reseñas" name="resenias" component={Resenias} />
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
          <Stack.Screen titulo="Amigos" name="amigos" component={Amigos} />
          <Stack.Screen
            name="recuperarContrasena"
            component={RecuperarContrasena}
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
            titulo="miPerfil"
            name="miPerfil"
            component={VistaPerfil}
          />
          <Stack.Screen
            titulo="busquedaAvanzada"
            name="busquedaAvanzada"
            component={BusquedaAvanzada}
          />
          <Stack.Screen
            titulo={rutas.jugadores}
            name={rutas.jugadores}
            component={Jugadores}
          />
          <Stack.Screen
            titulo={rutas.juegos}
            name={rutas.juegos}
            component={Juegos}
          />
          <Stack.Screen
            titulo={rutas.reseniaJugador}
            name={rutas.reseniaJugador}
            component={ReseniaJugador}
          />
          <Stack.Screen
            titulo={rutas.solicitudesPendientes}
            name={rutas.solicitudesPendientes}
            component={SolicitudesPendientes}
          />
          <Stack.Screen
            titulo={rutas.reseniasPendientes}
            name={rutas.reseniasPendientes}
            component={ReseniasPendientes}
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
    display: "flex",
    flex: 1,
    flexDirection: "column",
  },
  navigationContainer: {
    display: "flex",
    flex: 1,
  },
  navBar: {
    height: 50,
    backgroundColor: "lightblue",
    justifyContent: "center",
    alignItems: "center",
  },
  toast: {
    backgroundColor: Color.primario,
  },
  toastText: {
    color: Color.blanco,
  },
});
