import React, {useEffect} from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { Resenias } from "../vistas/Reseñas";
import { BusquedaDeJugadores } from "../vistas/BusquedaDeJugadores";
import HeaderTitle from "../header/headerTitle";
import { View, StyleSheet } from "react-native";
import { BusquedaAvanzada } from "../vistas/BusquedaAvanzada";
import { VistaPerfil } from "../vistas/VistaPerfil";
import { PerfilJugador } from "../vistas/PerfilJugador";
import { Login } from "../vistas/Login";
import { Inicio } from "../vistas/Inicio";
import { Registro } from "../vistas/Registro";
import { RecuperarContrasena } from "../vistas/RecuperarContrasena";
import { Amigos } from "../vistas/Amigos";
import NavBar from "../bloques/Navbar";
import useNavBarStore from "../../hooks/useNavbarStore";

const Stack = createStackNavigator();
const titlesConfig = {
  resenias: "Reseñas",
  busquedaDeJugadores: "Busqueda Jugadores",
  miPerfil: "Mi Perfil",
  busquedaAvanzada: "Busqueda Avanzada",
  perfilJugador: "Perfil Jugador",
  amigos: "Amigos",
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
  const setShowNavBar = useNavBarStore((state) => state.setShowNavBar);
  const showNavBar = useNavBarStore((state) => state.showNavBar);
  const excludeLoading = useNavBarStore((state) => state.excludeLoading);
  useEffect(() => {
    excludeLoading();
  }, [excludeLoading]);

  return (
      <View style={styles.container}>
        <NavigationContainer style={styles.navigationContainer}>
          <Stack.Navigator
              initialRouteName="loading"
              screenOptions={({ route, navigation }) => ({
                header: (props) => (
                    <HeaderTitle
                        {...props}
                        title={titlesConfig[route.name]}
                        showBackButton={route.name !== rutas.busquedaDeJugadores}
                    />
                ),
                headerShown: ({ route }) =>  route.name !== "loading"
              
              })}
          >
            <Stack.Screen
                titulo="reseñas"
                name="resenias"
                component={Resenias}
            />
            <Stack.Screen
                name="loading"
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
          {showNavBar && <NavBar style={styles.navBar} />}
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
