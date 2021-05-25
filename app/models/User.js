const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username:   { type: String, required: true },
    email:      { type: String, required: true },
    password:   { type: String, required: true },
    created:    { type: Date },
    updated:    { type: Date}
});

UserSchema.path('email').validate({
    isAsync: true,
    validator: function validator(value, respond) {
        return this.model('User').findOne({
            email: this.email,
        }).then(function (user) {
            if (user) {
                return respond(false);
            }
            return respond(true);
        });
    },
    message: 'This email already exists!'
});

UserSchema.pre('save', function(next) {
    this.updated = this.updated ? new Date() : this.created;
    return next();
})

module.exports = mongoose.model('User', UserSchema);