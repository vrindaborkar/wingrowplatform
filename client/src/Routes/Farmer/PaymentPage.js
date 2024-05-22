import React from 'react'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom";
import { useEffect } from 'react';
import { useState } from 'react';
import Grid from "@mui/material/Grid";
import { Divider } from "@mui/material";
import FarmerService from "../../services/farmer.service";
import AuthService from "../../services/auth.service";
import ConfirmModal from "../../components/ConfirmModal";
import axios from "axios";
import authHeader from "../../services/auth.headers";
import "../../styles/Test.css";
import useWindowDimensions from '../../components/useWindowDimensions';

const userCurr = AuthService.getCurrentUser();

const PaymentPage = ({  setbookingDetails ,bookingDetails,t }) => {


  //console.log(date)
    const { Id } = useParams();
    const [selected, setSelected] = useState([]);
    const [cashOnDelivery, setCashOnDelivery] = useState(false);
    const navigate = useNavigate();
  //  console.log("date is ::::",date)
    const [Loading, setLoading] = useState();
    const [open, setOpen] = useState();
    const[status,setStatus] = useState(false)
    const [data, setdata] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const [otp, setOtp] = useState('');
    const [error, setError] = useState(null);
    const [alreadyBooked, setAlreadyBooked] = useState();
  const [alreadyBookedLocataion, setAlreadyBookedLocation] = useState(0);
    const [success, setSuccess] = useState(false);
    //console.log(Id+" "+selected+ " " + date + " "+ today);
    const {state} = useLocation();
    const bookedStalls = state.bookStall
    const date = state.d
    console.log("the state is",state)
    //console.log(state.hello)
   // const [bookedStalls,setBookedStalls]= useState([])
    // if(bookStall){
    //     setSelected(bookStall)
    //     setBookedStalls(bookStall)
    // }
    
    const handleOpen = () => setOpen(true);

    const { REACT_APP_API_URL } = process.env;


  // useEffect(() => {
  //   const script = document.createElement("script");
  //   script.src = "https://checkout.razorpay.com/v1/checkout.js";
  //   script.async = true;
  //   document.body.appendChild(script);
  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

  const confirmBookingCash = async (e) => {
    console.log(userCurr+"User")
    const price = bookedStalls.reduce(
      (total, item) => item.stallPrice + total,
      0
    );
    //console.log(bookedStalls.length);
    //console.log("price", price)
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
      bookedAt: date,
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
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          navigate("/home/temp/ticket");
        }, 1000);
      })
      .catch((error) => {
        toast.warn("Failed to book stalls!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
       // setBookedStalls([]);
       // setNumberOfSeats(0);
      });

  }

