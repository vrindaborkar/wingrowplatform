import React,{useState , useEffect ,useRef} from 'react'
import { Routes, Route ,Link} from "react-router-dom";
import "../../styles/Admin.css";
import Button from "@mui/material/Button";

const EmployeeLanding = () => {
  
  return (
    <>
      {/* <div className='admin_links'>
          <div className="two">
            <Link
            onClick = {()=>{console.log("hello");setFlag(1)}}
            className="admin_links_details twoDetails" >
            Fill today's work
            </Link>
              
            
            <Link 
            onClick = {()=>{console.log("hey");setFlag(2)}}
            className='admin_links_details twoDetails' >Apply for Leave</Link>
          </div>

        </div> */}
        <div className='flagOptions'>
       
          <Link to="/employee/work">
          <div >
        <h2>
          Fill todays work
        </h2>
      
        </div>
        </Link>
        
        <Link to='/employee/leave'>
        <div id='f2'>
        <h2>
          Apply for leave
        </h2>
        </div>
        </Link>
        {/* <Button onClick={()=>setFlag(3)}>
         Get Sheet
        </Button> */}
        
        <Link to='/employee/marketSheet'>
        <div>
        <h2>
         Get Sheet for market
        </h2>
       
        </div>
        </Link>
        </div>

        {/* {flag === 1 ?<div>fill work</div> :{flag === 2 ?<div>apply for leave</div> : <div>none </div>} } */}
        {/* <div className="pageBottom" ></div> */}
      {/* {mobile?<NavMenu
      />:console.log("desktop")} */}
    </>
  )
}

export default EmployeeLanding