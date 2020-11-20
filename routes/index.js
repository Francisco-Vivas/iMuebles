const express = require('express');
const router  = express.Router();
const { sendMensajito } = require('../controllers/nodemailerController');
const productModel = require('../models/Product.model')

/* GET home page */
router.get('/', async (req, res, next) => {
  const categoryView = await productModel.find({category:["Sillas", "Escritorios", "Sofás"], imageURL:[0]});
  // console.log(req.user)
  console.log (categoryView)
  res.render('index', {categoryView});
});



router.post('/send-email', sendMensajito);



module.exports = router;
