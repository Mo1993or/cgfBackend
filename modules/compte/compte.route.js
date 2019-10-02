const express = require("express");

const router = express.Router();

const Ctrl = require('./compte.controller');
router.get('/', Ctrl.listerCompte)
router.post('/create-compte', Ctrl.createCompte);
router.get('/:userId', Ctrl.readCompte)
module.exports.routeCompte = router;