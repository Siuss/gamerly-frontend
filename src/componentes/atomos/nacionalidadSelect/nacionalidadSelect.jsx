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

const NacionalidadSelect = ({ onSelect, selectedCountry }) => {
  const { countries } = useCountries();
  const [visible, setVisible] = useState(false);
  const [selected, setSelected] = useState(selectedCountry); // Estado interno

  // Actualiza el estado interno cuando cambia la prop selectedCountry
  useEffect(() => {
    setSelected(selectedCountry);
  }, [selectedCountry]);

  const sortedCountries = useMemo(() => {
    return [...countries].sort((a, b) => a.name.localeCompare(b.name));
  }, [countries]);

  const handleSelect = (country) => {
    setSelected(country.name); // Actualiza el estado interno
    onSelect(country.name); // Notifica al componente padre
    setVisible(false);
  };

  const renderItemListo = useCallback(
    ({ item }) => (
      <TouchableOpacity
        style={styles.countryItem}
        onPress={() => handleSelect(item)}
      >
        <Text style={styles.countryText}>{item.name}</Text>
      </TouchableOpacity>
    ),
    [handleSelect]
  );

  return (
    <View style={styles.inputContainer}>
      <TouchableOpacity
        onPress={() => setVisible(true)}
        style={[
          styles.selectInput,
          selected ? styles.inputFilled : styles.inputPlaceholder,
        ]}
      >
        <Text style={styles.inputText}>
          {selected || "Selecciona tu nacionalidad"}
        </Text>
        <Ionicons name="chevron-down" size={20} color={Color.secundario} />
      </TouchableOpacity>

      <Modal visible={visible} animationType="slide">
        <View style={styles.modalContainer}>
          <FlatList
            data={sortedCountries}
            keyExtractor={(item) => item.code}
            renderItem={renderItemListo}
          />
          <TouchableOpacity
            onPress={() => setVisible(false)}
            style={styles.closeButton}
          >
            <Text style={styles.closeText}>Cerrar</Text>
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
    borderColor: Color.secundario,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  inputText: {
    color: Color.blanco,
  },
  inputPlaceholder: {
    color: Color.secundario,
  },
  inputFilled: {
    color: Color.blanco,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: Color.neutro,
    padding: 16,
  },
  countryItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: Color.secundario,
  },
  countryText: {
    color: Color.blanco,
  },
  closeButton: {
    padding: 12,
    alignItems: "center",
  },
  closeText: {
    color: Color.error,
    fontWeight: "bold",
  },
});

export default NacionalidadSelect;