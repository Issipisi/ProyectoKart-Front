import React, { useEffect, useState } from "react";
import { listarReservas, crearReserva, enviarComprobanteReserva, eliminarReserva } from "../services/ReservaService";
import ReservasTable from "./ReservasTable";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { TextField, Button, Box, Snackbar, Alert, Paper, Typography } from "@mui/material";

function Reservas() {
  const [reservas, setReservas] = useState([]);
  const [formData, setFormData] = useState({
    clienteId: "",
    cantidadVueltas: "",
    cantidadPersonas: "",
    fecha: dayjs(),
    diaEspecial: false,
  });

  const [openSuccess, setOpenSuccess] = useState(false);
  const [openError, setOpenError] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    cargarReservas();
  }, []);

  const cargarReservas = async () => {
    try {
      const data = await listarReservas();
      setReservas(data);
    } catch (error) {
      console.error("Error cargando reservas:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const dataParaEnviar = {
        clienteId: formData.clienteId,
        cantidadVueltas: formData.cantidadVueltas,
        cantidadPersonas: formData.cantidadPersonas,
        fecha: dayjs(formData.fecha).format("YYYY-MM-DDTHH:mm:ss"),
        diaEspecial: formData.diaEspecial,
      };

      const response = await crearReserva(dataParaEnviar);
      if (response) {
        setMensaje("Reserva creada exitosamente ");
        setOpenSuccess(true);
        cargarReservas();
        setFormData({
          clienteId: "",
          cantidadVueltas: "",
          cantidadPersonas: "",
          fecha: dayjs(),
          diaEspecial: false,
        }); // Limpiar formulario
      }
    } catch (error) {
      console.error("Error creando reserva:", error);
      setMensaje("Error creando reserva ");
      setOpenError(true);
    }
  };

  const handleEnviarComprobante = async (idReserva) => {
    try {
      await enviarComprobanteReserva(idReserva);
      setMensaje(`Comprobante enviado para Reserva #${idReserva} `);
      setOpenSuccess(true);
    } catch (error) {
      console.error("Error enviando comprobante:", error);
      setMensaje("Error enviando comprobante ");
      setOpenError(true);
    }
  };

  const handleEliminarReserva = async (idReserva) => {
    if (window.confirm(`¿Seguro que deseas eliminar la reserva #${idReserva}?`)) {
      try {
        await eliminarReserva(idReserva);
        setMensaje(`Reserva #${idReserva} eliminada `);
        setOpenSuccess(true);
        cargarReservas();
      } catch (error) {
        console.error("Error eliminando reserva:", error);
        setMensaje("Error al eliminar reserva ");
        setOpenError(true);
      }
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSuccess(false);
    setOpenError(false);
  };

  return (
    <Box sx={{ padding: 4 }}>
      <Paper sx={{ padding: 3, marginBottom: 4 }} elevation={3}>
        <Typography variant="h5" gutterBottom> Crear Nueva Reserva</Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            label="Cliente ID"
            name="clienteId"
            type="number"
            value={formData.clienteId}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Cantidad de Vueltas"
            name="cantidadVueltas"
            type="number"
            value={formData.cantidadVueltas}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <TextField
            label="Cantidad de Personas"
            name="cantidadPersonas"
            type="number"
            value={formData.cantidadPersonas}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />

          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateTimePicker
              label="Fecha y Hora de Reserva"
              value={formData.fecha}
              onChange={(newValue) =>
                setFormData((prevData) => ({ ...prevData, fecha: newValue }))
              }
            />
          </LocalizationProvider>

          <br /><br />

          <label>
            ¿Día Especial?
            <input
              type="checkbox"
              name="diaEspecial"
              checked={formData.diaEspecial}
              onChange={handleChange}
              style={{ marginLeft: '10px' }}
            />
          </label>

          <br /><br />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Crear Reserva
          </Button>
        </form>
      </Paper>

      <Paper sx={{ padding: 3 }} elevation={3}>
        <Typography variant="h5" gutterBottom> Listado de Reservas</Typography>

        <ReservasTable
          reservas={reservas}
          onEnviarComprobante={handleEnviarComprobante}
          onEliminarReserva={handleEliminarReserva}
        />
      </Paper>

      <Snackbar open={openSuccess} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: "100%" }}>
          {mensaje}
        </Alert>
      </Snackbar>

      <Snackbar open={openError} autoHideDuration={3000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: "100%" }}>
          {mensaje}
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Reservas;