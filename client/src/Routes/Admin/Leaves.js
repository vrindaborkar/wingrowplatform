import React from 'react'
import CardAdmin from '../../components/CardAdmin'
import Button from "@mui/material/Button";
import axios from "axios";

const Leaves = ({Leave}) => {
  console.log("the data is : " , Leave)
  const { REACT_APP_API_URL } = process.env;

  async function accept(id){
    console.log("id has been chosen ",id)
    var approve = "approved"
    await axios.put(REACT_APP_API_URL  + "changeApproval",{id,approve})
      .then((data)=>{
        if(data){
          console.log("updated")
          window.location.reload(false);
        }else{
          console.log("failed")
        }
      })
      .catch((err)=>{
        console.log(err)
      })

  }
  async function decline(id){
    console.log("id has been declined ",id)
  
    var approve = "Napproved"
    await axios.put(REACT_APP_API_URL  + "changeApproval",{id,approve})
      .then((data)=>{
        if(data){
          console.log("updated")
          window.location.reload(false);

        }else{
          console.log("failed")
        }
      })
      .catch((err)=>{
        console.log(err)
      })
  }
  return (
     
    <div className='cards'>
     

          {Leave && Leave.map((d)=>{
            if(d.appoved === "none"){
            return(
            <div>
          <CardAdmin date={d.date} reason ={d.reason} ></CardAdmin>
          {<div> <Button variant="contained"
              color="success"
              size="large" onClick={() => accept(d._id)}>Approve it</Button>  <Button 
              onClick={() => decline(d._id)}
              variant="contained"
              color="error"
              size="large" >NotApprove</Button></div> }
          </div>
          ) }else{
            return (
              <div>
          <CardAdmin date={d.date} reason ={d.reason} ></CardAdmin>
          {d.appoved === "approved" && d.appoved !== "none" ? <Button variant="contained"
              color="success"
              size="large">Approved</Button> : <Button variant="contained"
              color="error"
              size="large">Not Approved</Button> }
          </div>
            )
          }
          
          }) }

          



          
          

         
      
    </div>
  )
}

export default Leaves