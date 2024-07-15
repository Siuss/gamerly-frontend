import axios from "axios";
import { BASE_URL } from "./requestConfig";

const PlataformaEndpoints = {
  PLATAFORMAS: "/listaPlataformas/",
};

const getPlataformasPorNombre = async (plataforma) => {
  const response = await axios.get(
    `${BASE_URL}${PlataformaEndpoints.PLATAFORMAS}${plataforma}`
  );

  return response.data;
};

export const PlataformaService = {
  getPlataformasPorNombre,
};
