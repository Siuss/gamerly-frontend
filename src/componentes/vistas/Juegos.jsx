import { useState, useEffect, useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { CardJuegos } from "../bloques/CardJuegos";
import { Color } from "../../estilos/colores";
import jugadoresMock from "../../mocks/jugadoresMock.json"
import Busqueda from "../bloques/Busqueda"
import { JuegosService } from '../../services/JuegosService'
import { ListaDeJugadores } from "../bloques/ListaDeJugadores"
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from "@react-navigation/native";
import { rutas } from "../rutas/rutas"

export const Juegos = () => {
  const [juegos, setJuegos] = useState([])
  const [jugadores, setJugadores] = useState([])
  const navigation = useNavigation();


  const handleJuegoPress = async (juego) => {
    navigation.navigate(rutas.jugadores, juego.id);

    //setJugadores(await JugadoresService.getJuegadoresConJuegosEnComun(juego.id))
    setJugadores(jugadoresMock)
  }

  useFocusEffect(
    useCallback(() => {
      const fetchJuegos = async () => {
        setJuegos(await JuegosService.getJuegos())
      }

      fetchJuegos()

      return () => {
        setJuegos([])
        setJugadores([])
      };
    }, [])
  );


  return (
    <View style={styles.containerExterior}>
      <ScrollView contentContainerStyle={styles.container}>
        <Busqueda></Busqueda>
        {jugadores.length === 0 && juegos.map((juego) => <CardJuegos
          key={juego.juego}
          foto={juego.imagen}
          juego={juego.nombre}
          plataforma={juego.plataformas[0]}
          onPress={async () => handleJuegoPress(juego)}
        />)}

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
