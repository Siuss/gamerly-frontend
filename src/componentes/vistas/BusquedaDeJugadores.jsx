import { StyleSheet, Text, View } from "react-native";
import { useState } from 'react';
import { ListaDeJugadores } from "../bloques/ListaDeJugadores";
import { Color } from "../../estilos/colores";
import Busqueda from "../bloques/Busqueda";

const jugadoresMock = [
  {
    foto: "https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg",
    nombreUsuario: "Nanami",
    amigos: [
      "aryastark89",
      "solidfox",
    ],
    plataforma: "PC",
    juego: "Terraria",
  },
  {
    foto: "https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg",
    nombreUsuario: "SilvinaPuerta27",
    amigos: ["amigo1", "amigo2"],
    plataforma: "XBOX",
    juego: "LOL",
  },
  {
    foto: "https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg",
    nombreUsuario: "javyVent_7",
    amigos: ["amigo1", "amigo2"],
    plataforma: "XBOX",
    juego: "Call of Duty",
  },
];

export const BusquedaDeJugadores = (props) => {
  const [searchText, onChangeSearchText] = useState('')

  return (
    <View style={styles.container} {...props}>
      <Busqueda text={searchText} onChangeText={onChangeSearchText}/>
      <ListaDeJugadores jugadores={jugadoresMock} searchText={searchText}/>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%"
  },
});
