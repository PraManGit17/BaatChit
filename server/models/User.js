import mongoose from "mongoose";


const userschema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, unique: true, required: true},
  mobile: {type: String, unique: true, required: true},
  password: {type: String, required: true},
  resetToken: { type: String },
  resetTokenExpire: { type: Date }
},
  {
    timestamps: true
  }
);


export default mongoose.model("User", userschema);