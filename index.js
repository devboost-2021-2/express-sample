const express = require("express");

const app = express();

app.use(express.json());

let products = [
  {
    id: 1,
    name: "Smartphone Moto G10",
    price: 1100,
    amount: 5,
  },
  {
    id: 2,
    name: "Geladeira",
    price: 1000,
    amount: 14,
  },
];

/**
 * id, name, description, price
 *
 * POST /products
 * GET /products
 * GET /products/:id
 * PUT /products
 * DELETE /products
 *
 *
 * CRUD = create, read, update, delete
 *      =  POST ,  GET , PUT  , DELETE
 */

app.get("/hello/:name", (req, res) => {
  const name = req.params.name;
  // GET /hello/erick   =>   Hello Erick!
  // GET /hello/mota    =>   Hello Mota!
  const message = `Hello, ${name}`;
  return res.status(200).json({ message });
});

app.get("/products", (req, res) => {
  return res.status(200).json(products);
});

app.get("/products/:id", (req, res) => {
  const id = req.params.id;
  const product = products.find((item) => item.id == id);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  return res.status(200).json(product);
});

app.post("/products", (req, res) => {
  const product = req.body;
  const length = products.length;
  const newId = products[length - 1].id + 1;
  const response = { id: newId, ...product };
  products.push(response);

  return res.status(201).json(response);
});

app.put("/products/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;

  const index = products.findIndex((item) => item.id == id);

  products[index] = body;

  products[index].id = parseInt(id);

  return res.status(200).json(products[index]);
});

app.delete("/products/:id", (req, res) => {
  const id = req.params.id;

  const index = products.findIndex((item) => item.id == id);

  const length = products.length;
  const array1 = products.slice(0, index);
  const array2 = products.slice(index + 1, length);
  const newProducts = array1.concat(array2);

  products = newProducts;

  return res.status(200).json({ message: `Product with id ${id} deleted` });
});

app.listen(3000, () => {
  console.log("server is running");
});
