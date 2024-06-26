import { StyleSheet, View } from "react-native";
import { ListaDeResenias } from "../bloques/ListaDeReseñas";
import { Color } from "../../estilos/colores";
import reseniasMock from "../../mocks/reseniasMock.json";
import jugadoresMock from "../../mocks/jugadoresMock.json";
import { useRoute } from '@react-navigation/native';
import { ReseniaService } from "../../services/ReseniaService";
import { getUsuarioLogueado, getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { useState, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { JugadoresService } from "../../services/JugadoresService";

export const Resenias = (props) => {
    const route = useRoute();
    const [resenias, setResenias] = useState([])
    const [perfilJugador, setPerfilJugador] = useState(null)

    const { id } = route.params;



    const traerResenias = async () => {
        if (!id) return
        const perfil = await JugadoresService.getPerfilUsuario(id)
        
        setPerfilJugador(perfil)

        const nuevasResenias = await ReseniaService.getResenias(id)
        setResenias(nuevasResenias)
    }

    useFocusEffect(
        useCallback(() => {
            traerResenias()

            return () => {
                setResenias([])
                setPerfilJugador(null)
            };
        }, [id])
    );



    return (
        <View style={styles.container}>
            {resenias.length > 0 && perfilJugador ?
                <ListaDeResenias
                    resenias={resenias}
                    foto={perfilJugador.foto}
                    nombreUsuario={perfilJugador.nombre}
                />
                : <Parrafo variante="blancoM">
                    Parece que todavia no tenes reseñas
                </Parrafo>}
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
