import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  fetchMarketList,
  initialMarketScreen,
} from "../../redux/action/market";
import data from "./data.json";
import MarketComponent from "../../components/market";

const MarketScreen = (props) => {
  const { initMarketScreen, fetchMarketList, marketList, isPageLevelError } =
    props;

  const [cityId, setCityId] = useState(null);

  useEffect(() => {
    initMarketScreen();
  }, [initMarketScreen]);

  useEffect(() => {
    if (cityId) {
      fetchMarketList(cityId);
    }
  }, [cityId, fetchMarketList]);

  return (
    <div>
      <MarketComponent
        marketList={marketList}
        setCityId={setCityId}
        isPageLevelError={isPageLevelError}
        screenPermission={data.screenPermission}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    initMarketScreen: () => dispatch(initialMarketScreen()),
    fetchMarketList: (cityId) => dispatch(fetchMarketList(cityId)),
  };
};

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    marketList: state.marketReducer.marketList,
    isPageLevelError: state.marketReducer.isPageLevelError,
    isLoading: state.marketReducer.isLoading,
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketScreen);
