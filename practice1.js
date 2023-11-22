const express = require('express');
const app = express();
const port = 3040;

const productos =[				//creamos el arreglo con algunos items de limpieza
  {id:1, name: 'Lavandina de 1 litro marca Sapolio', precio: 8, Stock: 150},
  {id:2, name: 'Ambientador Spray de 330 ml marca Arom', precio: 10, Stock: 80},
  {id:3, name: 'Lavavajillas de 1 litro Ozono',precio: 8.5,Stock: 25},
  {id:4, name: 'Limpiador Sacasarro de 1 litro marca Ozono', precio: 9.5, Stock: 72}
];

app.get("/", (req, res) =>{		//callback para mandar una respuesta que enviaremo al cliente.
  res.send("Hola mi server en Express");
});

// Obtenemos todos los productos
app.get("/productos", (req, res) =>{		//agregamos el nuevo endpoint productos y la respuesta en Json.
    res.json([productos]);
  });

//Obtenemos un solo producto segun su propio id
app.get('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const item = productos.find((item) => item.id === id);

  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ error: 'producto no encontrado' });
  }
});

// Create a new data item
app.post('/productos', (req, res) => {
  const newItem = req.body;
  productos.push(newItem);

  res.status(201).json(newItem);
  res.send('Item agregado correctamente!');
});

// Editar un producto
app.put('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const updatedItem = req.body;
  const index = productos.findIndex((item) => item.id === id);

  if (index !== -1) {
    productos[index] = { ...productos[index], ...updatedItem };
    res.json(productos[index]);
    res.send('Prouducto editado correctamente!');
  } else {
    res.status(404).json({ error: 'Producto no encontrato!' });
  }
});

// Delete a data item by ID
app.delete('/productos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = productos.findIndex((item) => item.id === id);

  if (index !== -1) {
    const deletedItem = productos.splice(index, 1);
    res.json(deletedItem[0]);
  } else {
    res.status(404).json({ error: 'Producto no encontrato!' });
  }
});

app.listen(port, () =>{			//callback para imprimir en consola que el servidor esta funcionando.
  console.log("My port: " + port);
});
