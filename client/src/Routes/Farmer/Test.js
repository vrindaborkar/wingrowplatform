import "../../styles/Test.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Stall from "./Stall";
import UserService from '../../services/user.service'

import authHeader from "../../services/auth.headers";
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import ConfirmModal from "../../components/ConfirmModal";
import FarmerService from "../../services/farmer.service";
import dayjs from "dayjs";
import Spinner from "../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import SelectSeatModal from "../../components/SelectSeatModal";
import { Button, Typography } from "@mui/material";
// Added
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { format } from 'date-fns';
// import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
// import DateFnsUtils from '@date-io/date-fns';
// import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { makeStyles } from '@material-ui/core/styles';
// import ArrowBackIcon from '@mui/icons-material/ArrowBack';
// import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import NavMenu from "../../components/NavMenu";
import useWindowDimensions from "../../components/useWindowDimensions";
// import {styled} from '@mui/material'


// const StyledIcon = styled(ArrowForwardIcon)`
// font-size: 20vw;
// max-height: 40px;
// `
const useStyles = makeStyles({
  arrowIcon: {
    position:'relative',
    top:'5rem'
  },
});


const userCurr = AuthService.getCurrentUser();

function Test({ setbookingDetails, setValue, t }) {
  const classes = useStyles();
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;
  const [data, setdata] = useState();
  const[MyStalls,setMyStalls] = useState([]);
  const [UpdatedData, setUpdatedData] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [bookedStalls, setBookedStalls] = useState([]);
  const [Loading, setLoading] = useState();
  const { Id } = useParams();
  const [value, setvalue] = useState(0);
  const[status,setStatus] = useState(false)
  const [alreadyBooked, setAlreadyBooked] = useState();
  const [alreadyBookedLocataion, setAlreadyBookedLocation] = useState(0);
  const [open, setOpen] = useState();
  const [sub,setSub] = useState([]);
  const[maxDate,setMaxDate] = useState();
  const[first,setFirst] = useState(0)
  const[second,setSecond] = useState(0)
  const[third,setThird] = useState(0)

  const[stall,setStall] = useState(8);
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [totalStall, setTotalStalls] = useState(0);
  const [available, setAvailable] = useState(0);
  const today = new Date();
  const[error,setError] = useState('')
  const[subId,setSubId] = useState()
  const todayFormatted = today.toISOString().slice(0, 10);
  const [date, setdate] = useState(null);
  const [number,setNumber] = useState(10)
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('Please select stalls');
  const [selected, setSelected] = useState([]);
  const [weekId, setWeekId] = useState(0)
  const arr = { 'Karve Nagar': 2, 'Kondhwa BK':2, 'Hadapsar': 3, 'Undri':3, 'Kharadi IT Park': 4,  'Bramhasun City': 5, 'Wagholi':5, 'Bhavadi Road':6, 'Amanora City': 7,'Magarpatta':7,'Green City':7}
  const weekdays = ['monday','tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  const API_URL = "https://wingrowmarket.com:8443/";
  const [isMobile, setIsMobile] = useState(false);
  // useEffect(()=>{
  //   setStatus(st)
  // },[status])
  var status1 = true

  const RenderIcon=()=>{
    const icons = [];
    for(var i=0; i<151; i++){
      icons.push(<i style={{marginLeft: '10px'}} class="arrow right"></i>);
      // <i class="arrow right"></i>
    }
    return icons;
  }
  const RenderIcon2=()=>{
    const icons = [];
    for(var i=0; i<152; i++){
      icons.push(<i style={{marginLeft: '10px'}} class="arrow left"></i>);
      // <i class="arrow right"></i>
    }
    return icons;
  }
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);
    setWeekId(arr[Id])
    // if(date.getDay() !== weekId){
    //   setMessage("CHANGE DATE")
    // }
    // console.log("weeks number",arr[Id])
    const listener = () => setIsMobile(mediaQuery.matches);
    mediaQuery.addListener(listener);

    return () => {
      mediaQuery.removeListener(listener)
    }

  }, []);




  function disableDays(d) {
    const today = new Date();
    const selectedDate = new Date(d);

    if(weekId === 7) {
    setWeekId(0);
    }
    // Disable all days except the current day and the days that have the same day of the week as the selected date
    return !(selectedDate.getDay() === weekId );
  }
  // useEffect(() => {
  //   console.log("hello inside prebook")
  //   FarmerService.getBookedStalls().then(async(res)=>{
  //       const {data} = res;
  //       console.log("the data is- ",data)
  //       //check for date of the booked stall date greater than equal to subscribed
  //       if(sub.length !== 0){
  //         const currentDate = new Date(sub[sub.length-1].date)
  //         console.log("hello---  ",sub[sub.length-1].date)
  //       setMyStalls(data.filter(e=> { 
        
  //     if(e.bookedBy === userCurr.id && sub[sub.length-1].date <= e.bookedAt){
  //       return true
  //     } }))
  //       console.log("the booked stalls are -- ", MyStalls)
  //       console.log(sub)
  //       var r = MyStalls.length
  //       console.log(stall,r)
  //       if(stall <=r ){
  //         //subscribe again
  //         const id = sub[sub.length-1]._id
  //         if(status == "active"){
  //           setStatus(false)
  //           setStalls(0)
  //           const s = "expired"
            
  //         await axios.put(API_URL+"changestatus",{id,s})
  //         .then((res)=>{
  //           window.location.reload(false);
  
  //           console.log("passed")
  
  //         })
  //         .catch((error)=>{
  //           console.log("failed")
  //         })
  //       }
  //         console.log("sub is-",sub[sub.length-1]._id)
          
          
  //       }else{

  //         setStalls(stall-r)
  //         console.log("stall",stall)
  //       }
  //   }
  //   })
  // }, [MyStalls,sub,stall])




  useEffect(() => {
    setLoading(true);


    FarmerService.getMyStalls().then( (response) => {
      setLoading(false);

      console.log("response ",response.data)
      setdata(response.data);
    });
    if (date !== null) {
      FarmerService.getBookedStalls().then((response) => {
    

        const res = response.data && response.data.filter((e) => e.location === `${Id}` && e.bookedAt === date);
        setAlreadyBooked(response.data);
        setAlreadyBookedLocation(res.length);
        console.log('alreadyBooked:', res)
      });

      handleOpen(true);
    }
    UserService.getSub(userCurr.id).then( (res)=>{
      const {data} = res
      console.log("all the subscriptions :",data)
      
      console.log("helllooooooo ",data[data.length-1])
      if(data.length !== 0){
      if(data[data.length-1].status === "active"){
        setSub(data)
         setStatus(true)
         status1 = true

        setSubId(data[data.length-1]._id)
        setStall(data[data.length-1].stalls)

        const n  = Math.min(Number(data[data.length-1].stalls),3)
        console.log(n)
        setNumber(n)
      }else{
        setNumber(1000)

        setStatus(false)
        status1 = false

      }
      const currentDate = new Date(data[data.length-1].date)
      
      var year= currentDate.getFullYear();
      var month = Number(currentDate.getMonth()) ;
      var date = Number(currentDate.getDate());
      // if(month == 0 || month == 2 ||month == 4 ||month == 6 ||month == 7 ||month == 9 || 
      //   month == 11 ){
      //     if(Number(date) + 7 > 31){
      //       date = Number(date) + 7 -31
      //       month = month + 1
      //     }else{
      //       date = date + 7
            
      //     }
      //   }
      // else if(month == 1){
      //   if(Number(date) + 7 > 28 ){
      //     date = Number(date) + 7 -28
      //     month = month + 1
      //   }
      //   else{
      //     date = date + 7
      //   }
      // }else{
      //   if(date + 7 > 30){
      //     month = month + 1
      //     date = Number(date) + 7 -30
      //   }
      //   else{
      //     date = date + 7
      //   }
      // }

      var currentDate1 = new Date(year,month,date + 90)
          
          //const validDate = String(year) + "-" + String(month) + "-" + String(date)
          const dateNew = dayjs(currentDate1).format("YYYY-MM-DD")
          console.log(dateNew)
          //setValidTill(dateNew)
          setFirst(data[data.length-1].first)
          setSecond(data[data.length-1].second)
          setThird(data[data.length-1].third)
        //  setStalls(data[data.length - 1].stalls)
      //const dateNew = new Date(year,month-1,date)
      //console.log(today,dateNew)
      const dateToday  = new Date(dateNew)
      console.log('status :', status)
      console.log(today,dateToday)
      setMaxDate(dateNew)
      if(today > dateToday){
        setStatus(false)
        status1 = false
        setNumber(1000)
      }
      const validDate = String(year) +"-" + String(month) + "-" + String(date)
      console.log("",validDate)
      console.log('status :', status)
      
    }
    })
  }, [date, Id,status]);


  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);


  useEffect(() => {
    const res = data && data.filter((e) => e.location === `${Id}`);
    console.log("updated data acc to loc:",res)
    setUpdatedData(res);
  }, [Id, data]);

  useEffect(() => {
    if (UpdatedData) {
      setTotalStalls(UpdatedData.length)
      setAvailable(totalStall - alreadyBookedLocataion)
    }
  }, [UpdatedData]);


  const confirmBookingCash = async (e) => {
    const price = bookedStalls.reduce(
      (total, item) => item.stallPrice + total,
      0
    );
    //console.log(bookedStalls.length);
    //console.log("price", price)
    if (bookedStalls.length === 0) {
      toast.warn(t("failed_to_book_stalls"), {
        position: "top-right",
        autoClose: 2500,
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
        toast.success(t("stalls_booked_successfully"), {
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
          navigate("../ticket");
        }, 1000);
      })
      .catch((error) => {
        toast.warn(t("failed_to_book_stalls"), {
          position: "top-right",
          autoClose: 2500,
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


  const confirmBooking = async (e) => {
    
    //IF STATUS = TRUE , THEN DECREASE THE AVAILABLE STALLS , BY UPDATING
    if(status === true){
    console.log("selected stalls : ",selected)
    var s = stall - bookedStalls.length
    console.log("new stall number",s)
    setStall(s)
    var firstF = Number(first);
    var secondF = Number(second);
    var thirdF = Number(third);
    
    
    await axios.put(REACT_APP_API_URL+"changeStalls",{subId,s,firstF,secondF,thirdF})
    .then((res)=>{
      
      const {data} = res
      console.log("passed")

    })
    .catch((error)=>{
      console.log("failed")
    })
    

    if(stall === 0){
      
      const s = "expired"
      await axios.put(REACT_APP_API_URL+"changestatus",{subId,s})
        .then((res)=>{
          window.location.reload(false);

          console.log("passed")

        })
        .catch((error)=>{
          console.log("failed")
        })
    }

  }


    if (bookedStalls.length !== 0) {
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
          toast.warn(t("failed_to_book_stalls"), {
            position: "top-right",
            autoClose: 2500,
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
                    redirect_url: `http://localhost:3000/farmers/stallplaces/stalls/callback?user_id=${userCurr.id}}`,
                  };
                  const orderUrl = REACT_APP_API_URL+"pay";
                  await axios.post(
                    orderUrl,
                    data, { headers: authHeader() })
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
      toast.warn(t("please_select_stalls")+"!", {
        position: "top-right",
        autoClose: 2500,
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
              toast.success(t("stalls_booked_successfully"), {
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
                navigate("../ticket");
              }, 1000);
            })
            .catch((error) => {
              toast.warn(t("failed_to_book_stalls"), {
                position: "top-right",
                autoClose: 2500,
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
          //console.log(error);
          setBookedStalls([]);
          setNumberOfSeats(0);
        }
      },
      theme: {
        color: "#3399cc",
      },
    };
    
  };
// useEffect(()=>{
// setBookedStalls(bookedStalls)
// },[bookedStalls])
  const handleClick = (ev) => {
    if (numberOfSeats && ev.target.className !== "booked") {
      const seatsToBook = parseInt(numberOfSeats, 20);
   
      if (bookedStalls.length <= seatsToBook) {
        //Remove stall if already selected
        if (selected.includes(ev.target.id)) {
          console.log("no" + " " + selected)
          const idToRemove = ev.target.id;
          const newBookedStalls = bookedStalls.filter((stall) => stall._id !== idToRemove);
          if(newBookedStalls.length !== bookedStalls.length){
            setBookedStalls(newBookedStalls);
            setAvailable(available + 1);
            setError('')
            if(status === true){
              var pp = bookedStalls[0].stallPrice
              if(pp === 300){
                setFirst(first+1)
              }else if(pp === 500){
                setSecond(second+1)
              }else{
                setThird(third+1)
              }}
          }else{
            console.log("lol no new changes")
          }
          
          const index = selected.indexOf(ev.target.id);
          console.log(index)
          if (index >= 0) {
            selected.splice(index, 1); // Remove the selected stall ID from the selected array
          }
          console.log(selected)
          return
        } //Select stall
        else if (bookedStalls.length < numberOfSeats) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          if(status === true){
            var pp = item[0].stallPrice
            if((pp === 300 && first ===0)||(pp === 500 && second ===0) || (pp === 800 && third ===0)){
              //do nothing
            console.log("nope")
            if(first === 0){
              setError("300rs stalls not availabe anymore")
            }else if(second === 0){
              setError("500rs stalls not availabe anymore")

            }else{
              console.log("im here in 800")

              setError("800rs stalls not availabe anymore")

            }
             
            }else{
            setAvailable(available - 1);
          setBookedStalls([...bookedStalls, item[0]]);
          setError('')
          console.log("booked ::::",bookedStalls)
          if(pp === 300){
            setFirst(first-1)
          }else if( pp === 500){
            setSecond(second-1)
          }else{
            setThird(third-1)
          }
            }
          }else{
            console.log("here bookedS:",bookedStalls)

            setAvailable(available - 1);
          setBookedStalls([...bookedStalls, item[0]]);
          setError('')
          }
          
          console.log('here')
        } //shift stall if number of stalls reached
        else if (bookedStalls.length === seatsToBook) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          if(status === true){
            var pp = bookedStalls[0].stallPrice
            if(pp === 300){
              setFirst(first+1)
            }else if(pp === 500){
              setSecond(second+1)
            }else{
              setThird(third+1)
            }
            
             pp = item[0].stallPrice
            if((pp === 300 && first ===0)||(pp === 500 && second ===0) || (pp === 800 && third ===0)){
              //do nothing
            console.log("nope")
            if(first === 0){
              setError("300rs stalls not availabe anymore")
            }else if(second === 0){
              setError("500rs stalls not availabe anymore")

            }else{
              console.log("im here in 800")
              setError("800rs stalls not availabe anymore")

            }
            }else{
              bookedStalls.shift();
              selected.shift();
          setBookedStalls([...bookedStalls, item[0]]);
          setError('')
          if(pp === 300){
            setFirst(first-1)
          }else if( pp === 500){
            setSecond(second-1)
          }else{
            setThird(third-1)
          }
            }
            

          }else{
            bookedStalls.shift();
            selected.shift();
          setBookedStalls([...bookedStalls, item[0]]);
          setError('')
        }
          console.log("shifted" + " " + selected)

        }
        // Add the clicked stall ID to the selected array
        setSelected([...selected, ev.target.id]);
        
        console.log(selected)
      }
    }
  };

  useEffect(() => {
    console.log("selected:",selected);
    console.log("bookedStall- -",bookedStalls)
  }, [selected]);


  const lengthofUpdatedData = UpdatedData?.length;
  //UpdatedData?.length
  const handleChange = (e, newValue) => {
    if (date !== 0) {
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
      setMessage2('');
    }
    else {
      setMessage2(t("please_select_date"));
    }
  };
  const disabledDates = [new Date('2023-04-02')];

  const handlechange1 = (event) => {
    const temp = new Date(event.target.value);
    const weekdayNumber = temp.getDay();

    // console.log(weekdayNumber)
    //  if(weekdayNumber === arr[Id]){
    setdate(event.target.value);
    setMessage('');

    //   }
    // else {
    setMessage(`Markets in ${Id} only on ${weekdays[arr[Id] - 1]}, Please choose date accordingly`);
    //}
  };
  const isDateDisabled = (date) => {
    return disabledDates.includes(format(date, 'yyyy-MM-dd'));
  };


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
    <>

      {!Loading ? (
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


          <div className="main_container_stalls">
            <Link className="backbtn green" to="/farmers/stallplaces" sx={{ m: 2 }} style={{ padding: '8px 20px 8px 20px', marginTop: -'570px', marginLeft: '10px' }}>
             { t("back")}
            </Link>
            {console.log(weekId)}
            <h2 className="market-name" style={{ textAlign: 'center', marginTop: '20px' }}>{t(Id)} {t("only_on")} {t(weekdays[arr[Id] - 1])}</h2>
            <Grid className="input-div-holder" container spacing={2}>
              <Grid item xs={12} sm={6}>
                <InputLabel className="stall-booking-lable">
                  {t("enter_booking_date")}
                </InputLabel>
                {/* <TextField
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
                  inputProps={{
                    min: todayFormatted,
                    // disable all days except Wednesdays
                    disabledDates: disabledDates
                  }}

                /> */}
                {/* {console.log(date)} */}

                {/* <DatePicker
                  selected={date}
                  onChange={handlechange1}
                  minDate={new Date()} // Disable past dates
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  placeholderText="Select a date"
                  disabledDates={disabledDates}
                /> */}


                <DatePicker
                  fullWidth
                  className="textfield"
                  renderInput={(props) => <TextField {...props} size="big" helperText={null} />}
                  value={date}
                  onChange={(newValue) => {
                    console.log(newValue.$d);
                    const myDate = newValue.$d;
                    const yyyy = myDate.getFullYear();
                    const mm = String(myDate.getMonth() + 1).padStart(2, "0");
                    const dd = String(myDate.getDate()).padStart(2, "0");

                    const formattedDate = `${yyyy}-${mm}-${dd}`;
                    console.log(formattedDate);
                    const d = new Date(newValue.toISOString().slice(0, 10));

                    setdate(formattedDate);

                    FarmerService.getBookedStallsTemp().then((response) => {
                      console.log(date);
                      const res =
                        response.data &&
                        response.data.filter((e) => e.location === `${Id}` && e.bookedAt === formattedDate);
                      setAlreadyBooked(response.data);
                      setAlreadyBookedLocation(res.length);
                      setAvailable(totalStall - res.length);
                    });

                    handleOpen(true);
                  }}
                  defaultValue={new Date()}
                  shouldDisableDate={disableDays}
                  minDate={new Date()}
                  maxDate={maxDate}

                /> 

                {/* <DatePicker
                
                label="Year and Month"
                minDate={todayFormatted}
                
                value={value}
                onChange={(newValue) => {
                   setValue(newValue);
                }}
                renderInput={(props) => <TextField  {...props} size='small' helperText={null} />}
                /> */}


                {message && (
                  <Typography variant="subtitle1" color="error">
                    {message}
                  </Typography>
                )}
              </Grid>

              <Grid style={{ margin: "auto", marginTop: '0rem' }} item xs={12} sm={6}>


                <InputLabel className="stall-booking-lable">
                  {t("no_of_stalls_required")}
                </InputLabel>
                <TextField
                  // className="stall-booking-input"
                  // sx={{width: "100%", margin: "auto"}}
                  inputlabelprops={{
                    style: {fontSize: 14, fontFamily: "monospace"},
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
                  InputProps={{ inputProps: { min: 0, max: number } }}

                // margin="normal"

                />
                {error && 
                  <Typography variant = "subtitle1" color="error">
                    {error}
                  </Typography>
                }
                {message2 && (
                  <Typography variant="subtitle1" color="error">
                    {message2}
                  </Typography>
                )}
              </Grid>

            </Grid>
            
            <Grid className="stall-position-grid">
              <InputLabel className="stall-booking-lable">
                {t("select_stall_position")}
              </InputLabel>
              <Grid className="stalls-count-cantainer">
                <Grid>
                  <div className="stalls-count-div">
                    <Typography className="count">{t("total_stalls")} :{totalStall}</Typography>
                    <Typography className="count">
                      {t("available_stalls")} :{available}
                    </Typography>
                  </div>
                </Grid>
                <Grid>

                  {UpdatedData && Id ? (
                    <div className="stall_wrapper">
                      {/* {lengthofUpdatedData  && (
                        <div className="StallsContainer">
                          {!isMobile && <Stall
                            data={UpdatedData.slice(0, 16)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />}
                          {isMobile && <Stall
                            data={UpdatedData.slice(0, 17)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />}
                          {!isMobile && <Stall
                            data={UpdatedData.slice(16, 17)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />}
                          {!isMobile && <Stall
                            data={UpdatedData.slice(17, 18)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />}
                          {!isMobile && <Stall
                            data={UpdatedData.slice(18, 34)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />}
                          {isMobile && <Stall
                            data={UpdatedData.slice(17, 35)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />}
                        </div>
                      )} */}
                      
                      {lengthofUpdatedData && (
                        <div className="StallsContainer">
                          
                          <Stall
                            data={UpdatedData.slice(0, 24)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />
                          <p  className ='firstPara'>
                            Entry
                            {RenderIcon()}
                            </p>
                          <p style={{marginLeft:'2850px'}}> <i class="arrow down"></i></p>
                          <p style={{marginLeft:'2850px'}}> <i class="arrow down"></i></p>

{/*               
                         <hr style={{borderStyle: 'dotted'}}/>
                          {!isMobile && <Stall
                            data={UpdatedData.slice(24, 25)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />}
                          {!isMobile && <Stall
                            data={UpdatedData.slice(25, 26)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />} */}
                          <p style={{    marginTop: '0',
                          fontSize: '20px',
                          fontWeight: 'bold',
                          marginLeft: '20px',
                          marginBottom: '1rem',
                          width: 'max-content'}}>
                          Exit
                          {RenderIcon2()}
                          </p>
                          {/* <p><i class="arrow left"></i><i class="arrow left"></i><i class="arrow left"></i><i class="arrow left"></i></p> */}
                          <Stall
                            data={UpdatedData.slice(26, 50)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />
                          
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="select_market">
                        <h2>{t("please_select_market")}</h2>
                    </div>
                  )}
                </Grid>
              </Grid>
              <Grid className="stall-pricing-grid">
                <div className="stall-pricing-main-div">
                  <div className="price-holder">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#C0B236",
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
                        backgroundColor: "#AACE48",
                      }}
                      className="stall-color"
                    />
                    <div className="stall-price">200/-</div>
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
                        backgroundColor: "#FF5B00", 
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
                        backgroundColor: "#A42A56",
                      }}
                      className="stall-color"
                    />
                    <div className="stall-price">800/-</div>
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
                    <div className="stall-price">{t("booked")}</div>
                  </div>
                  <div className="price-holder">
                    <Box
                      sx={{
                        width: 20,
                        height: 20,
                        backgroundColor: "#4705fcae",
                      }}
                      className="stall-color"
                    />
                    <div className="stall-price">{t("Selected")}</div>
                  </div>
                </div>
                {/* {console.log(bookedStalls)} */}
                <Divider className="divider" />
                <div className="stall-total-amount-holder">
                  <div className="total-amount">{t("total_amount")}</div>
                  <div className="total-amount">Rs.{bookedStalls.reduce(
                    (total, item) => item.stallPrice + total,
                    0
                  )}/-</div>
                </div>
              </Grid>
            </Grid>
            {/* {console.log(selected)} */}

            {numberOfSeats !== 0 && bookedStalls.length !== 0 ? (
              <div className="modalbtn">

                <ConfirmModal t={t} status={status} setCashOnDelivery={setCashOnDelivery} confirmBooking={confirmBooking} selected={selected} />
              </div>
            ) : (
                  <div style={{ display: "flex", justifyContent: "center" }}>
                    
                    <Button
                      style={{paddingLeft: '5rem', paddingRight: '5rem', fontSize:'15px', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                      onClick={() => {
                        toast.warn("Please select stalls!", {
                          position: "top-right",
                          autoClose: 2500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }}
                    >
                      {t("Pay")}
                    </Button>


                    <Button
                      style={{ width: "60%%", height: "40px", marginLeft:'10px', paddingLeft: '2rem',paddingTop:'2rem', paddingBottom:'2rem', fontSize:'15px', paddingRight: '2rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                      onClick={() => {
                        toast.warn("Please select stalls!", {
                          position: "top-right",
                          autoClose: 2500,
                          hideProgressBar: false,
                          closeOnClick: true,
                          pauseOnHover: true,
                          draggable: true,
                          progress: undefined,
                          theme: "light",
                        });
                      }}
                    >
                      {t("pay_in_market")}
                    </Button>

                  </div>


            )
            }


          </div>
            
        </div>
      ) : (
        <Spinner />
      )}
      <div className="pageBottom" ></div>
      {/* {mobile?<NavMenu
        />:console.log("desktop")} */}
    </>
  );
}

export default Test;
