const Bcrypt = require("bcryptjs");
const User = require('./user.model').userModel;
const multer = require("multer");
const fs = require("fs");
const path = require("path")



module.exports = {
    list: (req, res) => {
        User.find({}, { __v: 0 }, (err, users) => {
            res.json({
                status: "succes",
                response: users

            });
        });
    },
    register: (req, res) => {
        // req.body.admin = true
        req.body.password = Bcrypt.hashSync(req.body.password, 10);
        let user = new User(req.body);

        user.save((err, user) => {
            if (err) {
                res.status(500).json({
                    status: "error",
                    message: err
                });
            }
            res.json({
                status: "success",
                response: user

            });

        });
    },
    read: (req, res) => {
        User.findOne({ _id: req.params.userId }, { __v: 0 }, (err, user) => {
            res.json({
                status: "success",
                response: user
            });
        });


    },
    update: (req, res) => {
        User.findOneAndUpdate({ _id: req.params.id },
            req.body,
            { new: true },
            (err, user) => {
                res.json({
                    status: "success",
                    response: user
                })
            })

    },
    delete: (req, res) => {
        Tache.findOneAndDelete({ _id: req.params.id }, (err, message) => {

            res.json({

                status: "success",
                response: message
            });
        });
    },
    login: (req, res) => {

        User.findOne({ login: req.body.login }, (err, user) => {
            if (user && (Bcrypt.compareSync(req.body.password, user.password))) {

                if (err) {
                    res.status(500).json({
                        status: "error",
                        response: err
                    });
                }
                res.json({
                    status: "success",
                    response: user
                });
            }
            else if (!user) {
                res.json({
                    status: "error",
                    response: "user not found"
                });
            }
            else if (!Bcrypt.compareSync(req.body.password, user.password)) {
                res.json({
                    status: "error",
                    response: "Mot de passe Invalid"
                });

            } else {
                res.json({
                    status: "error",
                    response: "erreur identifiant"
                });
            }

        });

    },
    // 
    attachCni: (req, res) => {
        upload = multer({ dest: "dist/attachments" }).single('cni')
        upload(req, res, function (error) {
            if (error || !req.file) {
                return res.status(500).json({
                    status: "error",
                    response: error
                })
            } else {
                oldPath = req.file.path;
                extension = path.extname(req.file.originalname);
                newPath = oldPath + extension;
                fs.rename(oldPath, newPath, err => {
                    const nameInDir = req.file.filename + extension;
                    User.findByIdAndUpdate({ _id: req.params.userId }, { cni: nameInDir }, (error, user) => {
                        return res.json({
                            status: "File uploaded",
                            response: user
                        });
                    })
                })


            }
        });
    },
    attachFacture: (req, res) => {
        upload = multer({ dest: "dist/attachments" }).single('facture')
        upload(req, res, function (error) {
            if (error || !req.file) {
                return res.status(500).json({
                    status: "error",
                    response: error
                })
            } else {
                oldPath = req.file.path;
                extension = path.extname(req.file.originalname);
                newPath = oldPath + extension;
                fs.rename(oldPath, newPath, err => {
                    const nameInDir = req.file.filename + extension;

                    User.findByIdAndUpdate({ _id: req.params.userId }, { facture: nameInDir }, (error, user) => {
                        return res.json({
                            status: "File uploaded",
                            response: user
                        });
                    })
                })
            }
        });
    },
    attachPhoto: (req, res) => {
        upload = multer({ dest: "dist/attachments" }).single('photo')
        upload(req, res, function (error) {
            if (error || !req.file) {
                return res.status(500).json({
                    status: "error",
                    response: error
                })
            } else {
                oldPath = req.file.path;
                extension = path.extname(req.file.originalname);
                newPath = oldPath + extension;
                fs.rename(oldPath, newPath, err => {
                    const nameInDir = req.file.filename + extension;

                    User.findByIdAndUpdate({ _id: req.params.userId }, { photo: nameInDir }, (error, user) => {
                        return res.json({
                            status: "File uploaded",
                            response: user
                        });
                    })
                })


            }
        });
    },
    ouvrirCompte: (req, res) => {
        req.body.demandeOuverture = true;
        User.findOneAndUpdate({ _id: req.params.userId },
            req.body,
            { new: true },
            (err, user) => {
                res.json({
                    status: "success",
                    response: user
                })
            })

    },
    attachConvention: (req, res) => {
        upload = multer({ dest: "dist/attachments" }).single('convention')
        upload(req, res, function (error) {
            if (error || !req.file) {
                return res.status(500).json({
                    status: "error",
                    response: error
                })
            } else {
                oldPath = req.file.path;
                extension = path.extname(req.file.originalname);
                newPath = oldPath + extension;
                fs.rename(oldPath, newPath, err => {
                    const nameInDir = req.file.filename + extension;

                    User.findByIdAndUpdate({ _id: req.params.userId }, { convention: nameInDir }, (error, user) => {
                        return res.json({
                            status: "File uploaded",
                            response: user
                        });
                    })
                })


            }
        });
    },
    validerDoc: (req, res) => {
        if (((req.body.photoArevoir === false) && (req.body.cniArevoir === false) && (req.body.factureArevoir === false))) {
            req.body.etatDossier = true;
            req.body.demandeOuverture = false;
        }
        User.findOneAndUpdate({ _id: req.params.userId },
            req.body,
            { new: true },
            (err, user) => {
                res.json({
                    status: "success",
                    response: user
                })
            })

    }
}  