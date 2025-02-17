import React, { useCallback, useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Boton } from "../atomos/boton/Boton";
import { Color } from "../../estilos/colores";
import { Divisor } from "../atomos/divisor/Divisor";
import {
  useNavigation,
  useRoute,
  useFocusEffect,
} from "@react-navigation/native";
import { TablaHorarios } from "../bloques/TablaHorarios";
import { getHorariosPreferidos } from "../../utils/diasMapper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useToast } from "../../hooks/useToast";
import { JugadoresService } from "../../services/JugadoresService";
import { urlImagenPerfilDesconocido } from "../../utils/perfilDesconocido.js";
import useStore from "../../hooks/useStore.jsx";
import NacionalidadSelect from "../atomos/nacionalidadSelect/nacionalidadSelect.jsx";
import { Formik } from "formik";
import * as Yup from "yup";
import moment from "moment";

const editMyProfileSchema = Yup.object().shape({
  nombre: Yup.string().required("El nombre es obligatorio"),
  discord: Yup.string().required("El Discord es obligatorio"),
  fechaDeNacimiento: Yup.string()
    .test(
      "valid-date",
      "Formato inválido, tiene que ser DD/MM/YYYY",
      (value) => {
        return moment(value, "DD/MM/YYYY", true).isValid();
      }
    )
    .required("Se requiere fecha de nacimiento"),
  nacionalidad: Yup.string().required("La nacionalidad es obligatoria"),
  juegosPreferidos: Yup.array()
    .of(Yup.string())
    .test(
      "unique",
      "No se pueden repetir juegos",
      (value) => new Set(value).size === value.length
    ),
  plataformas: Yup.array()
    .of(Yup.string())
    .test(
      "unique",
      "No se pueden repetir plataformas",
      (value) => new Set(value).size === value.length
    ),
});

export const EditarMiPerfil = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { getIdUsuarioLogueado } = useStore();
  const { show } = useToast();
  const [perfil, setPerfil] = useState(null);

  useFocusEffect(
    useCallback(() => {
      const traerPerfil = async () => {
        const idUsuarioLogueado = await getIdUsuarioLogueado();
        if (!idUsuarioLogueado) return;

        try {
          const infoPerfil = await JugadoresService.getPerfilEdicionUsuario(
            idUsuarioLogueado
          );
          setPerfil(infoPerfil);
        } catch {
          show("error", "Error inesperado, intentalo más tarde");
        }
      };
      traerPerfil();
    }, [])
  );

  if (!perfil) return null;

  return (
    <Formik
      initialValues={perfil}
      validationSchema={editMyProfileSchema}
      onSubmit={async (values) => {
        try {
          await JugadoresService.actualizarPerfil(values);
          show("success", "Perfil actualizado correctamente");
          navigation.goBack();
        } catch {
          show("error", "Error al guardar cambios, intenta más tarde");
        }
      }}
    >
      {({ handleChange, handleSubmit, values, errors, touched }) => (
        <View style={styles.container}>
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.informacionUsuario}>
              <TextInput
                style={[
                  styles.input,
                  errors.nombre && touched.nombre && styles.inputError,
                ]}
                placeholder="Nombre"
                value={values.nombre}
                onChangeText={handleChange("nombre")}
              />
              {errors.nombre && touched.nombre && (
                <Parrafo variante="error">{errors.nombre}</Parrafo>
              )}

              <TextInput
                style={[
                  styles.input,
                  errors.fechaDeNacimiento &&
                    touched.fechaDeNacimiento &&
                    styles.inputError,
                ]}
                placeholder="Fecha de Nacimiento (DD/MM/YYYY)"
                value={values.fechaDeNacimiento}
                onChangeText={handleChange("fechaDeNacimiento")}
              />
              {errors.fechaDeNacimiento && touched.fechaDeNacimiento && (
                <Parrafo variante="error">{errors.fechaDeNacimiento}</Parrafo>
              )}

              <NacionalidadSelect
                onSelect={(nacionalidad) =>
                  handleChange("nacionalidad")(nacionalidad)
                }
                selectedCountry={values.nacionalidad}
              />
              {errors.nacionalidad && touched.nacionalidad && (
                <Parrafo variante="error">{errors.nacionalidad}</Parrafo>
              )}

              <TextInput
                placeholder="Discord"
                placeholderTextColor={Color.gris}
                style={[
                  styles.input,
                  errors.discord && touched.discord && styles.inputError,
                ]}
                value={values.discord} // Cambia a 'values.discord' para que Formik maneje el valor
                onChangeText={handleChange("discord")} // Usar 'handleChange' para actualizar el valor
              />
              {errors.discord && touched.discord && (
                <Parrafo variante="error">{errors.discord}</Parrafo>
              )}
              
            </View>

            <View style={styles.footer}>
              <Boton style={styles.botonGuardar} onPress={handleSubmit}>
                Guardar
              </Boton>
            </View>
          </ScrollView>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: Color.neutro, flex: 1 },
  scrollView: { paddingBottom: 64 },
  informacionUsuario: { padding: 5 },
  input: {
    borderWidth: 1,
    borderColor: Color.gris,
    padding: 10,
    marginVertical: 10,
    color: Color.blanco,
  },
  inputError: { borderColor: Color.error, color: Color.error },
  footer: { paddingTop: 32, paddingHorizontal: 32, alignItems: "center" },
  botonGuardar: {
    width: "100%",
    backgroundColor: Color.secundario,
    paddingVertical: 16,
    alignItems: "center",
  },
});

export default EditarMiPerfil;
