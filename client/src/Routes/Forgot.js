// import React from "react";
// import firebase from "./firebase";

// class App extends React.Component {
//   handleChange = (e) => {
//     const { name, value } = e.target;
//     this.setState({
//       [name]: value,
//     });
//   };

//   configureCaptcha = () => {
//     window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
//       "sign-in-button",
//       {
//         size: "invisible",
//         callback: (response) => {
//           // reCAPTCHA solved, allow signInWithPhoneNumber.
//           this.onSignInSubmit();
//           console.log("Recaptcha Verified");
//         },
//         defaultCountry: "IN",
//       }
//     );
//   };

//   onSignInSubmit = (e) => {
//     e.preventDefault();

//     this.configureCaptcha();

//     const phoneNumber = "+91" + this.state.mobile;
//     // // console.log(values.mobile)
//     // // const phone = values.mobile
//     // const phoneNumber = "+91" + mobile
//     console.log(phoneNumber);

//     const appVerifier = window.recaptchaVerifier;
//     firebase
//       .auth()
//       .signInWithPhoneNumber(phoneNumber, appVerifier)
//       .then((confirmationResult) => {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         window.confirmationResult = confirmationResult;
//         console.log("OTP has been sent");
//         // ...
//       })
//       .catch((error) => {
//         // Error; SMS not sent
//         // ...
//         console.log("SMS not sent");
//       });
//   };
//   onSubmitOTP = (e) => {
//     e.preventDefault();
//     const code = this.state.otp;
//     console.log(code);
//     window.confirmationResult
//       .confirm(code)
//       .then((result) => {
//         // User signed in successfully.
//         const user = result.user;
//         console.log(JSON.stringify(user));
//         alert("User is verified");
//         window.location.href = "/newpassword";
//         // ...
//       })
//       .catch((error) => {
//         // User couldn't sign in (bad verification code?)
//         // ...
//       });
//   };

//   render() {
//     return (
//       <div className="forgot-main-container">
//         {/* Login */}
//         <div className="forgot-form-outer">
//           <div className="forgot-form-inner">
//             <img className="form-logo" src="./logo.png" alt="form-logo" />
//             <h3>Please verify your mobile number</h3>
//             <form onSubmit={this.onSignInSubmit}>
//               <div id="sign-in-button"></div>
//               <input
//                 className="forgot-input"
//                 type="phone"
//                 name="mobile"
//                 placeholder="Mobile Number"
//                 required
//                 onChange={this.handleChange}
//               />
//               <button className="forgot-btn" type="submit">
//                 Send OTP
//               </button>
//             </form>
//             {/* OTP */}
//             <form onSubmit={this.onSubmitOTP}>
//               <input
//                 className="forgot-input"
//                 type="number"
//                 name="otp"
//                 placeholder="OTP"
//                 required
//                 onChange={this.handleChange}
//               />
//               <button className="forgot-btn" type="submit">
//                 Submit OTP
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }
// export default App;
