const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const userSchema = new mongoose.Schema({
    login: { type: String, unique: true },
    password: { type: String, required: true },
    genre: { type: String, required: false },
    prenom: { type: String, required: false },
    nom: { type: String, required: false },
    situationPro: { type: String, require: false },
    dateNaissance: { type: Date, required: false },
    lieuNaissance: { type: String, required: false },
    nationalite: { type: String, required: false },
    pays: { type: String, required: false },
    ville: { type: String, required: false },
    region: { type: String, required: false },
    adresse: { type: String, required: false },
    telephone: { type: String, required: false },
    photo: { type: String, required: false },
    cni: { type: String, required: false },
    facture: { type: String, required: false },
    convention: { type: String, required: false },
    demandeOuverture: { type: Boolean, required: false },
    compteCreate: { type: Boolean, required: false },
    etatDossier: { type: Boolean, required: false },
    photoArevoir: { type: Boolean, required: false },
    factureArevoir: { type: Boolean, required: false },
    cniArevoir: { type: Boolean, required: false },
    commentaire: { type: String, required: false },
    etatConvention: { type: Boolean, required: false },
    admin: { type: Boolean, required: false }

});
module.exports.userModel = mongoose.model("User", userSchema);