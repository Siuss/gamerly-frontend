import React, { useState } from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Slider from "@react-native-community/slider";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Divisor } from "../atomos/divisor/Divisor";
import { Boton } from "../atomos/boton/Boton";
import { useNavigation } from "@react-navigation/native";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
import { Color } from "../../estilos/colores";
import dias from "../../data/dias.json";
import momentosDelDia from "../../data/momentosDelDia.json";

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

export const BusquedaAvanzada = () => {
  const navigation = useNavigation();
  const { params: filtrosParam } = navigation.getState().routes.at(-1);
console.log(filtrosParam)
  const [filtros, setFiltros] = useState({
    ...filtrosIniciales,
    ...filtrosParam,
  });

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
    const rutaAnterior = navigation.getState().routes.at(-2);
    navigation.navigate(rutaAnterior, filtros)
  }

  return (
    <ScrollView style={styles.container}>
      
      <View style={styles.espaciador}>
        <View style={styles.espaciador}>
          <Parrafo variante="blancoM">Reseña</Parrafo>
        </View>
          <View style={styles.contenedorSlider}>
            <Slider
              onValueChange={handleReseniaChange}
              style={styles.input}
              minimumValue={0}
              maximumValue={5}
              step={1}
              minimumTrackTintColor={Color.secundario}
              maximumTrackTintColor={Color.gris}            />
          </View>
          <Parrafo style={styles.parrafoCentrado} variante="blancoM">
            {filtros.resenia || 0}
          </Parrafo>
        
      </View>
      <Divisor />
      <View style={styles.espaciador}>
        <Parrafo variante="blancoM">Disponibilidad horaria</Parrafo>
      </View>
      <View style={styles.espaciador}>
        <Parrafo variante="blancoM">Días de la semana</Parrafo>
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
        <Parrafo variante="blancoM">Horario</Parrafo>
        <View style={[styles.espaciador,styles.separacion]}>
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
        <Boton variante="secundario"  onPress={handleAplicar}>Aplicar</Boton>
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
    paddingVertical: 10,
    paddingHorizontal: 20,
    paddingTop:0
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
    paddingBottom: 18
  },
  parrafoCentrado: {
    textAlign: "center",
  },
  separacion:{
paddingBottom:10  
}
});
