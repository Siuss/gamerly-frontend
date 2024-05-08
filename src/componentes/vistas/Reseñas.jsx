import { StyleSheet, View } from "react-native";
import { ListaDeResenias } from "../bloques/ListaDeReseñas";
import { Color } from "../../estilos/colores";
import reseniasMock from "../../mocks/reseniasMock.json";
import jugadoresMock from "../../mocks/jugadoresMock.json";
import { useRoute } from '@react-navigation/native';

export const Resenias = (props) => {
    const route = useRoute();
    const { id } = route.params;

    function obtenerReseniasPorId(id) {
        const reseniasFiltradas = reseniasMock.filter((resenia) => {
            return resenia.idJugadorReceptor === id;
        });
    
        return reseniasFiltradas;
    }

    function obtenerjugadorPorId(id) {
        const jugadorFiltrado = jugadoresMock.find((jugador) => {
            return jugador.id === id;
        });
    
        return jugadorFiltrado;
    }

    const reseñasFiltradas = obtenerReseniasPorId(id);
    const jugadorFiltrado = obtenerjugadorPorId(id);

    return (
        <View style={styles.container}>
            <ListaDeResenias
                id={id}
                resenias={reseñasFiltradas}
                foto={jugadorFiltrado.foto}
                nombreUsuario={jugadorFiltrado.nombreUsuario}
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
