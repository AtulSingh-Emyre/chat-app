const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate');

const MessageSchema = mongoose.Schema({
    content: {
        type: String,
        required: true,
        min: 6,
        max: 255
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
});

// MessageSchema.plugin(mongoosePaginate);

module.exports = mongoose.model('Message', MessageSchema);
