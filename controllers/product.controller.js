const { create } = require("../models/Product.model");
const ProductModel = require("../models/Product.model");
const mercadopago = require('../configs/mercadopago');

module.exports = {
  async list(req, res){
    const products = await ProductModel.find();
    if (!products.length) return res.render('products/index', { errorMessage: 'Wow.. such empty! Try to add something ;)' })
    return res.render('products/index', { products })
  },

  showFormNew(req, res){
    res.render('products/new')
  },
  
  async create(req, res){
    const { name, description, quantity, price} = req.body;
    let imagesURL = req.file.path;

    await ProductModel.create({
      name,
      description,
      price,
      quantity,
      ownerID: req.user._id,
      imagesURL,

    });
    res.redirect('/products')
    
  },

  showDetails(req, res){
    const { productId } = req.params;

    ProductModel.findById({_id: productId})
    .then(product => {
      if(!product) return res.render('products/detail', {errorMessage:'This product does not exist.'});
      if(!req.user || req.user._id !== product.ownerID){
        product._id = null; // Check if is the owner of the product so he can edit it.
      }
      product.formatedPrice = `$${(product.price/1000).toFixed(2)} USD`;
      return res.render('products/detail', product);
    })
    .catch(()=>  res.render('products/detail', {errorMessage:'This product does not exist.'}))
  },

  async editProductView(req, res){
    const { productId } = req.params;

    const product = await ProductModel.findById({_id: productId});
    if(product) return res.render('products/edit', product);
    return res.render('products/edit', {errorMessage:'This product does not exist.'});
    
  },
  async editProduct(req, res){
    const { name, description, quantity, price} = req.body;
    const { productId } = req.params;
    let newImage = req.file.path;

    const {imagesURL}= await ProductModel.findById(productId);

    if(imagesURL[0].includes('https://aqt.cl/wp-content')){
      await ProductModel.findByIdAndUpdate(productId,{
        name,
        description,
        price,
        quantity,
        imagesURL: [newImage],
      },{ new: true});
    } else{
      await ProductModel.findByIdAndUpdate(productId,{
        name,
        description,
        price,
        quantity,
        $push: {imagesURL: newImage},
      },{ new: true});
    }

    res.redirect('/products')
  },
}