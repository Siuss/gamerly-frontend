import axios from 'axios';
import { BASE_URL } from './requestConfig';

// Función para obtener las comunidades desde el endpoint
const obtenerComunidades = async () => {
  try {
    const response = await axios.get(
        `${BASE_URL}${SesionEndpoints.getAllComunidad}`
    );

    // Si la respuesta es exitosa, devuelve los datos
    if (response.status === 200) {
      console.log('Datos de comunidades:', response.data);
      return response.data;
    }
  } catch (error) {
    // Maneja cualquier error que ocurra durante la petición
    console.error('Error al obtener las comunidades:', error);
  }
};

// Llama a la función para obtener las comunidades
export const COMUNIDADES_SERVICE = { obtenerComunidades };
