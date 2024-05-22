import React, { useState, useEffect } from "react";
import Spinner from "../../components/Spinner";
import { YearPicker } from "react-dropdown-date";
import useWindowDimensions from "../../components/useWindowDimensions";

import { Link } from "react-router-dom";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js';

import { Bar } from 'react-chartjs-2';
import NavMenu from "../../components/NavMenu";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
)
const AdminrevTotal = ({Inward,Outward,}) => {
  var filterIn=[]
  var filterOut =[]
  const revenue = [0,0,0,0,0,0,0,0,0,0,0,0]
const [date, setDate] = useState({ year: ""});
const submit =async () => {
    console.log(date.year);
      //console.log(revenue)
  };
  filterIn = Inward && Inward.filter((e)=>{
    const [d] = e.time.split("T");
    const da = d.substring(0,4)
    return da === date.year
  })
   filterOut = Outward && Outward.filter((e)=>{
    const [d] = e.time.split("T");
    const da = d.substring(0,4)
    return da === date.year
  })
  filterIn && filterIn.forEach((data) =>{
    
    const [d] = data.time.split("T")
    const purchase_quantity = data.purchase_quantity
    const purchase_rate = data.purchase_rate

    var da = Number(d.substring(5,7)) 
    da = da - 1
    const purchase = purchase_quantity*purchase_rate
    revenue[da] = purchase
    console.log(da)
  })
  filterOut && filterOut.forEach((data) =>{
    
    const [d] = data.time.split("T")
    var da = Number(d.substring(5,7))
    da = da - 1
    const sales_quantity = data.sales_quantity
    const sales_rate = data.sales_rate
    const sale = sales_quantity*sales_rate
    revenue[da] -= sale
    console.log(da)
  })
  const data = {
    labels: ['January', 'February', 'March','April','May','June','July','August','September','October','Novemeber','December'],
    datasets: [
      {
        label: 'Data',
        backgroundColor: 'green',
        borderColor: 'black',
        borderWidth: 1,
        data: revenue
      }
    ]
  };
 

  const options = {

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
    <div className="adminMain">
    <div className="year">
    <YearPicker
        defaultValue={"YYYY"}
        start={2015} // default is 1900
        end={2025} // default is current year
        reverse // default is ASCENDING
        value={date.year} // mandatory
        onChange={(year) => {
          // mandatory
          setDate((prev) => ({ ...prev, year }));
        }}
        id={"year"}
        classes={`dropdown`}
      />
      <button type="button" onClick={() => submit()}>
        Submit
      </button>
    </div>
    <div
              style={
                {
                  padding: '20px',
                  width: '70%',
                  marginLeft: '250px'
                }
              }

            >
            <h1>hello</h1>
              <Bar
                data={data}
                options={options}
              >

              </Bar>
            </div>
            <div className="pageBottom" style={{height: '100px'}}></div>
      {mobile?<NavMenu
       />:console.log("desktop")}
    </div>
  )
}

export default AdminrevTotal