import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique:true
    },

    fullname: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      select:false

    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePicture:{
      type:String,
      default:null
    }
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateJwtToken = async function () {
  const token = await jwt.sign(
    {
      id: this._id,
    },
    process.env.SECRET_KEY,
    { expiresIn: process.env.EXPIRY }
  );
  return token;
};

export const User = mongoose.model("User", userSchema);
