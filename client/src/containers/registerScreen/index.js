// import React, { useMemo, useState } from "react";
// import { BASKET_FRUIT, WINGROW_LOGO } from "../../assets/images";
// import { t } from "i18next";
// import { useForm } from "react-hook-form";
// import MzInput from "../../common/MzForm/MzInput";
// import { FORM_FIELDS_NAME } from "./constant";
// import { getBasicValidationRule } from "../../utils/form/from-util";
// import MzDropDown from "../../common/MzForm/MzDropDown/WithFloatLabel";
// import data from "./data.json";
// import { Button } from "primereact/button";
// import { Col, Container, Row } from "react-bootstrap";

// import MzPhoneInput from "../../common/MzForm/MzPhoneInput";
// import { login, register, sendVerificationCode, verifyCode } from "../../redux/action/auth";
// import { useDispatch, useSelector } from "react-redux";
// import { MSG91_AUTH_KEY, TEMPLATE_ID_LOGIN } from "../../constant/msg91";

// const RegisterScreen = () => {
//   const {
//     control,
//     // eslint-disable-next-line
//     formState: { errors, isDirty },
//     handleSubmit,
//     trigger,
//     getValues,
//     setError,
//     watch,
//   } = useForm({
//     defaultValues: useMemo(() => {
//       return {
//         [FORM_FIELDS_NAME.FIRST_NAME]: "",
//         [FORM_FIELDS_NAME.LAST_NAME]: "",
//         [FORM_FIELDS_NAME.MOBILE_NUMBER]: "",
//         [FORM_FIELDS_NAME.ENTER_OTP]: "",
//       };
//     }, []),
//   });

//   const [selectedType, setSelectedType] = useState("");
//   const isLoggedIn = useSelector((state) => state.authReducer?.isLoggedIn);

//   const dispatch = useDispatch();

//   const onSubmit = (data) => {
//     if(isLoggedIn){
//       const payload = {
//         otp: data.otp,
//         mobile: `+${getValues(FORM_FIELDS_NAME.MOBILE)}`,
//         authkey: MSG91_AUTH_KEY,
//       };
//       dispatch(verifyCode(payload));
//     }
//   };

//   const handleFetchOtp = async () => {
//     const result = await trigger(FORM_FIELDS_NAME.MOBILE);
//     if (result) {
//       const payload = {
//         phone: `+${getValues(FORM_FIELDS_NAME.MOBILE)}`,
//         role: getValues(FORM_FIELDS_NAME.TYPE),
//       };
//       dispatch(register(payload));
//       if(isLoggedIn){
//         const payload = {
//           mobile: `+${getValues(FORM_FIELDS_NAME.MOBILE)}`,
//           template_id: TEMPLATE_ID_LOGIN,
//           authkey: MSG91_AUTH_KEY,
//         };
//         dispatch(sendVerificationCode(payload))
//       }
//     }

//    else {
//       setError(FORM_FIELDS_NAME.MOBILE, {
//         type: "manual",
//         message: "Mobile number is required",
//       });
//     }
//   };

//   const getFormErrorMessage = (name) => {
//     return (
//       errors[name] && <small className="p-error">{errors[name].message}</small>
//     );
//   };

//   const watchType = watch(FORM_FIELDS_NAME.TYPE);

//   React.useEffect(() => {
//     setSelectedType(watchType);
//   }, [watchType]);
//   return (
//     <div className="surface-0 md:px-8 mt-3 w-full flex justify-content-center md:align-items-center">
//       <Container fluid className="mt-3 mb-3">
//         <Row className="g-3">
//           <Col
//             lg={6}
//             className=" flex justify-content-center align-items-center "
//           >
//             <div className="hidden lg:block">
//               <img src={BASKET_FRUIT} className="h-30rem" alt="basket_fruit" />
//             </div>
//           </Col>
//           <Col lg={6} className="flex justify-content-center">
//             <div className="flex flex-column align-items-center justify-content-center p-2">
//               <div
//                 style={{
//                   borderRadius: "56px",
//                   padding: "0.3rem",
//                   background:
//                     "linear-gradient(180deg, rgba(224, 52, 54, 0.6) 30%, rgba(104, 214,118, 0.4) 70%)",
//                 }}
//               >
//                 <div
//                   className="w-full text-center surface-card py-5 px-5 sm:px-8 flex flex-column align-items-center"
//                   style={{ borderRadius: "53px" }}
//                 >
//                   <img
//                     src={WINGROW_LOGO}
//                     alt="Wingrow logo"
//                     className="mb-2 w-6rem flex-shrink-0"
//                   />

