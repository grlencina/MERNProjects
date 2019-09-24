const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const gauchadaSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3,
        maxlength: 35
    },
    description: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        maxlength: 90
    },
    creationDate: { type: Date, required: true },
    expirationDate: { type: Date, required: true },
    owner: { type: String, required: true },
    resolver: { type: String, required: true }
}, {
        timestamps: true,
    });

const Gauchada = mongoose.model('Gauchada', gauchadaSchema);

module.exports = Gauchada;