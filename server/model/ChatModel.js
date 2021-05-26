const mongoose = require('mongoose')

const ChatSchema = mongoose.Schema({

    users : {
        type: Array
        
    },

    lastMessag : {
        type: String
    },
    messag : [
        {
            sender: {type: String},
            text : {type: String},
            date : {type: Date},
        }
    ],
},{
    timestamps: true
})


module.exports = mongoose.model('chat', ChatSchema)