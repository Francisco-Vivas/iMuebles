const express = require('express');
const router  = express.Router();
const { sendMensajito } = require('../controllers/nodemailerController');

/* GET home page */
router.get('/', (req, res, next) => {
  console.log(req.user)
  res.render('index');
});


router.post('/send-email', sendMensajito);



module.exports = router;
