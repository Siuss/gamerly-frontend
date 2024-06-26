import { useState, useMemo, useCallback } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { CardJuegos } from "../bloques/CardJuegos";
import { Color } from "../../estilos/colores";
import Busqueda from "../bloques/Busqueda"
import { JuegosService } from '../../services/JuegosService'
import { JugadoresService } from '../../services/JugadoresService'
import { ListaDeJugadores } from "../bloques/ListaDeJugadores"
import { useFocusEffect } from '@react-navigation/native'
import { useNavigation } from "@react-navigation/native";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import { Toast } from "toastify-react-native";

export const Jugadores = () => {
  const [jugadores, setJugadores] = useState([])
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState("")
  const { params: juegoId } = navigation.getState().routes.at(-1);

  const handleBusqueda = (busqueda) => {
    setBusqueda(busqueda)
  }
  
  const jugadoresFiltrados = useMemo(() => {
    if (busqueda != "") {
      return jugadores.filter(jugador => jugador.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    } else {
      return jugadores
    }
  }, [busqueda, jugadores])

  useFocusEffect(
    useCallback(() => {
      const fetchJugadores = async () => {
        try {
          const nuevosJugadores = await JugadoresService.getJugadoresConJuegosEnComun(juegoId)
          const idUsuarioLogueado = await getUsuarioLogueadoId()
          const jugadoresMenosUsuarioLogueado = nuevosJugadores.filter(jugador => jugador.id !== idUsuarioLogueado)
          setJugadores(jugadoresMenosUsuarioLogueado)
        } catch (error) {
          Toast.error("Error inesperado intentalo mas tarde")
        }
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
        <Busqueda onChangeText={handleBusqueda} />
        {jugadores.length > 0 ? <ListaDeJugadores jugadores={jugadoresFiltrados} searchText="" /> : (
          <Text style={styles.texto}>
            Parece que no hay usuarios que jueguen a ese juego
          </Text>)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerExterior: {
    height: "100%",
    backgroundColor: Color.neutro
  },
  texto: {
    color: Color.blanco
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    padding: "8px",
  },
});
