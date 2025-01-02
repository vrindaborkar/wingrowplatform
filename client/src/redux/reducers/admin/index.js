import {
  FETCH_FARMER_LIST,
  FETCH_CUSTOMER_LIST,
  FETCH_CANCELLED_STALLS_LIST,
} from '../../../constant/actionTypes/admin'

const INITIAL_STATE = {
  farmerList: [],
  customerList: [],
  farmer: null,
  customer: null,
  error: null,
  isLoading: false,
  isPageLevelError: false,
  isLoadingPage: false,
}

export const adminReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'INITIAL_STATE':
      return { ...state, isLoadingPage: true }

    case FETCH_FARMER_LIST.START:
      return { ...state, isLoading: true }

    case FETCH_FARMER_LIST.SUCCESS:
      if (action.payload == null) {
        return { ...state }
      }
      return {
        ...state,
        farmerList: action.payload.data,
        error: null,
        isLoading: false,
        isPageLevelError: false,
        isLoadingPage: false,
      }

    case FETCH_FARMER_LIST.ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        isPageLevelError: true,
        isLoadingPage: false,
      }

    case FETCH_CUSTOMER_LIST.START:
      return { ...state, isLoading: true }

    case FETCH_CUSTOMER_LIST.SUCCESS:
      if (action.payload == null) {
        return { ...state }
      }
      return {
        ...state,
        customerList: action.payload.data, // Extracting customerList from data object
        error: null,
        isLoading: false,
        isPageLevelError: false,
        isLoadingPage: false,
      }

    case FETCH_CUSTOMER_LIST.ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        isPageLevelError: true,
        isLoadingPage: false,
      }

    case FETCH_CANCELLED_STALLS_LIST.START:
      return { ...state, isLoading: true }

    case FETCH_CANCELLED_STALLS_LIST.SUCCESS:
      if (action.payload == null) {
        return { ...state }
      }
      return {
        ...state,
        cancelledStallsList: action.payload.cancelledStallsData,
        error: null,
        isLoading: false,
        isPageLevelError: false,
        isLoadingPage: false,
      }

    case FETCH_CANCELLED_STALLS_LIST.ERROR:
      return {
        ...state,
        error: action.payload.error,
        isLoading: false,
        isPageLevelError: true,
        isLoadingPage: false,
      }

    default:
      return state
  }
}

export default adminReducer
