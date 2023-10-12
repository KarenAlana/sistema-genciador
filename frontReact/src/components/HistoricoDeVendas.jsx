import React, { Component } from "react";
import HistoricoDeVendasLista from "./HistoricoDeVendasLista";
import BotaoPesquisa from "./BotaoPesquisa";
class HistoricoDeVendas extends Component {
  constructor() {
    super();
    this.state = {
      selectedMonth: null, 
    };
  }
  handleSearch = (searchTerm) => {    
    this.setState({ searchTerm });
  };
  render() {   
    return (
      <div className="historico">
        <h1>Historico de Vendas</h1>
        <BotaoPesquisa onSearch={this.handleSearch}/>
        <HistoricoDeVendasLista
        onEdit={this.handleEdit}    
         searchTerm={this.state.searchTerm} />
      </div>
    );
  }
}

export default HistoricoDeVendas;
