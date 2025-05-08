import React, { useState, useEffect } from 'react';
import { format, addDays, parseISO, startOfWeek } from 'date-fns';
import { es } from 'date-fns/locale';
import { getReservasSemana } from '../services/RackSemanalService';

const RackSemanal = () => {
  const [reservas, setReservas] = useState({});
  const [fechaInicio, setFechaInicio] = useState(startOfWeek(new Date(), { weekStartsOn: 1 }));
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchReservas = async () => {
      if (!fechaInicio || isNaN(fechaInicio.getTime())) return;

      setIsLoading(true);
      try {
        const data = await getReservasSemana(fechaInicio);
        setReservas(data);
      } catch (error) {
        console.error("Error al cargar reservas:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchReservas();
  }, [fechaInicio]);

  const handleSemanaAnterior = () => setFechaInicio(addDays(fechaInicio, -7));
  const handleSemanaSiguiente = () => setFechaInicio(addDays(fechaInicio, 7));

  const diasSemana = Array.from({ length: 7 }, (_, i) => addDays(fechaInicio, i));
  const horas = Array.from({ length: 9 }, (_, i) => i + 14); // 14:00 - 22:00

  return (
    <div className="max-w-7xl mx-auto p-6 prose prose-purple"> 
      <div className="flex flex-col items-center mb-8">
      <h2 className="text-2xl font-semibold text-gray-800 mb-1">Reservas Semanales</h2>
        

        <div className="flex items-center justify-center gap-6 mt-4">
          <button
            onClick={handleSemanaAnterior}
            className="w-12 h-12 bg-white hover:bg-gray-50 text-lg font-bold rounded-full shadow-md flex items-center justify-center transition-all"
          >
            ←
          </button>

          <span className="text-2xl font-semibold text-gray-800 min-w-[200px] text-center">
            {format(fechaInicio, "MMMM yyyy", { locale: es })}
          </span>

          <button
            onClick={handleSemanaSiguiente}
            className="w-12 h-12 bg-white hover:bg-gray-50 text-lg font-bold rounded-full shadow-md flex items-center justify-center transition-all"
          >
            →
          </button>
        </div>
      </div>

      {/* Tabla de Calendario */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-200">
        {isLoading ? (
          <div className="p-8 text-center text-gray-500">Cargando reservas...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="w-24 p-3 text-sm font-semibold text-gray-700 text-right border-b border-gray-200">Hora</th>
                  {diasSemana.map((dia) => (
                    <th key={dia.toString()} className="p-3 text-center border-b border-l border-gray-200">
                      <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {format(dia, 'EEE', { locale: es })}
                      </div>
                      <div className={`mt-1 text-lg font-bold ${
                        format(dia, 'd') === format(new Date(), 'd') 
                          ? "text-purple-600" 
                          : "text-gray-700"
                        }`}>
                        {format(dia, 'd')}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {horas.map((hora) => (
                  <tr key={hora} className="group hover:bg-gray-50 transition-colors">
                    <td className="p-3 pr-4 text-sm text-gray-600 text-right align-middle border-b border-gray-200">
                      {hora}:00
                    </td>

                    {diasSemana.map((dia) => {
                      const diaISO = format(dia, 'yyyy-MM-dd');
                      const reservasDia = reservas[diaISO] || [];
                      const reserva = reservasDia.find(r => {
                        const fechaReserva = parseISO(r.fecha);
                        return fechaReserva.getHours() === hora;
                      });

                      return (
                        <td 
                          key={`${diaISO}-${hora}`} 
                          className="relative p-1 align-top border-b border-l border-gray-200 h-20"
                        >
                          <div className="absolute inset-1 flex">
                            {reserva ? (
                              <div className="bg-purple-100 border border-purple-200 rounded-lg w-full p-2 flex flex-col justify-center items-center text-center transition-all hover:bg-purple-200 hover:shadow-sm">
                                <span className="font-medium text-purple-800 text-sm truncate w-full">
                                  {reserva.cliente?.nombre || ' Rsv. '}
                                </span>
                                <span className="text-xs text-purple-600 mt-1">
                                  {reserva.cantidadPersonas} personas
                                </span>
                              </div>
                            ) : (
                              <div className="w-full h-full flex items-center justify-center text-gray-300">
                                <span className="text-xs">-</span>
                              </div>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default RackSemanal;