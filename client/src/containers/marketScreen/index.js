import React, { useEffect } from "react";
import { connect } from "react-redux";
import {
  fetchMarketList,
  initialMarketScreen,
} from "../../redux/action/market";
import data from "./data.json";
import MarketComponent from "../../components/market";
import { init } from "aos";

const MarketScreen = (props) => {
  const {
    initMarketScreen,
    fetchMarketList,
    marketList,
    schedule,
    cities,
    states,
    isLoading,
    isPageLevelError,
  } = props;

  useEffect(() => {
    initMarketScreen();
    fetchMarketList();
  }, [initMarketScreen, fetchMarketList]);

  return (
    <div>
      <MarketComponent
        marketList={marketList}
        isPageLevelError={isPageLevelError}
        isLoading={isLoading}
        screenPermission={data.screenPermission}
        schedule={schedule}
        cities={cities}
        states={states}
      />
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
    marketList: state.marketReducer.marketList,
    isPageLevelError: state.marketReducer.isPageLevelError,
    isLoading: state.marketReducer.isLoading,
    schedule: state.marketReducer.schedule,
    cities: state.marketReducer.cities,
    states: state.marketReducer.states,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketScreen);
