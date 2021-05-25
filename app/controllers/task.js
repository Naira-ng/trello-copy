const Task = require('../models/Task');
const errorHandler = require('../../utils/errorHandler');


module.exports.getAll = async (req, res, next) => {
    let tasks = await Task.find({
        board: req.query.boardId
    }).populate({
            path: 'board',
            match: {
                $or: [ {
                    owner: req.user._id,
                    assigned: req.user._id
                }]
            }
        })
    res.status(200).json({
        tasks: tasks
    })
}

module.exports.getById = (req, res, next) => {
}

module.exports.create = (req, res, next) => {
    const task = new Task({
        title: req.body.title,
        description: req.body.title,
        owner: req.user._id,
        assigned: req.body.assigned || req.user._id,
        status: req.body.status || 'open',
        board: req.body.board
    });
    return task.save()
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            errorHandler(res, err);
        })
}

module.exports.update = async (req, res, next) => {
    await Task.findOne({_id: req.params.id})
        .then(task => {
            task.status = req.body.task.status;
            task.title = req.body.task.title;
            task.description = req.body.task.description;
            task.assigned = req.body.task.assigned;
            return task.save();
        })
        .then(task => {
            res.status(200).json({
                task: task
            })
        })
        .catch(err => errorHandler(res, err));
}

module.exports.remove = (req, res, next) => {
    Task.findById(req.params.id).remove().exec();
    res.status(200).json({
        message: 'Task successfuly deleted'
    })
}