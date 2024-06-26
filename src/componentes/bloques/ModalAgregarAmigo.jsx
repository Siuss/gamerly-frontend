import React, { useState } from 'react'
import { Modal } from '../atomos/modal/Modal'
import { StyleSheet, View } from "react-native"
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Boton } from "../atomos/boton/Boton";
import Textarea from "../atomos/TextArea/TextArea";
import { SolicitudService } from '../../services/SolicitudService';
import { Toast } from 'toastify-react-native'

export const ModalAgregarAmigo = ({ idCreador, idAmigo, visible, onOcultar, ...props }) => {
    const [mensaje, setMensaje] = useState("")

    const handleCancelar = () => {
        onOcultar()
    }

    const handleEnviar = async () => {
        try {
            await SolicitudService.solicitarAmistad(idCreador, idAmigo, mensaje)
            onOcultar()
            Toast.success("Solicitud enviada correctamente!")
        } catch (error) {
            Toast.error("Error inesperado: No se pudo enviar la solicitud, intente mas tarde")
        }
    }

    const handleMensajeChange = (nuevoMensaje) => {
        setMensaje(nuevoMensaje)
    }

    return (
        <Modal
            visible={visible}
            onClose={onOcultar}
            style={styles.modal}
            {...props}>

            <Parrafo variante="blancoM">
                Añadí un mensaje
            </Parrafo>
            <Textarea onChangeText={handleMensajeChange} placeholder="Nota..." />
            <View style={styles.botones}>
                <Boton
                    textStyle
                    variante="primario"
                    outline="secundario"
                    onPress={handleCancelar}
                >
                    Cancelar
                </Boton>

                <Boton
                    onPress={handleEnviar}
                    textStyle={styles.textoBoton}
                    variante="secundario">
                    Enviar
                </Boton>
            </View>
        </Modal>
    )
}

const styles = StyleSheet.create({
    modal: {
        width: "75%",
        display: "flex",
        gap: 16,
        borderRadius: 12
    },
    botones: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 16,
    }
})