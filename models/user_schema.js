const bcrypt = require("bcryptjs")
const res = require("express/lib/response")
const jwt = require('jsonwebtoken')
const mongoose = require("mongoose")
const dotenv = require('dotenv');

const userSchema = new mongoose.Schema({
    firstname: {
        type:String,
        required:true
    },
    lastname: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})


//Generating Tokens
userSchema.methods.generateAuthToken = async function ()
{
    try {
        const token = jwt.sign({_id:this.id.toString()},process.env.SECRET_KEY)
        this.tokens = this.tokens.concat({token:token})
        await this.save();
        return token;
    } catch (error) {
        res.send("the error part"+error)
    }
}


//Hashing password before saving data
userSchema.pre("save", async function(next) {
    if(this.isModified("password"))
    {
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10)
    }

    next();
})

const Register = new mongoose.model("User",userSchema)

module.exports = Register;