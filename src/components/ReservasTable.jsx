import React from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, Tooltip } from "@mui/material";

const ReservasTable = ({ reservas, onEnviarComprobante, onEliminarReserva }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><strong>ID</strong></TableCell>
            <TableCell><strong>N ° Personas</strong></TableCell>
            <TableCell><strong>Fecha y Hora</strong></TableCell>
            <TableCell><strong>Monto Final</strong></TableCell>
            <TableCell><strong>Acciones</strong></TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {reservas.map((reserva) => (
            <TableRow
              hover
              key={reserva.id}
            >
              <TableCell>{reserva.id}</TableCell>
              <TableCell>{reserva.cantidadPersonas}</TableCell>
              <TableCell>{reserva.fecha ? reserva.fecha.replace('T', ' ') : "Fecha no asignada"}</TableCell>
              <TableCell>${reserva.montoFinal}</TableCell>
              <TableCell>
                <Tooltip title="Enviar Comprobante" arrow>
                  <Button
                    variant="contained"
                    size="small"
                    color="primary"
                    onClick={() => onEnviarComprobante(reserva.id)}
                    sx={{ mr: 1 }}
                  >
                    ✉️
                  </Button>
                </Tooltip>

                <Tooltip title="Eliminar Reserva" arrow>
                  <Button
                    variant="contained"
                    size="small"
                    color="error"
                    onClick={() => onEliminarReserva(reserva.id)}
                  >
                    🗑
                  </Button>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
};

export default ReservasTable;