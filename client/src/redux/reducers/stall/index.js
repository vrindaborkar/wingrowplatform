import {
  INIT_STALL,
  FETCH_STALL_LIST,
  FETCH_STALL_RECORD_BY_ID,
  FETCH_STALL_RECORD_BY_MARKET,
} from "../../../constant/actionTypes/stall";

const INIT_STATE = {
  stallList: [],
  stall: null,
  isLoading: false,
  error: null,
};

const stallReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case INIT_STALL:
      return {
        ...state,
      };
    case FETCH_STALL_LIST.START:
    case FETCH_STALL_RECORD_BY_MARKET.START:
    case FETCH_STALL_RECORD_BY_ID.START: {
      return {
        ...state,
        isLoading: true,
      };
    }
    case FETCH_STALL_LIST.SUCCESS:
    case FETCH_STALL_RECORD_BY_MARKET.SUCCESS:
    case FETCH_STALL_RECORD_BY_ID.SUCCESS:
      return {
        ...state,

        isLoading: false,
      };
    case FETCH_STALL_LIST.ERROR:
    case FETCH_STALL_RECORD_BY_MARKET.ERROR:
    case FETCH_STALL_RECORD_BY_ID.ERROR:
      return {
        ...state,

        isLoading: false,
      };
    default:
      return state;
  }
};
export default stallReducer;