//                   <h1 className="text-900 font-bold text-xl md:text-3xl mb-2">
//                     {/* Welcome to Wingrow Market */}
//                     {t("welcome_message")}
//                   </h1>
//                   <div className="text-600 mb-2">
//                     {/* {t("register_here")} */}
//                     Signup with us
//                   </div>
//                   <form
//                     onSubmit={handleSubmit(onSubmit)}
//                     className="mt-5 p-fluid"
//                   >
//                     <Container fluid>
//                       <Row className="g-3">
//                         <Col sm={12}>
//                           <MzInput
//                             name={FORM_FIELDS_NAME.FIRST_NAME}
//                             control={control}
//                             label={"First Name"}
//                             rules={
//                               getBasicValidationRule().DEFAULT.VALIDATION_RULE
//                             }
//                             isError={errors[FORM_FIELDS_NAME.FIRST_NAME]}
//                             errorMsg={getFormErrorMessage(
//                               FORM_FIELDS_NAME.FIRST_NAME
//                             )}
//                             wrapperClass={"p-float-label"}
//                           />
//                         </Col>
//                         <Col sm={12}>
//                           <MzInput
//                             name={FORM_FIELDS_NAME.LAST_NAME}
//                             control={control}
//                             label={"Last Name"}
//                             rules={
//                               getBasicValidationRule().DEFAULT.VALIDATION_RULE
//                             }
//                             isError={errors[FORM_FIELDS_NAME.LAST_NAME]}
//                             errorMsg={getFormErrorMessage(
//                               FORM_FIELDS_NAME.LAST_NAME
//                             )}
//                             wrapperClass={"p-float-label"}
//                           />
//                         </Col>
//                         <Col sm={12}>
//                           <div className="p-inputgroup flex-1 justify-content-center align-items-center ">
//                             <div className="w-full ">
//                               <MzPhoneInput
//                                 control={control}
//                                 name={FORM_FIELDS_NAME.MOBILE_NUMBER}
//                                 label={"Mobile Number"}
//                                 rules={
//                                   getBasicValidationRule().DEFAULT
//                                     .VALIDATION_RULE
//                                 }
//                                 isError={errors[FORM_FIELDS_NAME.MOBILE_NUMBER]}
//                                 errorMsg={getFormErrorMessage(
//                                   FORM_FIELDS_NAME.MOBILE_NUMBER
//                                 )}
//                                 country="in"
//                               />
//                             </div>

//                             <div>
//                               <Button
//                                 // icon="pi pi-search"
//                                 label="fetch"
//                                 onClick={() => handleFetchOtp()}
//                                 className="mt-3"
//                               />
//                             </div>
//                           </div>
//                         </Col>
//                         <Col sm={12} >
//                         <div className="p-inputgroup flex-1 justify-content-center align-items-center ">
//                         <div className="w-full ">
//                             <MzInput
//                               name={FORM_FIELDS_NAME.ENTER_OTP}
//                               control={control}
//                               label={"Enter OTP"}
//                               type={"number"}
//                               rules={
//                                 getBasicValidationRule().DEFAULT.VALIDATION_RULE
//                               }
//                               isError={errors[FORM_FIELDS_NAME.ENTER_OTP]}
//                               errorMsg={getFormErrorMessage(
//                                 FORM_FIELDS_NAME.ENTER_OTP
//                               )}
//                               wrapperClass={"p-float-label"}
//                             />
//                           </div>

//                           <div>
//                             <Button label="Submit"className="mt-3"/>
//                           </div>
//                           </div>
//                         </Col>
//                         <Col sm={12}>
//                           <MzDropDown
//                             name={FORM_FIELDS_NAME.TYPE}
//                             control={control}
//                             optionLabel={"name"}
//                             optionValue={"name"}
//                             options={data.type}
//                             label={"Type"}
//                             rules={
//                               getBasicValidationRule().DEFAULT.VALIDATION_RULE
//                             }
//                             isError={errors[FORM_FIELDS_NAME.TYPE]}
//                             errorMsg={getFormErrorMessage(
//                               FORM_FIELDS_NAME.TYPE
//                             )}
//                             wrapperClass={"p-float-label"}
//                             labelClassName={"ml-2"}
//                           />
//                         </Col>
//                         {selectedType === "Farmer" && (
//                           <Col sm={12}>
//                             <MzDropDown
//                               name={FORM_FIELDS_NAME.PRODUCT}
//                               control={control}
//                               optionLabel={"name"}
//                               optionValue={"value"}
//                               options={data.product}
//                               label={"Product"}
//                               rules={
//                                 getBasicValidationRule().DEFAULT.VALIDATION_RULE
//                               }
//                               isError={errors[FORM_FIELDS_NAME.PRODUCT]}
//                               errorMsg={getFormErrorMessage(
//                                 FORM_FIELDS_NAME.PRODUCT
//                               )}
//                               wrapperClass={"p-float-label"}
//                               // labelClassName={"ml-2"}
//                             />
//                           </Col>
//                         )}

