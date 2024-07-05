// src/componentes/MessagesList.jsx
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { CardMessage } from './../bloques/CardMensaje';

const mockUsers = [
  { id: 1, name: "Alice", message: "Hello there!", photo: "https://example.com/photo1.jpg", messageCount: 10 },
  { id: 2, name: "Bob", message: "Hi! How are you?", photo: "https://example.com/photo2.jpg", messageCount: 5 },
  { id: 3, name: "Charlie", message: "Good afternoon!", photo: "https://example.com/photo3.jpg", messageCount: 8 },
];

const MessagesList = () => {
  const handleCardClick = (id) => {
    console.log(`Message ${id} clicked`);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={mockUsers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <CardMessage
            name={item.name}
            message={item.message}
            photo={item.photo}
            messageCount={item.messageCount}
            onMessageClick={() => handleCardClick(item.id)}
          />
        )}
      />
    </View>
  );
};

export default MessagesList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
