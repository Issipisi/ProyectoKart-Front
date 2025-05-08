import './App.css'
import KartList from './components/KartList';
import Reservas from './components/Reservas';
import Clientes from './components/Clientes'
import Reportes from './components/Reportes';
import RackSemanal from './components/RackSemanal';
import Navbar from "./components/Navbar"
import Home from './components/Home';
import NotFound from './components/NotFound';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'


function App() {
  return (
      <Router>
          <div className="container">
          <Navbar></Navbar>
            <Routes>
              <Route path="/" element={<Home/>} />
              <Route path="/home" element={<Home/>} />
              <Route path="/karts" element={<KartList/>} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/reportes" element={<Reportes />} />
              <Route path="/rackSemanal" element={<RackSemanal />} />
              <Route path="*" element={<NotFound/>} />
            </Routes>
          </div>
      </Router>
  );
}
import React from 'react';

/*
function App() {
  return (
    <div>
      <h1>Gestión de Karts </h1>
      <hr />
      <KartList />
              <Route path="/employee/add" element={<AddEditEmployee/>} />
              <Route path="/employee/edit/:id" element={<AddEditEmployee/>} />
              <Route path="/paycheck/list" element={<PaycheckList/>} />
              <Route path="/paycheck/calculate" element={<PaycheckCalculate/>} />
              <Route path="/reports/AnualReport" element={<AnualReport/>} />
              <Route path="/extraHours/list" element={<ExtraHoursList/>} />
              <Route path="/extraHours/add" element={<AddEditExtraHours/>} />
              <Route path="/extraHours/edit/:id" element={<AddEditExtraHours/>} />
              
    </div>
  );
}*/


export default App