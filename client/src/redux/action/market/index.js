import {
  FETCH_MARKET_LIST,
  INIT_MARKET,
} from "../../../constant/actionTypes/market";

export const initialMarket = (payload) => {
  return {
    type: INIT_MARKET,
    payload,
  };
};

export const fetchMarketListStart = (payload) => {
  return {
    type: FETCH_MARKET_LIST.START,
    payload,
  };
};

export const fetchMarketListSuccess = (payload) => {
  return {
    type: FETCH_MARKET_LIST.SUCCESS,
    payload,
  };
};

export const fetchMarketListError = (payload) => {
  return {
    type: FETCH_MARKET_LIST.ERROR,
    payload,
  };
};

export const fetchMarketList =(payload) => {

    return (dispatch)=>{
        dispatch(fetchMarketListStart(payload));
        
    }
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
}