import React, { useMemo, useState } from "react";
import { SesionService } from "../../services/SesionService";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { Color } from "../../estilos/colores";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import moment from "moment";
import { useToast } from "../../hooks/useToast";
import { rutas } from "../rutas/rutas";

const regexpFecha = /[^0-9/]/;
const regexpContrasena = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;
const regexpEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const Registro = () => {
  const { show } = useToast();
  const [nombre, setNombre] = useState("");
  const [discord, setDiscord] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [nacionalidad, setNacionalidad] = useState("");
  const [email, setEmail] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [fechaEsValida, setFechaEsValida] = useState(true);
  const [contrasenaEsValida, setContrasenaEsValida] = useState(true);
  const [nombreEsValido, setNombreEsValido] = useState(true);
  const [discordEsValido, setDiscordEsValido] = useState(true);
  const [emailEsValido, setEmailEsValido] = useState(true);
  const [nacionalidadEsValida, setNacionalidadEsValida] = useState(true);
  const navigation = useNavigation();

  const validadorFecha = () => fechaNacimiento.length === 10 && fechaEsValida;

  const validadorContrasena = () =>
    contrasena && regexpContrasena.test(contrasena);

  const validadorNombre = () => nombre.length > 2;

  const validadorEmail = () => email && regexpEmail.test(email);

  const validadorNacionalidad = () => !!nacionalidad;

  const validadorDiscord = () => discord.length > 2;

  const validadorFormulario = () => {
    return (
      validadorNombre() &&
      validadorDiscord() &&
      validadorFecha() &&
      validadorContrasena() &&
      validadorEmail() &&
      validadorNacionalidad() &&
      aceptoTerminos
    );
  };

  const formularioEsValido = useMemo(() => {
    return validadorFormulario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    nombre,
    discord,
    fechaNacimiento,
    nacionalidad,
    email,
    contrasena,
    aceptoTerminos,
    fechaEsValida,
  ]);

  const handleChangeContrasena = (password) => {
    setContrasena(password);
    setContrasenaEsValida(password === "" || regexpContrasena.test(password));
  };

  const handleChangeNombre = (_nombre) => {
    setNombre(_nombre);
    setNombreEsValido(_nombre === "" || _nombre.length > 2);
  };

  const handleLimpiarNombre = () => {
    clearInput(setNombre);
    setNombreEsValido(true);
  };

  const handleChangeDiscord = (_discord) => {
    setDiscord(_discord);
    setDiscordEsValido(_discord === "" || _discord.length > 2);
  };

  const handleLimpiarDiscord = () => {
    clearInput(setDiscord);
    setDiscordEsValido(true);
  };

  const handleChangeEmail = (mail) => {
    setEmail(mail);
    setEmailEsValido(mail === "" || regexpEmail.test(mail));
  };

  const handleLimpiarMail = () => {
    clearInput(setEmail);
    setEmailEsValido(true);
  };

  const handleChangeNacionalidad = (nacion) => {
    setNacionalidad(nacion);
    setNacionalidadEsValida(nacion === "" || nacion.length > 2);
  };

  const handleLimpiarNacionalidad = () => {
    clearInput(setNacionalidad);
    setNacionalidadEsValida(true);
  };

  const handleChangeFechaNacimiento = (fecha) => {
    const fechaMomentJs = moment(fecha, "DD/MM/YYYY", true);

    if (fecha.length > 9) {
      setFechaEsValida(fechaMomentJs.isValid());
    } else {
      setFechaEsValida(true);
    }

    if (regexpFecha.test(fecha)) {
      setFechaEsValida(false);
    }

    setFechaNacimiento(fecha);
  };

  const handleLimpiarFechaNacimiento = () => {
    clearInput(setFechaNacimiento);
    setFechaEsValida(true);
  };

  const clearInput = (setState) => {
    setState("");
  };

  const handleRegistro = async () => {
    try {
      const nuevoUsuario = {
        nombre,
        fechaNacimiento,
        email,
        password: contrasena,
        discord,
        nacionalidad,
      };

      await SesionService.signUp(nuevoUsuario);
      navigation.navigate(rutas.login);
    } catch {
      show("error", "Error inesperado intentalo mas tarde");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <View style={styles.inputContainer}>
        <TextInput
          color={Color.blanco}
          placeholderTextColor={Color.secundario}
          style={[styles.input, !nombreEsValido && styles.inputError]}
          placeholder="Nombre y Apellido"
          value={nombre}
          onChangeText={handleChangeNombre}
        />
        {nombre !== "" && (
          <TouchableOpacity
            onPress={handleLimpiarNombre}
            style={styles.inputIcon}
          >
            <Ionicons
              name="close"
              size={24}
              color={nombreEsValido ? Color.secundario : Color.error}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, !discordEsValido && styles.inputError]}
          placeholder="Usuario de discord"
          placeholderTextColor={Color.secundario}
          value={discord}
          onChangeText={handleChangeDiscord}
        />
        {discord !== "" && (
          <TouchableOpacity
            onPress={handleLimpiarDiscord}
            style={styles.inputIcon}
          >
            <Ionicons
              name="close"
              size={24}
              color={discordEsValido ? Color.secundario : Color.error}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, !fechaEsValida && styles.inputError]}
          placeholder="Fecha de Nacimiento (DD/MM/YYYY)"
          placeholderTextColor={Color.secundario}
          value={fechaNacimiento}
          onChangeText={handleChangeFechaNacimiento}
        />
        {fechaNacimiento !== "" && (
          <TouchableOpacity
            onPress={handleLimpiarFechaNacimiento}
            style={styles.inputIcon}
          >
            <Ionicons
              name="close"
              size={24}
              color={fechaEsValida ? Color.secundario : Color.error}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, !nacionalidadEsValida && styles.inputError]}
          placeholder="Nacionalidad"
          placeholderTextColor={Color.secundario}
          value={nacionalidad}
          onChangeText={handleChangeNacionalidad}
        />
        {nacionalidad !== "" && (
          <TouchableOpacity
            onPress={handleLimpiarNacionalidad}
            style={styles.inputIcon}
          >
            <Ionicons
              name="close"
              size={24}
              color={nacionalidadEsValida ? Color.secundario : Color.error}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, !emailEsValido && styles.inputError]}
          placeholder="Email"
          placeholderTextColor={Color.secundario}
          value={email}
          onChangeText={handleChangeEmail}
        />
        {email !== "" && (
          <TouchableOpacity
            onPress={handleLimpiarMail}
            style={styles.inputIcon}
          >
            <Ionicons
              name="close"
              size={24}
              color={emailEsValido ? Color.secundario : Color.error}
            />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={[
            styles.input,
            styles.inputContrasenia,
            !contrasenaEsValida && styles.inputError,
          ]}
          placeholder="Contraseña"
          placeholderTextColor={Color.secundario}
          secureTextEntry={!showPassword}
          value={contrasena}
          onChangeText={handleChangeContrasena}
        />
        <TouchableOpacity
          onPress={() => setShowPassword(!showPassword)}
          style={styles.inputIcon}
        >
          <Ionicons
            name={showPassword ? "eye" : "eye-off"}
            size={24}
            color={contrasenaEsValida ? Color.secundario : Color.error}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAceptoTerminos(!aceptoTerminos)}
        >
          <View style={styles.checkboxInnerContainer}>
            <View
              style={[
                styles.checkboxSquare,
                aceptoTerminos && styles.checkboxSquareChecked,
              ]}
            />
            <Text style={styles.checkboxText}>
              Acepto términos y condiciones
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          !formularioEsValido && styles.botonDeshabilitado,
        ]}
        onPress={handleRegistro}
        disabled={!formularioEsValido}
      >
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>
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
  inputIcon: {
    position: "absolute",
    bottom: 24,
    right: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    marginBottom: 16,
    width: "100%",
  },
  checkbox: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxInnerContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderColor: Color.blanco,
    borderWidth: 1,
    marginRight: 8,
  },
  checkboxSquareChecked: {
    backgroundColor: Color.primario,
  },
  checkboxText: {
    color: Color.blanco,
  },
  button: {
    backgroundColor: Color.primario,
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: "7%",
  },
  botonDeshabilitado: {
    opacity: 0.4,
  },
  buttonText: {
    color: Color.blanco,
    fontSize: 16,
    fontWeight: "bold",
  },
  inputContrasenia: {
    paddingRight: 48,
  },
});
