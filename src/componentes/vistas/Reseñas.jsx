import { StyleSheet, View } from "react-native";
import { ListaDeResenias } from "../bloques/ListaDeReseñas";
import { Color } from "../../estilos/colores";
import reseniasMock from "../../mocks/reseniasMock.json";
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

    const reseñasFiltradas = obtenerReseniasPorId(id);

    return (
        <View style={styles.container}>
            <ListaDeResenias
                id={id}
                resenias={reseñasFiltradas}
                foto={reseniasMock[0].foto}
                nombre={reseniasMock[0].nombre}
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
