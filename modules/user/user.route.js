const express = require("express");

const router = express.Router();

const Ctrl = require('./user.controller');

router.get('/', Ctrl.list);
router.get('/:userId', Ctrl.read);
router.post('/login', Ctrl.login);
router.post('/register', Ctrl.register);
router.put('/:id', Ctrl.update);
router.delete('/:id', Ctrl.delete);
router.put('/:userId/attach-photo', Ctrl.attachPhoto)
router.put('/:userId/attach-cni', Ctrl.attachCni)
router.put('/:userId/attach-facture', Ctrl.attachFacture)
router.put('/:userId/attach-convention', Ctrl.attachConvention)
router.put('/:userId/ouvrir-compte', Ctrl.ouvrirCompte);
router.put('/:userId/valider-doc', Ctrl.validerDoc);
module.exports.routeUser = router;