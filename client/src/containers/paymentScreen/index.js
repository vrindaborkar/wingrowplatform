import React from "react";
import PaymentPage from "../../components/payment";
import { connect } from "react-redux";
import { initStall  } from "../../redux/action/stall";

const PaymentScreen = (props) => {
  const { amount ,selectedStalls} =props;
    
  return (
    <>
      <PaymentPage amount={amount}
      selectedStalls={selectedStalls}/>
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
