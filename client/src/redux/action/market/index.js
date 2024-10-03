import {
  FETCH_MARKET_LIST,
  INIT_MARKET,
} from "../../../constant/actionTypes/market";
import scheduleData from "../../../components/market/data.json";

export const initialMarketScreen = (payload) => {
  return {
    type: INIT_MARKET,
    payload,
    
  };
};

export const fetchMarketListStart = () => {
  return {
    type: FETCH_MARKET_LIST.START,
  };
};

export const fetchMarketListSuccess = (payload) => {
  return {
    type: FETCH_MARKET_LIST.SUCCESS,
    payload,
  };
};

export const fetchMarketListError = (error) => {
  return {
    type: FETCH_MARKET_LIST.ERROR,
    payload: { error }, 
  };
};

export const fetchMarketList = () => {
  return (dispatch) => {
    dispatch(fetchMarketListStart());

    const marketData = {
      data: [],
      schedule: scheduleData.schedule || [],
      cities: scheduleData.cities || {},
      states: scheduleData.states || [],

    };

    dispatch(fetchMarketListSuccess(marketData));
  };

  // return (dispatch) => {
  //     dispatch(userTransactionListFetchStart(payload));

  //     userTransactionService.fetchUserTransactionList(payload).then((userTransactionListData) => {
  //       if (!userTransactionListData.isError) {
  //         dispatch(userTransactionListFetchSuccess(userTransactionListData));
  //       } else {
  //         dispatch(userTransactionListFetchError(userTransactionListData));
  //       }
  //     });
  //   };
};
