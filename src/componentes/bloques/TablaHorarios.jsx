import { StyleSheet, View } from "react-native";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Color } from "../../estilos/colores";
import { Switch } from "../atomos/switch/Switch";
import dias from "../../data/dias.json";
import momentosDelDia from "../../data/momentosDelDia.json";
import { useEffect } from "react";

// Ejemplo de como usar la tabla horarios cuando se le agregue la logica
// en horarios van a quedar los horarios finales (si el usuario hace click en)
// la tabla para cambiarlos los cambios se van a ver en la variable horarios
/*

 const horariosIniciales = [
    { mañana: false, tarde: false, noche: false }, // Lunes
    { mañana: false, tarde: false, noche: false }, // Martes
    { mañana: false, tarde: false, noche: false }, // Miercoles
    { mañana: false, tarde: false, noche: false }, // Jueves
    { mañana: false, tarde: false, noche: false }, // Viernes
    { mañana: false, tarde: false, noche: false }, // Sabado
    { mañana: false, tarde: false, noche: false }, // Domingo
  ]

const [horarios, setHorarios] = useState(horariosIniciales)

 const onHorarioChange = (dia, momento) => {
    const nuevosHorarios = { ...horarios };
    nuevosHorarios[dia][momento] = !nuevosHorarios[dia][momento];
    
    setHorarios(nuevosHorarios)
 }

  <TablaHorarios horarios={horarios} onHorarioChange={onHorarioChange} />

*/

export const TablaHorarios = (props) => {
  const onSwitch = (dia, momento) => {
    "";
    props.onHorarioChange(dia, momento);
  };

  useEffect(() => {
    console.log("effect");
    console.log(props.horarios);
  }, [props.horarios]);

  return (
    <View style={styles.tabla}>
      <View style={styles.contenedorEncabezado}>
        {momentosDelDia.map((momento) => (
          <Parrafo style={styles.encabezado} variante="blancoS">
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
            style={styles.switch}
            value={props.horarios[index][0]}
            onChange={() => onSwitch(index, 0)}
          />
          <Switch
            style={styles.switch}
            value={props.horarios[index][1]}
            onChange={() => onSwitch(index, 1)}
          />
          <Switch
            style={styles.switch}
            value={props.horarios[index][2]}
            onChange={() => onSwitch(index, 2)}
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  tabla: {
    width: "fit-content",
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
    width: 60,
  },
  switch: {
    width: 50,
  },
  encabezado: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    width: 50,
  },
  contenedorEncabezado: {
    marginLeft: 70,
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    gap: 10,
  },
  filas: {
    display: "flex",
    flexDirection: "row",
    alignContent: "center",
    columnGap: 10,
  },
});
