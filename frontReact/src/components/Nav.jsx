import React, { useEffect } from "react";
import {  Link } from 'react-router-dom';
import "./nav.css"
const Nav = () => { 
  useEffect(() => {
    
    if (window.innerWidth < 500) {
      const openContainer = document.querySelector('.openMenu');
      const closeContainer = document.querySelector('.closeNav');
      const navUl = document.querySelector('nav ul');
      const navLinks = document.querySelectorAll('nav a')
      const abrirModal = () => {
        navUl.style.display = "flex";
      };
      const fecharModal = () => {
        navUl.style.display = "none";
      };

      openContainer.addEventListener("click", abrirModal);
      closeContainer.addEventListener("click", fecharModal);
      navLinks.forEach((navLink) => {
        navLink.addEventListener("click", fecharModal);
      });
    

      
      return () => {
        openContainer.removeEventListener("click", abrirModal);
        closeContainer.removeEventListener("click", fecharModal);
      };
    }
  }, []);


  return (
    <>
      <nav>
        <div className="logo">
          <div className="logoImg">
            <img src="" alt="" />
            <Link  to="/" className="d">
              <h1>Gerencia</h1>
              <div className="icoLogo"></div>
            </Link>
          </div>
          <div className="borda"></div>
          
        </div>
        <ul>
          <li className="closeNav">
          <i className="fa-solid fa-circle-xmark"></i>
          </li>
          <li>
              <Link to="/cadastro">
                <div className="containerTitulo">
                  <i className="fa-solid fa-boxes-packing"></i>
                  <p> Cadastrar Produtos</p>
                </div>
              </Link>
          </li>
          <li>
              <Link to="/realizar-venda">
                <div className="containerTitulo">
                  <i className="fa-regular fa-circle-check"></i>
                  <p>Realizar Venda</p>
                </div>
              </Link>
          </li>
          <li>
              <Link to="/estoque">
                <div className="containerTitulo">
                  <i className="fa-solid fa-cubes"></i>
                  <p>Estoque</p>
                </div>
              </Link>
          </li>
          <li>
              <Link to="/historico-de-vendas">
                <div className="containerTitulo">
                  <i className="fa-solid fa-magnifying-glass-chart"></i>
                  <p> Histórico de Vendas</p>
                </div>
              </Link>
          </li>
        </ul>   
          
      </nav>
    </>
  );
};

export default Nav;

