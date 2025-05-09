import React, { useState } from "react";
import {
  obtenerReporteIngresosPorVueltasMes,
  obtenerReporteIngresosPorPersonasMes,
} from "../services/ReporteService";
import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  TextField,
} from "@mui/material";

function Reportes() {
  const [reporte, setReporte] = useState(null);
  const [tipoReporte, setTipoReporte] = useState("");
  const [mesesOrdenados, setMesesOrdenados] = useState([]);

  const [mesInicio, setMesInicio] = useState(1);
  const [mesFin, setMesFin] = useState(3);
  const [anio, setAnio] = useState(new Date().getFullYear());

  const handleReporteVueltas = async () => {
    const data = await obtenerReporteIngresosPorVueltasMes(
      mesInicio,
      mesFin,
      anio
    );
    setReporte(data);
    setTipoReporte("Vueltas");
    procesarMeses(data);
  };

  const handleReportePersonas = async () => {
    const data = await obtenerReporteIngresosPorPersonasMes(
      mesInicio,
      mesFin,
      anio
    );
    setReporte(data);
    setTipoReporte("Personas");
    procesarMeses(data);
  };

  const procesarMeses = (data) => {
    // se ordenan meses por orden definido (Enero, Febrero, Marzo, etc.)
    const mesesUnicos = new Set();
    Object.values(data).forEach((mapaMeses) => {
      Object.keys(mapaMeses).forEach((mes) => {
        if (mes !== "TOTAL") {
          mesesUnicos.add(mes);
        }
      });
    });

    const ordenCorrecto = [
      "ENERO",
      "FEBRERO",
      "MARZO",
      "ABRIL",
      "MAYO",
      "JUNIO",
      "JULIO",
      "AGOSTO",
      "SEPTIEMBRE",
      "OCTUBRE",
      "NOVIEMBRE",
      "DICIEMBRE",
    ];
    const mesesOrdenadosFinal = ordenCorrecto.filter((m) => mesesUnicos.has(m));
    setMesesOrdenados(mesesOrdenadosFinal);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 3, marginBottom: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom>
          Obtener Reportes
        </Typography>

        <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
          <TextField
            select
            label="Mes Inicio"
            value={mesInicio}
            onChange={(e) => setMesInicio(Number(e.target.value))}
            SelectProps={{ native: true }}
          >
            {[
              "ENERO",
              "FEBRERO",
              "MARZO",
              "ABRIL",
              "MAYO",
              "JUNIO",
              "JULIO",
              "AGOSTO",
              "SEPTIEMBRE",
              "OCTUBRE",
              "NOVIEMBRE",
              "DICIEMBRE",
            ].map((mes, idx) => (
              <option key={idx + 1} value={idx + 1}>
                {mes}
              </option>
            ))}
          </TextField>
          <TextField
            select
            label="Mes Fin"
            value={mesFin}
            onChange={(e) => setMesFin(Number(e.target.value))}
            SelectProps={{ native: true }}
          >
            {[
              "ENERO",
              "FEBRERO",
              "MARZO",
              "ABRIL",
              "MAYO",
              "JUNIO",
              "JULIO",
              "AGOSTO",
              "SEPTIEMBRE",
              "OCTUBRE",
              "NOVIEMBRE",
              "DICIEMBRE",
            ].map((mes, idx) => (
              <option key={idx + 1} value={idx + 1}>
                {mes}
              </option>
            ))}
          </TextField>
          <TextField
            type="number"
            label="Año"
            value={anio}
            onChange={(e) => setAnio(Number(e.target.value))}
            sx={{ minWidth: 80 }}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleReporteVueltas}
          >
            Ver reporte (Vueltas)
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleReportePersonas}
          >
            Ver reporte (Personas)
          </Button>
        </Box>

        {reporte && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>
                      Grupo de{" "}
                      {tipoReporte === "Vueltas" ? "Vueltas" : "Personas"}
                    </strong>
                  </TableCell>
                  {mesesOrdenados.map((mes, idx) => (
                    <TableCell key={idx}>
                      <strong>{mes}</strong>
                    </TableCell>
                  ))}
                  <TableCell>
                    <strong>TOTAL</strong>
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {Object.keys(reporte).map((grupo, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{grupo}</TableCell>
                    {mesesOrdenados.map((mes) => (
                      <TableCell key={mes}>
                        $
                        {reporte[grupo][mes]
                          ? reporte[grupo][mes].toLocaleString("es-CL")
                          : "0"}
                      </TableCell>
                    ))}
                    <TableCell>
                      <strong>
                        ${reporte[grupo]["TOTAL"].toLocaleString("es-CL")}
                      </strong>
                    </TableCell>
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
