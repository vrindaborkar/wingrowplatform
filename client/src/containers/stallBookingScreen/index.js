import React, { useEffect } from "react";
import { connect } from "react-redux";
import StallBookingComponent from "../../components/stallBooking";
import { initialStallBookingScreen } from "../../redux/action/stallBooking";
import { fetchStallList } from "../../redux/action/stall";

const StallBookingScreen = (props) => {
  const {
    initStallBookingScreen,
    fetchStallList,
    isPageLevelError,
    isLoading,
    stallList,
  } = props;

  useEffect(() => {
    // initStallBookingScreen();
    // fetchStallList();
    //eact-hooks/rules-of-hooks
  }, []);

  const stallBookingProps = {
    stallList,
    isPageLevelError,
    isLoading,
  };
  return (
    <div>
      <StallBookingComponent stallBookingProps={stallBookingProps} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    // initStallBookingScreen: () => dispatch(initialStallBookingScreen()),
    // fetchStallList: () => dispatch(fetchStallList()),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    // stallList: selectStallList(state.stallReducer),
  };
};

const selectStallList = (stallReducer) => {
  return stallReducer.stallList;
};

export default connect(mapStateToProps,mapDispatchToProps)(StallBookingScreen);
