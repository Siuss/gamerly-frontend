import React, { useState, useCallback } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Divisor } from "../atomos/divisor/Divisor";
import { Boton } from "../atomos/boton/Boton";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
import { Color } from "../../estilos/colores";
import dias from "../../data/dias.json";
import momentosDelDia from "../../data/momentosDelDia.json";
import useThemeStore from "../../hooks/useThemeStore";

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
  resenia: 0,
};

export const BusquedaAvanzada = () => {
  const navigation = useNavigation();
  const { params: filtrosParam } = navigation.getState().routes.at(-1);
  const {theme} = useThemeStore()
  const [filtros, setFiltros] = useState({
    ...filtrosIniciales,
    ...filtrosParam,
  });

  const handleDiaToggle = (diaBuscado) => {
    const nuevosDias = filtros.dias.map((dia) => {
      if (dia.id === diaBuscado.id) {
        return { ...dia, juega: !dia.juega };
      } else {
        return dia;
      }
    });

    setFiltros((prevFiltros) => ({ ...prevFiltros, dias: nuevosDias }));
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
    setFiltros((prevFiltros) => ({ ...prevFiltros, resenia }));
  };

  const handleLimpiar = () => {
    setFiltros((prevFiltros) => ({ ...prevFiltros, ...filtrosIniciales }));
  };

  const handleAplicar = () => {
    const rutaAnterior = navigation.getState().routes.at(-2);

    navigation.navigate(rutaAnterior.name, filtros);
  };

  useFocusEffect(
    useCallback(() => {
      setFiltros({
        ...filtrosIniciales,
        ...filtrosParam,
      });
    }, [filtrosParam])
  );

  return (
    <ScrollView style={[, { backgroundColor: theme === "dark" ? Color.neutro : Color.blanco  }]}>
      <View style={styles.espaciador}>
        <View style={styles.espaciador}>
          <Parrafo variante={theme === "dark" ? "blancoM" : "negroM" }>Reseña</Parrafo>
        </View>
        <View style={styles.contenedorSlider}>
          <Slider
            onValueChange={handleReseniaChange}
            style={styles.input}
            minimumValue={0}
            maximumValue={5}
            step={1}
            minimumTrackTintColor={Color.secundario}
            maximumTrackTintColor={Color.gris}
            value={filtros.resenia}
          />
        </View>
        <Parrafo style={styles.parrafoCentrado} variante={theme === "dark" ? "blancoM" : "negroM" }>
          {filtros.resenia || 0}
        </Parrafo>
      </View>
      <Divisor />
      <View style={styles.espaciador}>
        <Parrafo variante={theme === "dark" ? "blancoM" : "negroM" }>Disponibilidad horaria</Parrafo>
      </View>
      <View style={styles.espaciador}>
        <Parrafo variante={theme === "dark" ? "blancoM" : "negroM" }>Días de la semana</Parrafo>
        <View style={styles.espaciador}>
          <ListaDePildoras
            style={styles.espacioPildoras}
            onPress={handleDiaToggle}
            items={filtros.dias.map((dia) => ({
              ...dia,
              variante: dia.juega ? "" : "deseleccionado",
            }))}
          />
        </View>
      </View>
      <View style={styles.espaciador}>
        <Parrafo variante={theme === "dark" ? "blancoM" : "negroM" }>Horario</Parrafo>
        <View style={[styles.espaciador, styles.separacion]}>
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
        <Boton variante="secundario" onPress={handleAplicar}>
          Aplicar
        </Boton>
        <Boton variante="primario" onPress={handleLimpiar}>
          Limpiar
        </Boton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingTop: 0,
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
    paddingVertical: 18,
    paddingBottom: 18,
  },
  parrafoCentrado: {
    textAlign: "center",
  },
  separacion: {
    paddingBottom: 10,
  },
});
