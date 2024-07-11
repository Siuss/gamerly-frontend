import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Resenias } from "../vistas/Reseñas.jsx";
import { HeaderTitle } from "../header/HeaderTitle.jsx";
import { View, StyleSheet } from "react-native";
import { BusquedaAvanzada } from "../vistas/BusquedaAvanzada.jsx";
import { VistaMiPerfil } from "../vistas/VistaMiPerfil.jsx";
import { PerfilJugador } from "../vistas/PerfilJugador.jsx";
import { Login } from "../vistas/Login.jsx";
import { Inicio } from "../vistas/Inicio.jsx";
import { Registro } from "../vistas/Registro.jsx";
import { RecuperarContrasena } from "../vistas/RecuperarContrasena.jsx";
import { Jugadores } from "../vistas/Jugadores.jsx";
import NavBar from "../bloques/Navbar.jsx";
import useNavBarStore from "../../hooks/useNavbarStore.jsx";
import { Juegos } from "../vistas/Juegos.jsx";
import { ReseniaJugador } from "../vistas/ReseniaJugador.jsx";
import { SolicitudesPendientes } from "../vistas/SolicitudesPendientes.jsx";
import { rutas, titlesConfig, mostrarBotonDeVolver } from "../rutas/rutas.js";
import { ReseniasPendientes } from "../vistas/ReseniasPendientes";
import { navigationRef } from "../../resolvers/NotificationResolver.js";
import { useNotificationListener } from "../../hooks/useNotificationListener";
import { IngresarTokenContrasena } from "../vistas/IngresarTokenContrasena.jsx";
import { CrearNuevaClave } from "../vistas/CrearNuevaClave.jsx";
import { ListaDeChats } from "../vistas/ListaDeChats.jsx";
import ChatScreen from "../vistas/Chat.jsx";
import { Toast } from "../bloques/Toast.jsx";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Amigos } from "../vistas/Amigos.jsx"

const Stack = createStackNavigator();

const AppRutas = () => {
  const excludeLoading = useNavBarStore((state) => state.excludeLoading);
  const insets = useSafeAreaInsets();

  useEffect(() => {
    excludeLoading();
  }, [excludeLoading]);

  useNotificationListener();

  const dynamicStyles = StyleSheet.create({
    container: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      paddingLeft: insets.left,
      paddingRight: insets.right,
    },
  });

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <NavigationContainer
        style={styles.navigationContainer}
        ref={navigationRef}
      >
        <Stack.Navigator
          initialRouteName="inicio"
          screenOptions={({ route }) => ({
            header: (props) => (
              <HeaderTitle
                {...props}
                title={titlesConfig[route.name]}
                showBackButton={mostrarBotonDeVolver.includes(route.name)}
              />
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
            name={rutas.login}
            component={Login}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            titulo={rutas.chats}
            name={rutas.chats}
            component={ListaDeChats}
          />
          <Stack.Screen
            name="recuperarContrasena"
            component={RecuperarContrasena}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={rutas.ingresarTokenContrasenia}
            component={IngresarTokenContrasena}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name={rutas.crearNuevaClave}
            component={CrearNuevaClave}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="registro"
            component={Registro}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            titulo={titlesConfig.perfilJugador}
            name={rutas.perfilJugador}
            component={PerfilJugador}
          />
          <Stack.Screen
            titulo={titlesConfig.miPerfil}
            name={rutas.miPerfil}
            component={VistaMiPerfil}
          />
          <Stack.Screen
            titulo={titlesConfig.busquedaAvanzada}
            name={rutas.busquedaAvanzada}
            component={BusquedaAvanzada}
          />
           <Stack.Screen
            titulo={rutas.amigos}
            name={rutas.amigos}
            component={Amigos}
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
          <Stack.Screen
            titulo={rutas.chat}
            name={rutas.chat}
            component={ChatScreen}
          />
        </Stack.Navigator>
        <NavBar style={styles.navBar} />
      </NavigationContainer>
      <Toast />
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
});
