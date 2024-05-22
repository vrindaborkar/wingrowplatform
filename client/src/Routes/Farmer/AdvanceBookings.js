import React, { useState, useEffect } from "react";
// import Datepicker from "../../components/Datepicker";
import "../../styles/AdvanceBookings.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Stall from "./Stall";
import authHeader from "../../services/auth.headers";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ConfirmModal from "../../components/ConfirmModal";
import FarmerService from "../../services/farmer.service";
import dayjs from "dayjs";
import { ToastContainer, toast } from "react-toastify";
import { TextField, Typography } from "@mui/material";
import "react-toastify/dist/ReactToastify.css";
// import SelectSeatModal from "../../components/SelectSeatModal";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { Button} from "@mui/material";
// import Spinner from '../../components/Spinner';
const userCurr = AuthService.getCurrentUser();
var today = new Date();
// var tomorrow = today.add(1).day();
console.log(today.getDate() + 1)
const replacement = today.getDate() + 1;
const todayFormatted = today.toISOString().slice(0, 10);
const locations = [
  { location: "karvenagar_location" },
  { location: "Kondhwa BK"},
  { location: "hadapsar_location"},
  { location: "Undri"},   
  { location: "kharadi_iT_park_location"},
  { location: "bramhasun_city_location"},
  { location: "wagholi_location"},
  { location: "Bhavadi Road"},
  { location: "magarpatta_location"},
  { location: "amanora_city_location"},
  { location: "Green City"},

];

