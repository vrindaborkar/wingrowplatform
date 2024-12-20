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


// const jwt_decode = require("jwt-decode");

// exports.getInward = async (req, res) => {
//     try {
//         // Verify token from headers
//         const token = req.headers["x-access-token"];
//         if (!token) {
//             return res.status(403).json({ message: "No token provided" });
//         }

//         // Decode the token to get userId
//         const decoded = jwt_decode(token);
//         const userIdFromToken = decoded.id;

//         // Get query parameters
//         const { name } = req.query;

//         // Ensure all required fields are present
//         if (!name) {
//             return res.status(400).json({ message: "Market name is required" });
//         }

//         // Query the database with userId from token and name
//         const inwardData = await Inward.find({ userId: userIdFromToken, name });

//         if (!inwardData || inwardData.length === 0) {
//             return res.status(404).json({ message: "No inward data found" });
//         }

//         res.status(200).json({ data: inwardData });
//     } catch (error) {
//         console.error("Error retrieving inward data:", error);
//         res.status(500).json({ message: "Server error while retrieving inward data", error: error.message });
//     }
// };



  // const Inward = require('../models/Inward'); // Ensure the model is imported

  exports.getInwardFiltered = async (req, res) => {
    try {
        const { name, date, userId } = req.query;

        // Validate inputs
        if (!name || !date || !userId) {
            return res.status(400).json({ message: "Market name, date, and userId are required" });
        }

        // Convert the input date to ISO format without time
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        // Query the database
        const inwardData = await Inward.find({
            name,
            userId,
            date: { $gte: startOfDay, $lt: endOfDay },
        });

        if (!inwardData || inwardData.length === 0) {
            return res.status(404).json({ message: "No inward data found for the specified market, date, and userId" });
        }

        res.status(200).json({ data: inwardData });
    } catch (error) {
        console.error("Error retrieving filtered inward data:", error);
        res.status(500).json({ message: "Server error while retrieving inward data", error: error.message });
    }
};



  exports.getOutwardFiltered = async (req, res) => {
    try {
        const { name, date, userId } = req.query;

        // Ensure all filters are provided
        if (!name || !date || !userId) {
            return res.status(400).json({ message: "Market name, date, and userId are required" });
        }

        // Convert the input date to ISO format without time
        const startOfDay = new Date(date);
        startOfDay.setUTCHours(0, 0, 0, 0);

        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);

        // Fetch data from the database
        const outwardData = await Outward.find({
            name,
            userId,
            date: { $gte: startOfDay, $lte: endOfDay },
        });

        // Check if data exists
        if (!outwardData || outwardData.length === 0) {
            return res.status(404).json({ message: "No outward data found for the specified market, date, and userId" });
        }

        // Respond with the filtered data
        res.status(200).json({ data: outwardData });
    } catch (error) {
        console.error("Error retrieving outward data:", error);
        res.status(500).json({ message: "Server error while retrieving outward data", error: error.message });
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
      // For testing: Use userId directly from the request body
    const userId = req.body.userId;
    // Preprocess the date to remove time
    const rawDate = req.body.date; // e.g., "20-12-2024"
    const [day, month, year] = rawDate.split("-");
    const formattedDate = new Date(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD
  
      // Prepare the data to save
      const data = {
        name: req.body.name,
        commodity: req.body.commodity,
        purchase_quantity: req.body.purchase_quantity,
        purchase_rate: req.body.purchase_rate,
        total_purchase: req.body.total_purchase,
        userId, // Reference the user
        date: formattedDate, // Only the date part is stored
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




exports.postOutward = async (req, res, next) => {
  try {
      // Ensure the date is in the correct format (YYYY-MM-DD)
      const rawDate = req.body.date; // e.g., "20-12-2024"
    const [day, month, year] = rawDate.split("-");
    const formattedDate = new Date(`${year}-${month}-${day}`); // Convert to YYYY-MM-DD
          if (isNaN(formattedDate)) {
          return res.status(400).json({ message: "Invalid date format. Please use 'YYYY-MM-DD'." });
      }

      // Construct the data from the request body
      const data = {
          name: req.body.name,
          commodity: req.body.commodity,
          sales_rate: req.body.sales_rate,
          total_sales: req.body.total_sales,
          userId: req.body.userId, // Accept userId directly from the body
          date: formattedDate // Store the formatted date
      };

      console.log("Outward Data:", data);

      // Save the data to the database
      const postdata = new Outward(data);
      const resp = await postdata.save();

      if (!resp) {
          return res.status(400).json({ message: "An unknown error occurred" });
      }

      res.status(200).json({ message: "Data added successfully", data: resp });
  } catch (error) {
      console.error("Error in postOutward:", error);
      res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
};

exports.getAllOutward = async (req, res) => {
  try {
      // Fetch all outward data
      const outwardData = await Outward.find();

      // Check if data exists
      if (!outwardData || outwardData.length === 0) {
          return res.status(404).json({ message: "No outward data found" });
      }

      // Return all outward data
      res.status(200).json({ data: outwardData });
  } catch (error) {
      console.error("Error retrieving outward data:", error);
      res.status(500).json({ message: "Server error while retrieving outward data", error: error.message });
  }
};


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

  exports.getInward = async (req, res) => {
    try {
      const { name, date } = req.query; // Added 'date' for additional filtering if needed
  
      // Create a query object dynamically to filter only provided fields
      const query = {};
      // if (userId) query.userId = userId;
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

exports.getInwardOutwardData = async (req, res) => {
  try {
      const { userId, name, date } = req.query;

      // Validate required fields
      if (!userId || !name || !date) {
          return res.status(400).json({ message: 'User ID, market name, and date are required' });
      }

      // Format the date to filter data
      const startOfDay = new Date(date);
      startOfDay.setUTCHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setUTCHours(23, 59, 59, 999);

      // Retrieve Inward data for the user at the specific market and date
      const inwardData = await Inward.find({
          userId,
          name,
          date: { $gte: startOfDay, $lte: endOfDay },
      });

      // Retrieve Outward data for the user at the specific market and date
      const outwardData = await Outward.find({
          userId,
          name,
          date: { $gte: startOfDay, $lte: endOfDay },
      });

      // Check if no data is found
      if ((!inwardData || inwardData.length === 0) && (!outwardData || outwardData.length === 0)) {
          return res.status(404).json({ message: 'No inward or outward data found for the specified market and date' });
      }

      // Return the combined data
      res.status(200).json({
          market: name,
          date: date,
          inward: inwardData,
          outward: outwardData,
      });
  } catch (error) {
      console.error('Error retrieving inward and outward data:', error);
      res.status(500).json({ message: 'Server error', error: error.message });
  }
};


