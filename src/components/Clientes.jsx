import React, { useState, useEffect } from "react";
import { listarClientes, crearCliente } from "../services/ClienteService";
import {
  TextField, Button, Box, Snackbar, Alert,
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography
} from "@mui/material";

function Clientes() {
  const [clientes, setClientes] = useState([]);
  const [nuevoCliente, setNuevoCliente] = useState({ nombre: "", email: "" });
  const [openSnack, setOpenSnack] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarClientes();
  }, []);

  const cargarClientes = async () => {
    try {
      const data = await listarClientes();
      setClientes(data);
    } catch (error) {
      console.error("Error cargando clientes", error);
    }
  };

  const handleCrearCliente = async (e) => {
    e.preventDefault();
    try {
      await crearCliente(nuevoCliente);
      setMensaje("Cliente creado exitosamente");
      setOpenSnack(true);
      cargarClientes();
      setNuevoCliente({ nombre: "", email: "" });
    } catch (error) {
      console.error("Error creando cliente", error);
      setMensaje("Error creando cliente");
      setOpenSnack(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnack(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 3, marginBottom: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom> Crear Nuevo Cliente</Typography>
        <form onSubmit={handleCrearCliente}>
          <TextField
            label="Nombre"
            name="nombre"
            value={nuevoCliente.nombre}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, nombre: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            name="email"
            value={nuevoCliente.email}
            onChange={(e) => setNuevoCliente({ ...nuevoCliente, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Crear Cliente
          </Button>
        </form>
      </Paper>

      <Paper sx={{ padding: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom> Listado de Clientes</Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell><strong>Id</strong></TableCell>
                <TableCell><strong>Nombre</strong></TableCell>
                <TableCell><strong>Email</strong></TableCell>
                <TableCell><strong>Total Reservas</strong></TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {clientes.map((cliente) => (
                <TableRow key={cliente.id}>
                  <TableCell>{cliente.id}</TableCell>
                  <TableCell>{cliente.nombre}</TableCell>
                  <TableCell>{cliente.email}</TableCell>
                  <TableCell>{cliente.total_reservas}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <Snackbar open={openSnack} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="info" sx={{ width: "100%" }}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Clientes;