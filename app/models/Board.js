const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BoardSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    background: {
        type: String,
        required: true
    },
    owner: {
        ref: 'User',
        type: mongoose.Types.ObjectId
    },
    assigned_users: [{
        ref: 'User',
        type: mongoose.Types.ObjectId
    }]
})

module.exports = mongoose.model('Board', BoardSchema)