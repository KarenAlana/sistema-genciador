require(`dotenv`).config()
const express = require(`express`)
const mongoose = require(`mongoose`)
const bodyParser = require(`body-parser`)
const cors = require(`cors`)
const app = express()
const port = process.env.PORT || 5000
app.use(
  cors({
    origin: process.env.URLFRONT,
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
const mongoURI = process.env.DB_URI;
mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log(`MongoDB conectado`))
  .catch((err) => console.log(err))
const Item = mongoose.model(`item`, {
  name: String,
  precoVenda: Number,
  precoCusto: Number,
  estoqueQuantidade: Number,
});
const Venda = mongoose.model(`venda`, {
  nameCliente: String,
  endereco: String,
  produto: String,
  valorProduto: Number,
  produtoQuantidade: Number,
  dataVenda: { type: Date, default: Date.now },
});
app.get(`/`, (req, res) => {
  Item.find().then((items) => res.json(items));
});
app.use(`/cadastro`, (req, res) => {
  Item.find().then((items) => res.json(items));
});

app.get("/realizar-venda/itens-venda", (req, res) => {
  Item.find().then((items) => res.json(items));
});

app.get("/realizar-venda", (req, res) => {
  Venda.find().then((vendas) => res.json(vendas));
});

app.use(`/estoque`, (req, res) => {
  Item.find().then((items) => res.json(items));
});

app.get("/historico-de-vendas", (req, res) => {
  Venda.find().then((vendas) => res.json(vendas));
});

app.post(`/create`, (req, res) => {
  const newItem = new Item(req.body);
  newItem.save().then((item) => res.json(item));
});
app.post(`/create-venda`, (req, res) => {
  const newItem = new Venda(req.body);
  newItem.save().then((item) => res.json(item));
});
app.put(`/update/:id`, (req, res) => {
  Item.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json(err));
});
app.put(`/update/realizar-venda/:id`, (req, res) => {
  Venda.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json(err));
});
app.delete(`/delete/:id`, (req, res) => {
  Item.findByIdAndRemove(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json(err));
});
app.delete(`/delete/realizar-venda/:id`, (req, res) => {
  Venda.findByIdAndRemove(req.params.id)
    .then((item) => res.json(item))
    .catch((err) => res.status(400).json(err));
});
app.listen(port, () => console.log(`http://localhost:${port}`));
