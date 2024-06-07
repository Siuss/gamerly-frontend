import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import BarraBusqueda from "../atomos/barraBusqueda/BarraBusqueda";
import { Divisor } from "../atomos/divisor/Divisor";
import { Boton } from "../atomos/boton/Boton";
import { useNavigation } from "@react-navigation/native";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
import juegosData from "../.././data/juegos.json";
import { Color } from "../../estilos/colores";
import dias from "../../data/dias.json";
import momentosDelDia from "../../data/momentosDelDia.json";
import { BusquedaService } from "../../services/BusquedaService";
import {rutas} from "../rutas/rutas"

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

export const BusquedaAvanzada = () => {
  const navigation = useNavigation();
  const { params: filtrosParam } = navigation.getState().routes[0];

  const [searchText, setSearchText] = useState("");
  const [filtros, setFiltros] = useState({
    ...filtrosIniciales,
    ...filtrosParam,
  });

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
    const resenia = reseniaRaw === 0 ? undefined : reseniaRaw
    setFiltros((prevFiltros) => ({ ...prevFiltros, resenia }));
  };

  const handleLimpiar = () => {
    setFiltros(filtrosIniciales)
  }

  const handleAplicar = () => {
    BusquedaService.setBusquedaAvanzada(filtros)
    navigation.navigate(rutas.busquedaDeJugadores, filtros)
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.espaciador}>
        <Parrafo variante="blancoM">Juegos en común</Parrafo>
        <View style={styles.espaciador}>
          <BarraBusqueda
            style={styles.barraBusqueda}
            text={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleEnter}
          />
        </View>
        <View style={styles.espaciador}>
          <ListaDePildoras onPress={handleJuegoRemove} items={filtros.juegos} />
        </View>
      </View>
      <Divisor />
      <View style={styles.espaciador}>
        <View style={styles.espaciador}>
          <Parrafo variante="blancoM">Reseña</Parrafo>
        </View>
        <View style={styles.espaciador}>
          <View style={styles.contenedorSlider}>
            <Slider
              onValueChange={handleReseniaChange}
              style={styles.input}
              minimumValue={0}
              maximumValue={5}
              step={1}
            />
          </View>
          <Parrafo style={styles.parrafoCentrado} variante="blancoM">
            {filtros.resenia || 0}
          </Parrafo>
        </View>
      </View>
      <Divisor />
      <View style={styles.espaciador}>
        <Parrafo variante="blancoM">Disponibilidad horaria</Parrafo>
      </View>
      <View style={styles.espaciador}>
        <Parrafo variante="blancoM">Días de la semana</Parrafo>
        <View style={styles.espaciador}>
          <ListaDePildoras
            onPress={handleDiaToggle}
            items={filtros.dias.map((dia) => ({
              ...dia,
              variante: dia.juega ? "" : "deseleccionado",
            }))}
          />
        </View>
      </View>
      <View style={styles.espaciador}>
        <Parrafo variante="blancoM">Horario</Parrafo>
        <View style={styles.espaciador}>
          <ListaDePildoras
            onPress={handleMomentoToggle}
            items={filtros.momentosDelDia.map((momento) => ({
              ...momento,
              variante: momento.juega ? "" : "deseleccionado",
            }))}
          />
        </View>
      </View>
      <Divisor />
      <View style={styles.botonera}>
        <Boton variante="acento"  onPress={handleAplicar}>Aplicar</Boton>
        <Boton variante="primario" onPress={handleLimpiar}>Limpiar</Boton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%",
    paddingVertical: 12,
    paddingHorizontal: 20,
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
});
