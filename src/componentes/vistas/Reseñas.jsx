import { StyleSheet, View } from "react-native";
import { ListaDeResenias } from "../bloques/ListaDeReseñas";
import { Color } from "../../estilos/colores";
import { useRoute, useFocusEffect } from '@react-navigation/native';
import { ReseniaService } from "../../services/ReseniaService";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { useState, useCallback } from "react";
import { Boton } from "../atomos/boton/Boton";
import { JugadoresService } from "../../services/JugadoresService";

export const Resenias = (props) => {
    const route = useRoute();
    const [resenias, setResenias] = useState([]);
    const [perfilJugador, setPerfilJugador] = useState(null);
    const [mostrarTodas, setMostrarTodas] = useState(false);

    const { id } = route.params;

    const traerResenias = async () => {
        if (!id) return;
        const perfil = await JugadoresService.getPerfilUsuario(id);
        setPerfilJugador(perfil);

        const nuevasResenias = await ReseniaService.getResenias(id);
        setResenias(nuevasResenias);
    };

    useFocusEffect(
        useCallback(() => {
            traerResenias();

            return () => {
                setResenias([]);
                setPerfilJugador(null);
            };
        }, [id])
    );

    const handleVerTodas = () => {
        setMostrarTodas(true);
    };

    const reseniasAMostrar = mostrarTodas ? resenias : resenias.slice(0, 2);

    return (
        <View style={styles.container}>
            {resenias.length > 0 && perfilJugador ?
                <>
                    <ListaDeResenias
                        resenias={reseniasAMostrar}
                        foto={perfilJugador.foto}
                        nombreUsuario={perfilJugador.nombre}
                    />
                    {!mostrarTodas && resenias.length > 2 && (
                        <View style={styles.verMas}>
                            <Boton variante="link" onPress={handleVerTodas}>
                                Ver todas
                            </Boton>
                        </View>
                    )}
                </>
                : <Parrafo variante="blancoM">
                    Parece que todavía no tienes reseñas
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
    verMas: {
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        marginBottom: 16,
    },
});

export default Resenias;
