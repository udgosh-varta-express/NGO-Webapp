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
    // console.log("the success part" + userSchema);
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
        console.log(error);
    }
}

userSchema.pre("save", async function(next) {
    // console.log('pre called and password is '+this.password);
    if(this.isModified("password"))
    {
        console.log(`the current password is ${this.password}`);
        this.password = await bcrypt.hash(this.password, 10)
        // console.log(`the current password after hasing ${this.password}`);
    }

    next();
})

const Register = new mongoose.model("User",userSchema)

module.exports = Register;