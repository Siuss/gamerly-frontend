import React from 'react'
import { Modal as NativeModal, StyleSheet, View } from "react-native"
import { Color } from '../../../estilos/colores'
import hexToRgba from 'hex-to-rgba';

export const Modal = ({ visible, onClose, children, style, ...props }) => {
    return (
        <NativeModal
            animationType="fade"
            transparent={true}
            visible={visible}
            onClose={onClose}
            {...props}
        >
            <View style={styles.contenedor}>
                <View style={[style, styles.card] }>
                    {children}
                </View>
            </View>
        </NativeModal>)
}

const styles = StyleSheet.create({
    contenedor: {
        width: "100vw",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: hexToRgba(Color.neutro, 0.4),
    },
    card: {
        padding: 16,
        paddingTop: 32,
        backgroundColor: Color.primario,
        borderRadius: 4
    }
})