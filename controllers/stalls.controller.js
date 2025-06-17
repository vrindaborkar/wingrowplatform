const BookedStalls = require("../models/BookedStalls");
const CancelledStalls = require("../models/CancelledStalls");
const Stalls = require("../models/Stalls");

// Get all stalls
exports.getStalls = async (req, res) => {
  try {
    const data = await Stalls.find();
    res.status(200).json({
      status: "success",
      message: "Stalls fetched successfully",
      data
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch stalls",
      error: error.message
    });
  }
};

// Get all booked stalls with detailed information
exports.getBookedStalls = async (req, res) => {
  try {
    const bookings = await BookedStalls.find()
      .sort({ date: -1 }); // Sort by date descending

    res.status(200).json({
      status: "success",
      message: "Booked stalls fetched successfully",
      data: bookings.map(booking => ({
        booking_id: booking.booking_id,
        market_name: booking.market_name,
        status: booking.status,
        date: booking.date,
        time: booking.time,
        total_amount: booking.total_amount,
        payment_status: booking.payment_status,
        payment_method: booking.payment_method,
        payment_date: booking.payment_date,
        payment_id: booking.payment_id,
        payment_amount: booking.payment_amount,
        payment_type: booking.payment_type,
        market_location: booking.market_location,
        market_image: booking.market_image,
        market_description: booking.market_description,
        market_address: booking.market_address,
        market_city: booking.market_city,
        market_state: booking.market_state,
        market_zip: booking.market_zip,
        stalls: booking.stalls,
        summary: booking.summary
      }))
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch booked stalls",
      error: error.message
    });
  }
};

// Get upcoming bookings (today + future) for a specific user
exports.getUpcomingBookings = async (req, res) => {
  try {
    const userId = req.userId;
    console.log('Looking for today and future bookings for userId:', userId);

    // Get today's date at start of day (00:00:00)
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    console.log('Today date:', today);

    // Function to convert any date format to a Date object
    const normalizeDate = (dateStr) => {
      if (!dateStr) return null;
      
      // If it's already a Date object
      if (dateStr instanceof Date) return dateStr;
      
      // Try parsing as ISO date first
      let date = new Date(dateStr);
      if (!isNaN(date.getTime())) return date;
      
      // Try DD/MM/YYYY format
      if (dateStr.includes('/')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          // Check if it's DD/MM/YYYY
          if (parts[0].length === 2) {
            date = new Date(parts[2], parts[1] - 1, parts[0]);
          } 
          // Check if it's YYYY/MM/DD
          else if (parts[0].length === 4) {
            date = new Date(parts[0], parts[1] - 1, parts[2]);
          }
          if (!isNaN(date.getTime())) return date;
        }
      }
      
      // Try YYYY-MM-DD format
      if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
          date = new Date(parts[0], parts[1] - 1, parts[2]);
          if (!isNaN(date.getTime())) return date;
        }
      }
      
      return null;
    };

    // Get all non-cancelled bookings for the specific user
    const allBookings = await BookedStalls.find({
      status: { $ne: 'cancelled' },
      bookedBy: userId  // Filter for the logged-in user's bookings
    }).lean().exec();

    console.log(`Found ${allBookings.length} non-cancelled bookings for user ${userId}`);
    console.log('Server today (00:00:00):', today.toISOString());

    // Filter and sort bookings with normalized dates
    const bookings = allBookings
      .map(booking => {
        const normalizedDate = normalizeDate(booking.date);
        console.log(`Booking ID: ${booking.booking_id}, Original Date: ${booking.date}, Normalized Date: ${normalizedDate ? normalizedDate.toISOString() : 'Invalid Date'}`);
        return {
          ...booking,
          normalizedDate
        };
      })
      .filter(booking => booking.normalizedDate && booking.normalizedDate >= today)
      .sort((a, b) => a.normalizedDate - b.normalizedDate)
      .map(booking => {
        const { normalizedDate, ...bookingData } = booking;
        return bookingData;
      });

    console.log(`Found ${bookings.length} upcoming bookings for user ${userId}`);

    res.status(200).json({
      status: "success",
      message: "Today and future bookings fetched successfully",
      debug: {
        userId: userId,
        totalUserBookings: allBookings.length,
        upcomingBookings: bookings.length,
        todayDate: today
      },
      data: bookings.map(booking => ({
        booking_id: booking.booking_id || "",
        market_name: booking.market_name || "",
        status: booking.status || "",
        date: booking.date || "",
        time: booking.time || "",
        total_amount: booking.total_amount || "",
        payment_status: booking.payment_status || "",
        payment_method: booking.payment_method || "",
        payment_date: booking.payment_date || "",
        payment_id: booking.payment_id || "",
        payment_amount: booking.payment_amount || "",
        payment_type: booking.payment_type || "",
        market_location: booking.market_location || "",
        market_image: booking.market_image || "",
        market_description: booking.market_description || "",
        market_address: booking.market_address || "",
        market_city: booking.market_city || "",
        market_state: booking.market_state || "",
        market_zip: booking.market_zip || "",
        stalls: (booking.stalls || []).map(stall => ({
          stall_id: stall.stall_id || "",
          stall_name: stall.stall_name || "",
          stall_title: stall.stall_title || "",
          stall_purchased_amount: stall.stall_purchased_amount || "",
          stall_sale_amount: stall.stall_sale_amount || "",
          stall_total_amount: stall.stall_total_amount || ""
        })),
        summary: {
          total_amount: booking.summary?.total_amount || "",
          total_stalls: booking.summary?.total_stalls || "",
          total_items: booking.summary?.total_items || ""
        }
      }))
    });
  } catch (error) {
    console.error('Error in getUpcomingBookings:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch today and future bookings",
      error: error.message
    });
  }
};

