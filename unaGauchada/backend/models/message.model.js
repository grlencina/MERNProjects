const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
    recipient_id: {
        type: String,
        required: true,
    },
    sender_id: {
        type: String,
        required: true,
    },
    gauchada_id: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
        trim: true,
        maxlength: 120
    },
    read: {
        type: Boolean,
        required: true,
        default: false
    }
}, {
        timestamps: true,
    });


const Message = mongoose.model('Message', messageSchema);

module.exports = Message;