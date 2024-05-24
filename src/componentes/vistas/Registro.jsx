import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Color } from "../../estilos/colores";
import { Ionicons } from '@expo/vector-icons';

export const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [nacionalidad, setNacionalidad] = useState('');
  const [email, setEmail] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [aceptoTerminos, setAceptoTerminos] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegistro = () => {
    // Aquí puedes realizar la lógica de registro con los datos ingresados
    // Por ejemplo, enviar los datos a un servidor
  };

  const clearInput = (setState) => {
    setState('');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registro</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nombre y Apellido"
          value={nombre}
          onChangeText={setNombre}
        />
        {nombre !== '' && (
          <TouchableOpacity onPress={() => clearInput(setNombre)} style={styles.inputIcon}>
            <Ionicons name="close" size={24} color={Color.secundario} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Fecha de Nacimiento"
          value={fechaNacimiento}
          onChangeText={setFechaNacimiento}
        />
        {fechaNacimiento !== '' && (
          <TouchableOpacity onPress={() => clearInput(setFechaNacimiento)} style={styles.inputIcon}>
            <Ionicons name="close" size={24} color={Color.secundario} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Nacionalidad"
          value={nacionalidad}
          onChangeText={setNacionalidad}
        />
        {nacionalidad !== '' && (
          <TouchableOpacity onPress={() => clearInput(setNacionalidad)} style={styles.inputIcon}>
            <Ionicons name="close" size={24} color={Color.secundario} />
          </TouchableOpacity>
        )}
      </View>
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          {email !== '' && (
            <TouchableOpacity onPress={() => clearInput(setEmail)} style={styles.inputIcon}>
              <Ionicons name="close" size={24} color={Color.secundario} />
            </TouchableOpacity>
          )}
      </View>
      <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Contraseña"
            secureTextEntry={!showPassword}
            value={contrasena}
            onChangeText={setContrasena}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.inputIcon}
          >
            <Ionicons name={showPassword ? "eye-off" : "eye"} size={24} color={Color.secundario} />
          </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <TouchableOpacity
          style={styles.checkbox}
          onPress={() => setAceptoTerminos(!aceptoTerminos)}
        >
          <View style={styles.checkboxInnerContainer}>
            <View style={[styles.checkboxSquare, aceptoTerminos && styles.checkboxSquareChecked]} />
            <Text style={styles.checkboxText}>Acepto términos y condiciones</Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleRegistro}>
        <Text style={styles.buttonText}>Registrarme</Text>
      </TouchableOpacity>
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
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  input: {
    flex: 1,
    height: 40,
    width: '100%',
    borderColor: Color.secundario,
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    borderRadius: 4,
    color: Color.secundario,
  },
  inputIcon: {
    position: 'absolute',
    marginBottom: "5%",
    right: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 16,
    width: '100%',
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxInnerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    
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
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '7%',
  },
  buttonText: {
    color: Color.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

