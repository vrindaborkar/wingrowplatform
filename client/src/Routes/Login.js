import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";

import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import { Link, useNavigate,useLocation } from "react-router-dom";
import AuthService from "../services/auth.service";
import Spinner from "../components/Spinner";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// import usePrevLocation from '../hooks/usePrevLocation'
import { parsePhoneNumberFromString } from 'libphonenumber-js';
// import NavMenu from "../components/NavMenu";
import useWindowDimensions from "../components/useWindowDimensions";

const user = AuthService.getCurrentUser();

export default function SignIn({date, t}) {
  useEffect(() => {
    if (!!user) {
      AuthService.logout().then(
        ()=>{
          toast.success("Login successful!", {
            position: "top-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          
  
        }
      )
      window.location.reload();
    }
  }, []);

  const navigate = useNavigate();
  const {state} = useLocation();
  const [mobile, setmobile] = useState(false)

  const { width } = useWindowDimensions()

  useEffect(() => {
    if (width < 850) {
      setmobile(true)
    } else {
      setmobile(false)
    }
  }, [width])


   var path ;
  var id;
  var bookedStalls
  if(state === null){
    path  = 'login'
  }else{
    id = state.id
    path = state.path
    bookedStalls = state.bookedStalls
  }
  //const path =  state.path || null
  console.log("hello",path)
  console.log("date is ",date)
  //console.log("the prev",history.location.from)
  const [Loading, setLoading] = useState(false);
  const [data, setData] = useState({
    phone: "",
    password: "hello",
  });

  function isValidPhoneNumber(phone) {
    try {
      const phoneNumber = parsePhoneNumberFromString(phone);
      console.log("hi",phoneNumber)
      return phoneNumber.isValid();
    } catch (e) {
      return false;
    }
  }
  const handleChange = (e) => {
    const { name, value } = e.target;
    const phoneNumber = isValidPhoneNumber(value);
      console.log("hello--",phoneNumber)
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleChangeRole = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  }

  
  
  const handleLogin = (e) => {
    e.preventDefault();
    if ( data.phone) {
      const phoneNumber = isValidPhoneNumber(data.phone);
      console.log("hello",phoneNumber)
      // if(phoneNumber.isValid()){
      //   console.log("good to go")
      // }else{
      //   console.log("nope")
      // }
      setLoading(true);
      AuthService.login(data.phone, data.role, data.password).then(
        (res) => {
          if (res.role === "farmer") {
            toast.success("Login successful!", {
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
              if(path === 'login'){
                navigate("/farmers");
              }else{
                navigate("/home/temp/stallsTemp/${Id}/paymentpage" ,{state : {bookStall : bookedStalls,d:date}})
              }
              
              window.location.reload();
            }, 1000);
          }
          if (res.role === "admin") {
            toast.success("Login successful!", {
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
              navigate("/admin");
            window.location.reload();
            }, 1000);
          }
          if (res.role === "employee") {
            toast.success("Login successful!", {
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
              navigate("/employee");
            window.location.reload();
            }, 1000);
          }
          if (res.role === "customer") {
            toast.success("Login successful!", {
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
              navigate("/customers");
              window.location.reload();
            }, 1000);
          }
          setLoading(false);
        },
        (error) => {
          console.log(error)
          toast.warn("Login failed", {
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
          });
          setLoading(false);
        }
      );
    } else {
      toast.warn("data invalid", {
        position: "top-center",
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
          <form autocomplete='new-password' onSubmit={handleLogin} className="login_details">
            
            <img className="form-logo" src=".\images\logo.png" alt="form-logo" />
            <Typography component="h1" variant="h5" className="form-link">
              <span className="heading" style={{fontweight:'bold', fontSize:'20px'}}>{t("welcome_message")}</span>
            </Typography>
            <Typography mt={2} component="h1" variant="h5">
              <span className="heading" style={{fontweight:'bold', fontSize:'20px'}} >{t("login_here")}</span>
            </Typography>
            <TextField
              sx={{width: "80%", marginLeft: "0rem"}}
              inputProps={{
                autoComplete: 'off'
              }}

              inputlabelprops={{
                style: { fontSize: 16, fontFamily: 'Arturo' }, 
              }}
              
              margin="normal"
              required
              fullWidth
              id="phone"
              label="Mobile Number"
              name="phone"
              value={data.phone}
              
              autoFocus
              color="success"
              className="heading input"
              // className="textfield"
              onChange={handleChange}
            />
            <FormControl
                  className="textfield"
                  sx={{ width: "80%", marginLeft: "0rem", fontSize: "14"}}
                >
            <InputLabel
                    inputlabelprops={{
                      style: { fontSize: 14, fontFamily: "Arturo" },
                    }}
                    id="demo-simple-select-helper-label"
                  >
                    <span className="heading">Role</span>
                  </InputLabel>
            <Select
                sx={{width: "100%", marginLeft: "0rem"}}
                    inputProps={{
                      autoComplete: 'off'
                    }}
      
                    inputlabelprops={{
                      style: { fontSize: 16, fontFamily: 'Arturo' }, 
                    }}
                    margin="normal"
                    required
                    fullWidth
                    id="role"
                    label="Role"
                    name="role"
                    value={data.role}
                    autoFocus
                    color="success"
                    className="heading input"
              // className="textfield"
                    onChange={handleChangeRole}
                  >
                    {/* <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                      value=""
                    >
                      <em className="heading3">Select</em>
                    </MenuItem> */}
                    <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                      value={"farmer"}
                    >
                      <span className="heading3">farmer</span>
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                      value={"customer"}
                    >
                      <span className="heading3">customer</span>
                    </MenuItem>
                    <MenuItem
                      sx={{ fontSize: "1.3rem", fontFamily: "Arturo" }}
                      value={"admin"}
                    >
                      <span className="heading3">admin</span>
                    </MenuItem>

                  </Select></FormControl>
          
           
            {/* <Link className="form-link" to={"/Forgot"} variant="body2">
              {t("forgot_password")}
            </Link> */}
            <Button
              className="form-btn"
              type="submit"
              color="success"
              variant="contained"
              size="large"
              sx={{ mt: 3, mb: 2 }}
            >
              {t("login")}
            </Button>
            <Typography className="form-link" mt={2}>
              <span className="heading" style={{fontweight:'bold', fontSize:'15px'}}>{t("new_to_wingrow")}</span>
               {/* <Link to="/Register"   variant="body2" className="form-link">
                 Signup with us
              </Link> */}
              <Link to ={{
                pathname: "/Register", 
                state: { 
                  path:'stall',
                  id : id, 
                  bookedStalls : bookedStalls
          }
          }} >
                {t("register")}
        </Link>

            </Typography>
          </form>
        </div>
      ) : (
        <Spinner />
      )}<div className="pageBottom" style={{height: '100px'}}></div>
      {/* {mobile?<NavMenu
       />:console.log('desktop')} */}
    </div>
  );
}