import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../../estilos/colores";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { AuthService } from "../../services/AuthService";
import { rutas } from "../rutas/rutas";
import useStore from "../../hooks/useStore";
import { jwtDecode } from 'jwt-decode';
import useToastStore from "../../hooks/useToastStore";
import { Formik } from "formik";
import {NotificacionesService} from "../../services/NotificacionesService";
import { loginValidationSchema } from "../../utils/validators";


export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();
  const { setUsuarioLogueado } = useStore();
  const { show } = useToastStore()

  const navigateJuegos = () => { navigation.navigate(rutas.juegos) }


  const iniciarSesion = async (values, { setSubmitting }) => {
    try {

      const tokenUsuario = await AuthService.login(values);


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

      // await NotificacionesService.obtenerTokenDeNotificaciones(usuario.id);

      navigateJuegos()
    } catch (error) {
      console.log(error)
    } finally {
      setSubmitting(false)
    }
  };

  const registro = () => {
    navigation.navigate(rutas.registro);
  };

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
