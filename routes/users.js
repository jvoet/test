var express = require('express');
var router = express.Router();
var userController = require('../controllers/userController');

router.get("/getAll", userController.getAll);
router.get("/getPage/:page/:pageSize/:orderBy", userController.getPage);
router.get("/getById/:id", userController.getById);
router.post("/create", userController.create);
router.put("/update", userController.update);
router.delete("/delete/:id", userController.delete);

module.exports = router;
