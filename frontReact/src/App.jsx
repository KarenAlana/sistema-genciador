import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import Home from './components/Home';
import Nav from './components/Nav'
import Cadastro from './components/Cadastro'
import RealizarVenda from './components/RealizarVenda'
import Estoque from './components/Estoque'
import HistoricoDeVendas from './components/HistoricoDeVendas'

function App() {
  return (
    <div className="App">     
      <div className="containerPrincipal">           
        <Router>
          <Nav />  
          <div className="openMenu"><i className="fa-solid fa-bars"></i></div>
          <div className="containerSecundario">
            <Routes> 
              <Route path="/" element={<Home />} /> 
              <Route path="/cadastro" element={<Cadastro />} /> 
              <Route path="/realizar-venda" element={<RealizarVenda />} /> 
              <Route path="/estoque" element={<Estoque />} /> 
              <Route path="/historico-de-vendas" element={<HistoricoDeVendas />} /> 
            </Routes>
          </div>        
        </Router>        
      </div>
    </div>
  );
}

export default App;
