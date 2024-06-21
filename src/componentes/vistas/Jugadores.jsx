import { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { CardJuegos } from "../bloques/CardJuegos";
import { Color } from "../../estilos/colores";
import jugadoresMock from "../../mocks/jugadoresMock.json"
import Busqueda from "../bloques/Busqueda"
import { JuegosService } from '../../services/JuegosService'
import { JugadoresService } from '../../services/JugadoresService'
import { ListaDeJugadores } from "../bloques/ListaDeJugadores"
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from "@react-navigation/native";

export const Jugadores = () => {
  const [jugadores, setJugadores] = useState([])
  const navigation = useNavigation();

  const { params: juegoId } = navigation.getState().routes[0];

  useFocusEffect(
    useCallback(() => {
      const fetchJugadores = async () => {
        //setJugadores(await JugadoresService.getJuegadoresConJuegosEnComun(juegoId))
        setJugadores(jugadoresMock)
      }

      fetchJugadores()

      return () => {
        setJugadores([])
      };
    }, [])
  );


  return (
    <View style={styles.containerExterior}>
      <ScrollView contentContainerStyle={styles.container}>
        <Busqueda mostrarFiltro={false}></Busqueda>
        {jugadores.length > 0 && <ListaDeJugadores jugadores={jugadores} searchText="" />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerExterior: {
    height: "100%",
    backgroundColor: Color.neutro
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    padding: "8px",
  },
});
