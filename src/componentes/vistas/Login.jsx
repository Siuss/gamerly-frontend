import React, { useState, useCallback, useMemo } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../../estilos/colores";
import { useNavigation , useFocusEffect } from "@react-navigation/native";
import { AuthService } from "../../services/AuthService";
import { rutas } from "../rutas/rutas";
import { useToast } from "../../hooks/useToast";
import useStore from "../../hooks/useStore";
import { NotificacionesService } from "../../services/NotificacionesService";
import { jwtDecode } from 'jwt-decode';
import { useAuth0 } from '@auth0/auth0-react';

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  const navigation = useNavigation();
  const { show } = useToast();
  const { getToken, setUsuarioLogueado } = useStore();
  const { loginWithPopup, logout, user, getAccessTokenSilently } = useAuth0();

  const formularioEstaVacio = useMemo(
    () => !credenciales.email && !credenciales.password,
    [credenciales]
  );
  const handleCredencialesChange = (campo, valor) => {
    setCredenciales({ ...credenciales, [campo]: valor });
  };

  const iniciarSesion = async () => {
    try {

      const tokenUsuario = await AuthService.login({
        ...credenciales,
      });


      /*
      Descencripta el token y extrae el id y el email del usuario
      
      */
      const decodedToken = jwtDecode(tokenUsuario);

      const usuario = {
        id: decodedToken.id,
        email: decodedToken.email
      };

      /*
      guardo el usuario y el token en el store
      */
      await setUsuarioLogueado(usuario, tokenUsuario);

      navigation.navigate(rutas.juegos);
    } catch (error) {
      if (error.response?.status === 401) {
        show("error", "Credenciales invalidas");
        return
      }

      show("error", "Hubo un error inesperado intentalo mas tarde");
    }
  };

  const registro = () => {
    navigation.navigate(rutas.registro);
  };

  const fetchUserData = async () => {
    await loginWithPopup()
  }

  const loginOAuth = async () => {
    try {
      await fetchUserData()
      const token = await getAccessTokenSilently()
      const email = user.email
      const password = token.slice(0, 63)
      const nombre = user.nickname
      const fechaNacimiento = user.birthdate || "01/01/1970"
      const discord = "N/A"
      const nacionalidad = user.locale || "Localidad Desconocida"
      const nuevoUsuario = {
        nombre,
        fechaNacimiento,
        email,
        password,
        discord,
        nacionalidad,
      };
      await AuthService.oAuthLogin(nuevoUsuario);

      /*const usuario = {
        email,
        password
      }
      setCredenciales(usuario)
      await iniciarSesion()*/
    } catch (error) {
      show("error", "error de registro");
    }
  }

  const handleRecuperarContrasenia = () => {
    navigation.navigate(rutas.recuperarContrasena);
  };

  const rellenarEmail = async () => {
    handleCredencialesChange("email", (await getToken()).email);
  };

  useFocusEffect(
    useCallback(() => {
      rellenarEmail();

      return () => {
        setCredenciales({email: '', password: ''})
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, { color: Color.secundario }]}
        onChangeText={(value) =>
          handleCredencialesChange("email", value.toLowerCase())
        }
        placeholder="Email"
        placeholderTextColor={Color.secundario}
        value={credenciales.email}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, { color: Color.secundario }]}
          onChangeText={(value) => handleCredencialesChange("password", value)}
          placeholder="Contraseña"
          placeholderTextColor={Color.secundario}
          secureTextEntry={!passwordVisible}
          value={credenciales.password}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Ionicons
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.forgotPasswordContainer}
        onPress={handleRecuperarContrasenia}
      >
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          disabled={formularioEstaVacio}
          style={[styles.button, formularioEstaVacio && styles.deshabilitado]}
          onPress={iniciarSesion}
        >
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, styles.registerButton]}
          onPress={registro}
        >
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {loginOAuth()}}
        >
          <Text style={styles.buttonText}>Ingresar con Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button]}
          onPress={logout}
        >
          <Text style={styles.buttonText}>salir</Text>
        </TouchableOpacity>
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
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 32,
    color: Color.blanco,
  },
  input: {
    width: "90%",
    height: 40,
    borderColor: Color.secundario,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
  },
  passwordContainer: {
    width: "90%",
    height: 40,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 16,
    borderColor: Color.secundario,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingLeft: 8,
  },
  eyeIcon: {
    padding: 8,
    color: Color.secundario,
  },
  forgotPasswordContainer: {
    width: "90%",
    alignItems: "flex-end",
  },
  forgotPasswordText: {
    color: "#007BFF",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "90%",
    gap: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: Color.primario,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  registerButton: {
    backgroundColor: Color.neutro,
    borderWidth: 1,
    borderColor: Color.primario,
  },
  buttonText: {
    color: Color.blanco,
    fontSize: 16,
    fontWeight: "bold",
  },
  deshabilitado: {
    opacity: 0.4,
  },
});
