import axios from "axios";
import { BASE_URL } from "./requestConfig";

const ReporteEndpoints = {
  NUEVO_REPORTE: "/nuevo-reporte/",
};

const enviarReporte = async (idCreador, idReceptor, contenido) => {
  const response = await axios.post(
    `${BASE_URL}/${idCreador}${ReporteEndpoints.NUEVO_REPORTE}${idReceptor}`,
    { contenido }
  );

  return response.data;
};

export const ReporteService = {
  enviarReporte,
};
