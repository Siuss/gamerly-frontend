import { useState, useCallback } from "react";
import { StyleSheet, ScrollView, View } from "react-native";
import { CardJuegos } from "../bloques/CardJuegos";
import { Color } from "../../estilos/colores";
import Busqueda from "../bloques/Busqueda";
import { JuegosService } from "../../services/JuegosService";
import { useFocusEffect } from '@react-navigation/native';
import { useNavigation } from "@react-navigation/native";
import { rutas } from "../rutas/rutas";

export const Juegos = () => {
  const [juegos, setJuegos] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();

  const handleJuegoPress = async (juego) => {
    navigation.navigate(rutas.jugadores, juego.id);
  };

  useFocusEffect(
    useCallback(() => {
      const fetchJuegos = async () => {
        setJuegos(await JuegosService.getJuegos());
      };

      fetchJuegos();

      return () => {
        setJuegos([]);
      };
    }, [])
  );


  const handleChange = async (text) => {
    setSearchText(text)
    const nuevosJuegos = await JuegosService.getJuegosPorNombre(text)

    setJuegos(nuevosJuegos)
  }


  return (
    <View style={styles.containerExterior}>
      <Busqueda
        placeholder="Buscar..."
        value={searchText}
        onChangeText={text => handleChange(text)}
      />
      <ScrollView contentContainerStyle={styles.container}>

        {juegos.length > 0 && juegos.map((juego) => <CardJuegos
          key={juego.id}
          foto={juego.imagen}
          juego={juego.nombre}
          plataforma={juego.plataformas[0]}
          onPress={async () => handleJuegoPress(juego)}
        />)}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  containerExterior: {
    height: "100%",
    backgroundColor: Color.neutro,
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
    width: '100%',
    color: Color.secundario,

  },
});
