import http from '../../http-common';

export const listarReservas = async () => {
    const response = await http.get('/reservas');
    return response.data;
};

export const crearReserva = async (formData) => {
    const response = await http.post('/reservas', null, {
      params: formData,
    });
    return response.data;
  };

export const enviarComprobanteReserva = async (idReserva) => {
  const response = await http.get(`reservas/${idReserva}/enviar-comprobante`);
  return response.data;
};

export const eliminarReserva = async (idReserva) => {
  const response = await http.delete(`reservas/${idReserva}`);
  return response.data;
};