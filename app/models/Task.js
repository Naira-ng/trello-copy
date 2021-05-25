const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TaskSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: [ 'open', 'inProgress', 'inReview', 'resolved' ],
        default: 'open'
    },
    board: {
        ref: 'Board',
        type: mongoose.Types.ObjectId,
        required: true
    },
    owner: {
        ref: 'User',
        type: mongoose.Types.ObjectId
    },
    assigned: {
        ref: 'User',
        type: mongoose.Types.ObjectId
    },
    task_number: {
        type: String
    }
})

TaskSchema.pre('save', function (next) {
    let serie = 'TK-',
        start_number = '00001';
    if(!this.task_number) {
        return this.model('Task')
            .find({
                board: this.board
            })
            .sort({created: -1})
            .limit(1)
            .then(task => {
                if(!task.length) {
                    this.task_number = serie + start_number;
                } else {
                    let startNumberMinChars = task[0].task_number.length-3,
                        newNumber,
                        lastNumber;
                    lastNumber = parseInt(task[0].task_number.split(serie).pop());
                    newNumber = lastNumber + 1;
                    let newNumberLength = String(newNumber).length;
                    if(newNumberLength < start_number.length) {
                        let zeroQty = startNumberMinChars - newNumberLength;
                        newNumber = String(new Array(zeroQty + 1).join('0').slice((zeroQty) * -1) + newNumber);
                    }
                    this.task_number = serie + newNumber;
                }
                return next();
            })
            .catch(err => next(err));
    }
    return next();
});


module.exports = mongoose.model('Task', TaskSchema)