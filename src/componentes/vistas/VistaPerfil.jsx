import React, { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Color } from "../../estilos/colores";
import { Divisor } from "../atomos/divisor/Divisor";
import { BotonFlotante } from "../atomos/botonFlotante/BotonFlotante";
import { TablaHorarios } from "../bloques/TablaHorarios";
import perfilMock from "../../mocks/perfilUsuariosMock.json";
import { useRoute } from "@react-navigation/native";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
import { CardResenia } from "../bloques/CardResenia";
import { Boton } from "../atomos/boton/Boton";
import { useNavigation } from "@react-navigation/native";
import { SesionService } from "../../services/SesionService"
import useNavBarStore from "../../hooks/useNavbarStore";

// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

export const VistaPerfil = () => {
  const setShowNavBar = useNavBarStore((state) => state.setShowNavBar);
  const route = useRoute();
  const { id } = route.params;

  const navigation = useNavigation();

  const obtenerInfoPorId = (id) => {
    return perfilMock.find((usuario) => {
      return usuario.id === id;
    });
  };

  const perfilInfo = obtenerInfoPorId(id);
  const [horarios, setHorarios] = useState(perfilInfo.horarios);
  const [posicionAnteriorScroll, setPosicionAnteriorScroll] = useState(0);
  const [direccionScroll, setDireccionScroll] = useState("arriba");

  const onHorarioChange = (dia, momento) => {
    /* TODO: Decidir si se elimina,sirve para el editar
    
    const nuevosHorarios = [...horarios];
    nuevosHorarios[dia][momento] = !nuevosHorarios[dia][momento];

    setHorarios(nuevosHorarios);
    */
  };

  const handleScroll = (event) => {
    const nuevaPosicionScroll = event.nativeEvent.contentOffset.y;
    const desplazamiento = nuevaPosicionScroll - posicionAnteriorScroll;

    if (Math.abs(desplazamiento) < 3) {
      setPosicionAnteriorScroll(nuevaPosicionScroll);
      return;
    }

    const direccion =
      nuevaPosicionScroll > posicionAnteriorScroll ? "abajo" : "arriba";

    setPosicionAnteriorScroll(nuevaPosicionScroll);
    setDireccionScroll(direccion);
  };

  const handleVerMasClick = () => {
    navigation.navigate("resenias", { id });
    setShowNavBar(false)
  };

  const handleLogout = () => {
    setShowNavBar(false)
    navigation.navigate("login");
  }

  const handleEliminarCuenta = async () => {
    await SesionService.eliminarCuenta(id);
    handleLogout();
  }
  return (
    <View style={styles.container}>
      <ScrollView
        style={{ flex: 1 }}
        onScroll={handleScroll}
        scrollEventThrottle={8}
      >
        <View style={styles.informacionUsuario}>
          <View style={styles.fotoDePerfil}>
            <FotoDePerfil width={100} height={100} src={perfilInfo.foto} />
          </View>
          <Divisor />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            {perfilInfo.nombreUsuario}
          </Parrafo>
          <Divisor />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            {perfilInfo.edad} Años
          </Parrafo>
          <Divisor />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            {perfilInfo.nacionalidad}
          </Parrafo>
          <Divisor />
          <Parrafo variante="grisS" style={styles.descripcionUsuario}>
            {perfilInfo.genero}
          </Parrafo>
          <Divisor />

          <Parrafo variante="grisS" style={styles.descripcionplataformas}>
            Mis Plataformas
          </Parrafo>
          <View style={styles.pildora1}>
            <ListaDePildoras items={perfilInfo.plataformas.map((plataforma, index) => ({ id: index, contenido: plataforma }))} />
          </View>

          <Parrafo variante="grisS" style={styles.descripcionplataformas}>
            Mis Juegos
          </Parrafo>
          <View style={styles.pildora1}>
            <ListaDePildoras items={perfilInfo.juegos.map((juego, index) => ({ id: index, contenido: juego }))} />
          </View>
          <View style={styles.conatainerEditarJuego}>
            <Parrafo variante="grisS" style={styles.descripcionplataformas}>
              Mis Horarios
            </Parrafo>
          </View>
          <View style={styles.containerTable}>
            <TablaHorarios
              horarios={horarios}
              onHorarioChange={onHorarioChange}
            />
          </View>
          <CardResenia
            style={styles.cardResenia}
            puntaje={perfilInfo.ultimaResenia.puntaje}
            foto={perfilInfo.ultimaResenia.foto}
            resenia={perfilInfo.ultimaResenia.contenido}
          />
          <View style={styles.verMas}>
            <Boton variante="link" onPress={handleVerMasClick}>
              Ver mas
            </Boton>
          </View>
        </View>
        <View style={styles.botonesSesion}>
          <Divisor />
          <Boton variante="transparente" onPress={handleEliminarCuenta}>Eliminar Cuenta</Boton>
          <Divisor />
          <Boton variante="transparente" onPress={handleLogout}>Cerrar Sesion</Boton>
          <Divisor />
        </View>
      </ScrollView>
      {direccionScroll === "arriba" && (
        <BotonFlotante
          name="mode-edit-outline"
          label="Editar"
          style={styles.botonFlotante}
        />
      )}
    </View>
  );
};

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
    gap: 60,
  },

  botonFlotante: {
    position: "fixed",
    right: 16,
    bottom: 64,
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
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardResenia: {
    marginTop: 16,
  },
  verMas: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingVertical: 16,
  },
  botonesSesion: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    alignItems: "center",
  },
});
