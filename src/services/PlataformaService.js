import api from "./apiConfig";

//import { BASE_URL } from "./requestConfig";

const PlataformaEndpoints = {
  PLATAFORMAS: "/listaPlataformas/",
};

const getPlataformasPorNombre = async (plataforma) => {
  const response = await api.get(
    `${PlataformaEndpoints.PLATAFORMAS}${plataforma}`
  );

  return response.data;
};

export const PlataformaService = {
  getPlataformasPorNombre,
};
