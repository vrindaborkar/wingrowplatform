import "../../styles/Admin.css";
import { Routes, Route ,Link} from "react-router-dom";
import { Button } from "@mui/material";
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { blue } from "@mui/material/colors";

const Work =()=>{
    return(
        <div>
        <div className='flag1'>
        <Link to='/employee/'>
        <ArrowLeftIcon sx={{ color: blue[900], fontSize: 45}}></ArrowLeftIcon>
        </Link>
              
        {/* <Button variant="contained">Back</Button> */}
        <iframe src="https://docs.google.com/forms/d/e/1FAIpQLSeCznGJahsaI9E_RyyTV6wkMMbrx8f0DIPnuU1IQmoUyc7PQQ/viewform?embedded=true" width="100%" height="1280" frameborder="0" marginheight="0" marginwidth="0">Loading…</iframe>    </div>
        </div>
    )
}

export default Work;