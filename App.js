import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import FotoDePerfil from './src/componentes/atomos/fotoDePerfil/FotoDePerfil';
import Parrafo from './src/componentes/atomos/parrafo/Parrafo';

export default function App() {
  return (
    <View style={styles.container}>
      <FotoDePerfil src='https://www.civitatis.com/f/argentina/bariloche/free-tour-bariloche-589x392.jpg'/>
      <Parrafo variante='blancoS' subrayado>hola confundido</Parrafo>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
