const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        ref: 'User',
        type: mongoose.Types.ObjectId
    },
    task: {
        ref: 'Task',
        type: mongoose.Types.ObjectId
    }
})

module.exports = mongoose.model('Comment', CommentSchema)