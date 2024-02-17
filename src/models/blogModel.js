const {Schema, model} = require("mongoose");

const BlogSchema = new Schema({
    title : {
        required : true,
        type: String,
        minLenght : [3, 'title must be at least 4 characters']
    },
    description : {
        required : true,
        type: String,
        minLenght : [3, 'title must be at least 4 characters']
    },
    tags : {
        type: [String],
        required: true,
        default: ["General"]
    },
    images : {
        type: [String],
        default: [""]
    },
    user : {
        type : Schema.Types.ObjectId,
        ref : "User"
    },
    author : String,
    upVote: {
        type: Number,
        default: 0
    },
    downVote: {
        type: Number,
        default: 0
    },
    votedBy : {
        type: [
            {
                type : Schema.Types.ObjectId ,ref : "User"
            }
        ],
    },
    comments : {
        type: [
            {
                type : Schema.Types.ObjectId ,ref : "Comment"
            }
        ],
    }
})

const Blog = model('blogs', BlogSchema)
module.exports = Blog;