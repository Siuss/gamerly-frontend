import { ScrollView, StyleSheet, View } from "react-native";
import { Boton } from "../atomos/boton/Boton";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Pildora } from "../atomos/pildora/Pildora";
import { CardFotoPerfil } from "../bloques/CardFotoPerfil";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
import { Color } from "../../estilos/colores";
import { Gradiente } from "../atomos/gradiente/Gradiente";
import perfilMock from "../../mocks/perfilUsuariosMock.json";
import diasDeLaSemana from "../../data/dias.json";
import momentos from "../../data/momentosDelDia.json";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

export const PerfilJugador = (props) => {
  const route = useRoute();
  const { id } = route.params;

  const navigation = useNavigation();

  const obtenerInfoPorId = (id) => {
    return perfilMock.find((usuario) => {
      return usuario.id === id;
    });
  };

  const perfilInfo = obtenerInfoPorId(id);

  const juegaEnAlgunMomentoDeEsteDia = (diaDeLaSemana) =>
    perfilInfo.horarios[diaDeLaSemana].some((momento) => momento);

  const handleOnVerReseniasClick = () => {
    navigation.navigate("resenias", { id });
  };

  return (
    <ScrollView style={styles.contenedor} {...props}>
      <CardFotoPerfil
        style={styles.cardFotoPerfil}
        nombreUsuario={perfilInfo.nombreUsuario}
        foto={perfilInfo.foto}
      />
      <Gradiente style={styles.cardDetalles} variante="gradienteVertical">
        <Parrafo variante="blancoM">
          Nacionalidad: {perfilInfo.nacionalidad}
        </Parrafo>

        <Parrafo variante="blancoM">Edad: {perfilInfo.edad}</Parrafo>

        <Parrafo variante="blancoM">Plataforma:</Parrafo>
        <ListaDePildoras
          items={perfilInfo.plataformas.map((plataforma, index) => ({id: index, contenido: plataforma}))}
          conBorde
          variante="conBorde"
        />

        <Parrafo variante="blancoM">Juegos:</Parrafo>
        <ListaDePildoras
          items={perfilInfo.juegos.map((juego, index) => ({id: index, contenido: juego}))}
          conBorde
          variante="conBorde"
        />

        <Parrafo variante="blancoM">Disponibilidad:</Parrafo>
        <View style={styles.contenedorDisponibilidad}>
          {diasDeLaSemana.map(
            (diaDeLaSemana, diaIndex) =>
              juegaEnAlgunMomentoDeEsteDia(diaIndex) && (
                <View key={diaDeLaSemana} style={styles.contenedorDias}>
                  <Pildora
                    style={styles.pildora}
                    conBorde
                    variante="secundario"
                  >
                    {diaDeLaSemana}
                  </Pildora>
                  <View style={styles.contenedorMomentos}>
                    {perfilInfo.horarios[diaIndex].map(
                      (momento, momentoIndex) =>
                        momento && (
                          <Pildora
                            key={momentos[momentoIndex]}
                            conBorde
                            variante="conBorde"
                          >
                            {momentos[momentoIndex]}
                          </Pildora>
                        )
                    )}
                  </View>
                </View>
              )
          )}
        </View>
      </Gradiente>
      <View style={styles.contenedorBotones}>
        <Boton style={styles.boton} variante="acento">
          Añadir amigo
        </Boton>
        <Boton
          style={styles.boton}
          variante="primario"
          onPress={handleOnVerReseniasClick}
        >
          Ver reseñas
        </Boton>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: Color.neutro,
    padding: 16,
    width: "100%",
    height: "100%",
    flex: 1,
  },
  cardFotoPerfil: {
    width: "100%",
    marginBottom: 16,
  },
  cardDetalles: {
    width: "100%",
    borderRadius: 10,
    padding: 16,
    marginBottom: 48,
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  pildora: {
    marginBottom: 8,
  },
  contenedorDisponibilidad: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  contenedorDias: {
    marginBottom: 8,
  },
  contenedorMomentos: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  contenedorBotones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
});
