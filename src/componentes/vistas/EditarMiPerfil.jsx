import React, { useCallback, useState, useMemo } from "react";
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
import { getUsuarioLogueadoId } from "../../utils/usuarioLogueado";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";
import { useToast } from "../../hooks/useToast";
import { FileServerService } from "../../services/FileServerService";
import { Spinner } from "../atomos/spinner/Spinner";
import hexToRgba from "hex-to-rgba";
import { InputPredictivo } from "../atomos/inputPredictivo/InputPredictivo";
import { PlataformaService } from "../../services/PlataformaService";
import { JuegosService } from "../../services/JuegosService";
import { ListaDePildoras } from "../bloques/ListaDePildoras";
import { JugadoresService } from "../../services/JugadoresService";
import moment from "moment";
import { urlImagenPerfilDesconocido } from "../../utils/perfilDesconocido.js";

const regexpFecha = /[^0-9/]/;

export const EditarMiPerfil = () => {
  const route = useRoute();
  const [perfil, setPerfil] = useState({});
  const [cargandoFoto, setCargandoFoto] = useState(false);
  const [plataformas, setPlataformas] = useState([]);
  const [juegos, setJuegos] = useState([]);
  const [inputJuego, setInputJuego] = useState("");
  const [inputPlataforma, setInputPlataforma] = useState("");
  const [fechaEsValida, setFechaEsValida] = useState(true);

  const { id } = route.params;
  const { show } = useToast();
  const navigation = useNavigation();

  const validadorFormulario = () =>
    perfil.nombre?.length > 2 &&
    perfil.fechaDeNacimiento?.length === 10 &&
    fechaEsValida &&
    !!perfil.nacionalidad &&
    perfil.discord?.length > 2;

  const formularioEsValido = useMemo(() => {
    return validadorFormulario();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [perfil, fechaEsValida]);

  const traerPerfil = async () => {
    const idUsuarioLogueado = await getUsuarioLogueadoId();
    try {
      if (idUsuarioLogueado === undefined) {
        throw new Error(
          "El usuario no está autenticado o el userId no está disponible"
        );
      }
      const infoPerfil = await JugadoresService.getPerfilEdicionUsuario(
        idUsuarioLogueado
      );

      setPerfil(infoPerfil);
    } catch {
      show("error", "Error inesperado intentalo más tarde");
    }
  };

  const handleGuardar = async () => {
    try {
      await JugadoresService.actualizarPerfil(perfil);
      setPerfil(perfil);

      show("success", "Se han guardado los cambios exitosamente");
      const rutaAnterior = navigation.getState().routes.at(-2);
      navigation.navigate(rutaAnterior.name, rutaAnterior.params);
    } catch {
      show(
        "error",
        "Error inesperado al guardar los cambios, intentalo mas tarde"
      );
    }
  };

  const handleChange = (campo, valor) => {
    setPerfil({ ...perfil, [campo]: valor });
  };

  const handleChangeFechaNacimiento = (fecha) => {
    const fechaMomentJs = moment(fecha, "DD/MM/YYYY", true);

    if (fecha.length > 9) {
      setFechaEsValida(fechaMomentJs.isValid());
    } else {
      setFechaEsValida(true);
    }

    if (regexpFecha.test(fecha)) {
      setFechaEsValida(false);
    }

    handleChange("fechaDeNacimiento", fecha);
  };

  const handleHorarioChange = (dia, momento) => {
    if (
      perfil.diasHorariosPreferidos.some(
        (sesion) =>
          sesion.diaDeLaSemana === dia && sesion.horarioFavorito === momento
      )
    ) {
      setPerfil((prevPerfil) => ({
        ...prevPerfil,
        diasHorariosPreferidos: prevPerfil.diasHorariosPreferidos.filter(
          (sesion) =>
            sesion.diaDeLaSemana !== dia || sesion.horarioFavorito !== momento
        ),
      }));

      return;
    }

    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      diasHorariosPreferidos: [
        ...new Set([
          ...prevPerfil.diasHorariosPreferidos,
          { diaDeLaSemana: dia, horarioFavorito: momento },
        ]),
      ],
    }));
  };

  const handleInputChangePlataformas = async (plataforma) => {
    setInputPlataforma(plataforma);

    if (!plataforma) {
      setPlataformas([]);
      return;
    }

    const nuevasPlataformas = await PlataformaService.getPlataformasPorNombre(
      plataforma
    );

    setPlataformas(nuevasPlataformas);
  };

  const handleAgregarPlataforma = async (plataforma) => {
    setInputPlataforma("");
    setPlataformas([]);

    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      plataformas: [...new Set([...prevPerfil.plataformas, plataforma.nombre])],
    }));
  };

  const handleQuitarPlataforma = (plataformaABorrar) => {
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      plataformas: prevPerfil.plataformas.filter(
        (juego) => juego !== plataformaABorrar.contenido
      ),
    }));
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

  const handleAgregarJuego = (juego) => {
    setInputJuego("");
    setJuegos([]);

    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      juegosPreferidos: [
        ...new Set([...prevPerfil.juegosPreferidos, juego.nombre]),
      ],
    }));
  };
 
  const handleQuitarJuego = (juegoABorrar) => {
    setPerfil((prevPerfil) => ({
      ...prevPerfil,
      juegosPreferidos: prevPerfil.juegosPreferidos.filter(
        (juego) => juego !== juegoABorrar.contenido
      ),
    }));
  };

  const handleFotoChange = async () => {
    try {
      setCargandoFoto(true);
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });

      if (result.canceled) return;

      const image = result.assets[0];

      // eslint-disable-next-line import/namespace
      const b64image = await FileSystem.readAsStringAsync(image.uri, {
        encoding: "base64",
      });
      const { data } = await FileServerService.subirImagen(b64image);
      handleChange("foto", data.display_url);
    } catch {
      show("error", "Hubo un error inesperado intentalo mas tarde");
    } finally {
      setCargandoFoto(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      if (!id) return;
      traerPerfil();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id])
  );

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollView}
        style={{ flex: 1 }}
        scrollEventThrottle={8}
      >
        <View style={styles.informacionUsuario}>
          <View style={styles.fotoDePerfil}>
            <TouchableOpacity
              onPress={handleFotoChange}
              style={styles.contenedorFoto}
            >
              <FotoDePerfil
                width={100}
                height={100}
                src={perfil.foto || urlImagenPerfilDesconocido}
              />
              {cargandoFoto && <Spinner style={styles.spinnerFoto} />}
              <TouchableOpacity onPress={handleFotoChange}>
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
            style={styles.input}
            value={perfil.nombre}
            onChangeText={(text) => handleChange("nombre", text)}
          />
          <Divisor />
          <TextInput
            style={[styles.input, !fechaEsValida && styles.inputError]}
            placeholder="Fecha de Nacimiento (DD/MM/YYYY)"
            placeholderTextColor={Color.gris}
            value={String(perfil.fechaDeNacimiento)}
            onChangeText={handleChangeFechaNacimiento}
          />
          <Divisor />
          <TextInput
            placeholder="Nacionalidad"
            placeholderTextColor={Color.gris}
            style={styles.input}
            value={perfil.nacionalidad}
            onChangeText={(text) => handleChange("nacionalidad", text)}
          />
          <Divisor />
          <TextInput
            placeholder="Discord"
            placeholderTextColor={Color.gris}
            style={styles.input}
            value={perfil.discord}
            onChangeText={(text) => handleChange("discord", text)}
          />
          <Divisor />

          <Parrafo variante="grisS" style={styles.misJuegos}>
            Mis Juegos
          </Parrafo>
          <InputPredictivo
            style={styles.input}
            value={inputJuego}
            onChangeText={handleInputChangeJuegos}
            onOpcionClick={handleAgregarJuego}
            opciones={juegos}
          />

          <ListaDePildoras
            style={styles.pildoras}
            borrable
            items={
              perfil?.juegosPreferidos?.map((juego) => ({
                id: juego,
                contenido: juego,
              })) || []
            }
            onPress={handleQuitarJuego}
          />

          <Parrafo variante="grisS" style={styles.misPlataformas}>
            Mis Plataformas
          </Parrafo>
          <InputPredictivo
            style={styles.input}
            value={inputPlataforma}
            onChangeText={handleInputChangePlataformas}
            onOpcionClick={handleAgregarPlataforma}
            opciones={plataformas.map((plataforma) => ({
              id: plataforma,
              nombre: plataforma,
            }))}
          />
          <ListaDePildoras
            style={styles.pildoras}
            borrable
            items={
              perfil?.plataformas?.map((plataforma) => ({
                id: plataforma,
                contenido: plataforma,
              })) || []
            }
            onPress={handleQuitarPlataforma}
          />

          <Parrafo variante="grisS" style={styles.misHorarios}>
            Mis Horarios
          </Parrafo>
          <View style={styles.containerTable}>
            {perfil.diasHorariosPreferidos && (
              <TablaHorarios
                horarios={getHorariosPreferidos(perfil.diasHorariosPreferidos)}
                onHorarioChange={handleHorarioChange}
              />
            )}
          </View>
        </View>
        <View style={styles.footer}>
        <Boton
          style={[
            styles.botonGuardar,
            !formularioEsValido && styles.botonDeshabilitado,
          ]}
          disabled={!formularioEsValido}
          onPress={handleGuardar}
        >
          Guardar
        </Boton>
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
  spinnerFoto: {
    position: "absolute",
    borderRadius: 100,
    height: "100%",
    width: "100%",
    backgroundColor: hexToRgba(Color.neutro, 0.5),
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
  inputError: {
    borderColor: Color.error,
    color: Color.error,
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
});

export default EditarMiPerfil;
