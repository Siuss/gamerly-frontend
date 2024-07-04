import { StyleSheet, View } from "react-native";
import { Color } from "../../estilos/colores";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { BotonFlotante } from "../atomos/botonFlotante/BotonFlotante";

export const CardReseniaPendiente = ({
  id,
  nombre,
  foto,
  discord,
  style,
  onAceptar,
  onRechazar,
  ...restProps
}) => (
  <View style={[styles.card, style]} {...restProps}>
    <FotoDePerfil width={64} height={64} src={foto} />
    <View style={styles.perfilInfo}>
      <Parrafo variante="blancoM" style={styles.textoResenia}>
        {nombre}
      </Parrafo>

      <Parrafo variante="blancoM" style={styles.textoResenia}>
        Discord: {discord}
      </Parrafo>
    </View>

    <View style={styles.botones}>
      <BotonFlotante
        size={14}
        style={styles.rechazar}
        name="close"
        color={Color.secundario}
        onPress={onRechazar}
      />
      <BotonFlotante
        size={14}
        style={styles.aceptar}
        name="check"
        color={Color.primario}
        onPress={onAceptar}
      />
    </View>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: Color.primario,
    padding: 16,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  perfilInfo: {
    justifyContent: "space-around",
  },
  botones: {
    display: "flex",
    flexDirection: "row",
    gap: 8,
  },
  aceptar: {
    backgroundColor: Color.secundario,
  },
  rechazar: {
    borderWidth: 1,
    color: Color.secundario,
    borderColor: Color.secundario,
  },
});
