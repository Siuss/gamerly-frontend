import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Divisor } from "../atomos/divisor/Divisor";
import { Boton } from "../atomos/boton/Boton";
import { useNavigation } from "@react-navigation/native";
import juegosData from "../../data/juegos.json";
import { Color } from "../../estilos/colores";
import dias from "../../data/dias.json";
import momentosDelDia from "../../data/momentosDelDia.json";
import { rutas } from "../rutas/rutas";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import TextArea from "../atomos/TextArea/TextArea";

const filtrosIniciales = {
  juegos: [],
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

export const ReseniaJugador = () => {
  const navigation = useNavigation();
  const { params: filtrosParam } = navigation.getState().routes.at(-1);

  const [searchText, setSearchText] = useState("");
  const [puntaje, setPuntaje] = useState(0);
  const [resenia, setResenia] = useState("");

  const handleEnter = (event) => {
    if (event.target.value.length < 3) return;
    const juego = juegosData.find((juego) =>
      juego.contenido.toLowerCase().includes(event.target.value.toLowerCase())
    );

    if (!juego) return;

    setSearchText("");

    const juegos = filtros.juegos;

    if (juegos.some((_juego) => _juego.id === juego.id)) return;

    juegos.push(juego);

    setFiltros((prevFiltros) => ({ ...prevFiltros, juegos }));
  };

  const handleJuegoRemove = (juegoABorrar) => {
    const juegos = filtros.juegos.filter(
      (juego) => juego.id !== juegoABorrar.id
    );

    setFiltros((prevFiltros) => ({ ...prevFiltros, juegos }));
  };

  const handleDiaToggle = (diaBuscado) => {
    const dias = filtros.dias.map((momento) => {
      if (momento.id === diaBuscado.id) {
        return { ...momento, juega: !momento.juega };
      } else {
        return momento;
      }
    });

    setFiltros((prevFiltros) => ({ ...prevFiltros, dias }));
  };

  const handleMomentoToggle = (momentoBuscado) => {
    const momentos = filtros.momentosDelDia.map((momento) => {
      if (momento.id === momentoBuscado.id) {
        return { ...momento, juega: !momento.juega };
      } else {
        return momento;
      }
    });

    setFiltros((prevFiltros) => ({ ...prevFiltros, momentosDelDia: momentos }));
  };

  const handleReseniaChange = (reseniaRaw) => {
    const resenia = reseniaRaw === 0 ? undefined : reseniaRaw;
    setPuntaje(resenia);
  };

  const handleLimpiar = () => {
    setFiltros(filtrosIniciales);
  };

  const handleAplicar = () => {
    const rutaAnterior = navigation.getState().routes.at(-2);
    navigation.navigate(rutaAnterior, filtros);
  };

  return (
    <View style={styles.container}>
      <View>
        <FotoDePerfil
          src="https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg"
          height={64}
          width={64}
        ></FotoDePerfil>
        <Parrafo variante="blancoM">Julio Perez</Parrafo>
      </View>
      <View style={styles.espaciador}>
        <View style={styles.puntuacion}>
          <Parrafo variante="blancoM" style={styles.textoPuntuacion}>Puntuación:</Parrafo>
          <View style={styles.contenedorSlider}>
            <Slider
              onValueChange={handleReseniaChange}
              style={styles.input}
              minimumValue={0}
              maximumValue={5}
              step={1}
            />
            <Parrafo style={styles.parrafoCentrado} variante="blancoM">
            {puntaje || 0}
          </Parrafo>
          </View>
        </View>
        <View style={styles.espaciador}>
          <Parrafo style={styles.dejarResenia} variante="blancoM">Dejar una reseña:</Parrafo>
          <TextArea></TextArea>
        </View>
      </View>

      <View style={styles.botonera}>
        <Boton variante="primario" onPress={handleLimpiar}>
          Enviar
        </Boton>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  barraBusqueda: {
    padding: 0,
  },
  botonera: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 32,
  },
  contenedorSlider: {
    padding: 16,
    width: "75vw",
  },
  input: {
    width: "100%",
  },
  espaciador: {
    paddingVertical: 3,
  },
  parrafoCentrado: {
    textAlign: "center",
  },
  puntuacion: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
  },
  dejarResenia:{
marginBottom:"16px",
  },
  textoPuntuacion:{
marginTop:"12px",
  },
});
