import React, { Component } from "react";
const Geral = require("./geral.jsx") 
class RealizarVendaLista extends Component {
  constructor() {
    super();
    this.state = {
      items: [], 
      vendasCliente: [], 
      nameCliente: "",
      endereco: "",
      produto: "",
      produtoQuantidade: "",
      inputValue: "",
      valorProduto:"",
      updating: false,
      updateItemId: "",
      quantidadeItem: "", 
      searchTerm: "",
      selectedItem: null,
    };
  }

  componentDidMount() {
    this.fetchItems();
    this.fetchItemsVendas();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.handleSearch();
    }
  }
  fetchItems = () => {
    fetch(`${Geral.dbLocalItens}`)
      .then((response) => response.json())
      .then((data) => this.setState({ items: data }));
  };
  fetchItemsVendas = () => {
    fetch(`${Geral.dbLocalItens}/realizar-venda`)
      .then((response) => response.json())
      .then((data) => this.setState({ vendasCliente: data }));
  };

  handleDelete = (id) => {
    fetch(`${Geral.dbLocalItens}/delete/realizar-venda/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        this.fetchItems();
      });
     window.location.reload()
  };

  handleSearch = () => {
    const { searchTerm } = this.props;

    if (searchTerm === "") {
      
      this.fetchItemsVendas();      
    } else {
      const filteredItems = this.state.vendasCliente.filter((item) =>
      item.nameCliente.toLowerCase().includes(searchTerm.toLowerCase())
      );
      
      this.setState({ vendasCliente: filteredItems });  
    }
  };

  
  valor = () => {
    const { vendasCliente } = this.state;
    let totalValor = 0;
    vendasCliente.forEach((item) => {
      const precoVenda = parseFloat(item.valorProduto); 
      const produtoQuantidade = parseInt(item.produtoQuantidade); 
      if (!isNaN(precoVenda) && !isNaN(produtoQuantidade)) {
       
        totalValor += precoVenda * produtoQuantidade; 
      }
    });
    return totalValor;
  }
  render() {
    const { vendasCliente} = this.state;
    const totalValor = this.valor();  
    const virgula = (number) => {
      if (number !== null) {
        return number.toFixed(2).replace('.', ',');
      }
      return ''; 
    };    
    return (
      <>
        <h1>Lista de Vendas</h1>   
        
        <p className="total">Total em estoque: R${virgula(totalValor)}</p>
         
          <ul className="itemContainer">
            {vendasCliente.map((item) => (
             <li key={item._id}>
             <div className="itemProduto">
              <p  className="nome"> Cliente: {item.nameCliente}</p>
              <div className="containerItem">
                <p>Produto: {item.produto}</p>
                <p>Quantidade:               {item.produtoQuantidade}</p> <p>Valor por item :R$
                 {virgula(item.valorProduto)}</p>
                 <p> Valor Venda:R$
                 {virgula(item.valorProduto * item.produtoQuantidade)}</p>                
                  <button onClick={() => this.handleDelete(item._id)}>
                  <i className="fa-solid fa-trash"></i>
                  </button>
              </div>
             </div>
           </li>
            ))}
          </ul>
        
      </>
    );
  }
}

export default RealizarVendaLista   ;
