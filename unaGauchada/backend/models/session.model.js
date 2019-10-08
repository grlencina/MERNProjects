const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const sessionSchema = new Schema({
    user_id: {
        type:String,
        required:true,
        unique:false
    },
    activeSession: {
        type:Boolean,
        default: true
    },
    apertureTimeStamp: {
        type:Date,
        default: new Date()
    },
    closureTimeStamp: {
        type:Date,
        default: null
    }
}, {
    timestamps: true,
});

const Session = mongoose.model('Session', sessionSchema);

module.exports = Session;