const AdvanceBookings = ({ setbookingDetails, setValue }) => {
  const [location, setlocation] = useState("");
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

  const [data, setdata] = useState();
  const [UpdatedData, setUpdatedData] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [bookedStalls, setBookedStalls] = useState([]);
  const [value, setvalue] = useState(dayjs(Date.now()).format("YYYY-MM-DD"));
  const [alreadyBooked, setAlreadyBooked] = useState();
  const [open, setOpen] = useState();
  const [date, setdate] = useState(0);
  const [totalStall, setTotalStalls] = useState(0);
  const [available, setAvailable] = useState(0);
  const [Loading, setLoading] = useState();
  const [alreadyBookedLocataion, setAlreadyBookedLocation] = useState(0);
  const { Id } = useParams();
  const currentDate = 0
  const lengthofUpdatedData = UpdatedData?.length;
  const [cashOnDelivery, setCashOnDelivery] = useState(false);

  //function to input number of stalls
  const handleChange = (e) => {
    if (e.target.value <= -1) {
      setNumberOfSeats(0);
      setvalue(0);
    }
    else if (e.target.value <= available) {
      setNumberOfSeats(e.target.value);
      setvalue(e.target.value);
    } else {
      setNumberOfSeats(available);
      setvalue(available);
    }
  };


  useEffect(() => {
    setLoading(true);
    FarmerService.getMyStalls().then((response) => {
      setLoading(false);
      setdata(response.data);
    });

    FarmerService.getBookedStalls().then((response) => {
      console.log(date)
      const res = response.data && response.data.filter((e) => e.location === `${Id}` && e.bookedAt === date);
      setAlreadyBooked(response.data);
      setAlreadyBookedLocation(res.length);

      console.log("already booked", alreadyBooked);

    });
    handleOpen(true);
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  const confirmBookingCash = async (e) => {
    const price = bookedStalls.reduce(
      (total, item) => item.stallPrice + total,
      0
    );
    console.log(bookedStalls.length);
    console.log("price", price)
    if (bookedStalls.length === 0) {
      toast.warn("Failed to book stalls!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    let bookedStats = bookedStalls.toString();
    const responseData = {
      location: Id,
      bookedStalls: bookedStalls,
      bookedBy: userCurr.id,
      bookedAt: dayjs(Date.now()).format("YYYY-MM-DD"),
      isBooked: true,
    };

    const stallsBooked = [];
    bookedStalls.forEach((e) => {
      stallsBooked.push(e.stallName);
    });

    // const price = bookedStalls.reduce(
    //   (total, item) => item.stallPrice + total,
    //   0
    // );
    const Url = REACT_APP_API_URL+"bookedstalls";
    const orderId = "123"
    axios
      .post(Url, responseData, { headers: authHeader() })
      .then((response) => {
        const { data } = response;
        if (data) {
          setbookingDetails({
            farmer: userCurr.firstname + " " + userCurr.lastname,
            phone: userCurr.phone,
            paymentDetails: orderId,
            BookedStalls: stallsBooked,
            stallsBooked: bookedStalls.length,
            totalAmount: price,
            address: bookedStalls[0].address
          });
        }
        toast.success("stalls booked successfully!", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("../ticket");
        }, 1000);
      })
      .catch((error) => {
        toast.warn("Failed to book stalls!", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setBookedStalls([]);
        setNumberOfSeats(0);
      });

  }

  useEffect(() => {
    const res = data && data.filter((e) => e.location === `${location}`);
    console.log(res)
    setUpdatedData(res);
  }, [location, data, value]);


  useEffect(() => {
    if (UpdatedData) {
      setTotalStalls(UpdatedData.length)
      console.log(totalStall)
      setAvailable(totalStall - alreadyBookedLocataion)
    }
  }, [UpdatedData, totalStall]);


  const handleOpen = () => setOpen(true);

  const confirmBooking = async (e) => {
    if (cashOnDelivery) {
      confirmBookingCash();
    }
    else{
    const price = bookedStalls.reduce(
      (total, item) => item.stallPrice + total,
      0
    );

    if (bookedStalls.length === 0) {
      toast.warn("Failed to book stalls!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      return;
    }
    try {
      // const orderUrl = "https://wingrowagritech.herokuapp.com/order";
      const orderUrl = REACT_APP_API_URL+"order";
      const { data } = await axios.post(
        orderUrl,
        { amount: price * 100 },
        { headers: authHeader() }
      );
      initPayment(data.data);
    } catch (error) {
      console.log(error);
    }
  }
  };

  const initPayment = (data) => {
    let bookedStats = bookedStalls.toString();
    const options = {
      key: process.env.KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      bookedStalls: bookedStats,
      description: "Wingrow Market",

      handler: async (response) => {

        try {
          const verifyUrl = REACT_APP_API_URL+"verify";
          const { data } = await axios.post(verifyUrl, response, {
            headers: authHeader(),
          });
          const orderId = data.orderId;
          console.log('tot')
          const responseData = {
            location: location,
            bookedStalls: bookedStalls,
            bookedBy: userCurr.id,
            bookedAt: dayjs(value).format("YYYY-MM-DD"),
            isBooked: true,
          };
          const stallsBooked = [];
          bookedStalls.forEach((e) => {
            console.log(e.stallName)
            stallsBooked.push(e.stallName);
          });

          const price = bookedStalls.reduce(
            (total, item) => item.stallPrice + total,
            0
          );
          const Url = REACT_APP_API_URL+"bookedstalls";

          axios
            .post(Url, responseData, { headers: authHeader() })
            .then((response) => {
              const { data } = response;
              if (data) {
                setbookingDetails({
                  farmer: userCurr.firstname + " " + userCurr.lastname,
                  phone: userCurr.phone,
                  paymentDetails: orderId,
                  BookedStalls: stallsBooked,
                  stallsBooked: bookedStalls.length,
                  totalAmount: price,
                });
              }
              toast.success("stalls booked successfully!", {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setTimeout(() => {
                navigate("../ticket");
              }, 1000);
            })
            .catch((error) => {
              toast.warn("Failed to book stalls!", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setBookedStalls([]);
              setNumberOfSeats(0);
            });
        } catch (error) {
          console.log(error);
          setBookedStalls([]);
          setNumberOfSeats(0);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };


  //function to input date from user 
  const handlechange1 = (event) => {
    if (dayjs(event.target.value).format("YYYY-MM-DD") <= todayFormatted) {
      toast.warn("Please select a date after today\'s date", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      setdate(todayFormatted.replace(/.{0,2}$/, '') + replacement);
    }
    else {
      setdate(dayjs(event.target.value).format("YYYY-MM-DD"));

    }
  };

  const handleClick = (ev) => {


    console.log("already ", alreadyBooked)

    console.log("booked ", bookedStalls);
    console.log("number of seats ", numberOfSeats);
    console.log(ev.target)
    if (numberOfSeats && ev.target.className !== "booked") {
      const seatsToBook = parseInt(numberOfSeats, 20);
      if (bookedStalls.length <= seatsToBook) {

        if (bookedStalls.includes(ev.target.id)) {

          //if already selected then remove it
          const newAvailable = bookedStalls.filter(
            (seat) => seat !== ev.target.id
          );
          setBookedStalls(newAvailable);
          setAvailable(available + 1);
        } else if (bookedStalls.length < numberOfSeats) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          console.log("here booked");
          setAvailable(available - 1);
          //console.log(userCurr)
          setBookedStalls([...bookedStalls, item[0]]);
        } else if (bookedStalls.length === seatsToBook) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          bookedStalls.shift();
          setBookedStalls([...bookedStalls, item[0]]);
        }
      }
    }
    //console.log(bookedStalls.map(function(v,i){return v.stallPrice}));

  };

  const alertStyles = {
    backgroundColor: '#f2dede',
    border: '1px solid #ebccd1',
    color: '#a94442',
    padding: '15px',
    textAlign: 'center',
    marginBottom: '15px'
  };


  return (

    <div className="Test">

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Link to="../" className="advancebookinglinkback">
        Go Back to stalls!
      </Link>
      <div className="main_container_stalls">
        <Grid className="input-div-holder" container spacing={2}>
          <Grid item xs={12} sm={6}>
            <InputLabel className="stall-booking-lable">
              Enter Booking Date
            </InputLabel>
            <TextField
              inputlabelprops={{
                style: { fontSize: 14, fontFamily: "monospace" },
              }}
              name="booking-date"
              required
              fullWidth
              type="date"
              id="booking-date"
              autoFocus
              value={date}
              onChange={handlechange1}
              color="success"
              className="textfield"
            />
            {console.log(date)}
          </Grid>
          <Grid className="select-market-grid" item xs={12} sm={6}>
            <FormControl className="formcontrol" sx={{ width: "100%", fontSize: 14 }}>
              <InputLabel color="success" className="stall-booking-lable">
                Market
              </InputLabel>
              <Select
                className="textfield"
                id="demo-simple-select-autowidth"
                value={location}
                color="success"
                onChange={(e) => {
                  setlocation(e.target.value);
                }}
                label="address"
                name="address"
                required
              >
                {locations.map((e, i) => {
                  return (
                    <MenuItem key={i} value={e.location}>
                      {e.location}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6}>
            <InputLabel className="stall-booking-lable">
              Enter Number of Stalls
            </InputLabel>
            <TextField
              inputlabelprops={{
                style: { fontSize: 14, fontFamily: "monospace" },
              }}
              name="number-of-stalls-req"
              required
              placeholder="00"
              fullWidth
              type="number"
              id="number-of-stalls-req"
              autoFocus
              color="success"
              className="textfield"
              value={value}
              onChange={handleChange}
            />
          </Grid>
        </Grid>


        <div className="secondary_container_stalls">
          {UpdatedData && location !== "" ? (
            <Grid className="stalls-count-cantainer">

              <div className="stall_wrapper">

                <div className="StallsContainer">
                  <Grid>
                    <div className="stalls-count-div">
                      <Typography className="count">Total Stalls :{totalStall}</Typography>
                      <Typography className="count">
                        Available Stalls :{available}
                      </Typography>
                    </div>
                  </Grid>
                  {lengthofUpdatedData === 34 && (
                    <div className="StallsContainer">
                      {console.log(bookedStalls)}
                      <Stall
                        data={UpdatedData.slice(0, 16)}
                        handleClick={handleClick}
                        bookedStalls={bookedStalls}
                        alreadyBooked={alreadyBooked}
                        date={date}
                      />
                      <Stall
                        data={UpdatedData.slice(16, 17)}
                        handleClick={handleClick}
                        bookedStalls={bookedStalls}
                        alreadyBooked={alreadyBooked}
                        date={date}
                      />
                      <Stall
                        data={UpdatedData.slice(17, 18)}
                        handleClick={handleClick}
                        bookedStalls={bookedStalls}
                        alreadyBooked={alreadyBooked}
                        date={date}
                      />
                      <Stall
                        data={UpdatedData.slice(18, 34)}
                        handleClick={handleClick}
                        bookedStalls={bookedStalls}
                        alreadyBooked={alreadyBooked}
                        date={date}
                      />
                    </div>
                  )}
                  {lengthofUpdatedData === 50 && (
                    <div className="StallsContainer">
                      <Stall
                        data={UpdatedData.slice(0, 24)}
                        handleClick={handleClick}
                        bookedStalls={bookedStalls}
                        alreadyBooked={alreadyBooked}
                        date={date}
                      />
                      <Stall
                        data={UpdatedData.slice(24, 25)}
                        handleClick={handleClick}
                        bookedStalls={bookedStalls}
                        alreadyBooked={alreadyBooked}
                        date={date}
                      />
                      <Stall
                        data={UpdatedData.slice(25, 26)}
                        handleClick={handleClick}
                        bookedStalls={bookedStalls}
                        alreadyBooked={alreadyBooked}
                        date={date}
                      />
                      <Stall
                        data={UpdatedData.slice(26, 50)}
                        handleClick={handleClick}
                        bookedStalls={bookedStalls}
                        alreadyBooked={alreadyBooked}
                        date={date}
                      />
                    </div>
                  )}
                </div>
              </div>
            </Grid>
          ) : (
            <div className="select_market">
              <h2>Please select the market</h2>
            </div>
          )}
          <Grid className="stall-pricing-grid">
            <div className="stall-pricing-main-div">
              <div className="price-holder">
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#AACE48",
                  }}
                  className="stall-color"
                />
                <div className="stall-price">100/-</div>
              </div>
              <div className="price-holder">
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#3AA54B",
                  }}
                  className="stall-color"
                />
                <div className="stall-price">300/-</div>
              </div>
              <div className="price-holder">
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#A42A56",
                  }}
                  className="stall-color"
                />
                <div className="stall-price">500/-</div>
              </div>
              <div className="price-holder">
                <Box
                  sx={{
                    width: 20,
                    height: 20,
                    backgroundColor: "#B3B3B3",
                  }}
                  className="stall-color"
                />
                <div className="stall-price">Booked</div>
              </div>
            </div>
            <Divider className="divider" />
            <div className="stall-total-amount-holder">
              <div className="total-amount">Total Amount</div>
              <div className="total-amount">Rs.{bookedStalls.reduce(
                (total, item) => item.stallPrice + total,
                0
              )}/-</div>
            </div>
          </Grid>
          {numberOfSeats !== 0 && bookedStalls.length !== 0 ? (
            <div className="modalbtn">
              <ConfirmModal setCashOnDelivery={setCashOnDelivery} confirmBooking={confirmBooking} />
            </div>
          ) : (
            <Grid container alignItems="center" justifyContent="center">
              <Grid item xs={6}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    style={{ width: "110px", height: "40px", paddingLeft: '5rem', paddingRight: '5rem', margin: '1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    PAY
                  </Button>
                  <Button style={{ width: "110px", height: "40px", paddingLeft: '5rem', paddingRight: '5rem', margin: '1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    PAY IN MARKET
                  </Button>
                </div>
              </Grid>
            </Grid>
          )}

        </div>
      </div>
    </div>
  );
};

export default AdvanceBookings;
