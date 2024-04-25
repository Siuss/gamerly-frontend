import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import {Color} from "../../estilos/colores"



export const HeaderTitle = ({ title }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>{'<-'}</Text>
      </TouchableOpacity>
      <Text style={styles.title}>{title}</Text>
      <View style={{ flex: 1 }} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.primario,
    height: 60,
    paddingHorizontal: 20,
  },
  title: {
    flex: 1, 
    fontSize: 20,
    color: 'white',
    textAlign: 'center', 
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  button: {
    marginRight: 100,
  },
});

export default HeaderTitle;
