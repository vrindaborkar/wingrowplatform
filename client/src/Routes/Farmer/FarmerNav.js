import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/Farmer.css";
import useWindowDimensions from "../../components/useWindowDimensions";
import { useIdleTimer } from 'react-idle-timer';
// import NavMenu from "../../components/NavMenu";

const FarmerNav = () => {
  const [close, setClose] = useState(true);
  const { width } = useWindowDimensions();


  const idleTimeRef = useRef(null);
const onIdle = () => {
console.log('Log Out');};

const idleTimer = useIdleTimer({
crossTab: true,
ref: idleTimeRef,
timeout: 5000,
onIdle: onIdle})

  useEffect(() => {
    if (width < 800) {
      setClose(false);
    }
  }, [width]);

  return (
    <>
      {!close && (
        <div className="farmers_navigate">
          <img
            className="close_btn"
            onClick={() => setClose(!close)}
            src="https://cdn-icons-png.flaticon.com/512/2989/2989988.png"
            alt="logo"
          />


          <Link className="links_farmersdata red" to="/farmers">
            Book Stall
          </Link>
          <Link className="links_farmersdata green" to="./mybookings">
            My Bookings
          </Link>
          <Link className="links_farmersdata red" to="./inward">
            Fill Inward
          </Link>
          <Link className="links_farmersdata green" to="./outward">
            Fill Outward
          </Link>
          <Link className="links_farmersdata red" to="./farmershome">
            Data
          </Link>
          <Link className="links_farmersdata green" to="./subscription">
            Subscription
          </Link>


        </div>
      )}
      {close && (
        <div className="farmers_close_navigate">
          <img
            className="close_btn"
            onClick={() => setClose(!close)}
            src="https://as2.ftcdn.net/v2/jpg/04/20/10/99/1000_F_420109963_Ykw6qJNRq0dwj8kry6ytLTZtg9w3GJlf.jpg"
            alt="logo"
          />


        </div>
        
      )}
      {/* <NavMenu
       /> */}
    </>
  );
};

export default FarmerNav;
