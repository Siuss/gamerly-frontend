import React, {useState} from "react";
import {ScrollView, StyleSheet, View} from "react-native";
import {FotoDePerfil} from "../atomos/fotoDePerfil/FotoDePerfil";
import {Parrafo} from "../atomos/parrafo/Parrafo";
import {Color} from "../../estilos/colores";
import {Divisor} from "../atomos/divisor/Divisor";
import {BotonFlotante} from "../atomos/botonFlotante/BotonFlotante";
import {Pildora} from "../atomos/pildora/Pildora";
import {MaterialIcons} from "@expo/vector-icons";
import {TablaHorarios} from "../bloques/TablaHorarios";
import {AntDesign} from "@expo/vector-icons/AntDesign";
import perfilMock from "../../mocks/perfilUsuariosMock.json";
import { useRoute } from "@react-navigation/native";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
// import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const horariosIniciales = [
    {mañana: false, tarde: false, noche: false}, // Lunes
    {mañana: false, tarde: false, noche: false}, // Martes
    {mañana: false, tarde: false, noche: false}, // Miercoles
    {mañana: false, tarde: false, noche: false}, // Jueves
    {mañana: false, tarde: false, noche: false}, // Viernes
    {mañana: false, tarde: false, noche: false}, // Sabado
    {mañana: false, tarde: false, noche: false}, // Domingo
];

export const VistaPerfil = () => {
    const route = useRoute();
    const { id } = route.params;

    const onHorarioChange = (dia, momento) => {
        const nuevosHorarios = [...horarios];
        nuevosHorarios[dia][momento] = !nuevosHorarios[dia][momento];

        setHorarios(nuevosHorarios);
    };

    function obtenerInfoPorId(id) {
        return perfilMock.find((usuario) => {return usuario.id === id;});
    }

    const perfilInfo = obtenerInfoPorId(id)
    const [horarios, setHorarios] = useState(perfilInfo.horarios);

    return (
        <View style={styles.container}>
            <ScrollView style={{flex: 1}}>
                <View style={styles.informacionUsuario}>
                    <View style={styles.fotoDePerfil}>
                        <FotoDePerfil
                            width={100}
                            height={100}
                            src={perfilInfo.foto}
                        />
                    </View>
                    <Divisor width={80} height={100}/>
                    <Parrafo variante="grisS" style={styles.descripcionUsuario}>
                        {perfilInfo.nombreUsuario}
                    </Parrafo>
                    <Divisor width={80} height={100}/>
                    <Parrafo variante="grisS" style={styles.descripcionUsuario}>
                        {perfilInfo.edad} Años
                    </Parrafo>
                    <Divisor width={80} height={100}/>
                    <Parrafo variante="grisS" style={styles.descripcionUsuario}>
                        {perfilInfo.nacionalidad}
                    </Parrafo>
                    <Divisor width={80} height={100}/>
                    <Parrafo variante="grisS" style={styles.descripcionUsuario}>
                        {perfilInfo.genero}
                    </Parrafo>
                    <Divisor width={100} height={100}/>

                    <Parrafo variante="grisS" style={styles.descripcionplataformas}>
                        Mis Plataformas
                    </Parrafo>
                    <View style={styles.pildora1}>
                        <ListaDePildoras items={perfilInfo.plataformas}/>
                    </View>

                    <Parrafo variante="grisS" style={styles.descripcionplataformas}>
                        Mis Juegos
                    </Parrafo>
                    <View style={styles.pildora1}>
                        <ListaDePildoras items={perfilInfo.juegos}/>
                    </View>
                    <View style={styles.conatainerEditarJuego}>
                        <Parrafo variante="grisS" style={styles.descripcionplataformas}>
                            Mis Horarios
                        </Parrafo>
                        <BotonFlotante
                            name="mode-edit-outline"
                            label="Editar"
                            style={styles.botonesContainer}
                        />
                    </View>
                    <View style={styles.containerTable}>
                        <TablaHorarios
                            horarios={horarios}
                            onHorarioChange={onHorarioChange}
                        />
                    </View>
                </View>
            </ScrollView>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: Color.neutro,
        width: "100%",
        height: "100%",
    },
    fotoDePerfil: {
        flexDirection: "row",
        justifyContent: "center",
        marginBottom: 20,
    },

    informacionUsuario: {
        padding: 5,
    },

    descripcionUsuario: {
        textAlign: "center",
        marginTop: 15,
        marginBottom: 15,
        fontSize: 15,
    },

    descripcionplataformas: {
        textAlign: "left",
        marginTop: 15,
        marginBottom: 15,
        fontSize: 15,
    },

    conatainerEditarJuego: {
        display:"flex",
        flexDirection:"row",
        justifyContent: "space-between",
        alignItems: "center",
        gap: 60
    },

    botonesContainer: {
      left:3
    },
    botonFlotante: {
        width: 25,
        height: 25,
        borderRadius: 50,
    },
    botonAgregar: {
        backgroundColor: Color.acento,
    },
    botonConfirmar: {
        backgroundColor: Color.secundario,
    },
    pildora1: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        color: "blue",
    },
    containerTable: {
        display: "flex",
      flexDirection: "column",
       justifyContent:"center",
       alignItems:"center"
    },
});
