import React from 'react';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { Color } from "../../estilos/colores";
import { useNavigation } from "@react-navigation/native";

export const RecuperarContrasena = () => {
    const navigation = useNavigation();

    const handleRecuperar = () => {
        navigation.navigate("login");
      };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Contraseña</Text>
      <TextInput
        style={[styles.input, { color: Color.secundario }]}
        placeholder="Correo electrónico"
        placeholderTextColor={Color.secundario}
      />
      <TouchableOpacity style={styles.button} onPress={handleRecuperar}>
        <Text style={styles.buttonText}>Enviar</Text>
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
    fontSize: 30,
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
  button: {
    backgroundColor: Color.primario,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    width: "60%",
  },
  buttonText: {
    color: Color.blanco,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
