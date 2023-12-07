const mongoose = require("mongoose");

const tokenSchema = new mongoose.Schema({
    token: {
        type: String,
    }
});

const Token = new mongoose.model("Token", tokenSchema);

module.exports = Token;