//                         <Col sm={12}>
//                           <MzInput
//                             name={FORM_FIELDS_NAME.ADDRESS}
//                             control={control}
//                             label={"Address"}
//                             rules={
//                               getBasicValidationRule().DEFAULT.VALIDATION_RULE
//                             }
//                             isError={errors[FORM_FIELDS_NAME.ADDRESS]}
//                             errorMsg={getFormErrorMessage(
//                               FORM_FIELDS_NAME.ADDRESS
//                             )}
//                             wrapperClass={"p-float-label"}
//                           />
//                         </Col>
//                       </Row>
//                     </Container>
//                     <Button
//                       type="submit"
//                       label="submit"
//                       raised
//                       className="w-50"
//                     />
//                   </form>
//                 </div>
//                 {/* <div className="lg:hidden block">
//              <img src={BASKET_FRUIT} className="h-30rem" alt="basket_fruit" /></div>
//                  */}
//               </div>
//             </div>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   );
// };

// export default RegisterScreen;



import React, { useEffect } from "react";
import { ProgressBar } from "primereact/progressbar";
import RegisterComponent from "../../components/register";

import { connect } from "react-redux";
import { MzToast, TOAST_SEVERITY } from "../../common/MzToast";
import { init_register, register } from "../../redux/action/auth/register";
import { sendVerificationCode, verifyCode } from "../../redux/action/auth/smg91";

const RegisterScreen = (props) => {
  const {
    initRegisterScreen,
    formFieldValueMap,
    isPageLevelError,
    isLoading,
    isRegisterSuccess,
    isRegisterError,
    error,
    register,
    sendVerificationCode,
    verifyCode,
    isLoggedIn,
    logout,
    sendVerificationCodeSuccess
  } = props;

  useEffect(() => {
    initRegisterScreen();
    // eslint-disable-next-line
  }, []);

  const registerProps = {
    formFieldValueMap,
    isPageLevelError,
    isRegisterSuccess,
    isLoading,
    register,
    sendVerificationCode,
    verifyCode,
    isLoggedIn,
    logout,
    sendVerificationCodeSuccess
  };

  const getToastProps = () => {
    if (isRegisterSuccess) {
      const toastTitle = "Registered Successfully";
      return {
        severity: TOAST_SEVERITY.SUCCESS,
        toastTitle,
        shouldShowToast: true,
      };
    }
    if (isRegisterError) {
      const toastTitle = "Error during registration";
      return {
        severity: TOAST_SEVERITY.ERROR,
        toastTitle,
        shouldShowToast: true,
      };
    }
  };

  const renderProgressBar = () => {
    return <ProgressBar mode="indeterminate" style={{ height: "6px" }} />;
  };

  return (
    <div>
      {isLoading && renderProgressBar()}
      <MzToast {...getToastProps()} />
      <RegisterComponent registerProps={registerProps} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    initRegisterScreen: () => dispatch(init_register()),
    register: (registerData) => dispatch(register(registerData)),
    sendVerificationCode:(payload)=>  dispatch(sendVerificationCode(payload)),
    verifyCode:(payload)=>  dispatch(verifyCode(payload)),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    formFieldValueMap: selectFormFieldValueMap(state.registerReducer),
    isPageLevelError: state.registerReducer.isPageLevelError,
    isLoading: state.registerReducer.isLoading,
    isRegisterSuccess: state.registerReducer.isRegisterSuccess,
    isRegisterError: state.registerReducer.isRegisterError,
    error: state.registerReducer.error,
  };
};

const selectFormFieldValueMap = (registerReducer) => {
  return registerReducer.formFieldValueMap;
};

export default connect(mapStateToProps, mapDispatchToProps)(RegisterScreen);
