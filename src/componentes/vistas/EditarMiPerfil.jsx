import React, { useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { Formik } from 'formik';
import * as Yup from 'yup';
import moment from "moment";
import { useNavigation, useRoute, useFocusEffect } from "@react-navigation/native";
import { FotoDePerfil } from "../atomos/fotoDePerfil/FotoDePerfil";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Boton } from "../atomos/boton/Boton";
import { Color } from "../../estilos/colores";
import { Divisor } from "../atomos/divisor/Divisor";
import { TablaHorarios } from "../bloques/TablaHorarios";
import { getHorariosPreferidos } from "../../utils/diasMapper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useToast } from "../../hooks/useToast";
import { InputPredictivo } from "../atomos/inputPredictivo/InputPredictivo";
import { PlataformaService } from "../../services/PlataformaService";
import { JuegosService } from "../../services/JuegosService";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
import { JugadoresService } from "../../services/JugadoresService";
import { urlImagenPerfilDesconocido } from "../../utils/perfilDesconocido.js";
import useStore from "../../hooks/useStore.jsx";
import NacionalidadSelect from "../atomos/nacionalidadSelect/nacionalidadSelect.jsx";
import { Spinner } from "../atomos/spinner/Spinner";
import * as ImagePicker from 'expo-image-picker';
import { FileServerService } from "../../services/FileServerService";
import { Platform } from "react-native";

const validationSchema = Yup.object().shape({
  nombre: Yup.string()
    .min(3, 'El nombre debe tener al menos 3 caracteres')
    .required('El nombre es requerido'),
  fechaDeNacimiento: Yup.string()
    .matches(/^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/, 'Formato de fecha inválido (DD/MM/YYYY)')
    .test('fecha-valida', 'Fecha inválida', value => {
      if (!value) return false;
      return moment(value, 'DD/MM/YYYY', true).isValid();
    })
    .required('La fecha de nacimiento es requerida'),
  nacionalidad: Yup.string()
    .required('La nacionalidad es requerida'),
  discord: Yup.string()
    .min(3, 'El discord debe tener al menos 3 caracteres')
    .required('El discord es requerido'),
  juegosPreferidos: Yup.array()
    .min(1, 'Debes seleccionar al menos un juego')
    .required('Los juegos son requeridos'),
  plataformas: Yup.array()
    .min(1, 'Debes seleccionar al menos una plataforma')
    .required('Las plataformas son requeridas'),
  diasHorariosPreferidos: Yup.array()
    .min(1, 'Debes seleccionar al menos un horario')
    .required('Los horarios son requeridos'),
});

