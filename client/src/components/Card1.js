import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function Card1({reason,date,approved}) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      
      <CardContent>
        <Typography gutterBottom variant="h4" component="div">
          Reason : {reason}
        </Typography>
        <Typography variant="h4" >
          Date : { date}
        </Typography>
      </CardContent>
      <CardActions>
      {approved ? <Button variant="contained" color="success" size="large">Approved</Button> : <Button  variant="contained" color="error"  size="large">Not Approved</Button>
}

      </CardActions>
    </Card>
  );
}
