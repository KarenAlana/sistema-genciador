import React, { Component } from "react";
const Geral = require("./geral.jsx") 
class ListaHistorico extends Component {
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
      valorProduto: "",
      updating: false,
      updateItemId: "",
      quantidadeItem: "",      
      selectedMonth: null, 
    };
  }

  componentDidMount() {
    this.fetchItemsVendas();
  }

  fetchItemsVendas = () => {
    fetch(`${Geral.dbLocalItens}/historico-de-vendas`)
      .then((response) => response.json())
      .then((data) => this.setState({ vendasCliente: data }));
  };

  valor = (filteredData) => {
    let totalValor = 0;
    filteredData.forEach((item) => {
      const precoVenda = parseFloat(item.valorProduto);
      const produtoQuantidade = parseInt(item.produtoQuantidade);

      if (!isNaN(precoVenda) && !isNaN(produtoQuantidade)) {
        totalValor += precoVenda * produtoQuantidade;
      }
    });
    return totalValor;
  };

 
  filterByMonth = (month) => {
    if (!month) {
      return this.state.vendasCliente;
    }

    return this.state.vendasCliente.filter((item) => {
      const vendaDate = new Date(item.dataVenda);
      return vendaDate.getMonth() === month - 1;
    });
  };
  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.handleSearch();
    }
  }
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
  render() {
    const { selectedMonth } = this.state;
    const filteredVendas = this.filterByMonth(selectedMonth);
    const totalValor = this.valor(filteredVendas);
    function formatarDataBrasileira(data) {
      const dataObj = new Date(data);
      return dataObj.toLocaleDateString('pt-BR');
    }
     
    
    const virgula = (number) => number.toFixed(2).replace(".", ",");
    return (
      <div>

        <select
          value={this.state.selectedMonth || ""}
          onChange={(e) =>
            this.setState({ selectedMonth: parseInt(e.target.value) || null })
          }
        >
          <option value="">Todos os meses</option>
          <option value="1">Janeiro</option>
          <option value="2">Fevereiro</option>
          <option value="3">Março</option>
          <option value="4">Abril</option>
          <option value="5">Maio</option>
          <option value="6">Junho</option>
          <option value="7">Julho</option>
          <option value="8">Agosto</option>
          <option value="9">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
         
        </select>

        <p className="total">
          Total de vendas no mês : R${virgula(totalValor)}
        </p>       
        <ul className="itemContainer">
          {this.filterByMonth(this.state.selectedMonth).map((item) => (
            <li key={item._id}>
              <div className="itemProduto">
                <p  className="nome"> Cliente : {item.nameCliente}</p>
                <p className="nome">Data: {formatarDataBrasileira(item.dataVenda)}</p>

                <div className="containerItem">                 
                  <p>Produto : {item.produto}</p>
                  <p> Quantidade : {item.produtoQuantidade}</p>
                  <p> Endereço : {item.endereco}</p>
                  <p>Valor por item : R$ {virgula(item.valorProduto)}</p>
                  <p>
                    Valor Venda : R$
                    {virgula(item.valorProduto * item.produtoQuantidade)}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>       
      </div>
    );
  }
}

export default ListaHistorico;


