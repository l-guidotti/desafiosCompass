const express = require('express');
const router = express.Router();
const contaController = require('../controllers/contaController');

router.post('/contas', contaController.criaConta);
router.get('/contas', contaController.listaConta);
router.get('/contas/:id', contaController.buscaContaPorId);
router.delete('/contas/:id', contaController.deletaConta);

module.exports = router;