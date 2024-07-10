import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { Color } from "../../estilos/colores";
import { useNavigation } from "@react-navigation/native";
import { SesionService } from "../../services/SesionService";
import { useToast } from "../../hooks/useToast";
import { rutas } from "../rutas/rutas";
import { Boton } from "../atomos/boton/Boton";
import { Spinner } from "../atomos/spinner/Spinner";
import { Parrafo } from "../atomos/parrafo/Parrafo";

export const RecuperarContrasena = () => {
  const { show } = useToast();
  const [email, setEmail] = useState("");
  const [cargando, setCargando] = useState(false);
  const navigation = useNavigation();

  const handleEmailChange = (nuevoEmail) => {
    setEmail(nuevoEmail);
  };

  const handleRecuperar = async () => {
    try {
      setCargando(true);
      await SesionService.solicitarClave(email);
      navigation.navigate(rutas.ingresarTokenContrasenia, email);
    } catch {
      show("error", "Hubo un error inesperado intentalo mas tarde");
    } finally {
      setCargando(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenido}>
        <Parrafo style={styles.title} variante="blancoL">Recuperar Contraseña</Parrafo>
        <TextInput
          value={email}
          onChangeText={handleEmailChange}
          style={[styles.input]}
          placeholder="Correo electrónico"
          placeholderTextColor={Color.secundario}
        />
        <View style={styles.boton}>
          {cargando && <Spinner size={32} style={styles.spinner} />}
          <Boton disabled={cargando} onPress={handleRecuperar}>
            Enviar
          </Boton>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Color.neutro,
    padding: 16,
  },
  contenido: {
    width: "100%",
    gap: 16,
  },
  title: {
    marginBottom: 32,
  },
  input: {
    width: "100%",
    height: 40,
    color: Color.secundario,
    borderColor: Color.secundario,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
  },
  boton: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  spinner: {
    paddingRight: 16,
  },
});
