import React from "react";
import { StyleSheet, View, Image } from "react-native";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Color } from "../../estilos/colores";
import { Divisor } from "../atomos/divisor/Divisor";
import { BotonFlotante } from "../atomos/botonFlotante/BotonFlotante";
import { Pildora } from "../atomos/pildora/Pildora";
import { MaterialIcons } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons/AntDesign";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
// import { ScrollView } from 'react-native';
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
  //  nombreUsuario: {
  //    textAlign: 'center',
  //    margin:20,
  //  },
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
});

export const VistaPerfil = () => {
  return (
    <View style={styles.container}>
      <View style={styles.informacionUsuario}>
        <View style={styles.fotoDePerfil}>
          <FotoDePerfil
            width={100}
            height={100}
            src="https://picsum.photos/200"
          />
        </View>
        <Divisor width={100} height={100} />
        <Parrafo variante="grisS" style={styles.descripcionUsuario}>
          Diego Peña
        </Parrafo>
        <Divisor width={100} height={100} />
        <Parrafo variante="grisS" style={styles.descripcionUsuario}>
          25 Años
        </Parrafo>
        <Divisor width={100} height={100} />
        <Parrafo variante="grisS" style={styles.descripcionUsuario}>
          Argentino
        </Parrafo>
        <Divisor width={100} height={100} />
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
          <BotonFlotante
            name="mode-edit-outline"
            label="Editar"
            style={styles.botonesContainer}
          />
        </Parrafo>
      </View>
    </View>
  );
};
