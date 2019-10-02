const Compte = require('./compte.model').compteModel;
const User = require('../user/user.model').userModel;

module.exports = {
    createCompte: (req, res) => {


        req.body.user = req.body.userId;
        let compte = new Compte(req.body);
        compte.numCompte = "0007894561231990";
        console.log(compte.numCompte);
        compte.save((err, compte) => {
            if (err) {
                res.status(500).json({
                    status: "error",
                    message: err
                });
            }
            req.body.compteCreate = true;
            req.body.etatDossier = false;
            console.log("user", compte.user);
            User.findByIdAndUpdate({ _id: compte.user }, req.body, (error, user) => {
                console.log("usercompte", user.compteCreate);
            })
            res.json({
                status: "succes",
                response: compte
            });
        });
    },
    readCompte: (req, res) => {
        Compte.findOne({ user: req.params.userId }, { __v: 0 }, (err, compte) => {
            res.json({
                status: "success",
                response: compte
            });
        });


    },
    listerCompte: (req, res) => {
        Compte.find({}, { __v: 0 }, (err, comptes) => {
            res.json({
                status: "succes",
                response: comptes
            });
        });
    }
}