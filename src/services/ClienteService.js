import http from '../../http-common';

export const listarClientes = async () => {
  const response = await http.get('/clientes');
  return response.data;
};

export const crearCliente = async (clienteData) => {
  const response = await http.get('/clientes', clienteData);
  return response.data;
};