const confirmBooking = async (e) => {
    //console.log("hello")
    if(bookedStalls.length!==0){
    if (cashOnDelivery) {
      confirmBookingCash();
    }
    else {
      const price = bookedStalls.reduce(
        (total, item) => item.stallPrice + total,
        0
      );

      //console.log(bookedStalls.length);
      //console.log("price", price)
      if (bookedStalls.length === 0) {
        toast.warn("Failed to book stalls!", {
          position: "top-right",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,    //   theme: "light",
        });
        return;
      }
      try {
        const data = {
          purpose: "Stall Booking Charge", // REQUIRED
          amount: price, // REQUIRED and must be > ₹3 (3 INR)
          currency: "INR",
          buyer_name: userCurr.name,
          email: userCurr.email,
          phone: userCurr.phone,
          send_email: false,
          send_sms: false,
          allow_repeated_payments: false,
          webhook: "",
          redirect_url: `http://localhost:3000/farmers/stallplaces/stalls/Hadapsar`,
        };
        const orderUrl = REACT_APP_API_URL+"pay";
        await axios.post(
          orderUrl,
          data, {headers:authHeader()})
        .then((res)=>{
            console.log(res.data);
            initPayment(res.data);
            window.location.href = res.data;
        })
        .catch ((error)=> console.log(error.response.data)); 
        //console.log(error);
      } catch (error) {
        //console.log(error);
      }
    }
  }
    else {
      // console.log('in')
      toast.warn("Please select stalls!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
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

          var orderId;
          if (!cashOnDelivery) {
            const verifyUrl = REACT_APP_API_URL+"verify";
            const { data } = await axios.post(verifyUrl, response, {
              headers: authHeader(),
            });
            orderId = data.orderId;
          } else {
            orderId = "123"
          }

          //console.log(date)
          const responseData = {
            location: Id,
            bookedStalls: bookedStalls,
            bookedBy: userCurr.id,
            bookedAt: date,
            isBooked: true,
          };

          const stallsBooked = [];
          bookedStalls.forEach((e) => {
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
                  address: bookedStalls[0].address
                });
              }
              toast.success("stalls booked successfully!", {
                position: "top-center",
                autoClose: 1000,
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
            //  setBookedStalls([]);
              setNumberOfSeats(0);
            });
        } catch (error) {
          //console.log(error);
        //  setBookedStalls([]);
          setNumberOfSeats(0);
        }
      },
      theme: {
        color: "#3399cc",       
      },
    };
  };



    useEffect(() => {
        setLoading(true);

        FarmerService.getMyStallsTemp().then((response) => {
            setLoading(false);
            setdata(response.data);
        });
        if (date !== 0) {
            FarmerService.getBookedStallsTemp().then((response) => {
                const res = response.data && response.data.filter((e) => e.location === `${Id}` && e.bookedAt === date);
                setAlreadyBooked(response.data);
                setAlreadyBookedLocation(res.length);
                // console.log('alreadyBooked:', res)
            });

            handleOpen(true);
        }
    }, [date, Id]);
    console.log(bookedStalls)
  const [mobile, setmobile] = useState(false)

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width < 850) {
      setmobile(true)
    } else {
      setmobile(false)
    }
  }, [width])
    

  return (
    <div>
    
    <div className='backbtnflex'>
                    <Link style={{ marginTop: '10px' }} className="backbtn green flex" to="/home/temp/" >
                        Back
                    </Link>

                    
                </div>
      <Grid  container spacing={2} >
              <Grid item xs={12} sm={12} style={{justifyContent: 'center', display:'grid'}}>
          <div className="stallDetails" style={{ padding: "1rem", backgroundColor: "#f2f2f2" }}>
            <h3 style={{ marginBottom: "1rem" }}>Stall Details</h3>
            {bookedStalls.length > 0 && (
              <div style={{ marginBottom: "1rem" }}>
                <p>
                  <strong>Location:</strong> {bookedStalls[0].location}
                  <br />
                  <strong>Address:</strong> {bookedStalls[0].address}
                </p>
              </div>
            )}
            {bookedStalls.map((stall, index) => (
              <div key={index} style={{ marginBottom: "1rem" }}>
                <p>
                  <strong>Stall Name:</strong> {stall.stallName} <br />
                  <strong>Stall Price:</strong> {stall.stallPrice}
                </p>
              </div>
            ))}
          </div>
          </Grid>

        </Grid>
      <Grid className="input-div-holder" container spacing={2} >
        <Grid item xs={12} sm={12} style={{ justifyContent: 'center', display: 'grid' }}>
          <div style={{ backgroundColor: "#f2f2f2", margin: '2rem', padding: "1rem"  }}>
            <Divider className="divider" style={{ margin: "1rem 0" }} />
            <div >
              <h2 style={{ marginBottom: "1rem", padding: '1rem' }}>Price Details</h2>
              <p style={{ marginBottom: "0.5rem" }}><strong>Total stalls booked:</strong> {bookedStalls.length}</p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Total Amount:</strong> Rs.{" "}
                {bookedStalls.reduce((total, item) => item.stallPrice + total, 0)}/-
              </p>
            </div>
            <div className="modalbtn" style={{ marginTop: "2rem" }}>
              <ConfirmModal t={t} status={status} setCashOnDelivery={setCashOnDelivery} confirmBooking={confirmBooking} selected={bookedStalls} />
            </div>
          </div>
        </Grid>

      </Grid>
      
          {/* <div  style={{ backgroundColor: "#f2f2f2", margin:'2rem' }}>
            <Divider className="divider" style={{ margin: "1rem 0" }} />
            <div >
                          <h2 style={{ marginBottom: "1rem",padding:'1rem' }}>Price Details</h2>
              <p style={{ marginBottom: "0.5rem" }}>Total stalls booked: {bookedStalls.length}</p>
              <p style={{ marginBottom: "0.5rem" }}>
                <strong>Total Amount:</strong> Rs.{" "}
                {bookedStalls.reduce((total, item) => item.stallPrice + total, 0)}/-
              </p>
            </div>
            <div className="modalbtn" style={{ marginTop: "2rem" }}>
              <ConfirmModal setCashOnDelivery={setCashOnDelivery} confirmBooking={confirmBooking} selected={bookedStalls} />
            </div>
          </div> */}

          <div className="pageBottom" ></div>
      {/* {mobile?<NavMenu
       />:console.log("desktop")} */}
         
    </div>
  )
}

export default PaymentPage