export const EditarMiPerfil = () => {
  const route = useRoute();
  const [cargandoFoto, setCargandoFoto] = useState(false);
  const [plataformas, setPlataformas] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [inputJuego, setInputJuego] = useState("");
  const [inputPlataforma, setInputPlataforma] = useState("");
  const [perfilInicial, setPerfilInicial] = useState(null);
  const { getIdUsuarioLogueado } = useStore();
  const { id } = route.params;
  const { show } = useToast();
  const navigation = useNavigation();
  
  const traerPerfil = async () => {
    const idUsuarioLogueado = await getIdUsuarioLogueado();
    console.log("ID del usuario logueado:", idUsuarioLogueado); // Verifica que el ID se obtiene correctamente
    try {
      if (!idUsuarioLogueado) {
        throw new Error("El usuario no está autenticado o el userId no está disponible");
      }
      const infoPerfil = await JugadoresService.getPerfilEdicionUsuario(idUsuarioLogueado);
      setPerfilInicial(infoPerfil);
    } catch (error) {
      show("error", "Error inesperado intentalo más tarde");
    }
  };

  const handleGuardar = async (values) => {
    try {
      const idUsuarioLogueado = await getIdUsuarioLogueado();
      await JugadoresService.actualizarPerfil({
        ...values,
        id: idUsuarioLogueado,
        fileName: perfilInicial.fileName // Mantenemos la foto existente
      });
      console.log("Valores enviados:", values);

      show("success", "Se han guardado los cambios exitosamente");
      const rutaAnterior = navigation.getState().routes.at(-2);
      navigation.navigate(rutaAnterior.name, rutaAnterior.params);
    } catch (error) {
      console.error('Error al guardar:', error);
      show("error", "Error inesperado al guardar los cambios, intentalo mas tarde");
    }
  };

  // const handleFotoChange = async () => {
  //   try {
  //     setCargandoFoto(true);

  //     if (Platform.OS === 'web') {
  //       // Create and trigger file input for web
  //       const input = document.createElement('input');
  //       input.type = 'file';
  //       input.accept = 'image/*';

  //       // Handle file selection
  //       input.onchange = async (e) => {
  //         const file = e.target.files[0];
  //         if (file) {
  //           try {
  //             const imgResponse = await FileServerService.subirImagenACloudinary(file);
  //             setPerfilInicial(prev => ({
  //               ...prev,
  //               fileName: imgResponse
  //             }));
  //             show("success", "Imagen actualizada correctamente.");
  //           } catch (error) {
  //             console.error('Error al subir la imagen:', error);
  //             show('error', 'Error al subir la imagen. Inténtalo más tarde.');
  //           }
  //         }
  //       };

  //       input.click();
  //     } else {
  //       // Mobile handling
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Se necesitan permisos para acceder a la galería.');
  //         return;
  //       }

  //       const result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         allowsEditing: true,
  //         aspect: [1, 1],
  //         quality: 1,
  //       });

  //       if (!result.canceled) {
  //         const imgResponse = await FileServerService.subirImagenACloudinary(result.assets[0].uri);
  //         setPerfilInicial(prev => ({
  //           ...prev,
  //           fileName: imgResponse
  //         }));
  //         show("success", "Imagen actualizada correctamente.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error al seleccionar o subir la imagen:', error);
  //     show('error', 'Hubo un error inesperado. Inténtalo más tarde.');
  //   } finally {
  //     setCargandoFoto(false);
  //   }
  // };

  // const handleFotoChange = async (setFieldValue) => {
  //   try {
  //     setCargandoFoto(true);
  
  //     if (Platform.OS === 'web') {
  //       const input = document.createElement('input');
  //       input.type = 'file';
  //       input.accept = 'image/*';
  
  //       input.onchange = async (e) => {
  //         const file = e.target.files[0];
  //         if (file) {
  //           try {
  //             const imgResponse = await FileServerService.subirImagenACloudinary(file);
  //             setFieldValue('fileName', imgResponse); // Marca el formulario como "sucio"
  //             show("success", "Imagen actualizada correctamente.");
  //           } catch (error) {
  //             console.error('Error al subir la imagen:', error);
  //             show('error', 'Error al subir la imagen. Inténtalo más tarde.');
  //           }
  //         }
  //       };
  
  //       input.click();
  //     } else {
  //       const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  //       if (status !== 'granted') {
  //         alert('Se necesitan permisos para acceder a la galería.');
  //         return;
  //       }
  
  //       const result = await ImagePicker.launchImageLibraryAsync({
  //         mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //         allowsEditing: true,
  //         aspect: [1, 1],
  //         quality: 1,
  //       });
  
  //       if (!result.canceled) {
  //         const imgResponse = await FileServerService.subirImagenACloudinary(result.assets[0].uri);
  //         setFieldValue('fileName', imgResponse); // Marca el formulario como "sucio"
  //         show("success", "Imagen actualizada correctamente.");
  //       }
  //     }
  //   } catch (error) {
  //     console.error('Error al seleccionar o subir la imagen:', error);
  //     show('error', 'Hubo un error inesperado. Inténtalo más tarde.');
  //   } finally {
  //     setCargandoFoto(false);
  //   }
  // };

  const handleFotoChange = async (setFieldValue) => {
    try {
      setCargandoFoto(true);
  
      if (Platform.OS === 'web') {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/*';
  
        input.onchange = async (e) => {
          const file = e.target.files[0];
          if (file) {
            try {
              const imgResponse = await FileServerService.subirImagenACloudinary(file);
              setPerfilInicial(prev => ({
                ...prev,
                fileName: imgResponse,
              }));
              setFieldValue('fileName', imgResponse); // Actualiza el campo en Formik
              show("success", "Imagen actualizada correctamente.");
            } catch (error) {
              console.error('Error al subir la imagen:', error);
              show('error', 'Error al subir la imagen. Inténtalo más tarde.');
            }
          }
        };
  
        input.click();
      } else {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Se necesitan permisos para acceder a la galería.');
          return;
        }
  
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [1, 1],
          quality: 1,
        });
  
        if (!result.canceled) {
          const imgResponse = await FileServerService.subirImagenACloudinary(result.assets[0].uri);
          setPerfilInicial(prev => ({
            ...prev,
            fileName: imgResponse,
          }));
          setFieldValue('fileName', imgResponse); // Actualiza el campo en Formik
          show("success", "Imagen actualizada correctamente.");
        }
      }
    } catch (error) {
      console.error('Error al seleccionar o subir la imagen:', error);
      show('error', 'Hubo un error inesperado. Inténtalo más tarde.');
    } finally {
      setCargandoFoto(false);
    }
  };

  const handleInputChangePlataformas = async (plataforma) => {
    setInputPlataforma(plataforma);
    if (!plataforma) {
      setPlataformas([]);
      return;
    }
    const nuevasPlataformas = await PlataformaService.getPlataformasPorNombre(plataforma);
    setPlataformas(nuevasPlataformas);
  };

  const handleInputChangeJuegos = async (juego) => {
    setInputJuego(juego);
    if (!juego) {
      setJuegos([]);
      return;
    }
    const nuevosJuegos = await JuegosService.getJuegosPorNombre(juego);
    setJuegos(nuevosJuegos);
  };


  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      traerPerfil();
    }, [id])
  );

  if (!perfilInicial) {
    return <View style={styles.container}><Spinner /></View>;
  }

  return (
    <View style={styles.container}>
      <Formik
        enableReinitialize
        initialValues={{
          nombre: perfilInicial.nombre || '',
          fechaDeNacimiento: perfilInicial.fechaDeNacimiento || '',
          nacionalidad: perfilInicial.nacionalidad || '',
          discord: perfilInicial.discord || '',
          juegosPreferidos: perfilInicial.juegosPreferidos || [],
          plataformas: perfilInicial.plataformas || [],
          diasHorariosPreferidos: perfilInicial.diasHorariosPreferidos || [],
          fileName: perfilInicial.fileName || ''
        }}
        validationSchema={validationSchema}
        onSubmit={handleGuardar}
      >
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
          setFieldValue,
          isValid,
          dirty
        }) => (
          <ScrollView
            contentContainerStyle={styles.scrollView}
            style={{ flex: 1 }}
            scrollEventThrottle={8}
          >
            <View style={styles.informacionUsuario}>
              <View style={styles.fotoDePerfil}>
                <TouchableOpacity style={styles.contenedorFoto} onPress={() => handleFotoChange(setFieldValue)}>
                  <FotoDePerfil
                    width={100}
                    height={100}
                    src={values.fileName || urlImagenPerfilDesconocido}
                  />
                  <TouchableOpacity>
                    <MaterialIcons
                      style={styles.iconoEditarFoto}
                      name="photo-camera"
                      size={24}
                      color={Color.blanco}
                    />
                  </TouchableOpacity>
                </TouchableOpacity>
              </View>

              <Divisor />

              <TextInput
                placeholder="Nombre"
                placeholderTextColor={Color.gris}
                style={[
                  styles.input,
                  touched.nombre && errors.nombre && styles.inputError
                ]}
                value={values.nombre}
                onChangeText={handleChange('nombre')}
                onBlur={handleBlur('nombre')}
              />
              {touched.nombre && errors.nombre && (
                <Parrafo variante="error" style={styles.errorText}>
                  {errors.nombre}
                </Parrafo>
              )}

              <Divisor />

              <TextInput
                placeholder="Fecha de Nacimiento (DD/MM/YYYY)"
                placeholderTextColor={Color.gris}
                style={[
                  styles.input,
                  touched.fechaDeNacimiento && errors.fechaDeNacimiento && styles.inputError
                ]}
                value={values.fechaDeNacimiento}
                onChangeText={handleChange('fechaDeNacimiento')}
                onBlur={handleBlur('fechaDeNacimiento')}
              />
              {touched.fechaDeNacimiento && errors.fechaDeNacimiento && (
                <Parrafo variante="error" style={styles.errorText}>
                  {errors.fechaDeNacimiento}
                </Parrafo>
              )}

              <Divisor />

              <NacionalidadSelect
                onSelect={(nacionalidad) => setFieldValue('nacionalidad', nacionalidad)}
                selectedCountry={values.nacionalidad}
              />
              {touched.nacionalidad && errors.nacionalidad && (
                <Parrafo variante="error" style={styles.errorText}>
                  {errors.nacionalidad}
                </Parrafo>
              )}

              <Divisor />

              <TextInput
                placeholder="Discord"
                placeholderTextColor={Color.gris}
                style={[
                  styles.input,
                  touched.discord && errors.discord && styles.inputError
                ]}
                value={values.discord}
                onChangeText={handleChange('discord')}
                onBlur={handleBlur('discord')}
              />
              {touched.discord && errors.discord && (
                <Parrafo variante="error" style={styles.errorText}>
                  {errors.discord}
                </Parrafo>
              )}

              <Divisor />

              <Parrafo variante="grisS" style={styles.misJuegos}>
                Mis Juegos
              </Parrafo>

              <InputPredictivo
                style={[
                  styles.input,
                  touched.juegosPreferidos && errors.juegosPreferidos && styles.inputError
                ]}
                value={inputJuego}
                onChangeText={handleInputChangeJuegos}
                onOpcionClick={(juego) => {
                  setInputJuego('');
                  setJuegos([]);
                  setFieldValue('juegosPreferidos', [...values.juegosPreferidos, juego.nombre]);
                }}
                opciones={juegos}
              />
              {touched.juegosPreferidos && errors.juegosPreferidos && (
                <Parrafo variante="error" style={styles.errorText}>
                  {errors.juegosPreferidos}
                </Parrafo>
              )}

              <ListaDePildoras
                style={styles.pildoras}
                borrable
                items={values.juegosPreferidos.map(juego => ({
                  id: juego,
                  contenido: juego,
                }))}
                onPress={(juegoABorrar) => {
                  setFieldValue('juegosPreferidos',
                    values.juegosPreferidos.filter(juego => juego !== juegoABorrar.contenido)
                  );
                }}
              />

              <Parrafo variante="grisS" style={styles.misPlataformas}>
                Mis Plataformas
              </Parrafo>

              <InputPredictivo
                style={[
                  styles.input,
                  touched.plataformas && errors.plataformas && styles.inputError
                ]}
                value={inputPlataforma}
                onChangeText={handleInputChangePlataformas}
                onOpcionClick={(plataforma) => {
                  setInputPlataforma('');
                  setPlataformas([]);
                  setFieldValue('plataformas', [...values.plataformas, plataforma.nombre]);
                }}
                opciones={plataformas.map(plataforma => ({
                  id: plataforma,
                  nombre: plataforma,
                }))}
              />
              {touched.plataformas && errors.plataformas && (
                <Parrafo variante="error" style={styles.errorText}>
                  {errors.plataformas}
                </Parrafo>
              )}

              <ListaDePildoras
                style={styles.pildoras}
                borrable
                items={values.plataformas.map(plataforma => ({
                  id: plataforma,
                  contenido: plataforma,
                }))}
                onPress={(plataformaABorrar) => {
                  setFieldValue('plataformas',
                    values.plataformas.filter(plataforma => plataforma !== plataformaABorrar.contenido)
                  );
                }}
              />

              <Parrafo variante="grisS" style={styles.misHorarios}>
                Mis Horarios
              </Parrafo>

              <View style={styles.containerTable}>
                <TablaHorarios
                  horarios={getHorariosPreferidos(values.diasHorariosPreferidos)}
                  onHorarioChange={(dia, momento) => {
                    const nuevoHorario = { diaDeLaSemana: dia, horarioFavorito: momento };
                    const horarioExistente = values.diasHorariosPreferidos.find(
                      h => h.diaDeLaSemana === dia && h.horarioFavorito === momento
                    );

                    if (horarioExistente) {
                      setFieldValue('diasHorariosPreferidos',
                        values.diasHorariosPreferidos.filter(
                          h => !(h.diaDeLaSemana === dia && h.horarioFavorito === momento)
                        )
                      );
                    } else {
                      setFieldValue('diasHorariosPreferidos', [
                        ...values.diasHorariosPreferidos,
                        nuevoHorario
                      ]);
                    }
                  }}
                />
                {touched.diasHorariosPreferidos && errors.diasHorariosPreferidos && (
                  <Parrafo variante="error" style={styles.errorText}>
                    {errors.diasHorariosPreferidos}
                  </Parrafo>
                )}
              </View>
            </View>

            <View style={styles.footer}>
            <Boton
                style={[
                  styles.botonGuardar,
                  (!isValid || (!dirty && !cargandoFoto)) && styles.botonDeshabilitado,
                ]}
                disabled={!isValid || (!dirty && !cargandoFoto)}
                onPress={handleSubmit}
              >
                Guardar cambios
              </Boton>
            </View>
          </ScrollView>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Color.neutro,
    width: "100%",
    height: "100%",
  },
  scrollView: {
    paddingBottom: 64,
  },
  fotoDePerfil: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  contenedorFoto: {
    position: "relative",
  },
  iconoEditarFoto: {
    position: "absolute",
    right: 0,
    bottom: 0,
  },
  informacionUsuario: {
    padding: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: Color.gris,
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    color: Color.blanco,
  },
  footer: {
    paddingTop: 96,
    paddingHorizontal: 32,
    alignItems: "center"
  },
  botonGuardar: {
    width: "100%",
    backgroundColor: Color.secundario,
    position: "absolute",
    bottom: 16,
    paddingVertical: 16,
    alignItems: "center",
  },
  botonDeshabilitado: {
    backgroundColor: Color.gris,
  },
  containerTable: {
    marginBottom: 16,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  misJuegos: {
    marginTop: 16,
  },
  misHorarios: {
    marginBottom: 16,
  },
  pildoras: {
    marginVertical: 16,
  },
  errorText: {
    marginTop: 5,
    color: Color.error,
  },
});

export default EditarMiPerfil;