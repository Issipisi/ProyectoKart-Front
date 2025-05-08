import http from '../../http-common';

export const getReservasSemana = async (fechaInicio) => {
    try {
      const fechaStr = fechaInicio.toISOString().split('T')[0];
      console.log("Llamando a backend con fechaInicio:", fechaStr);
  
      const response = await http.get(`/reservas/semana`, {
        params: { fechaInicio: fechaStr }
      });
      return response.data;
    } catch (error) {
      console.error("Error obteniendo reservas:", error);
      throw error;
    }
  };
  

export const updateReserva = async (id, updatedData) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedData);
    return response.data;
  } catch (error) {
    console.error("Error actualizando reserva:", error);
    throw error;
  }
};