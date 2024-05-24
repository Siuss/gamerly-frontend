import axios from "axios";
import busqueda from "../mocks/busquedaAvanzadaMock.json";

const BusquedaEndpoints = {
  BUSQUEDA_AVANZADA: "/buscar",
};

const busquedaAvanzada = async (filtros) => {
  /*
  response = await axios.get(
    `${BASE_URL}${BusquedaEndpoints.BUSQUEDA_AVANZADA}`,
    params: filtros
  );
  return response.data;
  */

  return busqueda;
};

export const BusquedaService = { busquedaAvanzada };
