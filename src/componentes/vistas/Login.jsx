import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Color } from "../../estilos/colores";
import { useNavigation } from "@react-navigation/native";
import { SesionService } from "../../services/SesionService"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rutas } from '../rutas/rutas';
import {useMessageToast} from "../../hooks/useToast";
import UseStore from "../../hooks/useStore";


export const Login = () => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [credenciales, setCredenciales] = useState({ email: "", password: "" });
  const navigation = useNavigation();
  const {errorToast} = useMessageToast();
  const { login, setUser } = UseStore()

  const handleCredencialesChange = (campo, valor) => {
    setCredenciales({ ...credenciales, [campo]: valor })
  }

  useEffect(() => {
    const rellenarEmail = async () =>{
      const usuario = JSON.parse(await AsyncStorage.getItem("usuario"))
      if(!usuario) return
      
      handleCredencialesChange("email", usuario.email)
    }

    rellenarEmail()
  }, [])

  const iniciarSesion = async () => {
    try {
      const usuario = await SesionService.login(credenciales)
      await AsyncStorage.setItem("usuario", JSON.stringify(usuario))
      navigation.navigate(rutas.juegos);
      if (usuario) {
        login()
        setUser(usuario)
        navigation.navigate("busquedaDeJugadores");
      }
    } catch (error) {
        errorToast(error)
    }
  };

  const registro = () => {
    navigation.navigate(rutas.registro);
  };

  const recuperar = () => {
    navigation.navigate(rutas.recuperarContrasena);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={[styles.input, { color: Color.secundario }]}
        onChangeText={(value) => handleCredencialesChange("email", value)}
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
      <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => { }}>
        <Text style={styles.forgotPasswordText} onPress={recuperar}>¿Olvidaste tu contraseña?</Text>
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
