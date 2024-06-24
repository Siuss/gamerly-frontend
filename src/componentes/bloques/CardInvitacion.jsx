import React from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { BotonFlotante } from "../atomos/botonFlotante/BotonFlotante";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { SolicitudService } from "../../services/SolicitudService";
import { Toast } from 'toastify-react-native'
import { useNavigation } from "@react-navigation/native";
import { rutas } from "../rutas/rutas";


export const CardInvitacion = ({ style, idUsuario, idSolicitud, foto, nombre, mensaje, onAceptar, onRechazar, ...props }) => {
    const navigation = useNavigation()

    const handleAceptar = async () => {
        try {
            await SolicitudService.aceptarSolicitud(idSolicitud)
            onAceptar()
            Toast.success("Solicitud aceptada con éxito")
        } catch (error) {
            Toast.error("Error inesperado intenta mas tarde")
        }
    }

    const handleRechazar = async () => {
        try {
            await SolicitudService.rechazarSolicitud(idSolicitud)
            Toast.success("Solicitud rechazada con éxito")
            onRechazar()
        } catch (error) {
            Toast.error("Error inesperado intenta mas tarde")
        }
    }

    const handleVerPerfil = () => {
        navigation.navigate(rutas.perfilJugador, idUsuario)
    }

    return (
        <TouchableOpacity onPress={handleVerPerfil} style={[style, styles.card]} {...props}>
            <View style={styles.encabezado}>
                <FotoDePerfil width={64} height={64} src={foto} />
                <View style={styles.info}>
                    <Parrafo variante="blancoM" style={styles.nombreUsuario}>
                        {nombre}
                    </Parrafo>
                </View>
                < View style={styles.botones}>
                    <BotonFlotante
                        style={styles.rechazar}
                        name="close"
                        color={Color.secundario}
                        onPress={handleRechazar}
                    />
                    <BotonFlotante
                        style={styles.aceptar}
                        name="check"
                        color={Color.primario}
                        onPress={handleAceptar}
                    />
                </View>
            </View>
            <Parrafo style={styles.mensaje} variante="blancoM">
                {mensaje}
            </Parrafo>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: Color.primario,
        padding: 16,
        borderRadius: 10,
    },
    encabezado: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    info: {
        flex: 1,
        marginLeft: 10,
    },
    nombreUsuario: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    botones: {
        display: "flex",
        flexDirection: "row",
        gap: 8
    },
    aceptar: {
        backgroundColor: Color.secundario,
    },
    rechazar: {
        borderWidth: 1,
        color: Color.secundario,
        borderColor: Color.secundario
    },
    mensaje: {
        alignSelf: "center"
    }
});
