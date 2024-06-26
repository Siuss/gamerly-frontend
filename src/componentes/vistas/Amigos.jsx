import { StyleSheet, View, Text } from "react-native";
import { ListaDeAmigos } from "../bloques/ListaDeAmigos";
import { Color } from "../../estilos/colores";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { rutas } from "../rutas/rutas";
import { BotonFlotante } from '../atomos/botonFlotante/BotonFlotante'
import { useState, useCallback } from "react";
import { JugadoresService } from "../../services/JugadoresService";
import { SolicitudService } from "../../services/SolicitudService";
import { Toast } from "toastify-react-native";

export const Amigos = (props) => {
    const navigation = useNavigation();
    const { params } = navigation.getState().routes.at(-1);
    const [amigos, setAmigos] = useState([])
    const [solicitudes, setSolicitudes] = useState([])

    const handleAmigoClick = (amigo) => {
        navigation.navigate(rutas.perfilJugador, amigo.id);
    }

    const handleVerSolicitudesPendientes = () => {
        navigation.navigate(rutas.solicitudesPendientes, params.id)
    }

    useFocusEffect(
        useCallback(() => {
            const traerAmigos = async () => {
                try {
                    const amigosEncontrados = await JugadoresService.getAmigosDelUsuario(params.id)
                    setAmigos(amigosEncontrados)

                    const peticiones = await SolicitudService.getSolicitudesPendientes(params.id)
                    setSolicitudes(peticiones)
                } catch (error) {
                    Toast.error("Error inesperado intenta mas tarde")
                }
            }

            if (!params.id) return

            traerAmigos()

            return () => {
                setAmigos([])
                setSolicitudes([])
            };
        }, [params?.id])
    );

    return (
        <View style={styles.container}>
            <View style={styles.solicitudesPendientes}>
                <BotonFlotante onPress={handleVerSolicitudesPendientes} name="email" style={styles.botonFlotante} />
                {solicitudes.length > 0 && <View style={styles.burbujaSolicitudes}>
                    <Text style={[styles.burbujaSolicitudesTexto, solicitudes.length > 9 && styles.textoLargo]}>{solicitudes.length}</Text>
                </View>}
            </View>
            <ListaDeAmigos
                amigos={amigos}
                onAmigoClick={handleAmigoClick}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.neutro,
        width: "100%",
        height: "100%",
    },
    solicitudesPendientes: {
        position: "fixed",
        bottom: 128,
        right: 16,
        width: 48
    },
    botonFlotante: {
        position: "absolute",
    },
    burbujaSolicitudes: {
        position: "absolute",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: Color.error,
        borderRadius: "100%",
        width: 24,
        height: 24,
    },
    burbujaSolicitudesTexto: {
        display: "block",
        color: Color.blanco,
        width: 24,
        height: 24,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

    },
    textoLargo: {
        transform: "translateX(-1px)"
    }
});
