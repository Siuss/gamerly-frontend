// ChatScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
// La comente porque esta rompiendo
//import MessageBubble from './MessageBubble';
import { Color } from '../../estilos/colores';

const ChatScreen = () => {
  // Mock de datos de usuario
  const user = {
    name: 'Pedro Diaz',
    imageUrl: 'https://your-image-url.com', // Reemplaza con la URL de la imagen de perfil
    status: 'En línea', // Puedes cambiarlo a 'Desconectado' para probar diferentes estados
  };

  const [inputText, setInputText] = useState('');
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hola, Jugamos?', isOwnMessage: false },
    { id: 2, text: 'Sí, dale', isOwnMessage: true },
  ]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (inputText.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: inputText, isOwnMessage: true }]);
      setInputText('');
      setIsTyping(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Image
          source={{ uri: user.imageUrl }}
          style={styles.profileImage}
        />
        <View>
          <Text style={styles.username}>{user.name}</Text>
          <Text style={styles.typingStatus}>{isTyping ? 'Escribiendo...' : user.status}</Text>
        </View>
      </View>
      <ScrollView style={styles.chatContainer}>
        {/* Lo comente porque esta rompiendo
        messages.map(message => (
          <MessageBubble key={message.id} message={message.text} isOwnMessage={message.isOwnMessage} />
        ))*/}
      </ScrollView>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Input text"
          placeholderTextColor={Color.gris}
          value={inputText}
          onChangeText={text => {
            setInputText(text);
            setIsTyping(text.length > 0);
          }}
        />
        <TouchableOpacity onPress={handleSend}>
          <Image
            source={{ uri: 'https://icon-url.com/send-icon' }} // Reemplaza con la URL del ícono de enviar
            style={styles.sendIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.neutro,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.primario,
    padding: 10,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  username: {
    color: Color.blanco,
    marginLeft: 10,
    fontSize: 18,
  },
  typingStatus: {
    color: Color.blanco,
    marginLeft: 10,
    fontSize: 14,
  },
  chatContainer: {
    flex: 1,
    padding: 10,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Color.primario,
    padding: 10,
  },
  input: {
    flex: 1,
    backgroundColor: Color.neutro,
    color: Color.blanco,
    padding: 10,
    borderRadius: 20,
    borderColor: Color.bordeBoton,
    borderWidth: 1,
  },
  sendIcon: {
    width: 30,
    height: 30,
    marginLeft: 10,
  },
});

export default ChatScreen;
