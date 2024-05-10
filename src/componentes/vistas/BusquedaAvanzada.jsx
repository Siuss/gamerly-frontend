import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import BarraBusqueda from "../atomos/barraBusqueda/BarraBusqueda";
import { Divisor } from "../atomos/divisor/Divisor";
import { Boton } from "../atomos/boton/Boton";

import { ListaDePildoras } from "../bloques/ListaDePildoras";

import { Color } from "../../estilos/colores";

// import dias from "../../data/dias.json";
// import momentosDelDia from "../../data/momentosDelDia.json";

const juegos = [
  {
    id: 1,
    contenido: "League of Legends",
  },
  {
    id: 2,
    contenido: "Dota 2",
  },
  {
    id: 3,
    contenido: "Counter Strike",
  },
  {
    id: 4,
    contenido: "World of Warcraft",
  },
  {
    id: 5,
    contenido: "Valorant",
  },
  {
    id: 6,
    contenido: "Rocket League",
  },
  {
    id: 7,
    contenido: "Fortnite",
  },
  {
    id: 8,
    contenido: "Apex Legends",
  },
  {
    id: 9,
    contenido: "PUBG",
  },
  {
    id: 10,
    contenido: "Hearthstone",
  },
];

const dias = [
  {
    id: 1,
    juega: true,
    contenido: "Lunes",
  },
  {
    id: 2,
    juega: false,
    contenido: "Martes",
  },
  {
    id: 3,
    juega: true,
    contenido: "Miercoles",
  },
  {
    id: 4,
    juega: false,
    contenido: "Jueves",
  },
  {
    id: 5,
    juega: false,
    contenido: "Viernes",
  },
  {
    id: 6,
    juega: false,
    contenido: "Sabado",
  },
  {
    id: 7,
    juega: false,
    contenido: "Domingo",
  },
];

const momentosDelDia = [
  {
    id: 1,
    juega: true,
    contenido: "Mañana",
  },
  {
    id: 2,
    contenido: "Tarde",
  },
  {
    id: 3,
    juega: true,
    contenido: "Noche",
  },
];

export const BusquedaAvanzada = () => {
  const [searchText, onChangeSearchText] = useState("");

  return (
    <ScrollView style={styles.container}>
      <View style={styles.espaciador}>
        <Parrafo variante="blancoM">Juevos en común</Parrafo>
        <View style={styles.espaciador}>
          <BarraBusqueda
            style={styles.barraBusqueda}
            text={searchText}
            onChangeText={onChangeSearchText}
          />
        </View>
        <View style={styles.espaciador}>
          <ListaDePildoras
            items={juegos}
          />
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
              style={styles.input}
              minimumValue={1}
              maximumValue={5}
              step={1}
            />
          </View>
          <Parrafo style={styles.parrafoCentrado} variante="blancoM">
            3
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
            items={dias.map((dia) => ({
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
            items={momentosDelDia.map((momento) => ({
              ...momento,
              variante: momento.juega ? "" : "deseleccionado",
            }))}
          />
        </View>
      </View>
      <Divisor />
      <View style={styles.botonera}>
        <Boton variante="acento">Aplicar</Boton>
        <Boton variante="primario">Limpiar</Boton>
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
