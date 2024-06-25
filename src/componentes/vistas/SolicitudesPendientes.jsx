import { StyleSheet, View } from "react-native";
import { Color } from "../../estilos/colores";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { Parrafo } from '../atomos/parrafo/Parrafo'
import { SolicitudService } from "../../services/SolicitudService";
import { useState, useCallback } from 'react'
import { CardInvitacion } from "../bloques/CardInvitacion";

export const SolicitudesPendientes = () => {
    const navigation = useNavigation();

    const { params: id } = navigation.getState().routes.at(-1);
    const [solicitudes, setSolicitudes] = useState([])

    const traerPeticiones = async () => {
        const peticiones = await SolicitudService.getSolicitudesPendientes(id)
        setSolicitudes(peticiones)
    }

    const handleRefrescarPeticiones = async () => {
        await traerPeticiones()
    }

    useFocusEffect(
        useCallback(async () => {
            await traerPeticiones()
        }, [id])
    );

    return (
        <View style={styles.container}>
            {solicitudes.length > 0 ? solicitudes.map(solicitud => (
                <CardInvitacion
                    discord={solicitud.discord}
                    idSolicitud={solicitud.idSolicitud}
                    idUsuario={solicitud.idUsuario}
                    nombre={solicitud.nombre}
                    foto={solicitud.foto}
                    mensaje={solicitud.mensaje}
                    onAceptar={handleRefrescarPeticiones}
                    onRechazar={handleRefrescarPeticiones}
                />
            )) : (
                <Parrafo variante="blancoM">Parece que no tenes solicitudes de amistad pendientes</Parrafo>
            )}

        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: Color.neutro,
        width: "100%",
        height: "100%",
    },
    botonFlotante: {
        position: 'fixed',
        bottom: 80,
        right: 16
    }
});
