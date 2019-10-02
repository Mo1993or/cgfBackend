const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const compteSchema = new mongoose.Schema({
    depot: { type: Number, default: 0, required: false },
    retrait: { type: Number, default: 0, required: false },
    numCompte: { type: String, required: false },
    etatCompte: { type: Boolean, default: false, required: false },
    compteCreated: {
        type: Date,
        default: Date.now
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    solde: { type: Number, default: 0, required: false },
    services: { type: String, required: false },
    dateVersements: {
        type: Date,
        require: false
    }


});
module.exports.compteModel = mongoose.model("Compte", compteSchema);