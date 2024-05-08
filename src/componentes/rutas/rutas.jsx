import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Resenias} from "../vistas/Reseñas";
import {BusquedaDeJugadores} from "../vistas/BusquedaDeJugadores";
import {HeaderTitle} from "../header/headerTitle";
import NavBar from "../bloques/Navbar";
import { View, StyleSheet } from 'react-native';
import { BusquedaAvanzada } from '../vistas/BusquedaAvanzada';
import { VistaPerfil } from '../vistas/VistaPerfil';


const Stack = createStackNavigator();
const titlesConfig = {
    resenias: 'Reseñas',
    busquedaDeJugadores: 'Busqueda Jugadores',

};

const AppRutas = () => {
    const titulo = 'Busqueda Jugadores';
    return (
        <View style={styles.container}>
            <NavigationContainer style={styles.navigationContainer}>
                <Stack.Navigator
                    initialRouteName="busquedaDeJugadores"
                    screenOptions={({ route }) => ({
                        header: (props) => <HeaderTitle {...props} title={titlesConfig[route.name]} />
                    })}
                >
                    <Stack.Screen titulo="reseñas" name="resenias" component={Resenias}/>
                    <Stack.Screen titulo="busquedaDeJugadores" name="busquedaDeJugadores"
                                  component={BusquedaDeJugadores}/>
                    <Stack.Screen titulo="miPerfil" name="miPerfil" component={VistaPerfil}/>
                    <Stack.Screen titulo="busquedaAvanzada" name="busquedaAvanzada" component={BusquedaAvanzada}/>
                </Stack.Navigator>
                <NavBar style={styles.navBar}/>
            </NavigationContainer>

        </View>
    );
}

export default AppRutas;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
    },
    navigationContainer: {
        flex: 1,
    },
    navBar: {
        height: 50,
        backgroundColor: 'lightblue',
        justifyContent: 'center',
        alignItems: 'center',
    },
});