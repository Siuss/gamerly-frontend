import { StyleSheet, View } from "react-native";
import { Color } from "../../estilos/colores";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { ReseniaService } from "../../services/ReseniaService";
import { useState, useCallback } from "react";
import { CardReseniaPendiente } from "../bloques/CardReseniaPendiente";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Toast } from "toastify-react-native";

export const ReseniasPendientes = () => {
  const navigation = useNavigation();
  const [resenias, setResenias] = useState([]);

  const traerResenias = useCallback(async () => {
    try {
      const idUsuarioLogueado = await getUsuarioLogueadoId();
      const reseniasPendientes = await ReseniaService.getReseniasPendientes(
        idUsuarioLogueado
      );

      setResenias(reseniasPendientes);
    } catch {
      Toast.error("Error inesperado intenta mas tarde");
    }
  }, []);

  const handleAceptar = async (reseniaId) => {
    try {
      const idUsuarioLogueado = await getUsuarioLogueadoId();
      await ReseniaService.aceptarReseniaPendiente(
        reseniaId,
        idUsuarioLogueado
      );

      Toast.success("Reseña aceptada con éxito");
      const rutaAnterior = navigation.getState().routes.at(-2);
      navigation.navigate(rutaAnterior);
    } catch {
      Toast.error("Error inesperado intentalo mas tarde");
    }
  };

  const handleRechazar = async (reseniaId) => {
    try {
      const idUsuarioLogueado = await getUsuarioLogueadoId();
      await ReseniaService.rechazarReseniaPendiente(
        reseniaId,
        idUsuarioLogueado
      );

      Toast.success("Reseña rechazada con éxito");
      const rutaAnterior = navigation.getState().routes.at(-2);
      navigation.navigate(rutaAnterior);
    } catch {
      Toast.error("Error inesperado intentalo mas tarde");
    }
  };

  useFocusEffect(
    useCallback(() => {
      traerResenias();
    }, [traerResenias])
  );

  return (
    <View style={styles.container}>
      <Parrafo variante="blancoM">
        Selecciona si jugaste con estos jugadores
      </Parrafo>
      {resenias.map((resenia) => (
        <CardReseniaPendiente
          key={resenia.id}
          discord={resenia.discord}
          nombre={resenia.nombre}
          foto={resenia.foto}
          onAceptar={() => handleAceptar(resenia.id)}
          onRechazar={() => handleRechazar(resenia.id)}
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
