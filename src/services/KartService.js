import http from '../../http-common';

export const listarKarts = async () => {
  const response = await http.get('/karts');
  return response.data;
};
