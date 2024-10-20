import React from "react";
import PaymentPage from "../../components/payment";
import { connect } from "react-redux";
import { initStall } from "../../redux/action/stall";

const PaymentScreen = (props) => {
  const { amount, bookStalls, initStallScreen, onPaymentSuccess } = props;

  const handlePaymentSuccess = () => {
    initStallScreen();
    onPaymentSuccess();
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
