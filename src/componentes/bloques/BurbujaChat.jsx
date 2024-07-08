// MessageBubble.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Color } from '../../estilos/colores';

const MessageBubble = ({ message, isOwnMessage }) => {
  return (
    <View style={[styles.bubbleContainer, isOwnMessage ? styles.ownBubble : styles.otherBubble]}>
      <Text style={styles.messageText}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  bubbleContainer: {
    maxWidth: '80%',
    padding: 10,
    borderRadius: 10,
    margin: 5,
  },
  ownBubble: {
    backgroundColor: Color.acento,
    alignSelf: 'flex-end',
  },
  otherBubble: {
    backgroundColor: Color.primario,
    alignSelf: 'flex-start',
  },
  messageText: {
    color: Color.blanco,
  },
});

export default MessageBubble;
