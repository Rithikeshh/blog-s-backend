const {Schema, model} = require("mongoose")

const UserSchema = new Schema({
    username : {
        require : true,
        type : String,
        minLength : [4, 'username must be at least 4 characters'],
        unique: true
    },
    email : {
        require : true,
        type : String,
        unique:true
    },
    password : {
        require : true,
        type : String,
        minLength : [6, 'password must be at least 6 characters'],
    },
    blogs: {
        type : [
            {
                type : Schema.Types.ObjectId,
                ref : "Blog"
            }
        ]
    }
})

const User = model("users", UserSchema);
module.exports = User;