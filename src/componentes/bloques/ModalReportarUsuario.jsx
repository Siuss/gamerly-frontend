import React, { useState } from "react";
import { Modal } from "../atomos/modal/Modal";
import { StyleSheet, View } from "react-native";
import { Parrafo } from "../atomos/parrafo/Parrafo";
import { Boton } from "../atomos/boton/Boton";
import Textarea from "../atomos/TextArea/TextArea";
import { ReporteService } from "../../services/ReporteService";
import { useToast } from "../../hooks/useToast";
import {Spinner} from '../atomos/spinner/Spinner'
import { Color } from "../../estilos/colores";

export const ModalReportarUsuario = ({
  idUsuarioLogueado,
  idAmigo,
  visible,
  onOcultar,
  ...props
}) => {
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);
  const { show } = useToast();

  const handleCancelar = () => {
    onOcultar();
  };

  const handleEnviar = async () => {
    try {
      setCargando(true)
      await ReporteService.enviarReporte(idUsuarioLogueado, idAmigo, mensaje);
      onOcultar();
      show("success", "Se ha reportado al usuario correctamenteo");
    } catch {
      show("error", "Hubo un error inesperado intentalo mas tarde");
    }finally{
      setCargando(false)
    }
  };

  const handleMensajeChange = (nuevoMensaje) => {
    setMensaje(nuevoMensaje);
  };

  return (
    <Modal
      visible={visible}
      onClose={onOcultar}
      style={styles.modal}
      {...props}
    >
      {cargando && <View style={styles.containerCarga}>
        <Parrafo style={styles.cargaTexto} variante="blancoS">Esto puede tardar un momento...</Parrafo>
        <Spinner color={Color.secundario} style={styles.spinner} />
        </View>}
      {!cargando && <><Parrafo style={styles.titulo} variante="blancoM">
        Reportar usuario
      </Parrafo>
      <Parrafo variante="blancoM">Añadir mensaje</Parrafo>
      <Textarea onChangeText={handleMensajeChange} placeholder="Mensaje..." />
      <View style={styles.botones}>
        <Boton
          textStyle
          variante="primario"
          outline="secundario"
          onPress={handleCancelar}
        >
          Cancelar
        </Boton>

        <Boton
          onPress={handleEnviar}
          textStyle={styles.textoBoton}
          variante="secundario"
        >
          Enviar
        </Boton>
      </View></>}      
    </Modal>
  );
};

const styles = StyleSheet.create({
  spinner:{
    flex: 1,
    margin: "auto",
    backgroundColor: Color.primario,
    height: "100%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 16
  },
  cargaTexto: {
    paddingBottom: 32
  },
  containerCarga:{
    height: 128,
    width: "100%",
    alignItems: "center",
    justifyContent: "center"
  },
  modal: {
    width: "75%",
    display: "flex",
    gap: 16,
    borderRadius: 12,
  },
  titulo: {
    fontWeight: "bold",
  },
  botones: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 16,
  },
});
