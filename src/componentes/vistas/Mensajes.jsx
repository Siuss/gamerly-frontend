import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { Color } from '../../estilos/colores';

const DATA = [
  {
    id: '1',
    name: 'Pedro Diaz',
    message: 'Mensaje',
    image: 'https://via.placeholder.com/150', // URL de la imagen de perfil
  },
  {
    id: '2',
    name: 'José Fernandez',
    message: 'Mensaje',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '3',
    name: 'Luz Calderon',
    message: 'Mensaje',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: '4',
    name: 'Paula Gomez',
    message: 'Mensaje',
    image: 'https://via.placeholder.com/150',
  },
];

const Item = ({ name, message, image }) => (
  <View style={styles.item}>
    <Image source={{ uri: image }} style={styles.profileImage} />
    <View style={styles.textContainer}>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
    <Text style={styles.messageCount}>100+</Text>
  </View>
);

const MessagesList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mensajes</Text>
      <FlatList
        data={DATA}
        renderItem={({ item }) => <Item name={item.name} message={item.message} image={item.image} />}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.primario,
    padding: 16,
  },
  title: {
    fontSize: 24,
    color: Color.blanco,
    marginBottom: 16,
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.secundario,
    padding: 12,
    marginVertical: 4,
    borderRadius: 8,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 18,
    color: Color.blanco,
  },
  message: {
    fontSize: 14,
    color: Color.blanco,
  },
  messageCount: {
    fontSize: 16,
    color: Color.blanco,
  },
});

export default MessagesList;
