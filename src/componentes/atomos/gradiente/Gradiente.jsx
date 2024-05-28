import { StyleSheet, Image, View } from "react-native";
import { Color } from "../../../estilos/colores";
import { LinearGradient } from "expo-linear-gradient";

const variantes = {
  gradienteHorizontal: {
    colors: [Color.primario, Color.secundario],
    locations: [0.57, 1],
    start: { x: 0, y: 0.8 },
    end: { x: 0.8, y: 1 },
  },
  gradienteVertical: {
    colors: [Color.primario, Color.secundario],
    locations: [0.47, 1],
    start: { x: 0.5, y: 1 },
    end: { x: 0.5, y: 0 },   
  },
};

export const Gradiente = (props) => {
  return (
    <LinearGradient {...variantes[props.variante]} {...props}>{props.children}</LinearGradient>
  );
};
