const Comment = require('../models/Comment');
const errorHandler = require('../../utils/errorHandler');

module.exports.getAll = async (req, res, next) => {
    let comments = await Comment.find({
        task: req.query.taskId
    })
    res.status(200).json({
        comments: comments
    })
}

module.exports.getById = (req, res, next) => {

}

module.exports.create = (req, res, next) => {
    const comment = new Comment({
        content: req.body.comment,
        author: req.user._id,
        task: req.body.task
    });
    return comment.save()
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            errorHandler(res, err);
        })
}

module.exports.remove = (req, res, next) => {

}