import React from "react";
import "./home.css"
import {  Link } from 'react-router-dom';
const Home = () => {
  return (
    <>
      <div className="home">
        <Link className="boxLink" to="/cadastro">
          <div className="box">
            <i className="fa-solid fa-boxes-packing"></i>
            <p> Cadastrar Produtos</p>
          </div>
        </Link>
        <Link className="boxLink" to="/realizar-venda">
          <div className="box">
            <i className="fa-regular fa-circle-check"></i>
            <p>Realizar Venda</p>
          </div>
        </Link>
        <Link className="boxLink" to="/estoque">
          <div className="box">
            <i className="fa-solid fa-cubes"></i>
            <p>Estoque</p>
          </div>
        </Link>
        <Link className="boxLink" to="/historico-de-vendas">
          <div className="box">
            <i className="fa-solid fa-magnifying-glass-chart"></i>
            <p> Histórico de Vendas</p>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Home;
