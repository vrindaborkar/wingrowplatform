var bcrypt = require("bcryptjs");
const User = require('../models/User')
var jwt = require("jsonwebtoken");
const config =require('../config/auth.config')
const jwt_decode =  require("jwt-decode");
const Feedback = require("../models/Feedback");
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: 'dpxzakezm', 
  api_key: '587784988219159', 
  api_secret: 'T571dxi6AZtczKJP0KYFVmLSQuc',
  secure: true
});



exports.signup = async(req , res , next)=>{
    
        const {  phone , password , firstname , lastname , type , farmertype , address , tags,joiningDate,employeeID,desigination} = req.body;
        console.log(phone);
        const userdata =await User.find({ "phone": phone , "role": type},
        );

       console.log(userdata[0]);
        if(userdata[0]){
          res.status(400).json({
            success: false,
            message: "Phone Number is already in use!",
            message2:"please enter a different role that is not already in use"
          
          });
        }
      else{
           const user_creat =await User.create({
firstName:firstname,
lastName:lastname,
phone:phone,
password:password,
role:type,
farmertype:farmertype,
address:address,
// tags:tags,

              // employeeID :employeeID,




           });

           if(user_creat){
             res.status(200).json({
               success:true,
               message:"user created successfully",
               data:user_creat
             })
           }
          }
}


// exports.signup = async(req , res , next)=>{
  
//       const {  phone , password , firstname , lastname , type , farmertype , address , tags,joiningDate,employeeID,desigination} = req.body;
//       let typeStr;
//       // console.log(req.body);


// const userdata =await User.find({ "phone": phone, "role": type },




//       // if(type === "farmer"){
//       //   typeStr = farmertype
//       // }else{
//       //   typeStr = "none"
//       // }
//       // let a ,b,c
//       // if(type !== "employee"){
//       //    a= "";
//       //    b ="";
//       //    c="";
//       // }else{
//       //   a = joiningDate
//       //   b= employeeID
//       //   c =desigination
//       // }

//   // var pass=  await bcrypt.hashSync(password, 8)
//         //  user = new User({
//         //   firstname,
//         //   lastname,
//         //   phone,
//         //   password:password,
//         //   role:type,
//         //   farmertype:typeStr,
//         //   pic:undefined,
//         //   address,
//         //   tags,
//         //   joiningDate:" ",
//         //   employeeID :b,
//         //   desigination:c,
//         // })
      
//         //  data = await user.save()
//         // console.log(data);
      
//         // if(!data){
//         //   res.status(400).send("registration failed")
//         // }
  
//         res.status(200).send(data)
//   }
  
exports.checkPhone =async(req,res) =>{
  await User.findOne({
    phone: req.body.phone
  })
    .exec((err, user) => {
     
      if (user.role===req.body.role) {
        console.log("user found",user);
        return res.status(404).send({ message: "Found" });
      }
      else{
        console.log("user not found ");
        return res.status(200).send({message:"NFound"})
      }
    })
}
// exports.signin =async (req, res) => {
//   console.log("hello inside signin")
//    await User.findOne({
//       phone: req.body.phone,
//       role:req.body.role
//     })
//       .exec((err, user) => {
//         if (err) {
//           res.status(500).send({ message: err });
//           console.log(err)
//           return;
//         }
  
//         if (!user) {
//           console.log("no user found")
//           return res.status(404).send({ message: "User Not found." });
//         }
  
//         // var passwordIsValid = bcrypt.compareSync(
//         //   req.body.password,
//         //   user.password
//         // );
  
//         // if (!passwordIsValid) {
//         //   return res.status(401).send({
//         //     accessToken: null,
//         //     message: "Invalid Password!"
//         //   });
//         // }
  
//         var token = jwt.sign({ id: user.id }, config.secret, {
//           expiresIn: 86400 // 24 hours
//         });
  
