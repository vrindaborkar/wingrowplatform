import React, { useEffect, useState } from "react";
import StallComponent from "../../components/stall";
import { connect } from "react-redux";
import { init_login, login, logout } from "../../redux/action/auth/login";
import { ProgressBar } from "primereact/progressbar";
import { sendVerificationCode, verifyCode } from '../../redux/action/auth/smg91';
import { fetchStallList, initStall } from "../../redux/action/stall";
import { fetchMarketList } from "../../redux/action/market";
import { useParams } from "react-router-dom";
import { MzToast } from "../../common/MzToast";

const StallScreen = (props) => {
  const {
    fetchStallList,
    initStall,
    fetchMarketList,
    formFieldValueMap,
    isPageLevelError,
    isLoginSuccess,
    isLoading,
    login,
    sendVerificationCode,
    verifyCode,
    isLoggedIn,
    isVerifyLogin,
    logout,
    sendVerificationCodeSuccess,
    userRole,
    stallList,
    marketList,
  } = props;
  const { id } = useParams();
  useEffect(() => {
    fetchStallList(id);
    fetchMarketList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [selectedStall, setSelectedStall] = useState(null);
  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false);

  const handleOnReadRecord = (data) => {
    console.log(data);
  };

  const handleOnDeleteRecord = (data) => {
    setSelectedStall(data);
    setIsDeleteDialogVisible(true);
  };
  const handleOnEditRecord = (data) => {
    console.log(data);
    // history(`${ROUTE_PATH.COMPANY.EDIT.replace(":id", data?.id)}`);
  };

  const handleOnCreatedRecord = (data) => {
    console.log(data);
    // history(ROUTE_PATH.COMPANY.ADD);
  };

  const stallProps = {
    stallList,
    formFieldValueMap,
    isPageLevelError,
    isLoginSuccess,
    isLoading,
    login,
    sendVerificationCode,
    verifyCode,
    isLoggedIn,
    isVerifyLogin,
    logout,
    sendVerificationCodeSuccess,
    fetchStallList,
    isPageLevelError,
    isLoading,
    userRole,
    handleOnReadRecord,
    handleOnDeleteRecord,
    handleOnEditRecord,
    handleOnCreatedRecord,
    marketList,
  };
  console.log("insideTheStallScreen", marketList);
  const renderProgressBar = () => (
    <ProgressBar mode="indeterminate" style={{ height: "6px" }} />
  );

  const getToastProps = () => {
    // if (isDeleteStallSuccess) {
    //   const toastTitle = "Company Delete Successfully";
    //   return {
    //     severity: TOAST_SEVERITY.SUCCESS,
    //     toastTitle,
    //     shouldShowToast: true,
    //   };
    // }
    // if (isDeleteStallError) {
    //   let toastTitle = error ? error : "Error while delete Company";
    //   return {
    //     severity: TOAST_SEVERITY.ERROR,
    //     toastTitle,
    //     shouldShowToast: true,
    //   };
    // }
  };
  return (
    <>
      {isLoading && renderProgressBar()}
      <MzToast {...getToastProps()} />
      <StallComponent stallProps={stallProps} />
    </>
  );
};

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isPageLevelError: state.stallReducer.isPageLevelError,
  isLoading: state.stallReducer.isLoading,
  error: state.stallReducer.error,
  stallList: state.stallReducer.stallList,
  userRole: state.loginReducer.userRole,
  marketList: state.marketReducer.marketList,
  isPageLevelError: state.loginReducer.isPageLevelError,
  isLoading: state.loginReducer.isLoading,
  isLoginSuccess: state.loginReducer.isLoginSuccess,
  isLoginError: state.loginReducer.isLoginError,
  error: state.loginReducer.error,
  isLoggedIn: state.loginReducer?.isLoggedIn,
  isVerifyLogin: state.msg91Reducer.isVerify,
  sendVerificationCodeSuccess:state.msg91Reducer?.sendVerificationCodeSuccess
});

const mapDispatchToProps = (dispatch) => ({
  initStall: () => dispatch(initStall()),
  fetchStallList: (payload) => dispatch(fetchStallList(payload)),
  fetchMarketList: () => dispatch(fetchMarketList()),
  initLoginScreen: () => dispatch(init_login()),
  login: (loginData) => dispatch(login(loginData)),
  sendVerificationCode: (payload) => dispatch(sendVerificationCode(payload)),
  verifyCode: (payload) => dispatch(verifyCode(payload)),
  // logout: () => dispatch(logout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(StallScreen);
