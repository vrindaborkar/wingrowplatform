import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import AuthService from "../services/auth.service";
import { WithContext as ReactTags } from "react-tag-input";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import firebase from "./firebase";
import '../styles/Styles.css'
import { Link, useNavigate, useLocation } from "react-router-dom";
// import { DatePicker } from '@mui/x-date-pickers/DatePicker';

// import Autocomplete from "@mui/material/Autocomplete";
// import NavMenu from "../components/NavMenu";
import useWindowDimensions from "../components/useWindowDimensions";
//import Select from 'react-select';
const user = AuthService.getCurrentUser();



const options = [
  // Leaves
  { label: "Amaranthus" },
  { label: "Beet Root" },
  { label: "Chukka- sorrel Leaves" },
  { label: "Colocasia Leaves" },
  { label: "Curry Leaves" },
  { label: "Dill" },
  { label: "Fenugreek Leaves" },
  { label: "Green Amaranth" },
  { label: "Spinach" },
  { label: "Spring Onion" },
  { label: "Sufflower" },
  // Wild-Antic
  { label: "Chilli" },
  { label: " Colocasia Roots" },
  { label: "Cucumber Madras" },
  { label: "Kohlrabi" },
  { label: "Onion White-Pandhara Kanda" },
  { label: "Pointed Gourd" },
  { label: "Pumpkin" },
  { label: "Raw Jackfruit" },
  { label: "Raw Papaya" },
  { label: "Sambhar Kanda" },
  { label: "Snake Gourd" },
  { label: "Spiny Gourd" },
  { label: "Sweet Potato" },
  { label: "Yam" },
  // Exotic
  { label: "Asparagus" },
  { label: "Avocado" },
  { label: "Baby Corn" },
  { label: "Baby Potato" },
  { label: "Basil" },
  { label: "Broccoli" },
  { label: "Celery" },
  { label: "Cherry Tomato" },
  { label: "chinese Cabbage" },
  { label: "Coccinia" },
  { label: "Green Zucchini" },
  { label: "Iceberg Lettuce" },
  { label: "Parsley" },
  { label: "Red Cabbage" },
  { label: "Red Capsicum" },
  { label: "Romaine Lettuce" },
  { label: "Yellow Capsicum" },
  { label: "Yellow Zucchini" },
  { label: "Mushroom" },
  { label: "Sweet Corn" },
  { label: "Sweet Corn Grains" },
  // Special stall
  { label: "Cabbage" },
  { label: "Potato (Agra)" },
  { label: "Potato (Indore)" },
  { label: "Potato (Talegav)" },
  // Fruit Vegetables
  { label: "Beans Double" },
  { label: "Bitter Gourd" },
  { label: "Brinjal Big" },
  { label: "Brinjal Green" },
  { label: "Brinjal Long Green" },
  { label: "Brinjal Purple" },
  { label: "Carrot" },
  { label: "Cauliflower" },
  { label: "Chavali Beans" },
  { label: "Chickpeas - Chana sprouts" },
  { label: "chilli - Bhavgagari Mirchi" },
  { label: "Chilli Green" },
  { label: "chilli Simple" },
  { label: "Cluster Beans" },
  { label: "Coconut" },
  { label: "Colocasia Roots" },
  { label: "Coriander" },
  { label: "Cucumber" },
  { label: "Cucumder Madras" },
  { label: "Cucumber Madras- Sambar Kakadi" },
  { label: "Cucumber Polyhouse- English Kakadi" },
  { label: "Drum Sticks" },
  { label: "Field Beans" },
  { label: "Fresh Peeled Green Peas" },
  { label: "Garlic" },
  { label: "Ginger" },
  { label: "Green Capsicum" },
  { label: "Green Mango" },
  { label: "Green Peas" },
  { label: "Groundnut Pods" },
  { label: "Tamarind" },
  { label: "Lady Finger" },
  { label: "Lemon Grass" },
  { label: "Mint" },
  { label: "Onion" },
  { label: "Onion Sambhar" },
  { label: "Lima Beans" },
  { label: "Peeled Garlic" },
  { label: "Potato" },
  { label: "Radish" },
  { label: "Ridgegourd" },
  { label: "Sponge Gourd" },
  { label: "Tomato" },
  { label: "Wal" },
  { label: "Wal Broad" },
  { label: "Wal surati" },
  { label: "Water Chestnuts" },
  // Fruit Export
  { label: "Apple Fuji" },
  { label: "Apple Green" },
  { label: "Apple Kinnaur" },
  { label: "Apple Red Delicious" },
  { label: "Apple Shimla Big" },
  { label: "Kiwi" },
  { label: "Litchi" },
  { label: "Strawberry" },
  // Fruit Summer
  { label: "Grapes Black" },
  { label: "Grapes Green" },
  { label: "Jambhul" },
  { label: "Mango Badami (For Juice)" },
  { label: "Mango Devgad Hapus" },
  { label: "Mango Keshar" },
  { label: "Mango Lalbag" },
  { label: "Mango Payri" },
  { label: "Mango Ratnagiri Hapus" },
  { label: "Mango Totapuri" },
  { label: "Muskmelon" },
  { label: "Watermelon Kiran" },
  { label: "Watermelon Regular" },
  // Fruit
  { label: "Amla" },
  { label: "Apple Gourd" },
  { label: "Ashgourd" },
  { label: "Banana" },
  { label: "Custard-apple" },
  { label: "Elaichi Banana" },
  { label: "Figs" },
  { label: "Guava" },
  { label: "Jackfruit Peeled" },
  { label: "Jujube - Ber" },
  { label: "Orange Small" },
  { label: "Orange Kinnow" },
  { label: "Papaya" },
  { label: "Pear Imported" },
  { label: "Pomogranate" },
  { label: "Raw Banana" },
  { label: "Sapodilla" },
  { label: "Sugarcane" },
  { label: "Sweet Lime" },
  { label: "Tender" },
  { label: "Masale" },
  { label: "Paneer" },
  { label: "Dairy and Milk Products" },
  { label: "Homemade Foods" },
  { label: "Flowers" },
  { label: "Snacks" },
];


