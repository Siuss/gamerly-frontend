import { StyleSheet, View } from "react-native";
import { Color } from "../../../estilos/colores"

export const Divisor = () => {
    return <View style={styles.divisor}>

    </View>
}

const styles = StyleSheet.create({
    divisor:{
        height:2,
        backgroundColor:Color.blanco,
        width:"100%"
    }
})