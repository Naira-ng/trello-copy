const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const authRoutes = require('./routes/auth');
const taskRoutes = require('./routes/task');
const commentRoutes = require('./routes/comment');
const boardRoutes = require('./routes/board');
const userRoutes = require('./routes/user');
const keys = require('./config/keys')
const app = express();

mongoose.connect(keys.mongoURI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// app.use(express.static('client')); // myApp will be the same folder name.
// app.get('/', function (req, res,next) {
//     res.redirect('/');
// });


app.use(passport.initialize());
require('./app/middleware/passport')(passport);

app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')());

app.use('/api/auth', authRoutes);
app.use('/api/task', taskRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/board', boardRoutes);
app.use('/api/users', userRoutes);




module.exports = app;