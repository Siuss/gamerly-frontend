import React, { useState } from "react";
import { StyleSheet, View, Image } from "react-native";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Color } from "../../estilos/colores";
import { Divisor } from "../atomos/divisor/Divisor";
import { BotonFlotante } from "../atomos/botonFlotante/BotonFlotante";
import { Pildora } from "../atomos/pildora/Pildora";
import { MaterialIcons } from "@expo/vector-icons";
import { TablaHorarios } from "../bloques/TablaHorarios";
import { AntDesign } from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { ScrollView } from "react-native";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%",
  },
  fotoDePerfil: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },

  informacionUsuario: {
    padding: 5,
  },

  descripcionUsuario: {
    textAlign: "center",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 15,
  },

  descripcionplataformas: {
    textAlign: "left",
    marginTop: 15,
    marginBottom: 15,
    fontSize: 15,
  },

  conatainerEditarJuego: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    fontSize: 15,
  },

  botonesContainer: {
    display: "flex",
    right: 20,
    bottom: 20,
  },
  botonFlotante: {
    width: 25,
    height: 25,
    borderRadius: 50,
  },
  botonAgregar: {
    backgroundColor: Color.acento,
  },
  botonConfirmar: {
    backgroundColor: Color.secundario,
  },
  pildora1: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    color: "blue",
  },
  containerTable: {
   display:"flex",
   flexDirection: "column",
   justifyContent: "center",
   alignItems: "center",
  },
});
const horariosIniciales = [
  { mañana: false, tarde: false, noche: false }, // Lunes
  { mañana: false, tarde: false, noche: false }, // Martes
  { mañana: false, tarde: false, noche: false }, // Miercoles
  { mañana: false, tarde: false, noche: false }, // Jueves
  { mañana: false, tarde: false, noche: false }, // Viernes
  { mañana: false, tarde: false, noche: false }, // Sabado
  { mañana: false, tarde: false, noche: false }, // Domingo
];

export const VistaPerfil = () => {
  const [horarios, setHorarios] = useState(horariosIniciales);

  const onHorarioChange = (dia, momento) => {
    const nuevosHorarios = [ ...horarios ];
    nuevosHorarios[dia][momento] = !nuevosHorarios[dia][momento];

    setHorarios(nuevosHorarios);
  };
  return (
    <View style={styles.container}>
      <ScrollView style={{ flex: 1 }}>
        <View style={styles.informacionUsuario}>
          <View style={styles.fotoDePerfil}>
            <FotoDePerfil
              width={100}
              height={100}
              src="https://picsum.photos/200"
            />
          </View>
          <Divisor width={80} height={100} />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            Diego Peña
          </Parrafo>
          <Divisor width={80} height={100} />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            25 Años
          </Parrafo>
          <Divisor width={80} height={100} />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            Argentino
          </Parrafo>
          <Divisor width={80} height={100} />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            Masculino
          </Parrafo>
          <Divisor width={100} height={100} />

          <Parrafo variante="grisS" style={styles.descripcionplataformas}>
            Mis Plataformas
          </Parrafo>
          <View style={styles.pildora1}>
            <Pildora>
              {" "}
              PC
              <MaterialIcons
                name="highlight-remove"
                size={24}
                color="white"
              />{" "}
            </Pildora>
          </View>

          <Parrafo variante="grisS" style={styles.descripcionplataformas}>
            Mis Juegos
          </Parrafo>
          <View style={styles.pildora1}>
            <Pildora> Call of Duty</Pildora>
            <Pildora> Terraria</Pildora>
          </View>

          <Parrafo variante="grisS" style={styles.conatainerEditarJuego}>
            {" "}
            Mis Horarios{" "}

          </Parrafo>
          <BotonFlotante
              name="mode-edit-outline"
              label="Editar"
              style={styles.botonesContainer}
            />
          <View style={styles.containerTable}>
            <TablaHorarios
              horarios={horarios}
              onHorarioChange={onHorarioChange}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
