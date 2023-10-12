import React, { Component } from "react";
const Geral = require("./geral.jsx");
class RealizarVendaForm extends Component {
  constructor() {
    super();
    this.state = {
      items: [],
      vendasCliente: [],
      nameCliente: "",
      endereco: "",
      produto: "",
      idProduto: "",
      produtoQuantidade: "",
      inputValue: "",
      valorProduto: "",
      updating: false,
      updateItemId: "",
      quantidadeItem: "",
      selectedItem: null,
    };
  }

  componentDidMount() {
    this.fetchItems();
    this.fetchItemsVendas();
  }

  fetchItems = () => {
    fetch(`${Geral.dbLocalItens}/realizar-venda/itens-venda`)
      .then((response) => response.json())
      .then((data) => this.setState({ items: data }));
  };

  fetchItemsVendas = () => {
    fetch(`${Geral.dbLocalItens}/realizar-venda`)
      .then((response) => response.json())
      .then((data) => this.setState({ vendasCliente: data }));
  };

  handleInputVenda = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  handleProdutoChange = (e) => {
    const selectedProductId = e.target.value;
    this.setState({
      idProduto: selectedProductId,
      updateItemId: selectedProductId,
    });
  };
  handleQuantidadeChange = (e, event) => {
    this.setState({ produtoQuantidade: e.target.value });
  };
  handleSubmit = () => {
    const { nameCliente, endereco, idProduto, produtoQuantidade } = this.state;
    const quantidadeEmEstoque = this.state.items.find(
      (item) => item._id === idProduto
    );
    if (quantidadeEmEstoque) {
      const minimo = quantidadeEmEstoque.estoqueQuantidade;
      if (minimo > 0) {
        const updatedItem = this.state.items.find(
          (item) => item._id === idProduto
        )
        const updateId = updatedItem.precoVenda;
        const updateProduto = updatedItem.name;

        fetch(`${Geral.dbLocalItens}/create-venda`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            nameCliente,
            endereco,
            idProduto,
            produto: updateProduto,
            valorProduto: updateId,
            produtoQuantidade,
          }),
        })
          .then((response) => response.json())
          .then((data) => {
            const updatedItem = this.state.items.find(
              (item) => item._id === idProduto
            );
            if (updatedItem) {
              updatedItem.estoqueQuantidade -= produtoQuantidade;
            }
            const updateId = updatedItem._id;

            fetch(`${Geral.dbLocalItens}/update/${updateId}`, {
              method: "PUT",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                estoqueQuantidade: updatedItem.estoqueQuantidade,
              }),
            })
              .then((response) => response.json())
              .catch((error) => {
                console.error("Erro ao atualizar o estoque:", error);
              });

            this.setState({
              nameCliente: "",
              endereco: "",
              idProduto: "",
              produto: "",
              valorProduto: "",
              produtoQuantidade: "",
            });
            this.fetchItems();
          })
          .catch((error) => {
            console.error("Erro ao criar a venda:", error);
          });
      } else {
        console.error(
          "Produto não disponível em estoque para criação de venda."
        );
        alert("Produto não disponível em estoque para criação de venda.");
      }
    } else {
      console.error("Produto não encontrado.");
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
  };

  render() {
    return (
      <div className="formAdd">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            this.handleSubmit();
          }}
        >
          <div className="containerLabel">
            <label htmlFor="nameCliente">Nome do Cliente:</label>
            <input
              type="text"
              name="nameCliente"
              id="nameCliente"
              value={this.state.nameCliente}
              onChange={this.handleInputVenda}
            />
          </div>
          <div className="containerLabel">
            <label htmlFor="endereco">Endereço:</label>
            <input
              type="text"
              name="endereco"
              id="endereco"
              value={this.state.endereco}
              onChange={this.handleInputVenda}
            />
          </div>
          <div className="containerLabel">
            <label htmlFor="idProduto">Produto:</label>
            <select
              name="idProduto"
              id="idProduto"
              value={this.state.idProduto}
              onChange={this.handleProdutoChange}
            >
              <option value="">Selecione um Produto</option>
              {this.state.items.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          <div className="containerLabel">
            <label htmlFor="produtoQuantidade">Quantidade a ser vendida:</label>
            <input
              type="number"
              name="produtoQuantidade"
              id="produtoQuantidade"
              value={this.state.produtoQuantidade}
              onChange={this.handleInputVenda}
            />
          </div>
          <div className="btnContainer">
            <button type="submit">
              {this.state.updating ? "Atualizar" : "Vender"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}
export default RealizarVendaForm;
