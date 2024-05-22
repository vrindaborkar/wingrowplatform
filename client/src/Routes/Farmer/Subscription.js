import React, { useState, useEffect } from "react";
import UserService from '../../services/user.service'
import AuthService from '../../services/auth.service'
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import FarmerService from '../../services/farmer.service'
import '../../styles/subscription.css'

import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
//import Razorpay from 'razorpay';

import authHeader from "../../services/auth.headers";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ConfirmModal from "../../components/ConfirmModal";
import { CenterFocusStrong } from "@mui/icons-material";
import { secondsInDay } from "date-fns";
import dayjs from 'dayjs'
import NavMenu from "../../components/NavMenu";
import useWindowDimensions from "../../components/useWindowDimensions";
const Subscription = ({t}) => {
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const[valid,setValid] = useState(0)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const user = AuthService.getCurrentUser()
  const [sub, setSub] = useState([]);
  const [open, setOpen] = useState();
  const [price, setPrice] = useState(0);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [MyStalls, setMyStalls] = useState([]);
  const [status, setStatus] = useState()
  const [status1, setStatus1] = useState(false)
  const [date, setDate] = useState(new Date());
  const [validity, setValidity] = useState(
    0
  );
  const API_URL = "http://localhost:4000/";
  const [stalls, setStalls] = useState(0);
  const [validTill, setValidTill] = useState();
  const[age,setAge]= useState(0)
  const [remStalls, setRemStalls] = useState(0);
  const[first,setFirst] = useState(0)
  const[second,setSecond] = useState(0)
  const[third,setThird] = useState(0)
  
  function isJson(str) {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  }
  useEffect(() => {

    FarmerService.getBookedStalls().then(async (res) => {
      const { data } = res;
      console.log("the data is- ", data)
      //check for date of the booked stall date greater than equal to subscribed
      if(sub.length !== 0){
        const currentDate = new Date(sub[sub.length-1].date)
        //Date he subscribed
        console.log("hello---  ",sub[sub.length-1].date)
        //ignore
      // setMyStalls(data.filter(e=> { 
      
      // if(e.bookedBy === user.id && sub[sub.length-1].date <= e.bookedAt){return true} }))
      

      // console.log("the booked stalls are -- ", MyStalls)
      // console.log(sub)
      // var r = MyStalls.length
     // console.log(stalls,r)
      //stalls =  total stall remaning
      if(stalls <= 0){
        setRemStalls(0)
        //subscribe again
        const id = sub[sub.length-1]._id
        if(status == "active"){
          setStatus("expired")
          const s = "expired"
        await axios.put(API_URL+"changestatus",{id,s})
        .then((res)=>{
          window.location.reload(false);

          console.log("passed")

        })
        .catch((error)=>{
          console.log("failed")
        })
      }
        console.log("sub is-",sub[sub.length-1]._id)
        }else{
        setRemStalls(stalls)
      }
  }})
  }, [MyStalls, sub])
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  useEffect(()=>{
    setStalls(stalls)
  },[stalls])
  useEffect(() => {

    const userId = user.id
    console.log("inside sub useeffect")
    if (sub.length === 0 || isJson(sub[0])) {
      UserService.getSub(userId).then((res) => {
        const { data } = res
        console.log("all the subscriptions :", data)

        console.log("helllooooooo ", data)
        if (data.length !== 0) {
          if (data[data.length - 1].status == "active") {
            setSub(data)
            setStatus("active")
          } else {
            setStatus("expired")
          }
          const currentDate = new Date(data[data.length - 1].date)

          var year = currentDate.getFullYear();
          var month = Number(currentDate.getMonth()) ;
          var date = Number(currentDate.getDate());
          // if (month == 0 || month == 2 || month == 4 || month == 6 || month == 7 || month == 9 ||
          //   month == 11) {
          //   if (Number(date) + 7 > 31) {
          //     date = 1
          //     month = month + 1
          //   } else {
          //     date = date + 7

          //   }
          // }
          // else if (month == 1) {
          //   if (Number(date) + 7 > 28) {
          //     date = 1
          //     month = month + 1
          //   }
          //   else {
          //     date = date + 7
          //   }
          // } else {
          //   if (date + 7 > 30) {
          //     month = month + 1
          //     date = 1
          //   }
          //   else {
          //     date = date + 7
          //   }
          // }
          var currentDate1 = new Date(year,month,date + 90)
          
          //const validDate = String(year) + "-" + String(month) + "-" + String(date)
          const validDate = dayjs(currentDate1).format("YYYY-MM-DD")
          console.log(validDate)
          setValidTill(validDate)
          setFirst(data[data.length-1].first)
          setSecond(data[data.length-1].second)
          setThird(data[data.length-1].third)
          setStalls(data[data.length - 1].stalls)
        }
      })
    }
    handleOpen(true);
  }, [sub])
  const confirmBookingCash = async (e) => {
    const price = Number(first)*300 + Number(second)*500 + Number(third)*800
    console.log("Im here")
    setStatus("active")

    const userId = user.id;

    const orderId = "123"
    const s = "active"
    var x = Number (first) + Number(second) + Number(third)
    setStalls(x)
    await axios
      .post(API_URL + "sub", { date, userId, valid, x, s, price,first,second,third })
      .then((response) => {
        const { data } = response;
        if (data) {
          console.log("data--", data)

          navigate("/farmers/subscription");
        }
        toast.success("stalls booked successfully!", {
          position: "top-center",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          //navigate("/farmers/subscription");
          window.location.reload(false)

        }, 1000);
      })
      .catch((error) => {
        toast.warn("Failed to book stalls!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setSub([])
      });

  }

  const confirmBooking = async (e) => {
    console.log("hellloooo")
    if (cashOnDelivery) {
      confirmBookingCash();
    }
    else {
      const price = Number(first)*300 + Number(second)*500 + Number(third)*800


      try {
        const orderUrl = API_URL + "order";
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
    //console.log(date)
    //let bookedStats = bookedStalls.toString();
    const options = {
      key: process.env.KEY_ID,
      amount: data.amount,
      currency: data.currency,
      order_id: data.id,
      description: "Wingrow Market",

      handler: async (response) => {

        try {

          var orderId;

          const verifyUrl = REACT_APP_API_URL + "verify";
          const { data } = await axios.post(verifyUrl, response, {
            headers: authHeader(),
          });
          orderId = data.orderId;



          const userId = user.id
          setStatus("active")
          const s = "active"
          await axios
            .post(API_URL + "sub", { date, userId, valid, stalls, s, price,first,second,third })
            .then((response) => {
              const { data } = response;
              if (data) {
                console.log(data)
                setSub(data)
              }
              toast.success("stalls booked successfully!", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
              setTimeout(() => {
                //navigate("/farmers/subscription");
                window.location.reload(false)

              }, 1000);
            })
            .catch((error) => {
              toast.warn("Failed to book stalls!", {
                position: "top-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });

            });
        } catch (error) {
          //console.log(error);
          setSub([])
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("active")

    const userId = user.id;
    const s = "active"
    console.log(userId)
    await axios.post(API_URL + "sub", { date, userId, valid, stalls, s, price,first,second,third })
      .then((res) => {
        console.log("the return data ", res)
      })
      .catch((err) => {
        console.log(err)
      })

  }
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
    <div className="sub">
      <Link className="backbtn green" to="/farmers" style={{ padding: '8px 20px 8px 20px'}}>
        {t("back")} </Link>
      <div className="subscrp-heading">
     
        <h1 className="header">{t("Subscription Model")}</h1>
      </div>
     
      { (sub.length !== 0  && status == "active" ) ? 
      
      
      <div className="subscribe">
      

          {/* <div className="validity">
        <h3>validity(days) - {sub[0].validity}</h3>
        </div> */}
          <div className="stallslefts downtext">
            <div className="inner_downtext">
              <p className="startdate">{t("Start data")} :</p>
              <p>{sub[sub.length-1].date}</p>
            </div>
            <div className="inner_downtext">
              <p className="startdate"> {t("valid till")} :</p>
              <p>{validTill} </p>
            </div>
            <div className="inner_downtext">
              <p className="startdate"> {t("Status")} :</p>
              <p>{sub[sub.length-1].status} </p>
            </div>
            <div className="inner_downtext">
              <p className="startdate"> {t("stalls")} :</p>
              <p>{sub[sub.length-1].stalls} </p>
            </div>
            <div className="inner_downtext">
              <p className="startdate">,  300's :</p>
              <p>{sub[sub.length-1].first} </p>
            </div>
            <div className="inner_downtext">
            
              <p className="startdate">,  500's :</p>
              <p>{sub[sub.length-1].second} </p>
            </div>
            <div className="inner_downtext">
            
              <p className="startdate">,  800's :</p>
              <p>{sub[sub.length-1].third} </p>
            </div>
            {/* <div className="inner_downtext">
              <p className="startdate"> 300's stalls :</p>
              <p>{sub[sub.length-1].first} </p>
            </div>
            <div className="inner_downtext">
              <p className="startdate"> 500's stalls :</p>
              <p>{sub[sub.length-1].second} </p>
            </div>
            <div className="inner_downtext">
              <p className="startdate"> 800's stalls :</p>
              <p>{sub[sub.length-1].third} </p>
            </div> */}
          </div>
          {/* <h3>stalls - {sub[0].stalls}</h3> */}

      </div>
        :

        <div classname="box">
          <h2 style={{ textAlign: "center", paddingTop: 20 }}>{t("not Subscribed")}</h2>
          <form onSubmit={handleSubmit}>
          <Grid className="input-div-holder" container spacing={2} justifyContent="center" alignItems="center" sx={{ marginTop: '1rem' , marginLeft:{xs:"1.7rem"}}} >
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
              <InputLabel className="stall-booking-lable" sx={{marginRight:{xs:"6rem", lg:"0px"}}}>
                  {t("enter_booking_date")}
              </InputLabel>
              <TextField
                inputlabelprops={{
                  style: { fontSize: 14, fontFamily: "monospace" },
                }}
                sx={{width:{xs: "80%", sm: "100%", md: "65%", lg: "50%", xl: "100%"}}}
                name="booking-date"
                required
                fullWidth
                type="date"
                id="booking-date"
                autoFocus
                value={date}
                onChange={(e) => { setDate(e.target.value); console.log("clicking"); }}
                color="success"
              />
            </Grid>
            <Grid  item xs={12} sm={6} md={4} lg={3} xl={2}>
            <InputLabel
                className="stall-booking-lable"
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  sx={{
                     sm:top-40, marginRight:{xs:"7rem", lg:"1rem"}
                  }}
                  id="demo-simple-select-helper-label"
                >
                  {t("type")}
                </InputLabel>

            <Select
                  sx={{fontSize: "1.2rem", width:{xs: "80%", sm: "100%", md: "65%", lg: "50%", xl: "100%"}}}
                  labelId="demo-simple-select-helper-label"
                  id="demo-simple-select-helper"
                  value={validity}
                  label="Type"
                  name="type"
                  onChange={(e) => {
                    
                    setValidity("90")
                    setStalls(150)

                  }}
                  color="success"
                  className="mx-auto"
                >
                  <MenuItem
                    sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                    value="0"
                  >
                    <em>Select</em>
                  </MenuItem>
                  <MenuItem
                    sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                    value="90"
                  >
                    150 {t("stalls")}
                  </MenuItem>
                  {/* <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "monospace" }}
                      value={"customer"}
                    >
                      Consumer
                    </MenuItem> */}
                </Select>

            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <InputLabel
                className="stall-booking-lable"
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  id="demo-simple-select-helper-label"
                  sx={{marginRight:{xs:"7rem", lg:"1rem"}}}
                >
                  {t("Price")} (300)
                </InputLabel>
                <TextField
                  // className="stall-booking-input"
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
                  value={first}
                  onChange={(e) =>setFirst(e.target.value)}
                  InputProps={{ inputProps: { min: 0, max: 150-Number(second)-Number(third) } }}
                />
            

            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <InputLabel
                className="stall-booking-lable"
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  id="demo-simple-select-helper-label"
                  sx={{marginRight:{xs:"7rem", lg:"1rem"}}}
                >
                  {t("Price")} (500)
                </InputLabel>
                <TextField
                  // className="stall-booking-input"
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
                  value={second}
                  onChange={(e) =>setSecond(e.target.value)}
                  InputProps={{ inputProps: { min: 0, max: 150-Number(first)-Number(third)  } }}
                />
            

            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <InputLabel
                className="stall-booking-lable"
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "monospace" },
                  }}
                  id="demo-simple-select-helper-label"
                  sx={{marginRight:{xs:"7rem", lg:"1rem"}}}
                >
                  {t("Price")} (800)
                </InputLabel>
                <TextField
                  // className="stall-booking-input"
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
                  value={third}
                  onChange={(e) =>setThird(e.target.value)}
                  InputProps={{ inputProps: { min: 0, max: 150-Number(second)-Number(first)  } }}
                />
            

            </Grid>
          </Grid>
         

            {/* <button type="submit">Proceed</button> */}
            {validity &&
              
            date ? (
              <div className="modalbtn">
                <ConfirmModal setCashOnDelivery={setCashOnDelivery} status={status1} confirmBooking={confirmBooking} t={t}/>
              </div>
            ) : (
              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      style={{ width: "110px", height: "40px", paddingLeft: '5rem', paddingRight: '5rem', margin: '1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      {t("Pay")}
                    </Button>
                    <Button style={{ width: "110px", height: "40px", paddingLeft: '5rem', paddingRight: '5rem', margin: '1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        {t("pay_in_market")}
                    </Button>
                  </div>
                </Grid>
              </Grid>
            )}

          </form>
        </div>

      }
      <div className="pageBottom" ></div>
      {/* {mobile?<NavMenu
       />:console.log("desktop")} */}
  </div>
);

}
  


export default Subscription