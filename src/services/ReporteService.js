import http from "../../http-common";

export const obtenerReporteIngresosPorVueltasMes = async (
  mesInicio,
  mesFin,
  anio
) => {
  const response = await http.get(`/reservas/reporte-vueltas-mes`, {
    params: { mesInicio, mesFin, anio },
  });
  return response.data;
};

export const obtenerReporteIngresosPorPersonasMes = async (
  mesInicio,
  mesFin,
  anio
) => {
  const response = await http.get(`/reservas/reporte-personas-mes`, {
    params: { mesInicio, mesFin, anio },
  });
  return response.data;
};
