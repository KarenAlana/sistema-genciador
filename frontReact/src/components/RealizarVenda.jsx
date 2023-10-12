import React, { Component } from "react";
import RealizarVendaLista from "./RealizarVendaLista";
import BotaoPesquisa from "./BotaoPesquisa";
import RealizarVendaForm from "./RealizarVendaForm";
import "./containerSecundario.css";

class RealizarVenda extends Component {
  constructor() {
    super();
    this.state = {   
      selectedItem: null,
    };
  }

  handleSearch = (searchTerm) => {  
    this.setState({ searchTerm });
  }  
  render() {
    return (
      <div className="realizarVenda">
        <h1>Realizar Venda</h1>     
      <RealizarVendaForm selectedItem={this.state.selectedItem}/>
        <BotaoPesquisa onSearch={this.handleSearch}   />
         <RealizarVendaLista            
         searchTerm={this.state.searchTerm} />       
      </div>
    );
  }
}
export default RealizarVenda;
