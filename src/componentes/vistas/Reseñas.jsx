import { StyleSheet, View } from "react-native";
import { ListaDeResenias } from "../bloques/ListaDeReseñas";
import { Color } from "../../estilos/colores";
import { useRoute, useFocusEffect } from "@react-navigation/native";
import { ReseniaService } from "../../services/ReseniaService";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { useState, useCallback } from "react";

import { JugadoresService } from "../../services/JugadoresService";
import useStore from "../../hooks/useStore";

export const Resenias = (props) => {
  const route = useRoute();
  const [resenias, setResenias] = useState([]);
  const [perfilJugador, setPerfilJugador] = useState(null);
  const {  getIdUsuarioLogueado } = useStore()

  const { id } = route.params;

  const traerResenias = async () => {
    if (!id) return;
    const perfil = await JugadoresService.getPerfilUsuario(id);

    setPerfilJugador(perfil);

    const idUsuarioLogueado = await  getIdUsuarioLogueado();

    const nuevasResenias = await ReseniaService.getResenias(
      idUsuarioLogueado,
      id
    );
    setResenias(nuevasResenias);
  };

  useFocusEffect(
    useCallback(() => {
      traerResenias();

      return () => {
        setResenias([]);
        setPerfilJugador(null);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
  );

  return (
    <View style={styles.container}>
      {resenias.length > 0 && perfilJugador ? (
        <ListaDeResenias
          resenias={resenias}
          foto={perfilJugador.fileName}
          nombreUsuario={perfilJugador.nombre}
        />
      ) : (
        <Parrafo variante="blancoM">
          Parece que todavia no tenes reseñas
        </Parrafo>
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
});

export default Resenias;
