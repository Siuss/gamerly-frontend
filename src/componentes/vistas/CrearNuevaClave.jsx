import React, { useState, useMemo } from "react";
import { StyleSheet, TouchableOpacity, TextInput, View } from "react-native";
import { Color } from "../../estilos/colores";
import { useNavigation } from "@react-navigation/native";
import { SesionService } from "../../services/SesionService";
import { Toast } from "toastify-react-native";
import { rutas } from "../rutas/rutas";
import { Boton } from "../atomos/boton/Boton";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Ionicons } from "@expo/vector-icons";

const regexpContrasenia = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

export const CrearNuevaClave = () => {
  const [contrasenia, setContrasenia] = useState("");
  const [repeticion, setRepeticion] = useState("");
  const [contraseniaEsValida, setContrasenaEsValida] = useState(true);
  const [showContrasenia, setShowContrasenia] = useState(false);
  const [showRepeticion, setShowRepeticion] = useState(false);
  const navigation = useNavigation();
  const { params: email } = navigation.getState().routes.at(-1);

  const handleContraseniaChange = (nuevaContrasenia) => {
    setContrasenia(nuevaContrasenia);
    setContrasenaEsValida(
      nuevaContrasenia === "" || regexpContrasenia.test(nuevaContrasenia)
    );
  };

  const handleRepeticionChange = (nuevaContrasenia) => {
    setRepeticion(nuevaContrasenia);
  };

  const validadorContrasenia = (clave) =>
    clave && regexpContrasenia.test(clave);

  const contraseniasValidas = useMemo(() => {
    return validadorContrasenia(contrasenia) && contrasenia === repeticion;
  }, [contrasenia, repeticion]);

  const handleRecuperar = async () => {
    try {
      await SesionService.nuevaClave(email, contrasenia);
      navigation.navigate(rutas.login);
      Toast.success("Contraseña restablecida con exito");
    } catch {
      Toast.error("Hubo un error inesperado intentalo mas tarde");
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.contenido}>
        <Parrafo style={styles.title} variante="blancoL">
          Crear Nueva Contraseña
        </Parrafo>

        <View style={styles.inputContainer}>
          <TextInput
            style={[
              styles.input,
              styles.inputContrasenia,
              !contraseniaEsValida && styles.inputError,
            ]}
            placeholderTextColor={Color.secundario}
            placeholder="Nueva contraseña"
            secureTextEntry={!showContrasenia}
            value={contrasenia}
            onChangeText={handleContraseniaChange}
          />
          <TouchableOpacity
            onPress={() => setShowContrasenia(!showContrasenia)}
            style={styles.inputIcon}
          >
            <Ionicons
              name={showContrasenia ? "eye" : "eye-off"}
              size={24}
              color={contraseniaEsValida ? Color.secundario : Color.error}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={[styles.input, styles.inputContrasenia]}
            placeholderTextColor={Color.secundario}
            placeholder="Repetir contraseña"
            secureTextEntry={!showRepeticion}
            value={repeticion}
            onChangeText={handleRepeticionChange}
          />
          <TouchableOpacity
            onPress={() => setShowRepeticion(!showRepeticion)}
            style={styles.inputIcon}
          >
            <Ionicons
              name={showRepeticion ? "eye" : "eye-off"}
              size={24}
              color={Color.secundario}
            />
          </TouchableOpacity>
        </View>

        <View style={styles.boton}>
          <Boton disabled={!contraseniasValidas} onPress={handleRecuperar}>
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
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  input: {
    flex: 1,
    height: 40,
    width: "100%",
    borderColor: Color.secundario,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
    paddingRight: 32,
    color: Color.secundario,
  },
  inputError: {
    borderColor: Color.error,
    color: Color.error,
  },
  inputContrasenia: {
    paddingRight: 48,
  },
  inputIcon: {
    position: "absolute",
    bottom: 24,
    right: 10,
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
