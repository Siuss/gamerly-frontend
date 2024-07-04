import React from "react";
import {
  Modal as NativeModal,
  StyleSheet,
  useWindowDimensions,
  View,
} from "react-native";
import { Color } from "../../../estilos/colores";
import hexToRgba from "hex-to-rgba";

export const Modal = ({ visible, onClose, children, style, ...props }) => {
  const Dimensions = useWindowDimensions();

  const dynamicStyles = StyleSheet.create({
    modal: {
      width: Dimensions.width,
      height: Dimensions.height,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: hexToRgba(Color.neutro, 0.7),
    },
  });

  return (
    <NativeModal
      animationType="fade"
      transparent={true}
      visible={visible}
      onClose={onClose}
      {...props}
    >
      <View style={[styles.contenedor, dynamicStyles.modal]}>
        <View style={[style, styles.card]}>{children}</View>
      </View>
    </NativeModal>
  );
};

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
    borderRadius: 16,
  },
});
