import { StyleSheet,Text, View } from "react-native"
import { Color } from "../../estilos/colores"
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil"
import { Parrafo } from "../atomos/parrafo/Parrafo"
import Icons from "@expo/vector-icons/AntDesign"
import { Gradiente } from "../atomos/gradiente/Gradiente"

export const CardResenia = (props) => {
  const { style, ...restProps } = props;

  return (
    <Gradiente
      variante="gradienteVertical"
      style={[styles.card, style]}
      {...restProps}
    >
      <View>
        <View style={styles.contenidoArriva}>
          <Text style={styles.texto}>Reseña - {props.puntaje} 
            <Icons style={styles.iconoStar} name="star"size={14}/> 
          </Text>    
        </View>
        <View style={styles.contenidoAbajo}>
          <FotoDePerfil width={30} height={30} src={props.foto} />
          <View>
            <Parrafo variante="blancoM" style={styles.textoResenia} maxWidth= {240}>{props.resenia}</Parrafo>
          </View>
        </View>
      </View>
    </Gradiente>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.primario,
    padding: 16,
    borderRadius: 10,
  },
  texto: {
    color: Color.blanco,
    fontWeight: 'bold',
  },
  contenidoArriva: {
    marginBottom: 5,
    display: "flex",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  contenidoAbajo: {
    display: "flex",
    flexDirection: "row",
  },
  iconoStar: {
    position: "absolute",
    marginLeft: 5,
    top: "18%",
  },
  textoResenia: {
    marginLeft: 10,
    width:"100%",
    maxWidth: "16rem",
  },
});