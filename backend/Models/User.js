const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{type:String , required:true},
    email:{type:String , required:true , unique:true},
    password:{type:String , required:true},
    phone:{type:String , required:true},
    role: {type: String,enum: ['user' , 'product_manager' , 'admin'] ,default: 'user'},
    createdAt: { type: String }, // formatted string
    updatedAt: { type: String }
})

const User = mongoose.model('User', UserSchema)

module.exports = User;


