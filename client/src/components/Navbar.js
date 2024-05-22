import React, { useState, useEffect } from "react";
import '../styles/Styles.css'
import { useNavigate,useLocation } from "react-router-dom";

import { GiHamburgerMenu } from "react-icons/gi";
import { TiDeleteOutline } from "react-icons/ti";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";
import logo from './wingrow-logo.png'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Navbar = ({t}) => {
  const [showMediaIcons, setShowMediaIcons] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [showCustomerBoard, setshowCustomerBoard] = useState(false);
  const [showFarmersBoard, setshowFarmersBoard] = useState(false);
  const [CurrentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  const handleLogout = () => {
    //alert("logged out successfully")
   

    console.log("click")
    toast.success("logout successful!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    setTimeout(()=>{
      setShowMediaIcons(false);

    AuthService.logout();
    setCurrentUser(undefined)
    setshowFarmersBoard(false)
    setshowCustomerBoard(false)
    setShowAdminBoard(false)
    navigate("/login")
    },1000)
  
    
  }

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      if (user.role === "admin") {
        setShowAdminBoard(true);
      }
      else if (user.role === "farmer") {
        setshowFarmersBoard(true)
      } else {
        setshowCustomerBoard(true)
      }
    }
  }, []);

  return (
    <>
      <nav className="main-nav">
        {/* 1st logo part  */}
        <div className="logo">
          <img alt="logo" className="logo_img_navbar" src={logo} />
        </div>

        {/* 2nd menu part  */}
        <div
          className={
            showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
          }>
          <ul>

            <li className="medialinks">
              <Link onClick={() => { setShowMediaIcons(false) }} to="/">
                <div className="profile_wrapper">
                  <img className="profile_logo" src="https://i.pinimg.com/originals/0c/02/ce/0c02ce4850d6b88d44f87271ff5f4a71.png" alt="logo" />
                  <p>{t("home")}</p>
                </div>
              </Link>
            </li>
            <li className="medialinks">
              <Link onClick={() => { setShowMediaIcons(false) }} to="/Routes/About">
                <div className="profile_wrapper">
                  <img className="profile_logo" src="https://www.freeiconspng.com/thumbs/about-us-icon/information-about-us-icon-16.png" alt="logo" />
                  <p>{t("About Us")}</p>
                </div>
              </Link>
            </li>

            {showCustomerBoard &&
              <li className="medialinks">
                <Link onClick={() => { setShowMediaIcons(false) }} to="/customers">
                  <div className="profile_wrapper">
                    <img className="profile_logo" src="https://cdn0.iconfinder.com/data/icons/shopping-at-store/237/mobile-purchase-payment-search-006-512.png" alt="logo" />
                    <p>{t("customers")}</p>
                  </div>
                </Link>
              </li>
            }
            {showFarmersBoard &&
              <li className="medialinks">
                <Link onClick={() => { setShowMediaIcons(false) }} to="/farmers/stallplaces">
                  <div className="profile_wrapper">
                    <img className="profile_logo" src="https://www.freeiconspng.com/thumbs/market-icons/market-icon-18.png" alt="logo" />
                    <p>{t("book_stall")}</p>
                  </div>
                </Link>
              </li>
            }

            {showAdminBoard &&
              <li className="medialinks">
                <Link onClick={() => { setShowMediaIcons(false) }} to="/admin">
                  <div className="profile_wrapper">
                    <img className="profile_logo" src="https://pic.onlinewebfonts.com/svg/img_182707.png" alt="logo" />
                    <p>{t("admin")}</p>
                  </div>
                </Link>
              </li>
            }

            {CurrentUser ?
              <>
                <li className="medialinks">
                  <Link onClick={handleLogout} >

                    <div className="profile_wrapper">
                      <img className="profile_logo" src="http://cdn.onlinewebfonts.com/svg/img_476656.png" alt="logo" />
                      <p>{t("logout")}</p>
                    </div>
                  </Link>
                </li>
                <li className="medialinksProfile" >
                  <Link onClick={() => { setShowMediaIcons(false) }} to="/profile">
                    <div className="profile_wrapper">
                      <img className="profile_logo" src="https://cdn-icons-png.flaticon.com/512/47/47774.png" alt="logo" />
                      <span>{CurrentUser.firstname}</span>
                    </div>
                  </Link>
                </li>
              </> :
              <>
                <li className="medialinksProfile" style={{ marginTop:'-12px'}}>
                  <Link onClick={() => { setShowMediaIcons(false) }} to="/login">
                    <div className="profile_wrapper">
                      <img className="profile_logo" src="https://cdn-icons-png.flaticon.com/512/2609/2609282.png" alt="logo" />
                      <span>{t("login")}</span>
                    </div>
                  </Link>
                </li>

                <li className="medialinksProfile" style={{ marginTop: '-10px' }}>
                  <Link onClick={() => { setShowMediaIcons(false) }} to="/register">
                    <div className="profile_wrapper">
                      <img className="profile_logo" src="https://cdn-icons-png.freepik.com/512/5058/5058685.png" alt="logo" />
                      <span>{t("register")}</span>
                    </div>
                  </Link>
                </li>
              </>
            }
          </ul>
        </div>

        <div className="social-media">
          <div className="hamburger-menu">
            <span onClick={() => setShowMediaIcons(!showMediaIcons)}>
              {showMediaIcons ? <TiDeleteOutline /> : <GiHamburgerMenu />}
            </span>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;