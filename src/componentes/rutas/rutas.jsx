import React, { useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Resenias } from "../vistas/Reseñas";
import HeaderTitle from "../header/headerTitle";
import { View, StyleSheet } from "react-native";
import { BusquedaAvanzada } from "../vistas/BusquedaAvanzada";
import { VistaPerfil } from "../vistas/VistaPerfil";
import { PerfilJugador } from "../vistas/PerfilJugador";
import { Login } from "../vistas/Login";
import { Inicio } from "../vistas/Inicio";
import { Registro } from "../vistas/Registro";
import { RecuperarContrasena } from "../vistas/RecuperarContrasena";
import { Jugadores } from "../vistas/Jugadores";
import { Amigos } from "../vistas/Amigos";
import NavBar from "../bloques/Navbar";
import useNavBarStore from "../../hooks/useNavbarStore";
import { Juegos } from "../vistas/Juegos"
import { ReseniaJugador } from "../vistas/ReseniaJugador.jsx";
import { SolicitudesPendientes } from "../vistas/SolicitudesPendientes.jsx";
import { Color } from '../../estilos/colores.js'
import ToastManager from 'toastify-react-native'

const Stack = createStackNavigator();
const titlesConfig = {
  resenias: "Reseñas",
  miPerfil: "Mi Perfil",
  busquedaAvanzada: "Busqueda Avanzada",
  perfilJugador: "Perfil Jugador",
  amigos: "Amigos",
  juegos: "Juegos",
  jugadores: "Jugadores",
  reseniaJugador: "Reseña Jugador",
  solicitudesPendientes: "Solicitudes Pendientes"
};

export const rutas = {
  amigos: "amigos",
  registro: "registro",
  juegos: "juegos",
  perfilJugador: "perfilJugador",
  resenias: "resenias",
  miPerfil: "miPerfil",
  recuperarContrasena: "recuperarContrasena",
  jugadores: "jugadores",
  reseniaJugador: "reseniaJugador",
  solicitudesPendientes: "solicitudesPendientes"
};

const AppRutas = () => {
  const setShowNavBar = useNavBarStore((state) => state.setShowNavBar);
  const showNavBar = useNavBarStore((state) => state.showNavBar);
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
            titulo="Amigos"
            name="amigos"
            component={Amigos}
          />
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
    flexDirection: "column"
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
  toast: {
    backgroundColor: Color.primario,
  },
  toastText: {
    color: Color.blanco,
  }
});
