import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import React from 'react';
import '../styles/Admin.css'
const Card = ({header , value }) => {
  return(
    <div className='card_layout'>
      <CardContent className='card-content'>
        <Typography variant="h5" component="div">
          <b className='total-number'>{value}</b>
        </Typography>
        <Typography className='tag' sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {header}
        </Typography>
      </CardContent>
    </div>
  )
};

export default Card;