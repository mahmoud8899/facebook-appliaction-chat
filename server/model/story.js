const mongoose = require('mongoose')


const StorySchema  = mongoose.Schema({

    user: { type: mongoose.Schema.Types.ObjectId, ref: 'user' },
    storyImage : {
        type : Array,
        required : true
    },

},{
    timestamps: true
})



module.exports = mongoose.model('story', StorySchema)