//         res.status(200).send({
//           id: user._id,
//           firstname: user.firstname,
//           lastname:user.lastname,
//           phone: user.phone,
//           role: user.role,
//           accessToken: token,
//           farmertype:user.farmertype,
//           pic:user.pic,
//           address:user.address,
//           joiningDate : user.joiningDate,
//           employeeID :user.employeeID,
//           desigination:user.desigination,
//         });
//       });
//   };

exports.signin =async (req, res) => {
  console.log(req.body)
  const user = await  User.findOne({
    phone: req.body.phone,
    role:req.body.role
  });

  if (user) {
    
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      status: 'success',
      message : 'Your are logged in',
      id: user._id,
      firstname: user.firstname,
      lastname:user.lastname,
      phone: user.phone,
      role: user.role,
      accessToken: token,
      farmertype:user.farmertype,
      pic:user.pic,
      address:user.address,
      joiningDate : user.joiningDate,
      employeeID :user.employeeID,
      desigination:user.desigination,
      
    });
  }else{
    return res.status(404).send({ 
      status: 'failed',
      message: "User Not found." });
  }

};


exports.adminSignUp =async (req, res) => {
  const {  phone , password , firstname , lastname , type , farmertype , address , tags,joiningDate,employeeID,desigination} = req.body;
  console.log(phone);
  const userdata =await User.find({ "phone": phone , "role": role},
  );

 console.log(userdata[0]);
  if(userdata[0]){
    res.status(400).json({
      success: false,
      message: "Phone Number is already in use!",
      message2:"please enter a different role that is not already in use"
    
    });
  }
else{
     const user_creat =await User.create({
firstName:firstname,
lastName:lastname,
phone:phone,
password:password,
role:type,
employeeID :employeeID,


     });

     if(user_creat){
       res.status(200).json({
         success:true,
         message:"user created successfully",
         data:user_creat
       })
     }
    }
};

exports.adminSignin =async (req, res) => {
  const user = await  User.findOne({
    phone: req.body.phone,
    role:req.body.role
  });

  if (user) {
    
    var token = jwt.sign({ id: user.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });
    res.status(200).send({
      status: 'success',
      message : 'Your are logged in',
      id: user._id,
      firstname: user.firstname,
      lastname:user.lastname,
      phone: user.phone,
      role: user.role,
      accessToken: token,
      farmertype:user.farmertype,
      pic:user.pic,
      address:user.address,
      joiningDate : user.joiningDate,
      employeeID :user.employeeID,
      desigination:user.desigination,
      
    });
  }else{
    return res.status(404).send({ 
      status: 'failed',
      message: "User Not found." });
  }

};
  exports.postPic = async(req,res) => {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)
    const file = req.files.photo
    const data = await cloudinary.uploader.upload(file.tempFilePath);
    console.log(data);
    if(data){
      const response = await User.findByIdAndUpdate({_id : id} , {pic : data.secure_url})

      if(!response){
        console.log("helloooo")
        res.status(400).json("something went wrong")
        
      }

      res.status(200).send(response)
    }
    else{
      console.log("hello")
      res.status(400).json("something went wrong")
      
    }
  }


  exports.addAddress = async(req,res) => {
    const {address} = req.body
    console.log('the address is ',address)
    //console.log(address)
    try {
      let token = req.headers["x-access-token"];
      const { id } = jwt_decode(token)

      if (!address) {
        res.json({
          success: false,
          message: "Please provide valid address"
        });
      } else {

        const data = await User.findByIdAndUpdate({_id : id} , {address : address})
        if(data){
          res.status(200).json(data)
        }
        else{
          res.status(400).json("something went wrong")
        }
      }
    } catch (error) {
      console.error(error);
    res.status(500).send("Server Error");
    }
  }


exports.feedback=async(req,res)=>{
  const {  message , stars} = req.body;
  const feedback = new Feedback({    
    message,
    stars,
  })
  const data = await feedback.save()
  res.status(200).send(feedback);
}

exports.newpassword = async(req,res) => {
  const {phone , password} = req.body
  const user = await User.findOne({
      phone: phone,
  });  

  user.password =password,
  await user.save();
  res.status(200).send(user);

}