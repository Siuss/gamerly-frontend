import { StyleSheet, ScrollView, View } from "react-native";
import { useMemo, useState, useEffect } from "react";
import { ListaDeJugadores } from "../bloques/ListaDeJugadores";
import { Color } from "../../estilos/colores";
import Busqueda from "../bloques/Busqueda";
import { useNavigation } from "@react-navigation/native";
import { BusquedaService } from "../../services/BusquedaService";

export const BusquedaDeJugadores = (props) => {
  const navigation = useNavigation();
  const { params: filtrosParam } = navigation.getState().routes[0];
  const [searchText, onChangeSearchText] = useState("");
  const [jugadores, setJugadores] = useState("");

  const filtros = useMemo(
    () => ({ ...filtrosParam, nombre: searchText }),
    [filtrosParam, searchText]
  );

  useEffect(() => {
    const buscar = async () => {
      const jugadoresEncontrados = await BusquedaService.busquedaAvanzada(filtros);
      setJugadores(jugadoresEncontrados);
    };

    buscar();
  }, [filtros]);

  return (
    <View style={styles.container} {...props}>
      <Busqueda text={searchText} onChangeText={onChangeSearchText} />
      <ScrollView>

      {/* TODO: Si se implementa la busqueda por nombre en el back, el searchText={searchText} se puede sacar de aca */}
        <ListaDeJugadores jugadores={jugadores} searchText={searchText} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%",
    paddingHorizontal: 32,
  },
});
