import "../../styles/Test.css";
import React, { useState, useEffect } from "react";
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link, useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/auth.service";
import FarmerService from "../../services/farmer.service";
import Spinner from "../../components/Spinner";
import "react-toastify/dist/ReactToastify.css";
import { Button, Typography } from "@mui/material";
// Added
import TextField from "@mui/material/TextField";
import { InputLabel } from "@mui/material";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Divider } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { format } from 'date-fns';
import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import NavMenu from "../../components/NavMenu";
import useWindowDimensions from "../../components/useWindowDimensions";

const userCurr = AuthService.getCurrentUser();

function CheckList({ farmersMarket }) {
  const navigate = useNavigate();
  const { REACT_APP_API_URL } = process.env;

  const [data, setdata] = useState();
  const [Loading, setLoading] = useState();
  const { Id } = useParams();
  const today = new Date();
  const todayFormatted = today.toISOString().slice(0, 10);
  const [date, setdate] = useState(null);
  const [message, setMessage] = useState('');
  const [market, setMarket] = React.useState('');
    const[watch,setWatch] = useState(false)
  const arr = { 'Karve Nagar': 2, 'Kondhwa BK':2, 'Hadapsar': 3, 'Undri':3, 'Kharadi IT Park': 4,  'Bramhasun City': 5, 'Wagholi':5, 'Bhavadi Road':6,'Amanora City':7,'Magarpatta':7,'Green City':7}
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  const array ={'Tarkari' : 0,'Exotic' : 0,'Onion-Potato':0,'Masala':0,'Antic':0,'SHG':0,}
    const arr1 = ['Tarkari','Exotic','Onion-Potato','Masala','Antic','SHG']
    const array2 = {'Tarkari':18,'Exotic':1,'Onion-Potato':2,'Masala':1,'Antic':1,'SHG':4}
    //const arr2 = [18,1,2,1,1,4]
    const [isMobile, setIsMobile] = useState(false);
    const [array1,setarray1]  = useState({})
  const [showItems,setShowItems]=useState(false)
const[show,setShow] = useState([])
   console.log("farmerMarket :",farmersMarket)
  useEffect(() => {
    setLoading(true);
    //fetching all the data


    FarmerService.getBookedStalls().then((response) => {
        setdata(response.data);
        setLoading(false)
      });
  }, [date, Id]);
  var items = []

// useEffect(()=>{
  items.push(
    <tr>
      <th className='head'>Stall name</th>
      <th className='head'>Used</th>
      <th className='head' >Left</th>
    </tr>
  )
  
  arr1.forEach((e) => {

    items.push(
      <div className ="checklist" key={e}>
      <tr key={e}>
        <th className='child'>{e}</th>
        <th  className='child'>{array1[e]}</th>
        <th  className='child' >{array2[e] - array1[e]}</th>
      </tr>
        </div>

        
    )
    
  })
 

// },[array1])
  

  const handleSearch = () =>{
   //navigate("/admin/checklistsoln",{state :{arr1:arr1,array1:array1,array2:array2}})

    setWatch(true)
    console.log(array1,array2)
  
    console.log("hello",items)
    setShowItems(true)

   // console.log(data)
   // console.log(date)
    // const newData = data && data.filter((d) =>{
    //     const d1 = d.bookedAt
    //     const d2 = date
    //     return d1 == d2
    // })
    // console.log(newData)
    // const newFinal = newData && newData.filter((d) =>{
    //     const s1 = d.location
    //     const s2 = market
    //     return s1 == s2
    // })
    // console.log(newFinal)
    // newFinal && newFinal.forEach((e) =>{
    //     array[e.stallName] +=1
    // })
    
    // console.log(array)
    
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
    <>

      {!Loading ? (
        <div className="Test">
          

          <div className="main_container_stalls">
            <Link className="backbtn green" to="/admin" sx={{ m: 2 }} style={{ padding: '8px 20px 8px 20px', marginTop: -'570px', marginLeft: '10px' }}>
              Back
            </Link>
            <Grid className="input-div-holder" container spacing={2}>

              <Grid item xs={12} sm={6}>
                <InputLabel className="stall-booking-lable">
                  Enter Booking Date
                </InputLabel>
                
                {console.log(date)}

                


                <DatePicker
                  fullWidth
                  className="textfield"
                  renderInput={(props) => <TextField {...props} size="big" helperText={null} />}
                  value={date}
                  onChange={(newValue) => {
                    // console.log(newValue.$d);
                    const myDate = newValue.$d;
                    const yyyy = myDate.getFullYear();
                    const mm = String(myDate.getMonth() + 1).padStart(2, "0");
                    const dd = String(myDate.getDate()).padStart(2, "0");
                  
                    const formattedDate = `${yyyy}-${mm}-${dd}`;
                    console.log("date:: ",formattedDate);
                    const d = new Date(newValue.toISOString().slice(0, 10));
                    setdate(formattedDate);
                    setMarket('')
                    
                    
                  }}
                  defaultValue={new Date()}
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

              <Grid style={{ margin: "auto", marginTop: '1.8rem' }} item xs={12} sm={6}>


              <FormControl sx={{ m: 1, minWidth: 150 }} size="large">
                <InputLabel id="demo-select-small">Market</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={market}
                    label="Market"
                    onChange={(e)=>{
                      setMarket(e.target.value)
                      console.log("market : ",e.target.value)
                      console.log("data : ", data)
                      const newData = data && data.filter((d) =>{
                      var d1 = new Date(d.bookedAt).toISOString().split('T')[0]
                      var d2 = date
                      console.log(d1,d2)
                      
                  
                      return d1 === d2
                      })
                      console.log("new Data :",newData)
                  const newFinal = newData && newData.filter((d) =>{
                      const s1 = d.location
                         const s2 = e.target.value
                           return s1 === s2
                           })
                      console.log("final Data",newFinal)
                  newFinal && newFinal.forEach((e) =>{
                    array[e.stallName] +=1
                      })
    
                  console.log(array)
                  setarray1(array)
                      
                      }
                    
                    
                    }
                >
                    {
                    farmersMarket.length!==0 && farmersMarket.map((e , i)=>{
                        return(
                        <MenuItem key={i} value={e}>{e}</MenuItem>
                        )
                    })
                    }
                </Select>
                </FormControl>
                

               
              </Grid>
                {/* /////////////////////////////////////////////////////////////////////////////////// */}
            
            <button className='filter_btn1' onClick ={handleSearch } >Search</button>
              {/* <Link to="/checklistsoln" state={}>Search </Link> */}
              
              
            </Grid>

            <Grid container justify="center" alignItems="center" flexDirection='column'>
              {showItems ? <table id="table">
                {items}
              </table> : console.log('no')}
            </Grid>
            
            


          </div>
         
        </div>

      ) : (
        <Spinner />
      )}
      <div className="pageBottom" ></div>

      
     {mobile? <NavMenu
       />:console.log("desktop")}

    
    </>
  );
}

export default CheckList;
