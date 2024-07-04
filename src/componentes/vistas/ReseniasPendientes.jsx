import { StyleSheet, View } from "react-native";
import { Color } from "../../estilos/colores";
import { useFocusEffect } from "@react-navigation/native";
import { ReseniaService } from "../../services/ReseniaService";
import { useState, useCallback } from "react";
import { CardReseniaPendiente } from "../bloques/CardReseniaPendiente";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import {Parrafo} from '../atomos/parrafo/Parrafo'

export const ReseniasPendientes = () => {
  const [resenias, setResenias] = useState([]);

  const traerResenias = useCallback(async () => {
    try {
    const idUsuarioLogueado = await getUsuarioLogueadoId();
    const reseniasPendientes = await ReseniaService.getReseniasPendientes(
      idUsuarioLogueado
    );
    const mock = [{id: 1, foto: "https://www.fieremostre.it/wp-content/uploads/2023/09/gaming-computer-table-video-game-room-with-neon-lighting-purple-color.jpg", discord: "PlayExEl", nombre: "Playxel"}]
    setResenias(mock);
  } catch (error) {
    // TODO: Manejar errores
    console.log(error)   
  }
  }, []);

  const handleRefrescarPeticiones = async () => {
    await traerResenias();
  };

  useFocusEffect(
    useCallback(() => {
      traerResenias();
    }, [traerResenias])
  );

  return (
    <View style={styles.container}>
      <Parrafo variante="blancoM">Selecciona si jugaste con estos jugadores</Parrafo>
      {resenias.map((resenia) => (
        <CardReseniaPendiente
          key={resenia.id}
          discord={resenia.discord}
          nombre={resenia.nombre}
          foto={resenia.foto}
          onAceptar={handleRefrescarPeticiones}
          onRechazar={handleRefrescarPeticiones}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%",
    gap: 16,
  },
  botonFlotante: {
    position: "fixed",
    bottom: 80,
    right: 16,
  },
});
