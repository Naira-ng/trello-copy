const errorHandler = require('../../utils/errorHandler');
const Board = require('../models/Board');


module.exports.getAll = async (req, res, next) => {
    const boards = await Board.find({
            $or: [{ owner: req.user._id}, {assigned: req.user._id}]
        });
    res.status(200).json({
        boards: boards
    })
}

module.exports.getById = (req, res, next) => {

}

module.exports.create = (req, res, next) => {
    const board = new Board({
        title: req.body.title,
        owner: req.user._id,
        background: req.body.background
    });
    return board.save()
        .then(data => {
            res.status(201).json(data)
        })
        .catch(err => {
            errorHandler(res, err);
        })
}

module.exports.update = async (req, res, next) => {
    await Board.findOne({_id: req.params.id})
        .then(board => {
            board.assigned_users = req.body.assigned_users;
            return board.save();
        })
        .then(board => {
            res.status(200).json({
                board: board
            })
        })
        .catch(err => errorHandler(res, err));
}

module.exports.remove = (req, res, next) => {
}