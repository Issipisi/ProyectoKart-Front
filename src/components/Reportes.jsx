import React, { useState } from "react";
import { obtenerReporteIngresosPorVueltasMes, obtenerReporteIngresosPorPersonasMes } from "../services/ReporteService";
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

function Reportes() {
  const [reporte, setReporte] = useState(null);
  const [tipoReporte, setTipoReporte] = useState("");
  const [mesesOrdenados, setMesesOrdenados] = useState([]);

  const handleReporteVueltas = async () => {
    const data = await obtenerReporteIngresosPorVueltasMes();
    setReporte(data);
    setTipoReporte('Vueltas');
    procesarMeses(data);
  };

  const handleReportePersonas = async () => {
    const data = await obtenerReporteIngresosPorPersonasMes();
    setReporte(data);
    setTipoReporte('Personas');
    procesarMeses(data);
  };

  const procesarMeses = (data) => {
    // se ordenan meses por orden definido (Enero, Febrero, Marzo, etc.)
    const mesesUnicos = new Set();
    Object.values(data).forEach(mapaMeses => {
      Object.keys(mapaMeses).forEach(mes => {
        if (mes !== "TOTAL") {
          mesesUnicos.add(mes);
        }
      });
    });

    const ordenCorrecto = ["ENERO", "FEBRERO", "MARZO", "ABRIL", "MAYO", "JUNIO", "JULIO", "AGOSTO", "SEPTIEMBRE", "OCTUBRE", "NOVIEMBRE", "DICIEMBRE"];
    const mesesOrdenadosFinal = ordenCorrecto.filter(m => mesesUnicos.has(m));
    setMesesOrdenados(mesesOrdenadosFinal);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 3, marginBottom: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom>Obtener Reportes</Typography>

        <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
          <Button variant="contained" color="primary" onClick={handleReporteVueltas}>
            Reporte por Vueltas
          </Button>
          <Button variant="contained" color="secondary" onClick={handleReportePersonas}>
            Reporte por Personas
          </Button>
        </Box>

        {reporte && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell><strong>Grupo de {(tipoReporte === 'Vueltas') ? 'Vueltas' : 'Personas'}</strong></TableCell>
                  {mesesOrdenados.map((mes, idx) => (
                    <TableCell key={idx}><strong>{mes}</strong></TableCell>
                  ))}
                  <TableCell><strong>TOTAL</strong></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Object.keys(reporte).map((grupo, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{grupo}</TableCell>
                    {mesesOrdenados.map(mes => (
                      <TableCell key={mes}>
                        ${reporte[grupo][mes] ? reporte[grupo][mes].toLocaleString('es-CL') : "0"}
                      </TableCell>
                    ))}
                    <TableCell><strong>${reporte[grupo]['TOTAL'].toLocaleString('es-CL')}</strong></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Paper>
    </Box>
  );
}

export default Reportes;