// Create new stall booking
exports.createBooking = async (req, res) => {
  try {
    const {
      market_name,
      date,
      time,
      stalls,
      market_location,
      market_address,
      market_city,
      market_state,
      market_zip,
      payment_method
    } = req.body;

    // Calculate totals
    const total_stalls = stalls.length;
    const total_amount = stalls.reduce((sum, stall) => sum + stall.stall_total_amount, 0);

    const newBooking = new BookedStalls({
      booking_id: `BK${Date.now()}`,
      market_name,
      status: 'pending',
      date: new Date(date), // Convert to Date object
      time,
      total_amount,
      payment_status: 'pending',
      payment_method,
      payment_date: new Date(),
      market_location,
      market_address,
      market_city,
      market_state,
      market_zip,
      stalls,
      bookedBy: req.userId, // Add bookedBy from token
      summary: {
        total_amount,
        total_stalls,
        total_items: total_stalls
      }
    });

    const savedBooking = await newBooking.save();

    res.status(201).json({
      status: "success",
      message: "Booking created successfully",
      data: savedBooking
    });
  } catch (error) {
    console.error('Error in createBooking:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to create booking",
      error: error.message
    });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  try {
    const { booking_id, status, payment_status } = req.body;

    const booking = await BookedStalls.findOne({ booking_id });
    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found"
      });
    }

    booking.status = status || booking.status;
    booking.payment_status = payment_status || booking.payment_status;
    
    const updatedBooking = await booking.save();

    res.status(200).json({
      status: "success",
      message: "Booking status updated successfully",
      data: updatedBooking
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to update booking status",
      error: error.message
    });
  }
};

// Delete booking
exports.deleteBooking = async (req, res) => {
  try {
    const { booking_id } = req.params;
    
    const deletedBooking = await BookedStalls.findOneAndDelete({ booking_id });
    
    if (!deletedBooking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Booking deleted successfully",
      data: deletedBooking
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to delete booking",
      error: error.message
    });
  }
};

