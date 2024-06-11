import {
  FETCH_MARKET_LIST,
  INIT_MARKET,
} from "../../../constant/actionTypes/market";

const INITIAL_STATE = {
  marketList: [],
  market: null,
  error: null,
  isLoading: false,
  isPageLevelError: false,
  isLoadingPage: false,
};

export const marketReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIAL_STATE:
      return { ...state, isLoadingPage: true };

    case FETCH_MARKET_LIST.START:
      return { ...state, isLoading: true };

    case FETCH_MARKET_LIST.SUCCESS:
      if (action.payload == null) {
        return { ...state };
      }
      const { data } = action.payload;
      return {
        ...state,
        marketList: data,
        error: null,
        isLoading: false,
        isPageLevelError: false,
        isLoadingPage: false,
      };

    case FETCH_MARKET_LIST.ERROR:
      const { error } = action.payload;
      return {
        ...state,
        error: error,
        isLoading: false,
        isPageLevelError: true,
        isLoadingPage: false,
      };

    default: {
      return state;
    }
  }
};
export default marketReducer;
