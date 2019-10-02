const Profilage = require('./profilage.model').profilageModel;


module.exports = {
    souscrireProduit: (req, res) => {
        console.log("body", req.body);
        let profilage = new Profilage(req.body);
        profilage.save((err, profilage) => {
            if (err) {
                res.status(500).json({
                    status: "error",
                    message: err
                });
            }
            res.json({
                status: "success",
                response: profilage
            });
        });
    },
    readProfilage: (req, res) => {
        Profilage.findOne({ userId: req.params.userId }, { __v: 0 }, (err, profilage) => {
            res.json({
                status: "success",
                response: profilage
            });
        });


    }
}