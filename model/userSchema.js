const { Schema, model } = require("mongoose");

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        trim: true,
        minlength: 3
    },
    email: {
        type: String,
        unique: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    }
},{
    timestamps: true
})

const UserModel = model('User', userSchema)

module.exports = UserModel