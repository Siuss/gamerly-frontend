import React, { useCallback, useMemo, useState, useEffect } from "react";
import {
  Modal,
  TouchableOpacity,
  View,
  Text,
  FlatList,
  StyleSheet,
} from "react-native";
import { useCountries } from "use-react-countries";
import { Ionicons } from "@expo/vector-icons";
import { Color } from "../../../estilos/colores";
import useThemeStore from "../../../hooks/useThemeStore";

const NacionalidadSelect = ({ onSelect, selectedCountry }) => {
  const { countries } = useCountries();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(selectedCountry); 
  const { theme } = useThemeStore();

  useEffect(() => {
    setSelected(selectedCountry);
  }, [selectedCountry]);

  const sortedCountries = useMemo(() => {
    return [...countries].sort((a, b) => a.name.localeCompare(b.name));
  }, [countries]);

  const handleSelect = (country) => {
    setSelected(country.name);
    onSelect(country.name);
    setVisible(false);
  };

  const renderItemListo = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={[
          styles.countryItem,
          {
            borderBottomColor: theme === "dark" ? Color.gris : Color.grisSuave,
          },
        ]}
        onPress={() => handleSelect(item)}
      >
        <Text
          style={[
            styles.countryText,
            { color: theme === "dark" ? Color.blanco : Color.neutro },
          ]}
        >
          {item.name}
        </Text>
      </TouchableOpacity>
    ),
    [handleSelect, theme]
  );

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[
          styles.selectInput,
          {
            backgroundColor: theme === "dark" ? Color.neutro : Color.blanco,
            borderColor: Color.secundario,
          },
        ]}
      >
        <Text
          style={[
            styles.inputText,
            { color: selected ? (theme === "dark" ? Color.blanco : Color.negro) : Color.secundario },
          ]}
        >
          {selected || "Selecciona tu nacionalidad"}
        </Text>
        <Ionicons 
          name="chevron-down" 
          size={20} 
          color={Color.secundario} 
        />
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide">
        <View
          style={[
            styles.modalContainer,
            { backgroundColor: theme === "dark" ? Color.neutro : Color.blanco },
          ]}
        >
          <FlatList
            data={sortedCountries}
            keyExtractor={(item) => item.code}
            renderItem={renderItemListo}
          />
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.closeButton}
          >
            <Text style={[styles.closeText, { color: Color.error }]}>Cerrar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 16,
  },
  selectInput: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    height: 40,
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  modalContainer: {
    flex: 1,
    padding: 16,
  },
  countryItem: {
    padding: 12,
    borderBottomWidth: 1,
  },
  closeButton: {
    padding: 12,
    alignItems: "center",
  },
  closeText: {
    fontWeight: "bold",
  },
});

export default NacionalidadSelect;
