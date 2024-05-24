import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { Color } from "../../estilos/colores";
import { useNavigation } from "@react-navigation/native";
import gamerlyImagen from "../foto/WhatsApp Image 2024-05-24 at 01.35.43.jpeg";

export const Inicio = () => {
    const navigation = useNavigation();
    const handleStart = () => {
        navigation.navigate("login");
    };

    return (
        <View style={styles.container}>
            <View style={styles.contentContainer}>
                <Image
                    source={gamerlyImagen}
                    style={styles.image}
                />
                <Text style={styles.welcomeText}>Bienvenido a Gamerly!</Text>
                <Text style={styles.descriptionText}>Un lugar donde podrás encontrar jugadores para juegos en línea de forma rápida y segura</Text>
                <TouchableOpacity style={styles.button} onPress={handleStart}>
                    <Text style={styles.buttonText}>Comenzar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.neutro,
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        width: '100%',
    },
    image: {
        width: 200,
        height: 200,
        marginBottom: 20,
    },
    welcomeText: {
        fontSize: 20,
        color: Color.secundario,
        textAlign: 'center',
        marginTop: 5,
    },
    descriptionText: {
        fontSize: 16,
        color: Color.secundario,
        textAlign: 'center',
        marginBottom: 40,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: Color.primario,
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 100,
        width: '90%',
        height: '7%',
        justifyContent: 'center', 
        alignItems: 'center', 
    },
    buttonText: {
        color: Color.blanco,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
