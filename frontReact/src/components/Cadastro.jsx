import React, { Component } from "react";
import CadastroForm from "./CadastroForm";
import CadastroLista from "./CadastroLista";
import BotaoPesquisa from "./BotaoPesquisa";
import "./containerSecundario.css";

class Cadastro extends Component {
  constructor() {
    super();
    this.state = {
      selectedItem: null,
    };
  }
  handleEdit = (item) => {
    this.setState({ selectedItem: item });
  };
  handleSearch = (searchTerm) => {
    this.setState({ searchTerm });
  };
  render() {
    return (
      <div className="containerCadastro">
        <h1>Cadastrar Produtos</h1>
        <CadastroForm selectedItem={this.state.selectedItem} />
        <BotaoPesquisa onSearch={this.handleSearch} />
        <h1>Lista de Produtos:</h1>     
        <CadastroLista
          onEdit={this.handleEdit}
          searchTerm={this.state.searchTerm}
        />
        <br /> <br />
      </div>
    );
  }
}
export default Cadastro;
