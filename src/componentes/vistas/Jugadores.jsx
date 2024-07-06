import { useState, useMemo, useCallback } from "react";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { Color } from "../../estilos/colores";
import Busqueda from "../bloques/Busqueda"
import { JugadoresService } from '../../services/JugadoresService'
import { ListaDeJugadores } from "../bloques/ListaDeJugadores"
import { useFocusEffect , useNavigation, useRoute } from '@react-navigation/native'
import dias from "../../data/dias.json";
import momentosDelDia from "../../data/momentosDelDia.json";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import { Toast } from "toastify-react-native";

const filtrosIniciales = {
  momentosDelDia: momentosDelDia.map((contenido, index) => ({
    contenido,
    juega: false,
    id: index,
  })),
  dias: dias.map((contenido, index) => ({
    contenido,
    juega: false,
    id: index,
  })),
  resenia: undefined,
};

export const Jugadores = () => {
  const [jugadores, setJugadores] = useState([])
  const navigation = useNavigation();
  const [busqueda, setBusqueda] = useState("")
  const route = useRoute();

  const params = route.params;
console.log(params);

const [filtros, setFiltros] = useState(filtrosIniciales)
  const handleBusqueda = (busqueda) => {
    setBusqueda(busqueda)
  }
  
  const jugadoresFiltrados = useMemo(() => {
    if (busqueda !== "") {
      return jugadores.filter(jugador => jugador.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    } else {
      return jugadores
    }
  }, [busqueda, jugadores])

  useFocusEffect(
    useCallback(() => {
      const fetchJugadores = async () => {
        try {
          const nuevosJugadores = await JugadoresService.getJugadoresConJuegosEnComun(params)
          const idUsuarioLogueado = await getUsuarioLogueadoId()
          const jugadoresMenosUsuarioLogueado = nuevosJugadores.filter(jugador => jugador.id !== idUsuarioLogueado)
          setJugadores(jugadoresMenosUsuarioLogueado)
        } catch {
          Toast.error("Error inesperado intentalo mas tarde")
        }
      }

      fetchJugadores()
      setFiltros(params)

      return () => {
        setJugadores([])
      };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );


  return (
    <View style={styles.containerExterior}>
      <ScrollView contentContainerStyle={styles.container}>
        <Busqueda mostrarFiltro onChangeText={handleBusqueda} filtros={filtros} />
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
    gap: 8,
    alignItems: "center",
    padding: 8,
  },
});
