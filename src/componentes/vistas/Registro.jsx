import React, { useState } from "react";
import { Formik } from "formik";

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
import { useToast } from "../../hooks/useToast";
import { AuthService } from "../../services/AuthService";
import { rutas } from "../rutas/rutas";
import NacionalidadSelect from "../../componentes/atomos/nacionalidadSelect/nacionalidadSelect";
import { registerValidationSchema } from "../../utils/validators";

export const Registro = () => {
  const { show } = useToast();
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistro = async (values) => {
    try {
      await AuthService.signUp(values);
      navigation.navigate(rutas.login);
    } catch {
      show("error", "Error inesperado, intenta más tarde");
    }
  };

  return (
    <Formik
      initialValues={{
        nombre: "",
        discord: "",
        fechaNacimiento: "",
        nacionalidad: "",
        email: "",
        password: "",
        aceptoTerminos: false,
      }}
      validationSchema={registerValidationSchema}
      onSubmit={handleRegistro}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        touched,
        setFieldValue,
      }) => (
        <View style={styles.container}>
          <Text style={styles.title}>Registro</Text>

          {/* Nombre */}
          <InputField
            placeholder="Nombre y Apellido"
            value={values.nombre}
            onChangeText={handleChange("nombre")}
            error={errors.nombre}
            touched={touched.nombre}
          />

          {/* Discord */}
          <InputField
            placeholder="Usuario de Discord"
            value={values.discord}
            onChangeText={handleChange("discord")}
            error={errors.discord}
            touched={touched.discord}
          />

          {/* Fecha de Nacimiento */}
          <InputField
            placeholder="Fecha de Nacimiento (DD/MM/YYYY)"
            value={values.fechaNacimiento}
            onChangeText={handleChange("fechaNacimiento")}
            error={errors.fechaNacimiento}
            touched={touched.fechaNacimiento}
          />

          {/* Nacionalidad */}
          <NacionalidadSelect
            onSelect={(value) => setFieldValue("nacionalidad", value)}
          />
          {touched.nacionalidad && errors.nacionalidad && (
            <Text style={styles.errorText}>{errors.nacionalidad}</Text>
          )}

          {/* Email */}
          <InputField
            placeholder="Email"
            value={values.email}
            onChangeText={(email) => setFieldValue("email", email.toLowerCase())}
            error={errors.email}
            touched={touched.email}
          />

          {/* Contraseña */}
          <InputField
            placeholder="Contraseña"
            value={values.password}
            onChangeText={handleChange("password")}
            secureTextEntry={!showPassword}
            error={errors.password}
            touched={touched.password}
            rightIcon={
              <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                <Ionicons
                  name={showPassword ? "eye" : "eye-off"}
                  size={24}
                  color={Color.secundario}
                />
              </TouchableOpacity>
            }
          />

          {/* Checkbox */}
          <TouchableOpacity
            style={styles.checkboxContainer}
            onPress={() => setFieldValue("aceptoTerminos", !values.aceptoTerminos)}
          >
            <View style={styles.checkboxSquare}>
              {values.aceptoTerminos && (
                <Ionicons name="checkmark" size={18} color={Color.blanco} />
              )}
            </View>
            <Text style={styles.checkboxText}>Acepto términos y condiciones</Text>
          </TouchableOpacity>
          {touched.aceptoTerminos && errors.aceptoTerminos && (
            <Text style={styles.errorText}>{errors.aceptoTerminos}</Text>
          )}

          {/* Botón de Registro */}
          <TouchableOpacity
            style={[
              styles.button,
              !(Object.keys(errors).length === 0) && styles.botonDeshabilitado,
            ]}
            onPress={handleSubmit}
          
          >
            <Text style={styles.buttonText}>Registrarme</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};

// Componente reutilizable de Input
const InputField = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry,
  error,
  touched,
  rightIcon,
}) => (
  <View style={styles.inputContainer}>
    <TextInput
      style={[styles.input, error && touched && styles.inputError]}
      placeholder={placeholder}
      placeholderTextColor={Color.secundario}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
    />
    {rightIcon && <View style={styles.inputIcon}>{rightIcon}</View>}
    {error && touched && <Text style={styles.errorText}>{error}</Text>}
  </View>
);

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
    width: "100%",
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: Color.secundario,
    borderWidth: 1,
    borderRadius: 4,
    paddingLeft: 8,
    paddingRight: 40,
    color: Color.blanco,
  },
  inputError: {
    borderColor: Color.error,
  },
  inputIcon: {
    position: "absolute",
    right: 10,
    bottom: 10,
  },
  errorText: {
    color: Color.error,
    fontSize: 12,
    marginTop: 4,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkboxSquare: {
    width: 20,
    height: 20,
    borderColor: Color.blanco,
    borderWidth: 1,
    marginRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    color: Color.blanco,
  },
  button: {
    backgroundColor: Color.primario,
    paddingVertical: 15,
    borderRadius: 100,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  botonDeshabilitado: {
    opacity: 0.4,
  },
  buttonText: {
    color: Color.blanco,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Registro;
