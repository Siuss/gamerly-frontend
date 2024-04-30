import { StyleSheet, Text } from "react-native";
import { Color } from "../../../estilos/colores";
import { View } from "react-native-web";
import { Parrafo } from "../parrafo/Parrafo";

export const Pildora = (props) => {
  const { style, ...restProps } = props;
  return (
    <View
      style={[styles.pildora,style,
      ]}
      {...restProps}
    >
      <Parrafo variante="blancoS">{props.children}</Parrafo>
      
    </View>
  );
};

const styles = StyleSheet.create({
  pildora: {
    backgroundColor: Color.primario,
    color: Color.blanco,
    fontSize: 16,
    width:"fit-content",
    paddingHorizontal:24,
    borderRadius:100,
  },
  
});
