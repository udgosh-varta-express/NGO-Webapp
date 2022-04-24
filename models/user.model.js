const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const createHttpError = require('http-errors');
const { roles } = require('../utils/constants');

//UserSchema Structure 
const UserSchema = new mongoose.Schema({
  firstname:{
    type:String,
    required:true,
  },
  lastname:{
    type:String,
    required:true,
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: [roles.admin, roles.moderator, roles.client],
    default: roles.client,
  },
});

//This method will be called before save() method
//Here We are hashing the password and converting name to "Hemant" this format
UserSchema.pre('save', async function (next) {
  try {
    if (this.isNew) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
      if (this.email === process.env.ADMIN_EMAIL.toLowerCase()) {
        this.role = roles.admin;
      }
      this.firstname = userNameConvert(this.firstname)
      this.lastname = userNameConvert(this.lastname)
    }
    next();
  } catch (error) {
    next(error);
  }
});

//This method is used to check, is password valid or not
UserSchema.methods.isValidPassword = async function (password) {
  try {
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw createHttpError.InternalServerError(error.message);
  }
};

//Function for changing name into this "Hemant" format
const userNameConvert=(reqName)=>{
  let name = reqName.toLowerCase()
   let username = name.charAt(0).toUpperCase()+name.slice(1)
return username
}

const User = mongoose.model('user', UserSchema);
module.exports = User;
