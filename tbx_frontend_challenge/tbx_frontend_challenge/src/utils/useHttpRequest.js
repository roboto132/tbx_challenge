import axios from 'axios';

const useHttpRequest = async (url, method = 'GET', data = null, headers = {}) => {
  try {
    console.log('url', url);
    const response = await axios({
      method,
      url,
      data,
      headers,
    });

    return response.data;
  } catch (error) {
    if (error.response) {
      // El servidor respondió con un código de estado fuera del rango 2xx
      console.error('Error de servidor:', error.response.data);
      throw new Error('Error de servidor');
    } else if (error.request) {
      // La solicitud fue realizada pero no se recibió respuesta
      console.error('No se recibió respuesta del servidor');
      throw new Error('No se recibió respuesta del servidor');
    } else {
      // Ocurrió un error durante la configuración de la solicitud
      console.error('Error al configurar la solicitud:', error.message);
      throw new Error('Error al configurar la solicitud');
    }
  }
};

export default useHttpRequest;
