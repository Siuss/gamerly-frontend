import { ScrollView, StyleSheet } from "react-native";
import { CardAmigo } from "./CardAmigo";
import { JugadoresService } from "../../services/JugadoresService";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import { useToast } from "../../hooks/useToast";

export const ListaDeAmigos = (props) => {
  const { style, amigos, onAmigoClick, onBorrarAmigo, ...restProps } = props;
  const { show } = useToast();

  const handleBorrar = async (amigo) => {
    try {
      const idUsuarioLogueado = await getUsuarioLogueadoId();
      await JugadoresService.borrarAmigo(idUsuarioLogueado, amigo.id);
      onBorrarAmigo(amigo);
    } catch {
      show("error", "Hubo un error inesperado intentalo mas tarde");
    }
  };

  return (
    <ScrollView
      contentContainerStyle={[styles.container, style]}
      {...restProps}
    >
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
    </ScrollView>
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
