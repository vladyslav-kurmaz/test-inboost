const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    id: {
        type: String,
    },
    name: {
        type: String,
    },
    surname: {
        type: String,
    },
    mail: {
        type: String,
    },
    notes: {
        type: Array,
        default: [],
    },
    pass: {
        type: String,
    },
});

module.exports = mongoose.model("User", UserSchema);