// Get booking by ID
exports.getBookingById = async (req, res) => {
  try {
    const { booking_id } = req.params;
    
    const booking = await BookedStalls.findOne({ booking_id });
    
    if (!booking) {
      return res.status(404).json({
        status: "error",
        message: "Booking not found"
      });
    }

    res.status(200).json({
      status: "success",
      message: "Booking fetched successfully",
      data: booking
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to fetch booking",
      error: error.message
    });
  }
};

//changes************************//
exports.getStallsTemp = async (req, res) => {
  const data = await Stalls.find()
  res.send(data)
}
exports.getbookedStallsTemp = async (req, res) => {
  const data = await BookedStalls.find()
  console.log(data)
  res.send(data)
}

//end***************************//

  exports.getcancelledstalls = async(req,res)=>{
    const data = await CancelledStalls.find()
    res.send(data)
  }

exports.postStalls = async(req,res,next)=>{
      const data = await new Stalls(req.body);
      const resp = await data.save();
  
      if(!resp){
        res.status(400).json("failed to add")
      }

      res.status(200).json("added successfully")
  }

exports.deletebookedStalls = async(req,res) => {
  const {id} = req.body;
  console.log("deleted")
  const deleted = await BookedStalls.findByIdAndDelete(id);
  
  if(!deleted){
    res.status(400).send("failed to delete")
  }

  res.status(200).json(deleted)
}

exports.deletecancelledStalls = async(req,res) => {
  const {id} = req.body;
  const deleted = await CancelledStalls.findByIdAndDelete(id);
  
  if(!deleted){
    res.status(400).send("failed to delete")
  }

  res.status(200).json(deleted)
}



exports.postcancelledstalls = async(req,res)=>{
console.log("post canccelled stalls")
const {stallName, cancelledAt , bookedAt , bookedBy , isBooked ,stallNo,location,stallPrice,address,phone,firstname,lastname} = req.body;

const response = {
      bookedBy:bookedBy,
      firstname :firstname,
      lastname :lastname,
      phone :phone,
      location:location,
      address:address,
      stallName: stallName,
      stallPrice: stallPrice,
      bookedBy: bookedBy,
      bookedAt: bookedAt,
      cancelledAt:cancelledAt,
      stallNo:stallNo,
      isBooked:isBooked
}
console.log("response -- ",response);
const data = await new CancelledStalls(response);
const resp = data.save();
console.log("saved sucessfully")
if(!resp){
  res.status(400).json("success")
}
res.status(200).send(resp)
}
  
 exports.putStalls = async(req,res,next)=>{
  console.log("inside put stalls")
    const {data , user , time} = req.body;
  
    const updata = await Stalls.updateMany({_id : {$in:data}} , {isBooked:true , bookedBy:user , bookedAt:time})
  
    if(!updata){
      res.status(400).json("failed to add")
    }
   
    const response = await Stalls.find({_id : {$in:data}})
    res.status(200).json(response)
  }
  
  
  exports.resetStalls =  async(req,res,next)=>{
    const update = await Stalls.updateMany({} , {isBooked:false , bookedBy:"" , bookedAt:""})
  
    if(!update){
      res.status(400).json("failed")
    }
    res.status(200).json(update)
  }

