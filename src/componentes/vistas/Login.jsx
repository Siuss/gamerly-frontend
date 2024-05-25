import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from "../../estilos/colores";
import { useNavigation } from "@react-navigation/native";

export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigation = useNavigation();

  const iniciarSesion = () => {
    navigation.navigate("busquedaDeJugadores");
  };

  const registro = () => {
    navigation.navigate("registro");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, { color: Color.secundario }]}
        placeholder="Usuario"
        placeholderTextColor={Color.secundario}
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.passwordInput, { color: Color.secundario }]}
          placeholder="Contraseña"
          placeholderTextColor={Color.secundario}
          secureTextEntry={!passwordVisible}
        />
        <TouchableOpacity
          style={styles.eyeIcon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Ionicons
            name={passwordVisible ? 'eye-off' : 'eye'}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => {}}>
        <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={iniciarSesion}>
          <Text style={styles.buttonText}>Iniciar sesión</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.registerButton]} onPress={registro}>
          <Text style={styles.buttonText}>Registrarse</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.neutro,
    padding: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 32,
    color: Color.blanco,
  },
  input: {
    width: '90%',
    height: 40,
    borderColor: Color.secundario,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
  },
  passwordContainer: {
    width: '90%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
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
    color: Color.secundario 
  },
  forgotPasswordContainer: {
    width: '90%',
    alignItems: 'flex-end',
  },
  forgotPasswordText: {
    color: '#007BFF',
    marginBottom: 20,
  },
  buttonContainer: {
    width: '90%',
    gap: 10,
    marginTop: 20,
  },
  button: {
    backgroundColor: Color.primario,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerButton: {
    backgroundColor: Color.neutro,
    borderWidth: 1,
    borderColor: Color.primario,
  },
  buttonText: {
    color: Color.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
