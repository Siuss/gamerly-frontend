import React, { useState, useCallback, useRef } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Color } from "../../estilos/colores";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { SesionService } from "../../services/SesionService";
import { TokenInput } from "../atomos/tokenInput/TokenInput";
import { Boton } from "../atomos/boton/Boton";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { rutas } from "../rutas/rutas";
import { Toast } from "toastify-react-native";

const REENVIO_ESPERA_SEGUNDOS = 15;

export const IngresarTokenContrasena = () => {
  const esperaRef = useRef({});
  const [codigo, setCodigo] = useState("");
  const [espera, setEspera] = useState(REENVIO_ESPERA_SEGUNDOS);
  const navigation = useNavigation();
  const { params: email } = navigation.getState().routes.at(-1);

  const handleRecuperar = async () => {
    try {
      await SesionService.verificarCodigoDeRecuperacion(codigo);
      navigation.navigate(rutas.crearNuevaClave, email)
    } catch {
      Toast.error("Parece que el codigo es invalido");
    }
  };

  const handleReenviar = async () => {
    try {
      setEspera(REENVIO_ESPERA_SEGUNDOS);
      await SesionService.solicitarClave(email);
    } catch {
      Toast.error("Hubo un error inesperado intentalo mas tarde");
    }
  };

  const handleCodigoChange = (nuevoCodigo) => {
    setCodigo(nuevoCodigo);
  };

  const actualizarEspera = (tiempoRestante) => {
    const unSegundoEnMs = 1000;
    if (tiempoRestante <= 0) {
      // eslint-disable-next-line no-undef
      clearInterval(esperaRef.current);
      return;
    }

    // eslint-disable-next-line no-undef
    clearInterval(esperaRef.current);
    setEspera(tiempoRestante - 1);

    // eslint-disable-next-line no-undef
    esperaRef.current = setTimeout(
      () => actualizarEspera(tiempoRestante - 1),
      unSegundoEnMs
    );
  };

  useFocusEffect(
    useCallback(() => {
      actualizarEspera(REENVIO_ESPERA_SEGUNDOS);

      return () => {
        // eslint-disable-next-line no-undef
        clearInterval(esperaRef.current);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  return (
    <View style={styles.container}>
      <View>
        <Parrafo style={styles.title} variante="blancoL">
          Verifica el codigo que hemos enviado a tu email
        </Parrafo>
        <TokenInput
          style={styles.tokenInput}
          onChangeText={handleCodigoChange}
        />
        <Parrafo style={styles.texto} variante="blancoS">
          Si no recibiste el mail podes reenviarlo{" "}
          {espera > 0 && `en ${espera} segundos`}
        </Parrafo>

        <View style={styles.footer}>
          <Boton
            variante="secundario"
            disabled={espera > 0}
            onPress={handleReenviar}
          >
            Reenviar
          </Boton>

          <Boton style={styles.boton} onPress={handleRecuperar}>
            Aceptar
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
    height: "100%",
  },
  title: {
    marginBottom: 32,
  },
  tokenInput: {
    marginBottom: 32,
  },
  boton: {
    alignSelf: "flex-end",
  },
  texto: {
    alignSelf: "center",
    marginBottom: 32,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
