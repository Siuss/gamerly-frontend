import { StyleSheet, View } from "react-native";
import { CardAmigo } from "./CardAmigo"
import { JugadoresService } from "../../services/JugadoresService";
import { Toast } from "toastify-react-native";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";

export const ListaDeAmigos = (props) => {
  const { style, amigos, onAmigoClick, onBorrarAmigo, ...restProps } = props;

  const handleBorrar = async (amigo) => {
    try {
      const idUsuarioLogueado = await getUsuarioLogueadoId()
      await JugadoresService.borrarAmigo(idUsuarioLogueado, amigo.id)
      onBorrarAmigo(amigo)

      Toast.success("Se ha eleminado al jugador exitosamente")
    } catch (error) {
      console.log(error)
      Toast.error("Hubo un error inesperado intentalo mas tarde")
    }
  }

  return (
    <View style={[styles.container, style]} {...restProps}>
      {amigos.map((amigo) => (
        <CardAmigo
          key={amigo.nombre}
          style={styles.card}
          foto={amigo.foto}
          nombreUsuario={amigo.nombre}
          plataforma={amigo.plataformas[0]}
          juego={amigo.juegosPreferidos[0]}
          onBorrar={() => handleBorrar(amigo)}
          onAmigoClick={() => onAmigoClick(amigo)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    alignItems: "center",
    padding: 8,
  },
  card: {
    width: "95%",
    marginBottom: 8,
  },
});
