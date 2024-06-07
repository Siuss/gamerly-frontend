import axios from "axios";
import { BASE_URL } from "./requestConfig"
import busqueda from "../mocks/busquedaAvanzadaMock.json";

const BusquedaEndpoints = {
  BUSQUEDA_AVANZADA: "/buscar",
};

var requestBody = {
  juegos: [],
  puntaje: 0,
  dias: [],
  horarios: []
}

const setBusquedaAvanzada = (filtros) => {
  const diasFilter = filtros.dias.filter(dia => dia.juega).map(dia => dia.contenido)
  const momentosFilter = filtros.momentosDelDia.filter(momento => momento.juega).map(momento => momento.contenido)
  requestBody = {
    juegos: filtros.juegos,
    puntaje: filtros.resenia,
    dias: diasFilter,
    horarios: momentosFilter
  }
};

const busquedaAvanzada = async() => {
  const response = await axios.get(`${BASE_URL}${BusquedaEndpoints.BUSQUEDA_AVANZADA}`, requestBody);
  return response.data;
};

export const BusquedaService = { requestBody, setBusquedaAvanzada, busquedaAvanzada };
