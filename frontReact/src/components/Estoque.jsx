import React, { Component } from "react"; 
import BotaoPesquisa from "./BotaoPesquisa";
import EstoqueLista from "./EstoqueLista";
class Estoque extends Component {  
  constructor() {   
    super(); 
    this.state = {  
      selectedItem: null,
    };
  }
  handleSearch = (searchTerm) => {    
    this.setState({ searchTerm });
  };
  render() {   
    return (
      <div className="Estoque">        
        <h1>Estoque</h1>  
        <BotaoPesquisa onSearch={this.handleSearch}   />
        <EstoqueLista
        onEdit={this.handleEdit}    
         searchTerm={this.state.searchTerm} />         
      </div>
    );
  }
}

export default Estoque; 