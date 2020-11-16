const productController = require('../controllers/product.controller');

const router = require('express').Router();
  
router.get('/',productController.list);
router.get('/new',productController.list);
  
module.exports = router;