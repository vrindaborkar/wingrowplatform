import React from "react";
import PaymentPage from "../../components/payment";
import { connect } from "react-redux";
import { initStall  } from "../../redux/action/stall";

const PaymentScreen = (props) => {
  const { amount ,bookStalls } =props;
    
  return (
    <>
      <PaymentPage amount={amount}
      selectedStalls={bookStalls}/>
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
    selectedStalls:state.stallReducer.selectedStalls
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);
