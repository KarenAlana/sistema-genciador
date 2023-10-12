import React, { Component } from "react";
const Geral = require("./geral.jsx");
class CadastroLista extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      name: "",
      dataVenda: "",
      updating: false,
      updateItemId: "",
      searchTerm: "",
      selectedItem: null,
    };
  }

  componentDidMount() {
    this.fetchItems();
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

  handleEdit = (item) => {
    this.setState({
      selectedItem: item, 
      name: item.name,
      precoVenda: item.precoVenda,
      precoCusto: item.precoCusto,
      estoqueQuantidade: item.estoqueQuantidade,
      updating: true,
      updateItemId: item._id,
    });
  };
  handleDelete = (id) => {
    fetch(`${Geral.dbLocalItens}/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then(() => {
        this.fetchItems();
      });
    window.location.reload();
  };

  handleSearch = () => {
    const { searchTerm } = this.props;
    if (searchTerm === "") {
      this.fetchItems();
    } else {
      const filteredItems = this.state.items.filter((item) =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      this.setState({ items: filteredItems });
    }
  };
  valor = () => {
    const { items } = this.state;
    let totalValor = 0;
    items.forEach((item) => {
      const precoVenda = parseFloat(item.precoVenda);
      const produtoQuantidade = parseInt(item.estoqueQuantidade);
      if (!isNaN(precoVenda) && !isNaN(produtoQuantidade)) {
        totalValor += precoVenda * produtoQuantidade;
      }
    });
    return totalValor;
  };

  render() {
    const { items } = this.state;
    const totalValor = this.valor();
    const virgula = (number) => {
      if (typeof number === 'number') {
        return number.toFixed(2).replace(".", ",");
      }
      return "";
    }
    
    return (
      <div className="listaDeProdutos">
        <div>
          {/* Campo de pesquisa */}
          <p className="total">Total em estoque:R$ {virgula(totalValor)}</p>
          <ul className="itemContainerCad">
            <li className="itemProdutoCad topo">
              <p className="nome">Produto</p>           
                <p>Venda </p>
                <p>Custo </p>
                <p>Estoque </p>
                <p>Total</p>
                <button>
                   Editar
                  </button>
                  <button>
                   Apagar
                  </button>           
            </li>
            {items.map((item) => (
              <li key={item._id} className="itemProdutoCad">
                <p className="nome">{item.name}</p>              
                  <p> R${virgula(item.precoVenda)}</p>
                  <p> R${virgula(item.precoCusto)}</p>
                  <p> {item.estoqueQuantidade}</p>
                  <p>${virgula(item.precoVenda * item.estoqueQuantidade)}</p>
                  <button onClick={() => this.props.onEdit(item)}>
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
                  <button onClick={() => this.handleDelete(item._id)}>
                    <i className="fa-solid fa-trash"></i>
                  </button>                
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default CadastroLista;
