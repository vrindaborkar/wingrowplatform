const mongoose = require("mongoose");

const bookedStallSchema = new mongoose.Schema({
  booking_id: { 
    type: String, 
    required: true,
    unique: true 
  },
  market_name: { 
    type: String, 
    required: true 
  },
  status: { 
    type: String, 
    required: true,
    enum: ['pending', 'confirmed', 'cancelled', 'completed']
  },
  date: { 
    type: Date, 
    required: true 
  },
  time: { 
    type: String, 
    required: true 
  },
  total_amount: { 
    type: Number, 
    required: true 
  },
  
  // Payment Information
  payment_status: { 
    type: String,
    required: true,
    enum: ['pending', 'completed', 'failed', 'refunded']
  },
  payment_method: { 
    type: String 
  },
  payment_date: { 
    type: Date 
  },
  payment_id: { 
    type: String 
  },
  payment_amount: { 
    type: Number 
  },
  payment_type: { 
    type: String 
  },

  // Market Information
  market_location: { 
    type: String, 
    required: true 
  },
  market_image: { 
    type: String 
  },
  market_description: { 
    type: String 
  },
  market_address: { 
    type: String, 
    required: true 
  },
  market_city: { 
    type: String, 
    required: true 
  },
  market_state: { 
    type: String, 
    required: true 
  },
  market_zip: { 
    type: String, 
    required: true 
  },

  // User Information
  bookedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Stalls Information
  stalls: [{
    stall_id: { 
      type: String, 
      required: true 
    },
    stall_name: { 
      type: String, 
      required: true 
    },
    stall_title: { 
      type: String 
    },
    stall_purchased_amount: { 
      type: Number, 
      required: true 
    },
    stall_sale_amount: { 
      type: Number, 
      required: true 
    },
    stall_total_amount: { 
      type: Number, 
      required: true 
    }
  }],

  // Summary Information
  summary: {
    total_amount: { 
      type: Number, 
      required: true 
    },
    total_stalls: { 
      type: Number, 
      required: true 
    },
    total_items: { 
      type: Number, 
      required: true 
    }
  }
}, {
  timestamps: true,
  bufferCommands: true,
  autoCreate: false
});

const BookedStalls = mongoose.model("BookedStalls", bookedStallSchema);
module.exports = BookedStalls;
