import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from "react-router-dom";
// import NavMenu from '../components/NavMenu';
import useWindowDimensions from '../components/useWindowDimensions';
import { useState,useEffect } from 'react';
export default function RegisterSucces() {

    const navigate = useNavigate();
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
   <div className='congrats-container'>
     <div className='congrats'>
     <img className='congrats-img' src='https://cdn.dribbble.com/users/2644713/screenshots/9068500/media/2ede313bd3f518e4cec6284501bc8f1f.jpg?compress=1&resize=800x600&vertical=top' alt='congrats'/>
      <h1 className='congrats-heading'>Congrats !! </h1>
      <h2 className='congrats-wewin'>We Win.. We Grow..</h2>
      <p className='next-int'>You are now a wingrow member <br/> Please login to proceed</p>
      <hr className='divider'/>
      <Button className='next' onClick={()=>{navigate("/login");}}>Login</Button>
    </div>
    <div className="pageBottom" style={{height: '100px'}}></div>
      {/* {mobile?<NavMenu
       />:console.log("desktop")} */}
   </div>
  )
}
