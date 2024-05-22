import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdvanceBookings from "./AdvanceBookings";
import FarmersHome from "./FarmersHome";
import FarmersMain from "./FarmersMain";
import InwardData from "./InwardData";
import MyBookings from "./MyBookings";
import OutwardData from "./OutwardData";
import StallsPlaces from "./StallsPlaces";
import Test from "./Test";
import Ticket from "./Ticket";

import FarmerNavigation from "./FarmerNavigation";
import Subscription from "./Subscription";
import TestTemp from "./TestTemp";
const Farmer = ({t}) => {
  const [bookingDetails, setbookingDetails] = useState({
    farmer: "",
    phone: "",
    paymentDetails: "",
    BookedStalls: null,
    stallsBooked: null,
    totalAmount: null,
  });

  return (
    <Routes>
      <Route path="/" element={<FarmersMain 
      />}>
        <Route index element={<FarmerNavigation
        t={t}
        />} />
        <Route
          path="stallplaces/stalls/:Id"
          element={<Test setbookingDetails={setbookingDetails}
            t={t}
          />}
        />
        <Route path="/farmershome" element={<FarmersHome
          t={t}
         />} />
        <Route path="/inward" element={<InwardData 
          t={t}
        />} />
        <Route 
        path="/stallplaces" 
        element={<StallsPlaces 
          t={t}
        />} 
        />
        <Route
          path="/advancebookings"
          element={<AdvanceBookings setbookingDetails={setbookingDetails}
          />}
        />
        <Route path="/outward" element={<OutwardData 
          t={t}
        />} />
        <Route
          path="/ticket"
          element={<Ticket bookingDetails={bookingDetails } 
            t={t}
          />}
        />
        <Route path="/mybookings" element={<MyBookings 
          t={t}
        />} />
        <Route path ="/subscription" element ={ <Subscription
          t={t} />} />

        


      </Route>
    </Routes>
  );
};

export default Farmer;
