import React, { useEffect, useState } from "react";
import { listarKarts } from "../services/KartService";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography, Box } from "@mui/material";

function KartList() {
  const [karts, setKarts] = useState([]);

  useEffect(() => {
    const cargarKarts = async () => {
      const data = await listarKarts();
      setKarts(data);
    };
    cargarKarts();
  }, []);

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom> Listado de Karts</Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>ID</strong></TableCell>
                <TableCell><strong>Código Kart</strong></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {karts.map((kart) => (
                <TableRow hover key={kart.id}>
                  <TableCell>{kart.id}</TableCell>
                  <TableCell>{kart.codigo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}

export default KartList;