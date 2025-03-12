const mongoose = require("mongoose");

const User = mongoose.model(
  "User",
  new mongoose.Schema({
    firstname:{
      type:String,
    
    
    },
    lastname:{
      type:String,
    
    
  
    },
    role:{
      type:String,
  
    
    },
    phone:{
      type:String,
      maxlength:13,
      minlength:10,
      
   
    
    },

    farmertype:{
      type:String,
    
    
    },
    pic:String,
    address:{
      type:String,
    
    
    },
    tags:[{
      id:String,
      text:String
    }],
    
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = User;