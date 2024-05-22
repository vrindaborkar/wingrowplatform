import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { Link } from "react-router-dom";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import dayjs from 'dayjs'
import NavMenu from "../../components/NavMenu";
import useWindowDimensions from "../../components/useWindowDimensions";

import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)
const Adminrev = ({filterIn,filterOut,
  handleChangeMarket,
  fromDate,
  setfromDate,
  toDate,
  settoDate,
  value,
  setValue,
  handleSearch,
  market,
  farmersMarket,
  open,
  setOpen,
  handleClose,
  handleOpen,
  handleSearchmarkets,
  handleSearchDate,
 
}) => {
  // console.log("in-->",filterIn)
  // console.log("out--->",filterOut)
  const markets = { 'Karve Nagar': 2, 'Kondhwa BK':2, 'Hadapsar': 3, 'Undri':3, 'Kharadi IT Park': 4,  'Bramhasun City': 5, 'Wagholi':5, 'Bhavadi Road':6,'Amanora City':7,'Magarpatta':7,'Green City':7}
  //const markets = { 'Hadapsar': 0, 'Kharadi IT Park': 0, 'Karve Nagar': 0, 'Bramhasun City': 0, 'wanawadi': 0, 'Magarpatta': 0, 'Amanora City': 0 }
  const [date,setDate] = useState(dayjs(new Date()).format("DD/MM/YYYY"))
  const[month,setMonth] = useState()
  const[flag,setFlag] = useState(0)
  const marketIn = new Array(0,0,0,0,0,0,0)
  const marketOut = new Array(0,0,0,0,0,0,0)
  // var filterIn1 = filterIn
  // var filterOut1= filterOut
  const [netMarket,setNewMarket] = useState([])
  


  function byDate(){
 
    filterIn = filterIn && filterIn.filter((arr)=>{
      var yourDateTime = new Date(arr.time)
      const dateTimeInParts = yourDateTime.toISOString().split( "T" ); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]
      let date1 = dateTimeInParts[ 0 ] // "2021-08-31"
      let date2  = dayjs(date).format("YYYY-MM-DD")
      console.log(date1,date2)
      if(date1 == date2){
        return true
      }else{
        return false
      }
    })
    filterOut = filterOut && filterOut.filter((arr)=>{
      var yourDateTime =new Date( arr.time)
       const dateTimeInParts = yourDateTime.toISOString().split( "T" ); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]

    let date1 = dateTimeInParts[ 0 ]; // "2021-08-31"
    let date2  = dayjs(date).format("YYYY-DD-MM")
    //console.log(date1,date2)
    if(date1 == date2){
        return true
      }else{
        return false
      }
    })

    console.log("filter by date ", filterIn,filterOut)

    fun()


  }
  function byMonth(){
    let date2  = dayjs(month).format("YYYY-DD-MM")
    let months = date2.substring(8,10)
    let year = date2.substring(0,4)
   
      //console.log("hemlo-",months,year)
    var firstDay = new Date(year, Number(months)-1, 1);
    var lastDay = new Date(year, Number(months) , 0);

    console.log(dayjs(firstDay).format("YYYY-MM-DD") ,dayjs(lastDay).format("YYYY-MM-DD") )
    filterIn = filterIn && filterIn.filter((arr)=>{
      var yourDateTime = new Date(arr.time)
      
      const dateTimeInParts = yourDateTime.toISOString().split( "T" ); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]

    let date1 = dateTimeInParts[ 0 ] // "2021-08-31"
    console.log(date1)
     if(date1 >= dayjs(firstDay).format("YYYY-MM-DD") && date1 <= dayjs(lastDay).format("YYYY-MM-DD")){
        return true
      }else{
        return false
      }
    })
    filterOut = filterOut && filterOut.filter((arr)=>{
      var yourDateTime = new Date(arr.time)
     
      const dateTimeInParts = yourDateTime.toISOString().split( "T" ); // DateTime object => "2021-08-31T15:15:41.886Z" => [ "2021-08-31", "15:15:41.886Z" ]

    let date1 = dateTimeInParts[ 0 ] // "2021-08-31"
  
    
      if(date1 >= dayjs(firstDay).format("YYYY-MM-DD") && date1 <= dayjs(lastDay).format("YYYY-MM-DD")){
        return true
      }else{
        return false
      }
    })
    
    fun()

  }
  
  useEffect(()=>{
    console.log(netMarket)
  },[netMarket])


  function fun(){
      console.log("data in and out :",filterIn,filterOut)
      filterIn && filterIn.forEach((arr) =>{
        const market = arr.market;
        const purchase_quantity = arr.purchase_quantity
        const purchase_rate = arr.purchase_rate
        const idx = markets[market]
        marketIn[idx] +=purchase_quantity*purchase_rate
      })
      filterOut && filterOut.forEach((arr) =>{
        const market = arr.market;
        const sales_quantity = arr.sales_quantity
        const sales_rate = arr.sales_rate
        const idx = markets[market]
    
        marketOut[idx] += sales_quantity*sales_rate
    
      })
    
      var temp =[]
      marketOut && marketOut.forEach((arr,idx)=>{
        var ans = marketOut[idx] - marketIn[idx]; 
        temp.push(ans)
      })
      setNewMarket(temp)
      temp && temp.forEach((arr) =>{
        console.log("netmarket :",arr)
      })
    
    }
    var data = {
      labels: ['Karve Nagar', 'Kondhwa BK','Hadapsar', 'Undri', 'Kharadi IT Park', ,'Bramhasun City','Wagholi', ,'Bhavadi Road','Amanora City','Magarpatta','Green City'],
      datasets: [
        {
          label: 'Data',
          backgroundColor: 'green',
          borderColor: 'black',
          borderWidth: 1,
          data: netMarket
        ,
      backgroundColor: [
        'rgba(255, 99, 132, 0.3)',
        'rgba(255, 159, 64, 0.3)',
        'rgba(255, 205, 86, 0.3)',
        'rgba(75, 192, 192, 0.3)',
        'rgba(54, 162, 235, 0.3)',
        'rgba(153, 102, 255, 0.3)',
        'rgba(201, 203, 207, 0.3)'
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
        'rgb(153, 102, 255)',
        'rgb(201, 203, 207)'
      ],
      borderWidth: 1,
      // barThickness: 50,
      responsive: true,
    }]
    };
  
 

  const options = {
    responsive: true,
            scales: {
            y: {
                beginAtZero: true,
                max: 1000,
                min: -1006,
                steps : 100
                }
            }

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
    <div className="he">
        <div className='book-btn-section'>
        <h1>Commodity data</h1>
        </div>
        <div className = "main">
        <button onClick ={fun}>Get Full Data</button>
        <button onClick={()=>setFlag(1)}>Get Data by date</button>
        <button onClick={()=>setFlag(2)}>Get Data by month</button>
        {flag === 1 && <div className ="inner-child">
        <DatePicker
        label={'"day"'} views={['day']}
        value={date}
        renderInput={(props) => <TextField  {...props} size='small' helperText={null} />}
        onChange={(newValue) => {const d = new Date(newValue).toLocaleDateString();setDate(d);console.log(d)}}/>
        </div> }
        {flag ===2 && <div className ="inner-child">
        <DatePicker label={'"month" and "year"'} views={['month', 'year']} 
        value={month}
        renderInput={(props) => <TextField  {...props} size='small' helperText={null} />}
        onChange={(newValue) => {const d = new Date(newValue).toLocaleDateString();console.log("hello",d);setMonth(d)}}/>
        </div>} 
        <Button onClick={()=>{
          if(flag === 1){
            byDate()
          }else{
            byMonth()
          }
        }
        }>
          Submit
        </Button>
        
        </div>
        <div className="head">
         <h1>{netMarket}</h1> 
        </div>
        <div className="chart-container" >
              <Bar
                data={data}
                options={options}
                className="graphbar"
              >
              </Bar>
              </div>
              <div className="pageBottom" style={{height: '100px'}}></div>
     {mobile? <NavMenu
        />:console.log("desktop")}
            </div>
  )
}

export default Adminrev