export default function Register({ t, languages }) {
  const { state } = useLocation();
  var path;
  var id;
  var bookedStalls
  if (state === null) {
    path = 'register'
  } else {
    path = state.path
    id = state.id

    bookedStalls = state.bookedStalls

  }
  var num = 1;
  const newArray = options.map((option) => ({
    id: String(num++),
    text: option.label,
  }));
  console.log(newArray)

  useEffect(() => {
    if (!!user) {
      AuthService.logout();
      window.location.reload();
    }
  }, []);

  const navigate = useNavigate();
  const [Loading, setLoading] = useState(false);

  const [data, setData] = useState({
    phone: "",
    password: "",
    firstname: "",
    lastname: "",
    type: "",
    farmertype: "",
    address: "",
    // joiningDate :"",
    // employeeID :"",
    // desigination:""
  });

  const [tags, setTags] = React.useState([]);
  const [tag1, setTag] = useState();
  const [error, seterror] = useState("");
  const [disable, setDisable] = useState(false);


  const handleDelete = (i) => {
    const newTags = tags.slice(0);
    newTags.splice(i, 1);
    setTags(newTags);
  };

  const handleAddition = (tag) => {
    setTags([...tags, tag]);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  const handleSubmit = (event) => {
    console.log("inside handleSubmit")
    seterror("");
    event.preventDefault();
    const { phone, firstname, lastname, farmertype, type } = data;

    if (!phone.match("[0-9]{10}")) {
      seterror("Please provide valid phone number");
    } else if (firstname.length === 0 && lastname.length === 0) {
      seterror("Please provide valid first and last name");
    } else if (type.length === 0) {
      seterror("Please select type");
    } else if (type === "farmer" && farmertype.length === 0) {
      seterror("select producer type");
    } else {
      seterror("no error");
      setLoading(true);
      AuthService.register(
        data.phone,
        data.password,
        data.firstname,
        data.lastname,
        data.type,
        data.farmertype,
        data.address,
        // data.desigination,
        // tags,
        // data.employeeID,
        // data.joiningDate,
        
      ).then(
        () => {
          toast.success("Registration successful!", {
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
            //logic
            if (path === 'register') {
              navigate("/registeration-successfull");
            } else {
              navigate("/home/temp/stallsTemp/${Id}/paymentpage", { state: { bookStall: bookedStalls, d: date } })
            }

            window.location.reload();
          }, 1000);
        },
        (error) => {
          toast.warn("User Already Exists", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setData({
            phone: "",
            password: "",
            firstname: "",
            lastname: "",
            type: "",
            farmertype: "",
            address: "",
            // joiningDate :"",
            employeeID :"",
            // desigination:""
          });
          setTimeout(() => {
            //logic
            if (path === 'register') {
              navigate("/login");
            } else {
              navigate("/login", { state: { path: 'stall', id: id, bookedStalls: bookedStalls } });
            }

            window.location.reload();
          }, 1000);
        }
      );
    }
  };
  const configureCaptcha = () => {
    window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {
          // reCAPTCHA solved, allow signInWithPhoneNumber.
          onSignInSubmit();
          console.log("Recaptcha Verified");
        },
        defaultCountry: "IN",
      }
    );
  };

  const onSignInSubmit = (e) => {
    e.preventDefault();
    console.log("here")
    configureCaptcha();
    setDisable(true);
    setTimeout(() => { setDisable(false) }, 5000);
    //check if the user exists

    const phoneNumber = "+91" + data.phone;

    console.log(phoneNumber);

    const appVerifier = window.recaptchaVerifier;
    firebase
      .auth()
      .signInWithPhoneNumber(phoneNumber, appVerifier)
      .then((confirmationResult) => {
        // SMS sent. Prompt user to type the code from the message, then sign the
        // user in with confirmationResult.confirm(code).
        toast.success("OTP SENT!", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        window.confirmationResult = confirmationResult;
        console.log("OTP has been sent");

        // ...
      })
      .catch((error) => {
        // Error; SMS not sent
        // ...
        console.log("SMS Not Sent");
        toast.warn("Invalid Phone Number", {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setData({
          phone: "",
          password: "",
          firstname: "",
          lastname: "",
          type: "",
          farmertype: "",
          address: "",
          // joiningDate :"",
          employeeID :"",
          // desigination:""
        });
        setTimeout(() => {

          //window.location.reload(false);
        }, 1000);
      });

    // AuthService.check(data.phone)
    //   .then(
    //     () => {

    //     },
    //     (error) => {
    //       toast.warn("User Already Exists", {
    //         position: "top-center",
    //         autoClose: 1000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "light",
    //       });
    //       setData({
    //         phone: "",
    //         password: "",
    //         firstname: "",
    //         lastname: "",
    //         type: "",
    //         farmertype: "",
    //         address: "",
    //         // joiningDate :"",
    //         employeeID :"",
    //         // desigination:""
    //       });
    //       setTimeout(() => {
    //         if (path === 'register') {
    //           navigate("/login");
    //         } else {
    //           navigate("/login", { state: { path: 'stall', id: id, bookedStalls: bookedStalls } });
    //         }
    //         // window.location.reload();
    //       }, 1000);
    //     }
    //   );




  };
  const onSubmitOTP = (e) => {
    e.preventDefault();
    const code = data.password;
    console.log(code);
    window.confirmationResult
      .confirm(code)
      .then((result) => {
        //User signed in successfully.
        const user = result.user;
        console.log(JSON.stringify(user));
        // alert("User is Verified");
        toast.success("User Verified", {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });



      })
      .catch((error) => {
        // User couldn't sign in (bad verification code?)

        console.log("error in sumbitotp")
      });
  };
  const [isClearable, setIsClearable] = useState(true);
  const [isSearchable, setIsSearchable] = useState(true);
  const [isDisabled, setIsDisabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRtl, setIsRtl] = useState(false);


  const suggestionsRef = useRef(null);

  function handleScroll(event) {
    event.preventDefault();
    const { scrollTop, scrollHeight, clientHeight } = event.target;
    if (scrollTop === 0) {
      // Scrolled to the top
    } else if (scrollTop + clientHeight === scrollHeight) {
      // Scrolled to the bottom
    } else {
      // Scrolled in the middle
    }
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
    <div className="authContainer">
      <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        color="success"
      />
      {/* Same as */}
      <ToastContainer />
      {!Loading ? (
        <div className="authbox">
          <img
            className="login_image"
            src="./images/2.png"
            alt="logo"
          />
          <form
            className="register_details"
            component="form"
            noValidate

            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <div id="sign-in-button"></div>
            <img className="form-logo" src=".\images\logo.png" alt="form-logo" />
            <Typography className="form-heading" component="h1" variant="h5">
              <span className="heading">Welcome to Wingrow Market</span>
            </Typography>
            <Typography className="form-heading" mt={2} component="h1" variant="h5">
              <span className="heading">Signup with us</span>
            </Typography>

            <Grid className="input-div-holder" container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  InputLabelProps={{
                    className: 'text-lg font-arturo',left: '17px'
                  }}
                  name="firstname"
                  value={data.firstname}
                  onChange={handleChange}
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  color="success"
                  className="textfield"
                />
              </Grid>



              <Grid item xs={12} sm={6}>
                <TextField
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "Arturo" },
                  }}
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastname"
                  value={data.lastname}
                  onChange={handleChange}
                  autoComplete="nope"
                  color="success"
                  className="textfield registerLabel"
                />
              </Grid>
              <Grid item xs={9}  >
                <TextField
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "Arturo" },
                  }}
                  required
                  fullWidth
                  id="phone"
                  label="Mobile Number"
                  name="phone"
                  value={data.phone}
                  onChange={handleChange}
                  color="success"
                  className="textfield"
                  autoComplete="nope"
                />
              </Grid>
              <Grid item xs={3}>
                <Button
                  type="button"
                  fullWidth
                  disabled={disable}
                  onClick={onSignInSubmit}
                  className="signup-btn"
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ mt: 0.5, mb: 0.5 }}
                >
                  <span className="heading">Fetch</span>
                </Button>
              </Grid>

              <Grid item xs={9}  >

                <TextField
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "Arturo" },
                  }}
                  required
                  fullWidth
                  name="password"
                  label="Enter OTP"
                  type="password"
                  id="password"
                  value={data.password}
                  onChange={handleChange}
                  autoComplete="nope"
                  color="success"
                  className="textfield"

                />


              </Grid>
              <Grid item xs={3}>
                {/* <button 
              fullWidth
              className="signup-btn" 
              type="button"
              variant="contained"
                color="success"
                size="large"
              >
              Submit OTP & Register
            </button> */}
                <Button
                  type="button"
                  fullWidth
                  onClick={onSubmitOTP}
                  className="signup-btn"
                  variant="contained"
                  color="success"
                  size="large"
                  sx={{ mt: 0.5, mb: 0.5 }}
                >
                  <span className="heading">Submit</span>
                </Button>
              </Grid>

              <Grid item xs={12}>
                <FormControl
                  className="textfield"
                  sx={{ width: "100%", fontSize: 14 }}
                >
                  <InputLabel
                    inputlabelprops={{
                      style: { fontSize: 14, fontFamily: "Arturo" },
                    }}
                    id="demo-simple-select-helper-label"
                  >
                    <span className="heading">Type</span>
                  </InputLabel>
                  <Select
                    sx={{ fontSize: "1.2rem" }}
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={data.type}
                    label="Type"
                    name="type"
                    onChange={handleChange}
                    color="success"
                  >
                    <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                      value=""
                    >
                      <em className="heading">Select</em>
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                      value={"farmer"}
                    >
                      <span className="heading">farmer</span>
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                      value={"customer"}
                    >
                      <span className="heading">customer</span>
                    </MenuItem>
                    {/* <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                      value={"employee"}
                    >
                      <span className="heading">Employee</span>
                    </MenuItem> */}

                  </Select>
                </FormControl>
              </Grid>

              {data.type === "farmer" && (
                <Grid item xs={12}>
                  <FormControl className='textfield' color="success" sx={{ width: "100%" }}>
                    <InputLabel id="demo-simple-select-helper-label">
                      <span className="heading">Producer Type</span>
                    </InputLabel>
                    <Select
                      sx={{ fontSize: "1.3rem" }}
                      labelId="demo-simple-select-helper-label"
                      id="demo-simple-select-helper"
                      value={data.farmertype}
                      label="farmertype"
                      name="farmertype"
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em className="heading">None</em>
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                        value={"farmers"}
                      >
                        <span className="heading">Farmer</span>
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                        value={"Organic farmers"}
                      >
                        <span className="heading">Organic Farmer</span>
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                        value={"Organic farmers"}
                      >
                        <span className="heading">WSHG/SHG</span>
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                        value={"FPO/FPC"}
                      >
                        <span className="heading">FPO/FPC</span>
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                        value={"Retailer"}
                      >
                        <span className="heading">Retailer</span>
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                        value={"Wholesaler"}
                      >
                        <span className="heading">Wholesaler</span>
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                        value={"Start-up"}
                      >
                        <span className="heading">Start Up</span>
                      </MenuItem>
                      <MenuItem
                        sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                        value={"Vocal for local producers"}
                      >
                        <span className="heading">Vocal for Local Producers</span>
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              )}
              {data.type === "employee" &&
                
                <Grid className="input-div-holder" container spacing={2}>
                <Grid item xs={12} sm={6}>
                <TextField
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "Arturo" },
                  }}
                  // autoComplete="given-name"
                  autoComplete="nope"
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  name="employeeID"
                  value={data.employeeID}
                  onChange={handleChange}
                  
                  fullWidth
                  id="employeeID"
                  label="EmployeeID"
                  autoFocus
                  color="success"
                  className="textfield"
                />
              </Grid>
              {/* <Grid item xs={12} sm={6}>
                <TextField
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "Arturo" },
                  }}
                  
                  fullWidth
                  id="desigination"
                  label="Desigination"
                  name="desigination"
                  value={data.desigination}
                  onChange={handleChange}
                  autoComplete="nope"
                  color="success"
                  className="textfield registerLabel"
                />
              </Grid> */}
              {/* <Grid item xs={9}  >
                
                <DatePicker 
                name ="joiningDate"
                value={data.joiningDate} 
                onChange={date => handleChange({ target: { value: date, name: 'joiningDate' } })}
                renderInput={(props) => <TextField  {...props} size='small' helperText={null} />}


                    />


                  </Grid> */}
                </Grid>
               }


              <Grid item xs={12}>
                <TextField
                  inputProps={{
                    autoComplete: 'off'
                  }}
                  inputlabelprops={{
                    style: { fontSize: 14, fontFamily: "Arturo" },
                  }}
                  fullWidth
                  name="address"
                  label="address (optional)"
                  type="address"
                  id="address"
                  value={data.address}
                  onChange={handleChange}
                  autoComplete="new-address"
                  color="success"
                  className="textfield"
                />
              </Grid>
              {data.type === "farmer" && (
                <Grid item xs={12}>
                  {/* <ReactTags
                    inputProps={{
                      autoComplete: 'off'
                    }}
                    fullWidth
                    tags={tags}
                    suggestions={newArray}
                    handleDelete={handleDelete}
                    handleAddition={handleAddition}
                    placeholder="Add new tag"
                    allowNew={true}
                    autofocus={false}
                    minQueryLength={1}
                    className="textfield"
                    color="success"
                    classNames={{
                      suggestions: 'tag-suggestions'
                    }}
                  /> */}

                </Grid>


              )}
            </Grid>
            {error !== "no error" && (
              <h3
                style={{ alignSelf: "center", color: "red", marginTop: "10px" }}
              >
                {error}
              </h3>
            )}


            <Button item xs={12}
              type="submit"
              fullWidth

              className="signup-btn"
              variant="contained"
              color="success"
              size="large"
              sx={{ mt: 2, mb: 2, height:{xs:"45px"}}}
            >
              <span className="heading">register</span>
            </Button>


            <Grid container justifyContent="center">
              <Grid item>
                <Link className="form-link" to="/login" variant="body2">
                  Already have an account? <span className="login">Log In</span>
                </Link>
              </Grid>
            </Grid>
          </form>
          {/* <form onSubmit={onSubmitOTP}>
            <Grid item xs={12} sm={6}>
              <TextField
                inputlabelprops={{
                  style: { fontSize: 14, fontFamily: "monospace" },
                }}
                required
                fullWidth
                name="password"
                label="Enter OTP"
                type="password"
                id="password"
                value={data.password}
                onChange={handleChange}
                autoComplete="new-password"
                color="success"
                className="textfield"
              />
            </Grid>
            <button className="forgot-btn" type="submit">
              Submit OTP & Register
            </button>
          </form> */}





        </div>
      ) : (
        <Spinner />
      )}
      <div className="pageBottom" ></div>
      {/* {mobile?<NavMenu
        />:console.log("desktop")} */}
    </div>
  );
}