const express = require ('express')
const router = express.Router();

//controllers
const {privatePage, compradorPage, vendedorPage, usuarioPage} = require ('../controllers/user')
//middlewares//
const { isAuth, isNotAuth, checkRoles } = require("../middlewares")

//roles//

router.get("/private", isAuth, privatePage)

router.get("/comprador", isAuth, checkRoles(["COMPRADOR", "ADMIN"]), compradorPage)
router.get("/vendedor", isAuth, checkRoles(["VENDEDOR", "ADMIN"]), vendedorPage)
router.get("/usuario", usuarioPage)


module.exports = router