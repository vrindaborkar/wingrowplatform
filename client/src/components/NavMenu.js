// import React, { useState, useEffect } from "react";
// import '../styles/Styles.css'
// import { useNavigate,useLocation } from "react-router-dom";
// import { GiHamburgerMenu } from "react-icons/gi";
// import { TiDeleteOutline } from "react-icons/ti";
// import { Link } from "react-router-dom";
// import AuthService from "../services/auth.service";
// import logo from './wingrow-logo.webp'
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";


// const NavMenu = () => {
 
//     const user = AuthService.getCurrentUser();

//     const [showMediaIcons, setShowMediaIcons] = useState(true);
//     const [showAdminBoard, setShowAdminBoard] = useState(false);
//     const [showCustomerBoard, setshowCustomerBoard] = useState(false);
//     const [showFarmersBoard, setshowFarmersBoard] = useState(false);
//     const [showEmployesBoard, setshowEmployesBoard] = useState(false);
  
//     const [CurrentUser, setCurrentUser] = useState(undefined);
//     const navigate = useNavigate();
//     const handleLogout = () => {
//         //alert("logged out successfully")
       
    
//         console.log("click")
//         toast.success("logout successful!", {
//           position: "top-center",
//           autoClose: 3000,
//           hideProgressBar: false,
//           closeOnClick: true,
//           pauseOnHover: true,
//           draggable: true,
//           progress: undefined,
//           theme: "light",
//         });
//         setTimeout(()=>{
//           setShowMediaIcons(false);
    
//         AuthService.logout();
//         setCurrentUser(undefined)
//         setshowFarmersBoard(false)
//         setshowCustomerBoard(false)
//         setShowAdminBoard(false)
//         setshowEmployesBoard(false)
//         navigate("/login")
//         },1000)
        
//       }
//       const handleLogout1 = () => {
       
//         setTimeout(()=>{
//           setShowMediaIcons(false);
    
//         AuthService.logout();
//         setCurrentUser(undefined)
//         setshowFarmersBoard(false)
//         setshowCustomerBoard(false)
//         setShowAdminBoard(false)
//         setshowEmployesBoard(false)
//         navigate("/login")
//         },1000)
        
//       }
    
//       useEffect(() => {
    
//         if (user) {
//           setCurrentUser(user);
//           if (user.role === "admin") {
//             setShowAdminBoard(true);
//           }
//           else if (user.role === "farmer") {
//             setshowFarmersBoard(true)
//           } else if(user.role === "customer")  {
//             setshowCustomerBoard(true)
//           }else{
//             setshowEmployesBoard(true)
//           }
//         }else{
//           console.log("logout helo")
//           handleLogout1()
//         }
//       }, [user]);
    
    
     
//       return (
        
//       <div
//         className={
//           showMediaIcons ? "menu-link mobile-menu-link" : "menu-link"
//         }>
//         <ul>

//           <li className="medialinks">
//             <Link onClick={() => { setShowMediaIcons(false) }} to="/">
//               <div className="profile_wrapper">
//                 <img className="profile_logo" src="https://i.pinimg.com/originals/0c/02/ce/0c02ce4850d6b88d44f87271ff5f4a71.png" alt="logo" />
//                 <p>Home</p>
//               </div>
//             </Link>
//           </li>

//           {showCustomerBoard &&
//             <li className="medialinks">
//               <Link onClick={() => { setShowMediaIcons(false) }} to="/customers">
//                 <div className="profile_wrapper">
//                   <img className="profile_logo" src="https://cdn0.iconfinder.com/data/icons/shopping-at-store/237/mobile-purchase-payment-search-006-512.png" alt="logo" />
//                   <p>Customers</p>
//                 </div>
//               </Link>
//             </li>
//           }
//           {showFarmersBoard &&
//             <li className="medialinks">
//               <Link onClick={() => { setShowMediaIcons(false) }} to="/farmers/stallplaces">
//                 <div className="profile_wrapper">
//                   <img className="profile_logo" src="https://www.freeiconspng.com/thumbs/market-icons/market-icon-18.png" alt="logo" />
//                   <p>Book Stall</p>
//                 </div>
//               </Link>
//             </li>
//           }

//           {showAdminBoard &&
//             <li className="medialinks">
//               <Link onClick={() => { setShowMediaIcons(false) }} to="/admin">
//                 <div className="profile_wrapper">
//                   <img className="profile_logo" src="https://pic.onlinewebfonts.com/svg/img_182707.png" alt="logo" />
//                   <p>Admin</p>
//                 </div>
//               </Link>
//             </li>
//           }
//           {showEmployesBoard &&
//             <li className="medialinks">
//               <Link onClick={() => { setShowMediaIcons(false) }} to="/employee">
//                 <div className="profile_wrapper">
//                   <img className="profile_logo" src="https://pic.onlinewebfonts.com/svg/img_182707.png" alt="logo" />
//                   <p>Employee</p>
//                 </div>
//               </Link>
//             </li>
//           }

//           {CurrentUser ?
//             <>
//               <li className="medialinks">
//                 <Link onClick={handleLogout} >

//                   <div className="profile_wrapper">
//                     <img className="profile_logo" src="http://cdn.onlinewebfonts.com/svg/img_476656.png" alt="logo" />
//                     <p>Logout</p>
//                   </div>
//                 </Link>
//               </li>
//               <li className="medialinksProfile" >
//                 <Link onClick={() => { setShowMediaIcons(false) }} to="/profile">
//                   <div className="profile_wrapper">
//                     <img className="profile_logo" src="https://cdn-icons-png.flaticon.com/512/47/47774.png" alt="logo" />
//                     <span>{CurrentUser.firstname}</span>
//                   </div>
//                 </Link>
//               </li>
//             </> :
//             <>
//               <li className="medialinksProfile" style={{ marginTop:'-12px'}}>
//                 <Link onClick={() => { setShowMediaIcons(false) }} to="/login">
//                   <div className="profile_wrapper">
//                     <img className="profile_logo" src="https://cdn-icons-png.flaticon.com/512/2609/2609282.png" alt="logo" />
//                     <span>Login</span>
//                   </div>
//                 </Link>
//               </li>

//               <li className="medialinks" style={{ marginTop: '0px' }}>
//                 <Link onClick={() => { setShowMediaIcons(false) }} to="/register">
//                   <div className="profile_wrapper">
//                     <img className="profile_logo" src="https://cdn-icons-png.flaticon.com/512/2910/2910756.png" alt="logo" />
//                     <span>Register</span>
//                   </div>
//                 </Link>
//               </li>
//             </>
//           }
//         </ul>
//       </div>
//   );
// };

// export default NavMenu;