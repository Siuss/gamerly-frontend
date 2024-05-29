import { StyleSheet, View } from "react-native";
import { ListaDeAmigos } from "../bloques/ListaDeAmigos";
import { Color } from "../../estilos/colores";
import jugadoresMock from "../../mocks/jugadoresMock.json";  // Importa correctamente los datos
import { useRoute } from '@react-navigation/native';

export const Amigos = (props) => {
    const route = useRoute();
    const { id } = route.params;

    function obtenerAmigosPorId(id) {
        const jugador = jugadoresMock.find((jugador) => jugador.id === id);

        if (!jugador || !jugador.amigos) {
            return [];
        }

        const amigosFiltrados = jugadoresMock.filter((amigo) =>
            jugador.amigos.includes(amigo.nombreUsuario)
        );

        return amigosFiltrados;
    }

    const amigosFiltrados = obtenerAmigosPorId(id);

    return (
        <View style={styles.container}>
            <ListaDeAmigos
                amigos={amigosFiltrados}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.neutro,
        width: "100%",
        height: "100%",
    },
});
