import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea } from '@mui/material';
import './Customer.css'
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    typography: {
      fontSize: 15,
    },
  });

export default function CardsComponent({title , image , description , price}) {
  return (
    <ThemeProvider theme={theme}>
    <Card sx={{ maxWidth: 250 , margin:2 , padding:2}}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={image}
          alt="product image"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {title}
          </Typography>
          {/* <Typography variant="body2" color="text.secondary">
            <b>Ingredients :</b> {description}
          </Typography> */}
        </CardContent>
      </CardActionArea>
      <div className='cards_price_section'>
        {/* <Typography variant="body2" color="text.secondary">
                Price : {price}Rs /125gm
        </Typography> */}
        {/* <Button size="small" color="primary">
          Buy
        </Button> */}
      </div>
    </Card>
    </ThemeProvider>
  );
}