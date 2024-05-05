import { StyleSheet, View } from "react-native";
import { ListaDeResenias } from "../bloques/ListaDeReseñas";
import { Color } from "../../estilos/colores";
import reseniasMock from "../../mocks/reseniasMock.json"

export const Resenias = (props) => {
    return (
        <View style={styles.container} {...props}>
            <ListaDeResenias resenias={reseniasMock} foto={reseniasMock[0].foto} nombre={reseniasMock[0].nombre}/>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.neutro,
        width: "100%",
        height: "100%"
    },
});