import React, { Component } from 'react';
import "./botaoPesquisa.css"

class BotaoPesquisa extends Component {
  constructor() {
    super();
    this.state = {
      searchTerm: '', 
    };
  }
  handleSearchChange = (e) => {
    const searchTerm = e.target.value;
  
    this.setState({ searchTerm });
   
    this.props.onSearch(searchTerm);
  };  
  render() {
    return (
      <div className="botaoPesquisa">       
          <input
              type="text"
              placeholder="Pesquisar..."
              value={this.state.searchTerm}
              onChange={this.handleSearchChange} 
            />       
      </div>
    );
  }
}
export default BotaoPesquisa;

