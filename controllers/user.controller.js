const moment = require('moment');
const Inward = require("../models/Inward");
const Outward = require("../models/Outward");
const jwt_decode =  require("jwt-decode");
const User = require("../models/User");
const Subscribe = require("../models/Subscibe")
const LiveMarket =require("../models/LiveMarket")


exports.getInward = async (req, res) => {
    try {
      const { userId, name } = req.query;
  
      const inwardData = await Inward.find({ userId, name });
      if (!inwardData || inwardData.length === 0) {
        return res.status(404).json({ message: 'No inward data found' });
      }
  
      res.status(200).json({ data: inwardData });
    } catch (error) {
      console.error('Error retrieving inward data:', error);
      res.status(500).json({ message: 'Server error while retrieving inward data' });
    }
  };
  

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
    const inwarddata = await Inward.find({ date: formattedDate });
    res.send(inwarddata)
}
exports.getOutwardData = async(req,res,next) => {
    const formattedDate = moment(date, "DD/MM/YYYY").toDate();
    const outwarddata = await Outward.find({ date: formattedDate });
    res.send(outwarddata)
}


// Controller to get farmer's inward and outward data
exports.getInwardOutwardData = async (req, res) => {
  try {
    const { userId, name, date } = req.query; // Get query parameters from URL

    if (!userId || !name || !date) {
      return res.status(400).json({ message: "Missing userId, market name, or date" });
    }

    // Fetch inward data for the specified user, market, and date
    const inwardData = await Inward.find({ userId, name, date });
    
    // Fetch outward data for the specified user, market, and date
    const outwardData = await Outward.find({ userId, name, date });

    // Response: combine inward and outward data
    res.status(200).json({
      message: "Data fetched successfully",
      data: {
        inward: inwardData,
        outward: outwardData,
      },
    });
  } catch (error) {
    console.error("Error fetching inward/outward data:", error);
    res.status(500).json({ message: "Server error while fetching data" });
  }
};

exports.getOutward = async (req, res) => {
    try {
      const { userId, name } = req.query;
  
      const outwardData = await Outward.find({ userId, name });
      if (!outwardData || outwardData.length === 0) {
        return res.status(404).json({ message: 'No outward data found' });
      }
  
      res.status(200).json({ data: outwardData });
    } catch (error) {
      console.error('Error retrieving outward data:', error);
      res.status(500).json({ message: 'Server error while retrieving outward data' });
    }
  };

  exports.postInward = async (req, res, next) => {
    try {
      let userId = req.body.userId; // Allow flexibility for manual testing without a token
      if (!userId && req.headers["x-access-token"]) {
        const token = req.headers["x-access-token"];
        const decoded = jwt_decode(token);
        userId = decoded.id;
      }
  
      // Prepare the data to save
      const data = {
        name: req.body.name,
        commodities: req.body.commodities, // Allow handling multiple commodities
        userId, // Reference the user
        // time: req.body.time,
        date: req.body.date
      };
  
      console.log("Inward Data to Save:", data);
  
      // Save the data in the database
      const postdata = new Inward(data);
      const savedData = await postdata.save();
  
      if (!savedData) {
        return res.status(400).json({ message: "An unknown error occurred" });
      }
  
      res.status(200).json({ message: "Data added successfully", data: savedData });
    } catch (error) {
      console.error("Error in postInward API:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
  };

// exports.postInward = async (req, res) => {
//     try {
//         let userId = req.body.userId || null; // Allow userId from request body for testing
        
//         const { name, commodities, date } = req.body;

//         if (!name || !commodities || !date) {
//             return res.status(400).json({ message: 'Name, commodities, and date are required' });
//         }

//         const inwardEntry = new Inward({ name, commodities, userId, date });
//         const savedData = await inwardEntry.save();

//         res.status(200).json({ message: 'Inward data added successfully', data: savedData });
//     } catch (error) {
//         console.error('Error in postInward:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

// exports.postOutward = async (req, res) => {
//     try {
//         let userId = req.body.userId || null; // Allow userId from request body for testing

//         const { name, commodities, date } = req.body;

//         if (!name || !commodities || !date) {
//             return res.status(400).json({ message: 'Name, commodities, and date are required' });
//         }

//         const outwardEntry = new Outward({ name, commodities, userId, date });
//         const savedData = await outwardEntry.save();

//         res.status(200).json({ message: 'Outward data added successfully', data: savedData });
//     } catch (error) {
//         console.error('Error in postOutward:', error);
//         res.status(500).json({ message: 'Internal Server Error' });
//     }
// };

  exports.postOutward = async(req,res,next) => {
    // const formattedDate = moment(date, "DD/MM/YYYY").toDate();
    let token = req.headers["x-access-token"];
    const { id } = jwt_decode(token)
    const data = {
        name:req.body.name,
        commodity:req.body.commodity,
        // sales_quantity:req.body.sales_quantity,
        sales_rate:req.body.sales_rate,
        total_sales:req.body.total_sales,
        userId:id,
        // time:req.body.time,
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

// // const jwt_decode = require("jwt-decode");
// // const Inward = require("../models/Inward");

exports.getInward = async (req, res) => {
    try {
      const { userId, name, date } = req.query; // Added 'date' for additional filtering if needed
  
      // Create a query object dynamically to filter only provided fields
      const query = {};
      if (userId) query.userId = userId;
      if (name) query.name = name;
      if (date) {
        // Parse date to match the stored format (ISO Date or YYYY-MM-DD)
        query.date = new Date(date);
      }
  
      const inwardData = await Inward.find(query);
  
      // Handle case when no data is found
      if (!inwardData || inwardData.length === 0) {
        return res.status(404).json({ message: 'No inward data found' });
      }
  
      // Respond with the retrieved data
      res.status(200).json({ data: inwardData });
    } catch (error) {
      console.error('Error retrieving inward data:', error);
      res.status(500).json({ message: 'Server error while retrieving inward data', error: error.message });
    }
  };
  
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
            
        name:req.body.name,
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


