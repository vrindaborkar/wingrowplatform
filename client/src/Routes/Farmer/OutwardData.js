import React, { useState,useEffect } from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "../../styles/Farmer.css";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
// import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import dayjs from "dayjs";
import FarmerService from "../../services/farmer.service";
import Autocomplete from "@mui/material/Autocomplete";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
// import NavMenu from "../../components/NavMenu";
import useWindowDimensions from "../../components/useWindowDimensions";

const theme = createTheme();

export default function OutwardData({t}) {

  const locations = [
    { location: t("karvenagar_location") },
    { location: t("Kondhwa BK") },
    { location: t("hadapsar_location") },
    { location: t("Undri") },   
    { location: t("kharadi_iT_park_location") },
    { location: t("bramhasun_city_location") },
    { location: t("wagholi_location") },
    { location: t("Bhavadi Road") },
    { location: t("magarpatta_location") },
    { location: t("amanora_city_location") },
    { location: t("Green City") },

  ];

  const options = [
    // Leaves
    { label: t("Amaranthus") },
    { label: t("Beet Root") },
    { label: t("Chukka- sorrel Leaves") },
    { label: t("Colocasia Leaves") },
    { label: t("Curry Leaves") },
    { label: t("Dill") },
    { label: t("Fenugreek Leaves") },
    { label: t("Green Amaranth") },
    { label: t("Spinach") },
    { label: t("Spring Onion") },
    { label: t("Sufflower") },
    // Wild-Antic
    { label: t("Chilli") },
    { label: t(" Colocasia Roots") },
    { label: t("Cucumber Madras") },
    { label: t("Kohlrabi") },
    { label: t("Onion White-Pandhara Kanda") },
    { label: t("Pointed Gourd") },
    { label: t("Pumpkin") },
    { label: t("Raw Jackfruit") },
    { label: t("Raw Papaya") },
    { label: t("Sambhar Kanda") },
    { label: t("Snake Gourd") },
    { label: t("Spiny Gourd") },
    { label: t("Sweet Potato") },
    { label: t("Yam") },
    // Exotic
    { label: t("Asparagus") },
    { label: t("Avocado") },
    { label: t("Baby Corn") },
    { label: t("Baby Potato") },
    { label: t("Basil") },
    { label: t("Broccoli") },
    { label: t("Celery") },
    { label: t("Cherry Tomato") },
    { label: t("chinese Cabbage") },
    { label: t("Coccinia") },
    { label: t("Green Zucchini") },
    { label: t("Iceberg Lettuce") },
    { label: t("Parsley") },
    { label: t("Red Cabbage") },
    { label: t("Red Capsicum") },
    { label: t("Romaine Lettuce") },
    { label: t("Yellow Capsicum") },
    { label: t("Yellow Zucchini") },
    { label: t("Mushroom") },
    { label: t("Sweet Corn") },
    { label: t("Sweet Corn Grains") },
    // Special stall
    { label: t("Cabbage") },
    { label: t("Potato (Agra)") },
    { label: t("Potato (Indore)") },
    { label: t("Potato (Talegav)") },
    // Fruit Vegetables
    { label: t("Beans Double") },
    { label: t("Bitter Gourd") },
    { label: t("Brinjal Big") },
    { label: t("Brinjal Green") },
    { label: t("Brinjal Long Green") },
    { label: t("Brinjal Purple") },
    { label: t("Carrot") },
    { label: t("Cauliflower") },
    { label: t("Chavali Beans") },
    { label: t("Chickpeas - Chana sprouts") },
    { label: t("chilli - Bhavgagari Mirchi") },
    { label: t("Chilli Green") },
    { label: t("chilli Simple") },
    { label: t("Cluster Beans") },
    { label: t("Coconut") },
    { label: t("Colocasia Roots") },
    { label: t("Coriander") },
    { label: t("Cucumber") },
    { label: t("Cucumder Madras") },
    { label: t("Cucumber Madras- Sambar Kakadi") },
    { label: t("Cucumber Polyhouse- English Kakadi") },
    { label: t("Drum Sticks") },
    { label: t("Field Beans") },
    { label: t("Fresh Peeled Green Peas") },
    { label: t("Garlic") },
    { label: t("Ginger") },
    { label: t("Green Capsicum") },
    { label: t("Green Mango") },
    { label: t("Green Peas") },
    { label: t("Groundnut Pods") },
    { label: t("Tamarind") },
    { label: t("Lady Finger") },
    { label: t("Lemon Grass") },
    { label: t("Mint") },
    { label: t("Onion") },
    { label: t("Onion Sambhar") },
    { label: t("Lima Beans") },
    { label: t("Peeled Garlic") },
    { label: t("Potato") },
    { label: t("Radish") },
    { label: t("Ridgegourd") },
    { label: t("Sponge Gourd") },
    { label: t("Tomato") },
    { label: t("Wal") },
    { label: t("Wal Broad") },
    { label: t("Wal surati") },
    { label: t("Water Chestnuts") },
    // Fruit Export
    { label: t("Apple Fuji") },
    { label: t("Apple Green") },
    { label: t("Apple Kinnaur") },
    { label: t("Apple Red Delicious") },
    { label: t("Apple Shimla Big") },
    { label: t("Kiwi") },
    { label: t("Litchi") },
    { label: t("Strawberry") },
    // Fruit Summer
    { label: t("Grapes Black") },
    { label: t("Grapes Green") },
    { label: t("Jambhul") },
    { label: t("Mango Badami (For Juice)") },
    { label: t("Mango Devgad Hapus") },
    { label: t("Mango Keshar") },
    { label: t("Mango Lalbag") },
    { label: t("Mango Payri") },
    { label: t("Mango Ratnagiri Hapus") },
    { label: t("Mango Totapuri") },
    { label: t("Muskmelon") },
    { label: t("Watermelon Kiran") },
    { label: t("Watermelon Regular") },
    // Fruit
    { label: t("Amla") },
    { label: t("Apple Gourd") },
    { label: t("Ashgourd") },
    { label: t("Banana") },
    { label: t("Custard-apple") },
    { label: t("Elaichi Banana") },
    { label: t("Figs") },
    { label: t("Guava") },
    { label: t("Jackfruit Peeled") },
    { label: t("Jujube - Ber") },
    { label: t("Orange Small") },
    { label: t("Orange Kinnow") },
    { label: t("Papaya") },
    { label: t("Pear Imported") },
    { label: t("Pomogranate") },
    { label: t("Raw Banana") },
    { label: t("Sapodilla") },
    { label: t("Sugarcane") },
    { label: t("Sweet Lime") },
    { label: t("Tender") },

  ];


  const [Data, setData] = useState({
    // sales_quantity: undefined,
    total_sales: undefined,
    sales_rate: undefined,
    
    market: "",
  });

  const [commodity, setcommodity] = useState("");

  const handleData = (e) => {
    const { name, value } = e.target;
    console.log(name+" "+value)
    setData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const time = dayjs(Date.now()).format("YYYY-MM-DDTHH:mm:ss");

    if (
      commodity &&
      // Data.sales_quantity &&
      Data.total_sales &&
      Data.sales_rate &&
      
      Data.market &&
      time
    ) {
      FarmerService.postOutward(
        commodity,
        // Data.sales_quantity,
        Data.total_sales,
        Data.sales_rate,
        
        Data.market,
        time
      ).then(
        () => {
          toast.success(t("outward_data_added_successfully"), {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            window.location.reload();
          }, 1000);
        },
        (error) => {
          toast.warn(t("failed_to_add_data"), {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setData({
            market: "",
            total_sales: 0,
            sales_rate: 0,
            // sales_quantity: 0,
            
          });
          setcommodity("");
        }
      );
    } else {
      toast.warn(t("invalid_data"), {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };


  const handleAdd = (event) => {
    event.preventDefault();

    const time = dayjs(Date.now()).format("YYYY-MM-DDTHH:mm:ss");

    if (
      commodity &&
      // Data.sales_quantity &&
      Data.total_sales &&
      Data.sales_rate &&
      
      Data.market &&
      time
    ) {
      FarmerService.postOutward(
        commodity,
        // Data.sales_quantity,
        Data.total_sales,
        Data.sales_rate,
        
        Data.market,
        time
      )
        .then(() => {
          toast.success(t("outward_data_added_successfully"), {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // Clear form fields after successful submission
          setData({
            // sales_quantity: "",
            sales_rate: "",
            total_sales: "",
            market: Data.market, // Preserve the selected market value
          });
          setcommodity("");
        })
        .catch((error) => {
          toast.warn(t("failed_to_add_data"), {
            position: "top-right",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        });
    } else {
      toast.warn(t("invalid_data"), {
        position: "top-right",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };
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
    <div className="data_container">

      <ToastContainer
        position="top-center"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <ThemeProvider theme={theme}>
        <Container className="main" component="main" maxWidth="sm">
          <CssBaseline />
          <Link className="backbtn green" to="/farmers" sx={{ m: 2 }} style={{marginLeft: '20px', marginBottom:'10px', marginTop:'0px',  position: 'relative', top:'15px'}}>
            {t("back")}
          </Link>
          <Box
            className="box2"
            sx={{
              // marginTop: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 0px 10px 0px",
              height: "100%",
              width: "100%",
            }}
          >


            <Typography component="h1" variant="h4" className="outward-heading" sx={{marginBottom:'1.5rem'}}>
                {t("farmer_outward_data")}!!

            </Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ padding: 0, marginTop:'-2.5rem', width:'100%'}}>
              <Grid container spacing={0} >
                <Grid item xs={12} className="select_market">
                  <FormControl sx={{ width: "60%", height: "70px" }}>
                    <Typography className="stall-booking-lable">
                      {t("select_market")}
                    </Typography>
                    <Select
                      style={{
                        height: '40px', // set your desired height
                      }}
                      className="textfield select-market"
                      labelId="demo-simple-select-autowidth-label"
                      id="demo-simple-select-autowidth"
                      value={Data.market}
                      onChange={handleData}
                      // label="market"
                      name="market"
                      required
                      color="success"
                    >
                      {locations.map((e, i) => {
                        return (
                          <MenuItem key={i} value={e.location}>
                            {e.location}
                          </MenuItem>
                        );
                      })}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="select_market">
                  <FormControl sx={{ width: "60%" }}>
                    <Typography className="stall-booking-lable">
                      {t("select_one_commodity")}
                    </Typography>
                    <Autocomplete
                      style={{
                        height: '40px', // set your desired height
                      }}
                      className="textfield"
                      isOptionEqualToValue={(option, value) =>
                        value ? option.value === value.value : false
                      }
                      disablePortal
                      id="combo-box-demo"
                      onChange={(event, value) => setcommodity(value?.label)}
                      value={commodity}
                      options={options}                      
                      sx={{ width: "100%" }}
                      renderInput={(params) => (
                        <TextField

                          color="success"
                          className="textfield"
                          name="commodity"
                          style={{ height: '100%' }}
                          {...params}
                        // label="commodities"
                        />
                      )}
                    />
                  </FormControl>
                </Grid>
                <Grid item xs={12} className="select_market">
                  <FormControl sx={{ width: "60%" }}>
                    <Typography className="stall-booking-lable">
                      {t("Remaining_Sales")} (Rs/kg)<sup>*</sup>
                    </Typography>
                    <TextField
                      InputProps={{
                        style: {
                          height: '40px', // set your desired height
                        },
                      }}
                      className="textfield"
                      required
                      fullWidth
                      color="success"
                      name="total_sales"
                      value={Data.total_sales}
                      onChange={handleData}
                      // label="Sales Rate"
                      type="number"
                      id="total sales"
                      autoComplete="new-total sales"

                    />
                  </FormControl>
                </Grid>
                
                <Grid item xs={12} className="select_market">
                  <FormControl sx={{ width: "60%" }}>
                    <Typography className="stall-booking-lable">
                      {t("sales_rate")} (Rs/kg)<sup>*</sup>
                    </Typography>
                    <TextField
                      InputProps={{
                        style: {
                          height: '40px', // set your desired height
                        },
                      }}
                      className="textfield"
                      required
                      fullWidth
                      color="success"
                      name="sales_rate"
                      value={Data.sales_rate}
                      onChange={handleData}
                      // label="Sales Rate"
                      type="number"
                      id="sales rate"
                      autoComplete="new-sales rate"
                    
                    />
                  </FormControl>
                </Grid>
                
              </Grid>
              <Grid className="add-submit">
                <Button
                  className="btn"
                  onClick={handleAdd}
                  variant="contained"
                  sx={{ m: 1 , marginLeft:{xs:"115px", lg:"180px"}, marginTop:'1rem'}}
                >
                  {t("add")}
                </Button>
                <Button
                  className="btn"
                  type="submit"
                  variant="contained"
                  sx={{ m: 1, marginLeft: { xs: "115px", lg: "180px" }, marginTop: '1rem' }}
                >
                  {t("submit")}
                </Button>
              </Grid>
            </Box>
          </Box>
          <div className="pageBottom" ></div>
        </Container>
      </ThemeProvider>
     
      {/* {mobile?<NavMenu
        />:console.log("desktop")} */}
    </div>
  );
}
