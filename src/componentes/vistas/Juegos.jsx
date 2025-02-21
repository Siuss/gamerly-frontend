import { useState, useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { CardJuegos } from "../bloques/CardJuegos";
import { Color } from "../../estilos/colores";
import Busqueda from "../bloques/Busqueda";
import { JuegosService } from "../../services/JuegosService";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { rutas } from "../rutas/rutas";
import useThemeStore from "../../hooks/useThemeStore";

export const Juegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [searchText, setSearchText] = useState("");
  const navigation = useNavigation();
  const { theme } = useThemeStore();
  const handleJuegoPress = async (juego) => {
    navigation.navigate(rutas.jugadores, { idJuego: juego.id, juego: juego.nombre });
  };

  useFocusEffect(
    useCallback(() => {
      const fetchJuegos = async () => {
        const listaDeJuegos = await JuegosService.getJuegos();
        setJuegos(listaDeJuegos);
      };

      fetchJuegos();

      return () => {
        setJuegos([]);
        setSearchText("");
      };
    }, [])
  );

  const handleChange = async (text) => {
    setSearchText(text);

    const nuevosJuegos = text
      ? await JuegosService.getJuegosPorNombre(text)
      : await JuegosService.getJuegos();

    setJuegos(nuevosJuegos);
  };

  return (
    <View style={[
          styles.containerExterior,
          { backgroundColor: theme === "dark" ? Color.neutro : Color.blanco  }
        ]}>
      <Busqueda
        placeholder="Buscar..."
        text={searchText}
        onChangeText={(text) => handleChange(text)}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {juegos.length > 0 &&
          juegos.map((juego) => (
            <CardJuegos
              key={juego.id}
              foto={juego.imagen}
              juego={juego.nombre}
              plataforma={juego.plataformas[0]}
              onPress={async () => handleJuegoPress(juego)}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerExterior: {
    height: "100%",
    padding: 8,
  },
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    paddingVertical: 8,
  },
  input: {
    height: 40,
    borderColor: Color.secundario,
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    width: "100%",
    color: Color.secundario,
  },
});
