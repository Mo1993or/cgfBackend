const mongoose = require("mongoose");
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
const profilageSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    produit: { type: String, required: false },
});
module.exports.profilageModel = mongoose.model("Profilage", profilageSchema);