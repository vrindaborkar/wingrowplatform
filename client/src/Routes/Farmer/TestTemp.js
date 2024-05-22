import "../../styles/Test.css";
import React, { useState, useEffect ,useRef } from "react";
// import axios from "axios";
import Stall from "./Stall";
// import authHeader from "../../services/auth.headers";
import { Link, useNavigate, useParams,useLocation } from "react-router-dom";
import AuthService from "../../services/auth.service";
// import ConfirmModal from "../../components/ConfirmModal";
import FarmerService from "../../services/farmer.service";
// import dayjs from "dayjs";
import Spinner from "../../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import SelectSeatModal from "../../components/SelectSeatModal";
import { Button, Typography } from "@mui/material";
import usePrevLocation from '../../hooks/usePrevLocation'

// Added

import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
// import firebase from "../firebase";
// import PhoneInput from 'react-phone-input-2';
// import Alert from '@mui/material/Alert';
import useWindowDimensions from "../../components/useWindowDimensions";
// import NavMenu from "../../components/NavMenu";

const TestTemp = ({selected,setSelected,date,setdate,today,t}) => {
    const currentPath = window.location.pathname;
    const parts = currentPath.split("/");
    const IdAddress = parts[parts.length - 1].replace("%20"," ");
    const user = AuthService.getCurrentUser()
    const { Id } = useParams();
console.log(t(Id))
    useEffect(() =>{
      if(user){
        console.log("hello",bookedStalls)
        navigate(`/home/temp/stallsTemp/${Id}/paymentpage`);
      }
    },[user])
    //console.log("the user is ",user)
    const location = useLocation();
const prevLocation = usePrevLocation(location) 
//console.log(prevLocation)

  const navigate = useNavigate();
  const [data, setdata] = useState();
  const [UpdatedData, setUpdatedData] = useState();
  const [numberOfSeats, setNumberOfSeats] = useState(0);
  const [bookedStalls, setBookedStalls] = useState([]);
  const [Loading, setLoading] = useState();
  const [value, setvalue] = useState(0);
  //const [newDate, setNewDate] = useState(0);
  const [alreadyBooked, setAlreadyBooked] = useState();
  const [alreadyBookedLocataion, setAlreadyBookedLocation] = useState(0);
  const [open, setOpen] = useState();
  const [cashOnDelivery, setCashOnDelivery] = useState(false);
  const [totalStall, setTotalStalls] = useState(0);
  const [available, setAvailable] = useState(0);
  const todayFormatted = today.toISOString().slice(0, 10);
  // const [date, setdate] = useState(today);
  const customInputRef = useRef();

  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [message3, setMessage3] = useState('Please select stalls');
  // const [selected, setSelected] = useState([]);
  const [weekId, setWeekId] = useState(0)

  const arr = { 'Karve Nagar': 2, 'Kondhwa BK':2, 'Hadapsar': 3, 'Undri':3, 'Kharadi IT Park': 4,  'Bramhasun City': 5, 'Wagholi':5, 'Bhavadi Road':6, 'Amanora City': 7,'Magarpatta': 7,'Green City': 7}
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 767px)');
    setIsMobile(mediaQuery.matches);
    setWeekId(arr[Id])
    // console.log("weeks number",arr[Id])
    const listener = () => setIsMobile(mediaQuery.matches);
    // if(date.getDay() !== weekId){
    //   setMessage("CHANGE DATE")
    // }

    mediaQuery.addListener(listener);

    return () => {
      mediaQuery.removeListener(listener)
    }

  }, []);

  useEffect(() => {
    setLoading(true);
    setWeekId(arr[Id])

    FarmerService.getMyStallsTemp().then((response) => {
      setLoading(false);
      setdata(response.data);
    });
    if (date !== null) {
      FarmerService.getBookedStallsTemp().then((response) => {
        console.log(date)
        const res = response.data && response.data.filter((e) => e.location === `${Id}` && e.bookedAt === date);
        setAlreadyBooked(response.data);
        setAlreadyBookedLocation(res.length);
       // console.log('alreadyBooked:', res)
      });

      handleOpen(true);
    }
  }, [date, Id]);

  const handleOpen = () => setOpen(true);

  useEffect(() => {
    const res = data && data.filter((e) => e.location === `${Id}`);
    setUpdatedData(res);
  }, [Id, data]);

  useEffect(() => {
    if (UpdatedData) {
      setTotalStalls(UpdatedData.length)
      setAvailable(totalStall - alreadyBookedLocataion)
    }
  }, [UpdatedData]);
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
      setMessage2(``);
    }
    else {
      setMessage2(`Please select a date`);
    }
  };


    //console.log("date is ", da.getDay())
    function disableDays(d) {
      const today = new Date();
      const selectedDate = new Date(d);

      // Disable all days except the current day and the days that have the same day of the week as the selected date
      return !(selectedDate.getDay() === weekId);
    }


  const handlechange1 = (event) => {
    const temp = new Date(event.target.value);
    const weekdayNumber = temp.getDay();

   // console.log(weekdayNumber)
    if (weekdayNumber === arr[Id]) {
      setdate(event.target.value);
      setMessage('');

    }
    else {
      setMessage(`Markets in ${Id} only on ${weekdays[arr[Id] - 1]}, Please choose date accordingly`);
    }
  };

  const handleClick = (ev) => {
    if (numberOfSeats && ev.target.className !== "booked") {
      const seatsToBook = parseInt(numberOfSeats, 20);
      if (bookedStalls.length <= seatsToBook) {
        //Remove stall if already selected
        if (selected.includes(ev.target.id)) {
        //  console.log("no" + " " + selected)
          const idToRemove = ev.target.id;
          const newBookedStalls = bookedStalls.filter((stall) => stall._id !== idToRemove);
          setBookedStalls(newBookedStalls);
          setAvailable(available + 1);
          const index = selected.indexOf(ev.target.id);
         // console.log(index)
          if (index >= 0) {
            selected.splice(index, 1); // Remove the selected stall ID from the selected array
          }
         // console.log(selected)
          return
        } //Select stall
        else if (bookedStalls.length < numberOfSeats) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          setAvailable(available - 1);
          setBookedStalls([...bookedStalls, item[0]]);
       //   console.log('here')
        } //shift stall if number of stalls reached
        else if (bookedStalls.length === seatsToBook) {
          const item = UpdatedData.filter((e) => e._id === ev.target.id);
          bookedStalls.shift();
          selected.shift();
          setBookedStalls([...bookedStalls, item[0]]);
        //  console.log("shifted" + " " + selected)
        }
        // Add the clicked stall ID to the selected array
        setSelected([...selected, ev.target.id]);
      //  console.log(selected)
      }
    }
  };

  useEffect(() => {
    //console.log(selected);
  }, [selected]);


  const handleClickButton = () => {
    //console.log(selected);
    //navigate(`/home/temp/stallsTemp/${Id}/paymentpage`);
    navigate(`/login`,{ state : {path:'stall', id : Id , bookedStalls : bookedStalls}})
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
            <Link className="backbtn green" to="/home/temp" sx={{ m: 2 }} style={{ padding: '8px 20px 8px 20px', marginTop: -'570px', marginLeft: '10px' }}>
              {t("back")}
            </Link>
            <h2 className="market-name" style={{ textAlign: 'center', marginTop: '20px' }}>{t(Id)} {t("only_on")} {t(weekdays[arr[Id] - 1])}</h2>
            <Grid className="input-div-holder" container spacing={2}>
              
              <Grid item xs={12} sm={6} className="datepicker">
                <InputLabel className="stall-booking-lable">
                  {t("enter_booking_date")}
                </InputLabel>
                
                {/* <InputLabel className="stall-booking-lable">
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
                  inputProps={{ min: todayFormatted }}
                /> */}
              
                <DatePicker
                  fullWidth
                  className="textfield "
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
                      // console.log('alreadyBooked:', res)
                    });

                    handleOpen(true);
                  }}
                  defaultValue={new Date()}
                  shouldDisableDate={disableDays}
                  minDate={new Date()}
                /> 
                {/* <DatePicker 
                fullWidth 
                className="textfield" 
                renderInput={(props) => <TextField  {...props} size='big' helperText={null} />} 
                value={date}
                // onChange={(newValue) => {
                // setdate(newValue.toISOString().slice(0, 10));
                  
                // }}
                onChange={(newValue) => {
              

              const d = new Date(newValue.toISOString().slice(0,10))
             const weekid = d.getDay()
             console.log(d.getDay())
             if(weekid !== weekId){
               setMessage("change date")
             }else{
               setMessage('')
             }
           setdate(newValue.toISOString().slice(0, 10));
           
             //setNewDate(newValue.toISOString().slice(0, 10))

           }}
                defaultValue={new Date()} 
                shouldDisableDate={disableDays}
                minDate={new Date()}
                /> */}

                {/* <DatePicker
                
                label="Year and Month"
                minDate={todayFormatted}
                
                value={value}
                onChange={(newValue) => {
                   setValue(newValue);
                }}
                renderInput={(props) => <TextField  {...props} size='small' helperText={null} />}
            /> */}
              </Grid>

              <Grid style={{ margin: "auto", marginTop: '0rem' }} item xs={12} sm={6}>


                <InputLabel className="stall-booking-lable">
                  {t("no_of_stalls_required")}
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
                  value={value}
                  onChange={handleChange}

                // margin="normal"

                />
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
                      {lengthofUpdatedData === 34 && (
                        <div className="StallsContainer">
                          {console.log(date , alreadyBookedLocataion)}
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
                      )}
                      {lengthofUpdatedData === 50 && (
                        <div className="StallsContainer">
                          <Stall
                            data={UpdatedData.slice(0, 24)}
                            handleClick={handleClick}
                            bookedStalls={bookedStalls}
                            alreadyBooked={alreadyBooked}
                            date={date}
                            t={t}
                          />
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
                          />}
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
                    <div className="stall-price">{t("booked")}</div>
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
            
            {numberOfSeats !== 0 && bookedStalls.length !== 0? (

              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                <Button
                style={{ width: "110px", height: "40px", paddingLeft: '5rem', paddingRight: '5rem', margin: '1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
                          onClick={handleClickButton}
          >
              {t("Proceed")}
          </Button>
          </div>
          </Grid>
          </Grid>
              
            ) : (

              <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={6}>
                  <div style={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        style={{ width: "110px", height: "40px", paddingLeft: '5rem', paddingRight: '5rem', margin: '1rem', color: 'white', background: "linear-gradient(90deg, #07952b 41%, #0d6a02)", borderRadius: "20px", textAlign: "center", marginTop: "10px", display: "flex", alignItems: "center", justifyContent: "center" }}
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
                        {t("Proceed")}
                      </Button>
                  </div>
                </Grid>
              </Grid>


            )
            }
            </div>
        </div>
      ) : (
        <Spinner />
      )}
      <div className="pageBottom" style={{height: '100px'}}></div>
      {/* {mobile?<NavMenu
        />:console.log("desktop")} */}
    </>
  )
}

export default TestTemp