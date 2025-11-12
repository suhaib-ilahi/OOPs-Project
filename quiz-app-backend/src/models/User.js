import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email: {
    type: String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  myQuiz: {
    type:mongoose.Schema.Types.ObjectId,
    ref:"Quiz",
    default:null
  }
})

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      username: this.username,
      email: this.email,
      fullname: this.fullname,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};

userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};


export const User = mongoose.model("User",userSchema)