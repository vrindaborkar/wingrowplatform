import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchMarketList,
  initialMarketScreen,
} from "../../redux/action/market";
import data from "./data.json";
import MarketComponent from "../../components/market";

const MarketScreen = (props) => {
  const {
    initMarketScreen,
    fetchMarketList,
    marketList,
    isPageLevelError,
    isLoading,
  } = props;

  useEffect(() => {
    initMarketScreen();
    fetchMarketList();
  }, []);
  const marketProps = {
    marketList,
    screenPermission: data.screenPermission,
    isPageLevelError,
    isLoading,
  };
  return (
    <div>
      <MarketComponent marketProps={marketProps} />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    initMarketScreen: () => dispatch(initialMarketScreen()),
    fetchMarketList: () => dispatch(fetchMarketList()),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    marketList: selectMarketList(state.marketReducer),
  };
};
const selectMarketList = (marketReducer) => {
  return marketReducer.marketList;
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketScreen);
