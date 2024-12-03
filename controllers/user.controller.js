const moment = require('moment');
const Inward = require("../models/Inward");
const Outward = require("../models/Outward");
const jwt_decode =  require("jwt-decode");
const User = require("../models/User");
const Subscribe = require("../models/Subscibe")
const LiveMarket =require("../models/LiveMarket")
// const Employee=require("../models/Employee")
// const Leave =  require("../models/Leave")







exports.getInward = async(req,res,next) => {
    const formattedDate = moment(date, "DD/MM/YYYY").toDate();
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)


    const inwarddata = await Inward.find({"userId" : id});
    res.send(inwarddata)
}

exports.getUser = async(req, res) => {
    const data = await User.find();
    const filter = data.filter(e=>e.role === "farmer");
    res.status(200).json(filter)
  }

  exports.getAllUsers = async(req, res) => {
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)


    const userdata = await User.find({"_id" : id});
    res.send(userdata)
  }

  exports.getUsers = async(req , res) => {
    const data = await User.find();
    const filter = data.filter(e=>e.role === "customer");
    res.status(200).json(filter)
  }


    exports.getSub = async(req,res) =>{
        const id= req.body.userId
        console.log(id);
        const data = await Subscribe.find({"userId" : id});
        console.log(data)
        res.status(200).json(data);
    }
    exports.getSubscribedData = async(req,res) =>{
        console.log("inside subData")
        const data = await Subscribe.find();
        if(!data){
            console.log("No data")
            res.status(404)
            return ;
        }
        console.log(data)
        res.status(200).json(data);
    }
    exports.changestatus= async(req,res) =>{
        const id = req.body.id
        const status = req.body.s
        const response = await Subscribe.findByIdAndUpdate({_id : id} , {status:status})

        if(!response){
          console.log("helloooo")
          res.status(400).json("something went wrong")
          
        }
  
        res.status(200).send(response)
    }
    exports.changeStalls= async(req,res) =>{
        var id = req.body.subId

        var stall =Number( req.body.s)
        var firstF = Number(req.body.firstF)
        var secondF = Number(req.body.secondF)
        var thirdF = Number(req.body.thirdF)
        console.log("here, ",id,stall,firstF,secondF,thirdF)
        const response = await Subscribe.findByIdAndUpdate({_id : id} , {stalls:stall,first:firstF,second:secondF,third:thirdF})

        if(!response){
          console.log("helloooo")
          console.log("respons",response)
          res.status(404).json("something went wrong")
            return ;
        }
  
        res.status(200).send(response)
    }
    exports.postSub = async(req,res) =>{

        const data = {
            
            userId:req.body.userId,
            date:req.body.date,
            validity:req.body.validity,
            stalls:req.body.x,
            status:req.body.s,
            price : req.body.price,
            first :req.body.first,
            second :req.body.second,
            third :req.body.third,


        }
        console.log("success!!!!!")
        //res.send(data)
        
        const postdata = await new Subscribe(data);
        const resp = await postdata.save();
    
        if(!resp){
            res.status(400).json({message:"An unknown error occured"})
        }
    
        res.status(200).json({message:"Data added successfully"})
        
    }
    exports.deletecancelledStalls = async(req,res) =>{
        const id = req.body.id;
        console.log(id)
       // console.log(req.body)
        const deleted = await Subscribe.findByIdAndDelete(id);
            
        if(!deleted){
          console.log("not deleted")
          res.status(400).send("failed to delete")
        }else{
            console.log("delete")
            res.status(200).json(deleted)
        }
        

    }
    


exports.getInwardData = async(req,res,next) => {
    const formattedDate = moment(date, "DD/MM/YYYY").toDate();
    const inwarddata = await Inward.find();
    res.send(inwarddata)
}
exports.getOutwardData = async(req,res,next) => {
    const formattedDate = moment(date, "DD/MM/YYYY").toDate();
    const outwarddata = await Outward.find();
    res.send(outwarddata)
}

exports.getOutward = async(req,res,next) => {
    const formattedDate = moment(date, "DD/MM/YYYY").toDate();
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)

    const outwarddata = await Outward.find({"userId" : id});
    res.send(outwarddata)
}




exports.postOutward = async(req,res,next) => {
    const formattedDate = moment(date, "DD/MM/YYYY").toDate();
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)
    const data = {
        market:req.body.market,
        commodity:req.body.commodity,
        // sales_quantity:req.body.sales_quantity,
        sales_rate:req.body.sales_rate,
        total_sales:req.body.total_sales,
        userId:id,
        time:req.body.time,
        date:req.body.date
    }
console.log(data.total_sales)
    const postdata = await new Outward(data);
    const resp = await postdata.save();

    if(!resp){
        res.status(400).json({message:"An unknown error occured"})
    }

    res.status(200).json({message:"Data added successfully"})
}

exports.postInward = async(req,res,next) => {
    const formattedDate = moment(date, "DD/MM/YYYY").toDate();
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)
    
    const data = {
        market:req.body.market,
        commodity:req.body.commodity,
        purchase_quantity:req.body.purchase_quantity,
        purchase_rate:req.body.purchase_rate,
        total_purchase:req.body.total_purchase,
        userId:id,
        time:req.body.time,
        date:req.body.date
    }
console.log(data)
    const postdata = await new Inward(data);
    const resp = await postdata.save();

    if(!resp){
        res.status(400).json({message:"An unknown error occured"})
    }

    res.status(200).json({message:"Data added successfully"})
}

exports.getMarket = async(req,res) =>{
    const date = new Date().toISOString().split('T')[0];
    
    const data = await LiveMarket.find({"bookedAt" : String(date)});
    console.log("hello",data)
    res.send(data)
}

exports.getMarkets = async (req, res) => {
    try {
        const data = await LiveMarket.find({});
        console.log("hello", data);
        res.send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send("Error retrieving markets");
    }
};


    

exports.addMarket = async(req,res) =>{
    const data = {
            
        marketName:req.body.marketName,
        direction:req.body.direction,
        offers:req.body.tags,
        bookedAt:req.body.date
    }
    console.log("success!!!!!")
    //res.send(data)
    
    const postdata = await new LiveMarket(data);
    const resp = await postdata.save();

    if(!resp){
        res.status(400).json({message:"An unknown error occured"})
    }

    res.status(200).json({message:"Data added successfully"})

}


