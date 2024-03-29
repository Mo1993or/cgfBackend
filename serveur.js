
const express = require("express"),
    app = express(),
    bodyParser = require("body-parser");
mongoose = require("mongoose");
require("dotenv").config();
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);
app.use(bodyParser.json());
// Create link to Angular build directory
var distDir = __dirname + "/dist/";
app.use(express.static(distDir));
/**
 * CONNECTION A LA BASE MONGO
 */
mongoose.connection.openUri(
    process.env.MONGO_URL,
    { useNewUrlParser: true },
    err => {
        if (err) {
            console.log(`MongoDB connection error: ${err}`);
            process.exit(1);
        }
        initApp();
    }
);
//app.get("/mor", function (req, res) {
//   res.send("Hello Mor");
//});
initApp();
//LOAD ROUTES
function initApp() {
    app.use(function (req, res, next) {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader(
            "Access-Control-Allow-Methods",
            "GET, POST, OPTIONS, PUT, PATCH, DELETE"
        );
        res.setHeader(
            "Access-Control-Allow-Headers",
            "token, Content-Type, X-Requested-With"
        );
        res.setHeader("Access-Control-Allow-Credentials", true);
        if (req.method == "OPTIONS") return res.sendStatus(200);
        next();
    });

    /********** RETOURE UNE ERREUR 404 SI AUCUNE ROUTE NE
     * CORRESPOND A LA DEMANDE
     */
    app.use('/user', require("./modules/user/user.route").routeUser);
    app.use('/compte', require("./modules/compte/compte.route").routeCompte);
    app.use('/profilage', require("./modules/profilage/profilage.route").routeProfilage);

    app.use(function (req, res) {
        res.status(404).send("OUPS PAGE INTROUVABLE");
    });

    var serveur = app.listen(process.env.PORT, function () {
        console.log("L'application tourne sur le port ", serveur.address().port);
    });
}