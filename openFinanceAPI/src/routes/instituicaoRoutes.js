const express = require('express');
const router = express.Router();
const instituicaoController = require('../controllers/instituicaoController');

router.post('/instituicoes', instituicaoController.criarInstituicao);

module.exports = router;