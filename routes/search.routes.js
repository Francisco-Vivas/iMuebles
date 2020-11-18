const { searchBar } = require("../controllers/search.controller");

const router = require("express").Router();

router.post("/", searchBar);

module.exports = router;
