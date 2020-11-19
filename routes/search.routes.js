const {
  searchBar,
  advanceSearch,
} = require("../controllers/search.controller");

const router = require("express").Router();

router.get("/advance", advanceSearch);
router.get("/", searchBar);

module.exports = router;
