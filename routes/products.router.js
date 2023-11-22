const express = require('express');
// const {faker} = require('@faker-js/faker');

const ProductService = require('../services/product.service');
const validatorHandler = require('../middlewares/validator.handler');
const {createProductSchema,getProductSchema,updateProductSchema} = require('../schemas/product.schema');

const router = express.Router();

const service = new ProductService();


router.get('/',async(req,res) =>{

  // const products= [];
  // const {size} = req.query;

  // const limit= size ||10;

  // for (let index = 0; index < limit; index++) {
  //   products.push({
  //     name:faker.commerce.productName(),
  //     price:parseInt(faker.commerce.price(),10),
  //     image:faker.image.imageUrl(),
  //   });
  // }
  // res.json(products)

  const products = await service.find();
  res.json(products);
});

router.get('/filter',(req,res)=>{
  res.send('Yo soy un filter');
})

//todo lo especifico debe ir antes de los endpoints dinamicos

router.get('/:id',
  validatorHandler(getProductSchema,'params'),
  async(req,res,next)=>{
  // const {id} = req.params;

  // const product = await service.finOne(id);
  // res.json(product);
  // if (id==='999') {
  //   res.status(404).json({
  //     message: 'not found'
  //   });
  // }else{
  //   res.status(200).json({
  //     id,
  //     name:'Product 2',
  //     price:1500
  //   })
  // }

  try {
    const {id} = req.params;

  const product = await service.finOne(id);
  res.json(product);
  } catch (error) {
    next(error)
  }
})

router.post('/',
  validatorHandler(createProductSchema,'body'),
  async(req,res)=>{
  const body = req.body;
  const newProduct = await service.create(body);
  // res.status(201).json({
  //   message: 'created',
  //   data:body
  // })
  res.status(201).json(newProduct);
})

router.patch('/:id',
  validatorHandler(getProductSchema,'params'),
  validatorHandler(updateProductSchema,'body'),
  async(req,res,next)=>{

  try {
    const {id} = req.params;
    const body = req.body;

    const product =await service.update(id,body);
    res.json(product);

  } catch (error) {
    // res.status(404).json({
    //   message:error.message
    // })
    next(error)
  }

  // res.json({
  //   message:'update',
  //   data:body,
  //   id,
  // })
})

router.delete('/:id',async(req,res)=>{
  const {id} = req.params;
  const rta = await service.delete(id)

  // res.json({
  //   message:'deleted',
  //   id,
  // })
  res.json(rta);
})

module.exports = router;
