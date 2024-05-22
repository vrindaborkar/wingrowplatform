const mongoose = require("mongoose");

const Employee = mongoose.model(
  "Employee",
  new mongoose.Schema({
    userId: String,
    employeeID :String,
    firstname:String,
    lastname:String,
    role:String,
    
    tags:[{
      id:String,
      text:String
    }],
    tags1:[{
      id: String,
      text :String
    }],
    date:String,
    rating:String
    
  },{
    bufferCommands: true,
    autoCreate: false 
  })
);

module.exports = Employee;