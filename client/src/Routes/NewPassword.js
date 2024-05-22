// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import AuthService from "../services/auth.service";
// import { Button } from "@mui/material";
// import NavMenu from "../components/NavMenu";

// export default function NewPassword() {
//   const navigate = useNavigate();
//   const [error, seterror] = useState("");
//   const [data, setData] = useState({
//     phone: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setData((prev) => {
//       return {
//         ...prev,
//         [name]: value,
//       };
//     });
//   };

//   const changePassword = (e) => {
//     e.preventDefault();
//     const { phone, password } = data;
//     if (!phone.match("[0-9]{10}")) {
//       seterror("Please provide valid phone number");
//     } else if (password.length < 6) {
//       seterror("password must be greater than 6 characters");
//     } else {
//       AuthService.newpassword(data.phone, data.password).then(
//         () => {
//           toast.success("Reset Password successful!", {
//             position: "top-center",
//             autoClose: 3000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           });
//           setTimeout(() => {
//             navigate("/resetpasswordsuccessful");
//             window.location.reload();
//           }, 1000);
//         },
//         (error) => {
//           toast.warn("User Does not Exists", {
//             position: "top-center",
//             autoClose: 5000,
//             hideProgressBar: false,
//             closeOnClick: true,
//             pauseOnHover: true,
//             draggable: true,
//             progress: undefined,
//             theme: "light",
//           });
//           setData({
//             phone: "",
//             password: "",
//           });
//           setTimeout(() => {
//             navigate("/login");
//             window.location.reload();
//           }, 1000);
//         }
//       );
//     }
//   };

//   return (
//     <div className="forgot-main-container">
//       <div className="forgot-form-outer">
//         <div className="forgot-form-inner">
//           <img className="form-logo" src="./logo.png" alt="form-logo" />
//           <h3>Please verify your mobile number</h3>
//           <form onSubmit={changePassword}>
//             <input
//               type="phone"
//               name="phone"
//               placeholder="Mobile Number"
//               className="forgot-input"
//               onChange={handleChange}
//             />
//             <input
//               type="password"
//               name="password"
//               placeholder="New Password"
//               className="forgot-input"
//               onChange={handleChange}
//             />
//             <Button
//               type="submit"
//               fullWidth
//               className="forgot-btn"
//               variant="contained"
//               color="success"
//               size="large"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Submit
//             </Button>
//           </form>
//         </div>
//       </div>
//       {/* {mobile?<NavMenu
//       />:console.log("desktop")} */}
//     </div>
//   );
// }
