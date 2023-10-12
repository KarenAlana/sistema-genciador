import React, { Component } from "react"; 
const Geral = require("./geral.jsx") 

class CadastroForm extends Component {
 
  constructor() {

    super(); 
    this.state = {
     
      items: [], 
      name: "", 
      precoVenda: "",
      precoCusto: "",
      estoqueQuantidade: "",
      updating: false, 
      updateItemId: "",
    
    };
  }

  componentDidMount() {  
    this.fetchItems(`${Geral.dbLocalItens}`); 
  }

  fetchItems = () => {    
    fetch(`${Geral.dbLocalItens}`) 
      .then((response) => response.json()) 
      .then((data) => this.setState({ items: data })); 
  };
 
  handleInputChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.selectedItem !== this.props.selectedItem) {
      const selectedItem = this.props.selectedItem;
      this.setState({
        name: selectedItem ? selectedItem.name : "",
        precoVenda: selectedItem ? selectedItem.precoVenda : "",
        precoCusto: selectedItem ? selectedItem.precoCusto : "",
        estoqueQuantidade: selectedItem ? selectedItem.estoqueQuantidade : "",
        updating: selectedItem ? true : false, 
        updateItemId: selectedItem ? selectedItem._id : "",
      });
    }
  }

  handleSubmit = () => {  
    const {
      name,
      precoVenda,
      precoCusto,
      estoqueQuantidade,
      updating,
      updateItemId,
    } = this.state; 
    if (updating) {
   
      fetch(`${Geral.dbLocalItens}/update/${updateItemId}`, {
        
        method: "PUT",
        headers: {
          "Content-Type": "Application/json"
        },
        body: JSON.stringify({
          name,
          precoVenda,
          precoCusto,
          estoqueQuantidade,
        }), 
      })
        .then((response) => response.json()) 
        .then((data) => {
          this.setState({
            
            name: "",
            precoVenda: "",
            precoCusto: "",
            estoqueQuantidade: "",
            updating: false,
            updateItemId: "",
          });
          this.fetchItems(); 
        });
        window.location.reload();
    } else {
      
      fetch(`${Geral.dbLocalItens}/create`, {
     
        method: "POST", 
        headers: {
          "Content-Type": "Application/json", 
        },
        body: JSON.stringify({
          name,
          precoVenda,
          precoCusto,
          estoqueQuantidade,
        }), 
      })
        .then((response) => response.json()) 
        .then((data) => {
          this.setState({
            name: "",
            precoVenda: "",
            precoCusto: "",
            estoqueQuantidade: "",
          }); 
          this.fetchItems(); 
        });
    }
     window.location.reload();
  };

  render() {

    return (
      <div className="formAdd">
      
          <form action="">
            <div className="containerLabel">
              <label htmlFor="Nome">Nome do Produto</label>
              <input
                type="text"
                name="name"
                placeholder="Nome"
                value={this.state.name}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="containerLabel">
              <label htmlFor="precoVenda">Preço de Venda</label>
              <input
                type="number"
                name="precoVenda"
                placeholder="Preço de Venda"
                value={this.state.precoVenda}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="containerLabel">
            <label htmlFor="precoCusto">Preço de Custo</label>
              <input
                type="number"
                name="precoCusto"
                placeholder="Preço de Custo"
                value={this.state.precoCusto}
                onChange={this.handleInputChange}
              />
            </div>
            <div className="containerLabel">
            <label htmlFor="quantidadeDeEstoque">Quantidade em estoque</label>
              <input
                type="number"
                name="estoqueQuantidade"
                placeholder="Quantidade em estoque"
                value={this.state.estoqueQuantidade}
                onChange={this.handleInputChange}
              />
            </div>
          </form>
         
          <div className="btnContainer">
            <button onClick={this.handleSubmit}>
              {this.state.updating ? "Atualizar" : "Criar"}
            </button>
          </div>       
      </div>
    );
  }
}

export default CadastroForm ; 