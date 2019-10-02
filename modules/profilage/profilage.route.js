const express = require("express");

const router = express.Router();

const Ctrl = require('./profilage.controller');

router.post('/souscrire-produit', Ctrl.souscrireProduit);
router.get('/:userId', Ctrl.readProfilage);
module.exports.routeProfilage = router;