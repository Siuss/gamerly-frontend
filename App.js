import NavBar from "./src/componentes/bloques/Navbar";
import {BusquedaDeJugadores} from"./src/componentes/vistas/BusquedaDeJugadores";
import { View } from "react-native-web";

export default function App() {
  return (
  <View>
    <BusquedaDeJugadores/>
    <NavBar/>

  </View>

  
  );
  

}
