import { StyleSheet, View } from "react-native";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Color } from "../../estilos/colores";
import { Switch } from "../atomos/switch/Switch";
import dias from "../../data/dias.json";
import momentosDelDia from "../../data/momentosDelDia.json";
import { useEffect } from "react";

export const TablaHorarios = (props) => {
  const onSwitch = (dia, momento) => {
    props.onHorarioChange(dia, momento);
  };

  useEffect(() => {}, [props.horarios]);

  return (
    <View style={styles.tabla}>
      <View style={styles.contenedorEncabezado}>
        {momentosDelDia.map((momento) => (
          <Parrafo key={momento} style={styles.encabezado} variante="blancoS">
            {momento}
          </Parrafo>
        ))}
      </View>
      {dias.map((dia, index) => (
        <View key={dia} style={styles.filas}>
          <Parrafo style={styles.tituloFila} variante="blancoS">
            {dia}
          </Parrafo>

          <Switch
            disabled={props.disabled}
            style={styles.switch}
            value={props.horarios[index].mañana}
            onChange={() => onSwitch(dia.toUpperCase(), "MAÑANA")}
          />
          <Switch
            disabled={props.disabled}
            style={styles.switch}
            value={props.horarios[index].tarde}
            onChange={() => onSwitch(dia.toUpperCase(), "TARDE")}
          />
          <Switch
            disabled={props.disabled}
            style={styles.switch}
            value={props.horarios[index].noche}
            onChange={() => onSwitch(dia.toUpperCase(), "NOCHE")}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabla: {
    alignSelf: "center",
    borderRadius: 10,
    padding: 16,
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    backgroundColor: Color.primario,
    rowGap: 16,
    overflowX: "auto",
  },
  tituloFila: {
    display: "flex",
    flexDirection: "row",
    alignContent: "flex-end",
    width: 62,
  },
  switch: {
    width: 58,
  },
  encabezado: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 62,
  },
  contenedorEncabezado: {
    marginLeft: 70,
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  filas: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 10,
  },
});
