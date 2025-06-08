const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    id: {
      type: String,
      unique: true,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true
    },
    phone: {
      type: String,
      required: true,
      maxlength: 13,
      minlength: 10
    },
    firstname: {
      type: String,
      required: true,
      trim: true
    },
    lastname: {
      type: String,
      required: true,
      trim: true
    },
    role: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    profile_picture: {
      type: String,
      default: null
    },
    initial_information_set: {
      type: Boolean,
      default: false
    },
    email_verified: {
      type: Boolean,
      default: false
    },
    phone_verified: {
      type: Boolean,
      default: false
    },
    farmertype:{
      type:String,
    
    
    },
    pic:String,
    tags:[{
      id:String,
      text:String
    }],
    
  },{
    timestamps: { 
      createdAt: 'created_at',
      updatedAt: 'last_updated_at'
    },
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = User;