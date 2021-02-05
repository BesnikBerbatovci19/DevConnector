const mongoose = require('mongoose')

const Schema = mongoose.Schema;

// Create Schema

const PostSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    name:{
        type: String,
    },
    text:{
        type: String,
    },
    avatar: {
        type: String
        
    },

    likes:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            }
        }
    ],
    comments:[
        {
            user:{
                type: mongoose.Schema.Types.ObjectId,
                ref: 'users'
            },
            text:{
                type: String,
                required: true
            },
            avatar:{
                type: String
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    
    date:{
        type: Date,
        default: Date.now
    }

})

module.exports = Post = mongoose.model('poost', PostSchema)