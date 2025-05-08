import http from '../../http-common';

export const obtenerReporteIngresosPorVueltasMes = async () => {
  const response = await http.get(`reservas/reporte-vueltas-mes`);
  return response.data;
};

export const obtenerReporteIngresosPorPersonasMes = async () => {
  const response = await http.get(`reservas/reporte-personas-mes`);
  return response.data;
};