const mongoose = require('mongoose')

const commentUser = mongoose.Schema({

    name: { type: String, required: true },
    comment: { type: String, required: true },
    image: { type: String },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    image_user: { type: String },
}, {
    timestamps: true
})


const PostSchema = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    discription: { type: String, required: true },
    image: { type: String },
    commentus: [commentUser],
    maxComment: {
        type: Number,
        required: true,
        default: 0
    },
    likes: {
        type: Array
    },
    maxLike: {
        type: Number,
        required: true,
        default: 0
    },
    video : { type: String },



}, {
    timestamps: true
})







module.exports = mongoose.model('post', PostSchema)