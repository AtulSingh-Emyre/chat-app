const mongoose = require('mongoose');
// const mongoosePaginate = require('mongoose-paginate');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('User', UserSchema);
