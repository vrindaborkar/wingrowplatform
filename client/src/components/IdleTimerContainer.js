import { useRef } from "react";
import { useIdleTimer } from "react-idle-timer";
import AuthService from "../services/auth.service";
import {useState} from "react"
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

function IdleTimerContainer() {
  const navigate = useNavigate();

  const idleTimeRef = useRef(null);
  const onIdle = () => {
    console.log("hey--",window.location.pathname)
    if(window.location.pathname === "/login")
    {
      //do nothing
    }else{

    console.log("Log Out");
    toast.success("Timeout!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    AuthService.logout()
    
    navigate("/login");

    setFlag(false)
    
  }
  };
  const idleTimer = useIdleTimer({
    crossTab: true,
    ref: idleTimeRef,
    timeout: 60*1000*10,
    onIdle: onIdle,
  });
  const [flag,setFlag] = useState(true)
  return (
    
  <div>
  {/* {flag && <h1>hello </h1>}
  {!flag && <h2>logged out</h2>} */}
 
  <div idleTimer={idleTimer}>
  </div>
  </div>
  );

}

export default IdleTimerContainer;
