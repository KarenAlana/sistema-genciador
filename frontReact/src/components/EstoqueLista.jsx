import React, { Component } from "react";
const Geral = require("./geral.jsx");
class ListaEstoque extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      precoVenda: "",
      precoCusto: "",
      estoqueQuantidade: "",
      updating: false,
      updateItemId: "",
      selectedItem: null,
    };
  }

  componentDidMount() {
    this.fetchItems();
  }

  fetchItems = () => {
    fetch(`${Geral.dbLocalItens}`)
      .then((response) => response.json())
      .then((data) => this.setState({ items: data }));
  };

  handleInputChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = (item) => {  

    const {
        name,
        precoVenda,
        precoCusto,
        estoqueQuantidade,     
        updateItemId,
      } = this.state; 
    this.setState({
     
      name: item.name,
      precoVenda: item.precoVenda,
      precoCusto: item.precoCusto,
      estoqueQuantidade: item.estoqueQuantidade,
      updating: true, 
      updateItemId: item._id, 
    })
     
        fetch(`${Geral.dbLocalItens}/update/${updateItemId}`, {         
          method: "PUT",
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
              updating: false,
              updateItemId: "",
            });
            this.fetchItems(); 
          });
     console.log("ofi")
  };
  
  incrementQuantity = (index, itemId) => {
    const updatedItems = [...this.state.items];
    updatedItems[index].estoqueQuantidade++;
    this.setState({ items: updatedItems });
  };

  decrementQuantity = (index, itemId) => {
    const updatedItems = [...this.state.items];
    if (updatedItems[index].estoqueQuantidade > 1) {
      updatedItems[index].estoqueQuantidade--;
      this.setState({ items: updatedItems });
    }
  };
  componentDidUpdate(prevProps) {
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.handleSearch();
    }
  }
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
  render() {
    const { items } = this.state;
    const virgula = (number) => {
      if (number !== null) {
        return number.toFixed(2).replace(".", ",");
      }
      return "";
    };
    return (
      <ul className="itemContainer">
        {items.map((item, index) => (
          <li key={item._id}>
            <div className="itemProduto">
              <p className="nome"> {item.name}</p>
              <div className="containerItem">
                <p>Valor de venda : R${virgula(item.precoVenda)}</p>
                <p>Valor de custo : R${virgula(item.precoCusto)}</p>
                <p>Em estoque : {item.estoqueQuantidade}</p>
                <div className="p">
                  <button onClick={() => this.decrementQuantity(index)}>
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <button onClick={() => this.incrementQuantity(index)}>
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
                <button onClick={() => this.handleSubmit(item)}>
                  <i class="fa-solid fa-floppy-disk"></i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    );
  }
}

export default ListaEstoque;
