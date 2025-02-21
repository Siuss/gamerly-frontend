import { StyleSheet, View } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import useThemeStore from "../../hooks/useThemeStore";

export const CardFotoPerfil = (props) => {
  const { style, nombreUsuario, foto, ...restProps } = props;
  const {theme} = useThemeStore()
  return (
    <View style={styles.contenidoArriba} {...restProps}>
      <FotoDePerfil width={60} height={60} src={foto} />
      <Parrafo variante="blancoM" style={[
                  styles.textoUsuario,
                  { color: theme === "dark" ? Color.blanco : Color.neutro }
                ]}>
        {nombreUsuario}
      </Parrafo>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.primario,
    padding: 16,
    borderRadius: 10,
  },
  textoUsuario: {
    fontWeight: "bold",
    paddingTop: "0.5rem",
    fontSize: 16,
  },
  contenidoArriba: {
    marginBottom: 5,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
