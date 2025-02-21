import { useNavigation } from "@react-navigation/native";
import { rutas } from "../rutas/rutas";
import useThemeStore from "../../hooks/useThemeStore";
import { Color } from "../../estilos/colores";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const TemaConfig = () => {
  const { theme, setTheme } = useThemeStore();
  const navigation = useNavigation();

  const themes = [
    { id: 'light', color: Color.blanco, borderColor: Color.grisSuave },
    { id: 'dark', color: Color.neutro, borderColor: Color.gris }
  ];

  const handleThemeChange = (themeId) => {
    setTheme(themeId);
    navigation.navigate(rutas.juegos);
  };

  return (
    <View style={[
      styles.container,
      { backgroundColor: theme === "dark" ? Color.neutro : Color.blanco }
    ]}>
      <Text style={[
        styles.text,
        { color: theme === "dark" ? Color.blanco : Color.neutro }
      ]}>
        Seleccionar Tema
      </Text>

      <View style={styles.circleContainer}>
        {themes.map((themeOption) => (
          <TouchableOpacity
            key={themeOption.id}
            onPress={() => handleThemeChange(themeOption.id)}
            style={[
              styles.circle,
              { backgroundColor: themeOption.color },
              { borderColor: themeOption.borderColor },
              theme === themeOption.id && styles.selectedCircle
            ]}
          >
            {theme === themeOption.id && (
              <View style={[
                styles.innerCircle,
                { backgroundColor: theme === 'dark' ? Color.blanco : Color.neutro }
              ]} />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
        fontWeight: '500',
    },
    circleContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 20,
    },
    circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
    },
    selectedCircle: {
        borderWidth: 2,
        borderColor: Color.primario,
    },
    innerCircle: {
        width: 16,
        height: 16,
        borderRadius: 8,
    },
});


export default TemaConfig;
