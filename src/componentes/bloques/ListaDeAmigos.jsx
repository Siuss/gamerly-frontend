import { ScrollView, StyleSheet } from "react-native";
import { CardAmigo } from "./CardAmigo";
import { JugadoresService } from "../../services/JugadoresService";
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import { useToast } from "../../hooks/useToast";

export const ListaDeAmigos = (props) => {
  const {
    style,
    amigos,
    onAmigoClick,
    onBorrarAmigo,
    onBloquear,
    ...restProps
  } = props;
  const { show } = useToast();

  const handleBorrar = async (amigo) => {
    try {
      const idUsuarioLogueado = await getUsuarioLogueadoId();
      const amigoBorrado = await JugadoresService.borrarAmigo(
        idUsuarioLogueado,
        amigo.id
      );
      show("success", `${amigoBorrado.nombre} y tu ya no son amigos`);
      onBorrarAmigo(amigoBorrado);
    } catch {
      show("error", "Hubo un error inesperado intentalo mas tarde");
    }
  };

  const handleBloquear = async (amigo) => {
    try {
      const idUsuarioLogueado = await getUsuarioLogueadoId();
      await JugadoresService.bloquearJugador(idUsuarioLogueado, amigo.id);
      show("success", `Has bloqueado a ${amigo.nombre}`);
      onBloquear(amigo);
    } catch {
      show("error", "Hubo un error inesperado intentalo mas tarde");
    }
  };

  const handleDesbloquear = async (amigo) => {
    try {
      const idUsuarioLogueado = await getUsuarioLogueadoId();
      await JugadoresService.desbloquearJugador(idUsuarioLogueado, amigo.id);
      show("success", `Has desbloqueado a ${amigo.nombre}`);
      onBloquear(amigo);
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
          bloqueado={amigo.bloqueado}
          foto={amigo.foto}
          nombreUsuario={amigo.nombre}
          plataforma={amigo.plataformas[0]}
          juego={amigo.juegosPreferidos[0]}
          onBorrar={() => handleBorrar(amigo)}
          onBloquear={() => handleBloquear(amigo)}
          onDesbloquear={() => handleDesbloquear(amigo)}
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
