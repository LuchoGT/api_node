const express = require('express');
const app = express();
// const {faker} = require('@faker-js/faker');
const routerApi = require('./routes');
// const cors = require('cors');

const {logErrors,errorHandler,boomErrorHandler} = require('./middlewares/error.handler');

const port = process.env.PORT || 3000;
//ajuste para que se pueda recibir contenido en json
app.use(express.json());

//dandole permisos a estos dominios
// const whitelist = ['http://localhost:8080', 'https://myapp/co'];
// const options={
//   origin:(origin,callback)=>{
//     if (whitelist.includes(origin)) {
//       callback(null,true)
//     }else{
//       callback(new Error('no permitido'))
//     }
//   }
// }
// app.use(cors(options));

app.get('/api',(req,res) =>{
  res.send('Hola mi server en express');
});
app.get('/api/nueva-ruta',(req,res) =>{
  res.send('Hola, soy nueva ruta');
});

routerApi(app);

app.use(logErrors);
app.use(boomErrorHandler);
app.use(errorHandler);

// app.get('/products',(req,res) =>{

//   const products= [];
//   const {size} = req.query;

//   const limit= size ||10;

//   for (let index = 0; index < limit; index++) {
//     products.push({
//       name:faker.commerce.productName(),
//       price:parseInt(faker.commerce.price(),10),
//       image:faker.image.imageUrl(),
//     });
//   }
//   res.json(products)
// });

// app.get('/products/filter',(req,res)=>{
//   res.send('Yo soy un filter');
// })

// //todo lo especifico debe ir antes de los endpoints dinamicos

// app.get('/products/:id',(req,res)=>{
//   const {id} = req.params;

//   res.json({
//     id,
//     name:'Product 2',
//     price:1500
//   })
// })


// app.get('/categories/:categoryId/products/:productId',(req,res)=>{
//   const {categoryId} = req.params;
//   const {productId} = req.params;

//   res.json({
//     categoryId,
//     productId,
//   })
// })


// app.get('/categories/:categoryId', (req, res) => {
//   const { categoryId } = req.params;
//   res.json({
//       categoryId,
//       category: 'Computers & Accesories'
//   });
// });

// app.get('/people', (req, res) => {
//   res.json([{
//       name: 'Arturo',
//       type: 'employee'
//   }, {
//       name: 'Jimena',
//       type: 'customer'
//   }]);
// });

// app.get('/people/:id', (req, res) => {
//   const { id } = req.params;
//   res.json({
//       id,
//       name: 'Arturo',
//       type: 'employee'
//   });
// });

// app.get('/users',(req,res)=>{
//   const {limit,offset} = req.query;

//   if (limit && offset) {
//     res.json({
//       limit,
//       offset
//     })
//   }
//   else{
//     res.send('No hay parametros');
//   }
// })

// const productos =[				//creamos el arreglo con algunos items de limpieza
//   {id:1, name: 'Lavandina de 1 litro marca Sapolio', precio: 8, Stock: 150},
//   {id:2, name: 'Ambientador Spray de 330 ml marca Arom', precio: 10, Stock: 80},
//   {id:3, name: 'Lavavajillas de 1 litro Ozono',precio: 8.5,Stock: 25},
//   {id:4, name: 'Limpiador Sacasarro de 1 litro marca Ozono', precio: 9.5, Stock: 72}
// ];

// app.get("/", (req, res) =>{		//callback para mandar una respuesta que enviaremo al cliente.
//   res.send("Hola mi server en Express");
// });

// // Obtenemos todos los productos
// app.get("/productos", (req, res) =>{		//agregamos el nuevo endpoint productos y la respuesta en Json.
//     res.json([productos]);
//   });

// //Obtenemos un solo producto segun su propio id
// app.get('/productos/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const item = productos.find((item) => item.id === id);

//   if (item) {
//     res.json(item);
//   } else {
//     res.status(404).json({ error: 'producto no encontrado' });
//   }
// });

// // Create a new data item
// app.post('/productos', (req, res) => {
//   const newItem = req.body;
//   productos.push(newItem);

//   res.status(201).json(newItem);
//   res.send('Item agregado correctamente!');
// });

// // Editar un producto
// app.put('/productos/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const updatedItem = req.body;
//   const index = productos.findIndex((item) => item.id === id);

//   if (index !== -1) {
//     productos[index] = { ...productos[index], ...updatedItem };
//     res.json(productos[index]);
//     res.send('Prouducto editado correctamente!');
//   } else {
//     res.status(404).json({ error: 'Producto no encontrato!' });
//   }
// });

// // Delete a data item by ID
// app.delete('/productos/:id', (req, res) => {
//   const id = parseInt(req.params.id);
//   const index = productos.findIndex((item) => item.id === id);

//   if (index !== -1) {
//     const deletedItem = productos.splice(index, 1);
//     res.json(deletedItem[0]);
//   } else {
//     res.status(404).json({ error: 'Producto no encontrato!' });
//   }
// });

app.listen(port, () =>{			//callback para imprimir en consola que el servidor esta funcionando.
  console.log("My port: " + port);
});

