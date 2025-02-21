import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../../estilos/colores";
import { useNavigation } from "@react-navigation/native";
import { AuthService } from "../../services/AuthService";
import { rutas } from "../rutas/rutas";
import useStore from "../../hooks/useStore";
import { jwtDecode } from 'jwt-decode';
import useToastStore from "../../hooks/useToastStore";
import { Formik } from "formik";
import { loginValidationSchema } from "../../utils/validators";
import { useAuth0 } from '@auth0/auth0-react';
import AntDesign from '@expo/vector-icons/AntDesign';

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [isOAuthLoading, setIsOAuthLoading] = useState(false);
  const navigation = useNavigation();
  const { setUsuarioLogueado } = useStore();
  const { loginWithPopup, logout, user, getAccessTokenSilently } = useAuth0();
  const { show } = useToastStore()

  const navigateJuegos = () => { navigation.navigate(rutas.juegos) }


  const iniciarSesion = async (values, { setSubmitting }) => {
    try {
      const tokenUsuario = await AuthService.login(values);
      tokenDecode(tokenUsuario)
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  };

  const tokenDecode = async (token) => {
    /*
    Descencripta el token y extrae el id y el email del usuario
    */
    const decodedToken = jwtDecode(token);

    const usuario = {
      id: decodedToken.id,
      email: decodedToken.email
    };

    /*
    guardo el usuario y el token en el store
    */
    await setUsuarioLogueado(usuario, token);


    navigateJuegos()
  }

  const registro = () => {
    navigation.navigate(rutas.registro);
  };

  const fetchUserData = async () => {
    await loginWithPopup()
  }

  const loginOAuth = async () => {
    try {
      setIsOAuthLoading(true);
      await loginWithPopup();
    } catch (error) {
      show("error", "Error de autenticación con Google");
      setIsOAuthLoading(false);
    }
  };

  useEffect(() => {
    if (user) {
      const fetchTokenAndLogin = async () => {
        try {
          const token = await getAccessTokenSilently();
          const email = user.email;
          const password = token.slice(0, 63);
          const nombre = user.nickname;
          const fechaNacimiento = user.birthdate || "01/01/1970";
          const discord = "N/A";
          const nacionalidad = user.locale || "Localidad Desconocida";
          const nuevoUsuario = {
            nombre,
            fechaNacimiento,
            email,
            password,
            discord,
            nacionalidad,
          };

          const usuarioToken = await AuthService.oAuthLogin(nuevoUsuario);
          tokenDecode(usuarioToken);
        } catch (error) {
          show("error", "Error de registro");
        } finally {
          setIsOAuthLoading(false);
        }
      };

      fetchTokenAndLogin();
    }
  }, [user]);


  const handleRecuperarContrasenia = () => {
    navigation.navigate(rutas.recuperarContrasena);
  };


  return (
    <Formik
      initialValues={{ email: "", password: "" }}
      validationSchema={loginValidationSchema}
      onSubmit={iniciarSesion}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Login</Text>
          <TextInput
            style={[styles.input, errors.email && touched.email && styles.errorInput]}
            placeholder="Email"
            placeholderTextColor={Color.secundario}
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
          />
          {errors.email && touched.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.passwordContainer}>
            <TextInput
              style={[
                styles.passwordInput,
                { color: Color.secundario },
                errors.password && touched.password && styles.errorInput
              ]}
              placeholder="Contraseña"
              placeholderTextColor={Color.secundario}
              secureTextEntry={!passwordVisible}
              onChangeText={handleChange("password")}
              onBlur={handleBlur("password")}
              value={values.password}
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
          {errors.password && touched.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <TouchableOpacity
            style={styles.forgotPasswordContainer}
            onPress={handleRecuperarContrasenia}
          >
            <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <View style={styles.buttonContainer}>
            <TouchableOpacity
              disabled={isSubmitting}
              style={[styles.button, isSubmitting && styles.deshabilitado]}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Iniciar sesión</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.buttonGoogle, isOAuthLoading && styles.deshabilitado]}
              onPress={loginOAuth}
            >
              <Text style={styles.buttonText}> <AntDesign name="google" size={16} color="white" /> Ingresar con Google</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, styles.registerButton]}
              onPress={registro}
            >
              <Text style={styles.buttonText}>Registrarse</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </Formik>
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
    marginBottom: 10,
    paddingLeft: 8,
    borderRadius: 4,
    color: Color.secundario,
  },
  passwordContainer: {
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderRadius: 4,
    marginBottom: 10,
    borderColor: Color.secundario,
  },
  passwordInput: {
    flex: 1,
    height: 40,
    paddingLeft: 8,
  },
  eyeIcon: {
    padding: 8,
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
  buttonGoogle: {
    backgroundColor: Color.googleButton,
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
    textAlign: "center"
  },
  deshabilitado: {
    opacity: 0.4,
  },
  errorInput: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
    alignSelf: "flex-start",
    marginLeft: "5%",
  },
});