// Get all bookings for a specific user (past, present, future)
exports.getUserBookings = async (req, res) => {
  try {
    const userId = req.userId;
    console.log('Getting all bookings for userId:', userId);

    // Get today's date boundaries
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0);
    
    const todayEnd = new Date();
    todayEnd.setHours(23, 59, 59, 999);

    // Function to convert any date format to a Date object
    const normalizeDate = (dateStr) => {
      if (!dateStr) return null;
      
      // If it's already a Date object
      if (dateStr instanceof Date) return dateStr;
      
      // Try parsing as ISO date first
      let date = new Date(dateStr);
      if (!isNaN(date.getTime())) return date;
      
      // Try DD/MM/YYYY format
      if (dateStr.includes('/')) {
        const parts = dateStr.split('/');
        if (parts.length === 3) {
          // Check if it's DD/MM/YYYY
          if (parts[0].length === 2) {
            date = new Date(parts[2], parts[1] - 1, parts[0]);
          } 
          // Check if it's YYYY/MM/DD
          else if (parts[0].length === 4) {
            date = new Date(parts[0], parts[1] - 1, parts[2]);
          }
          if (!isNaN(date.getTime())) return date;
        }
      }
      
      // Try YYYY-MM-DD format
      if (dateStr.includes('-')) {
        const parts = dateStr.split('-');
        if (parts.length === 3) {
          date = new Date(parts[0], parts[1] - 1, parts[2]);
          if (!isNaN(date.getTime())) return date;
        }
      }
      
      return null;
    };

    // Get all non-cancelled bookings for the user
    const allBookings = await BookedStalls.find({
      bookedBy: userId,
      status: { $ne: 'cancelled' }
    }).lean().exec();

    console.log(`Found ${allBookings.length} total bookings for user ${userId}`);

    // Process and categorize bookings
    const processedBookings = allBookings.map(booking => {
      const normalizedDate = normalizeDate(booking.date);
      return {
        ...booking,
        normalizedDate
      };
    }).filter(booking => booking.normalizedDate !== null);

    // Categorize bookings
    const pastBookings = processedBookings
      .filter(booking => booking.normalizedDate < todayStart)
      .sort((a, b) => b.normalizedDate - a.normalizedDate); // Most recent first

    const todayBookings = processedBookings
      .filter(booking => 
        booking.normalizedDate >= todayStart && 
        booking.normalizedDate <= todayEnd
      )
      .sort((a, b) => a.normalizedDate - b.normalizedDate); // Chronological order

    const futureBookings = processedBookings
      .filter(booking => booking.normalizedDate > todayEnd)
      .sort((a, b) => a.normalizedDate - b.normalizedDate); // Chronological order

    // Function to format booking data
    const formatBooking = (booking) => ({
      booking_id: booking.booking_id || "",
      market_name: booking.market_name || "",
      status: booking.status || "",
      date: booking.date || "",
      time: booking.time || "",
      total_amount: booking.total_amount || "",
      payment_status: booking.payment_status || "",
      payment_method: booking.payment_method || "",
      payment_date: booking.payment_date || "",
      payment_id: booking.payment_id || "",
      payment_amount: booking.payment_amount || "",
      payment_type: booking.payment_type || "",
      market_location: booking.market_location || "",
      market_image: booking.market_image || "",
      market_description: booking.market_description || "",
      market_address: booking.market_address || "",
      market_city: booking.market_city || "",
      market_state: booking.market_state || "",
      market_zip: booking.market_zip || "",
      stalls: (booking.stalls || []).map(stall => ({
        stall_id: stall.stall_id || "",
        stall_name: stall.stall_name || "",
        stall_title: stall.stall_title || "",
        stall_purchased_amount: stall.stall_purchased_amount || "",
        stall_sale_amount: stall.stall_sale_amount || "",
        stall_total_amount: stall.stall_total_amount || ""
      })),
      summary: {
        total_amount: booking.summary?.total_amount || "",
        total_stalls: booking.summary?.total_stalls || "",
        total_items: booking.summary?.total_items || ""
      }
    });

    res.status(200).json({
      status: "success",
      message: "User bookings fetched successfully",
      data: {
        past: pastBookings.map(formatBooking),
        today: todayBookings.map(formatBooking),
        future: futureBookings.map(formatBooking)
      },
      summary: {
        total_bookings: allBookings.length,
        past_bookings: pastBookings.length,
        today_bookings: todayBookings.length,
        future_bookings: futureBookings.length
      }
    });

  } catch (error) {
    console.error('Error in getUserBookings:', error);
    res.status(500).json({
      status: "error",
      message: "Failed to fetch user bookings",
      error: error.message
    });
  }
};