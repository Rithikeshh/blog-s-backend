const {Schema, model} = require('mongoose');

const CommentSchema = new Schema({

    user:{
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    content: String,
    like: Number,
    blog: {
        type: Schema.Types.ObjectId,
        ref : "Blog"
    }
})

const Comment = model('comments', CommentSchema)
module.exports = Comment