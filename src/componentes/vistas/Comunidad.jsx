import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from "react-native";
import { CardComunidad } from "../bloques/CardJuegos";
import { Color } from "../../estilos/colores";

import { COMUNIDADES_SERVICE } from "../../services/ComunidadesService";
import comunidades from "../../mocks/comunidadMock.json"; // (debe eliminarse datos mocks)

const datosEstáticos = comunidades; // (debe eliminarse datos mocks)

export const Comunidad = () => {
  const [comunidades, setComunidades] = useState([]);

  useEffect(() => {
    const cargarComunidades = async () => {
      COMUNIDADES_SERVICE.obtenerComunidades().then(comunidades => {
        setComunidades(datos);
      }).catch(error => {
        console.error('Error al cargar comunidades:', error);
        setComunidades(datosEstáticos); // (debe eliminarse datos mocks)
      });
    };

    cargarComunidades();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {comunidades.map((comunidad) => <CardComunidad
        key={comunidad.juego}
        foto={comunidad.foto}
        juego={comunidad.juego}
        plataforma={comunidad.plataforma}
      />)}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    alignItems: "center",
    backgroundColor: Color.neutro,
    padding: "8px",
  },
});
