import "../../styles/Admin.css";
import React from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { blue } from "@mui/material/colors";
import { Routes, Route ,Link} from "react-router-dom";


const MarketSheet =()=>{
    return(
        <div>
        <div className='flag4'>
        <Link to='/employee/'>
        <ArrowLeftIcon sx={{ color: blue[900], fontSize: 45}}></ArrowLeftIcon>
        </Link>
        <Link>
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSc18FtVyyCm13pwELkomlzc87HFP715z918RuGlwPNWXegtoQ/viewform?embedded=true" width="100%" height="3380" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe> </Link>    </div>
        
        </div>
    )
}
export default MarketSheet;