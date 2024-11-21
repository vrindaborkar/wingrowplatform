import React from "react";
import PaymentPage from "../../components/payment";
import { connect } from "react-redux";
import { initStall } from "../../redux/action/stall";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const PaymentScreen = (props) => {
  const {
    amount,
    bookStalls,
    initStallScreen,
    onPaymentSuccess,
    setShowDetails,
  } = props;
  const navigate = useNavigate();
  const handlePaymentSuccess = () => {
    setShowDetails(false);
    initStallScreen();
    onPaymentSuccess();
    navigate("/farmer");
  };

  return (
    <>
      <PaymentPage
        amount={amount}
        selectedStalls={bookStalls}
        onPaymentSuccess={handlePaymentSuccess}
      />
    </>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    initStallScreen: () => dispatch(initStall()),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    bookStalls: state.stallReducer.selectedStalls,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
