const mongoose = require('mongoose');

const showSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    app: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true
})


module.exports = mongoose.model("Show", showSchema);
