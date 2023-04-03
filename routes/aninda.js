// IMPORT CONFİG && DEPENDENCIES

const express = require('express');




const anindaController = require('../controllers/aninda');

const router = express.Router();

router.get('/testmethod', anindaController.testMethod);
router.post('/uploadfile',  anindaController.uploadFile);

module.exports = router;