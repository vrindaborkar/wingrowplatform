import {
  INIT_STALL_BOOKING,
  CREATE_MILTIPLE_STALL_BOOKING_RECORD,
} from '../../../constant/actionTypes/stallBooking'

const initialState = {
  isLoading: false,
  error: null,
  bookingData: null,
}

const stallBookingReducer = (state = initialState, action) => {
  switch (action.type) {
    case INIT_STALL_BOOKING:
      return {
        ...state,
        isLoading: true,
        error: null,
      }

    case CREATE_MILTIPLE_STALL_BOOKING_RECORD.SUCCESS:
      return {
        ...state,
        isLoading: false,
        bookingData: action.payload,
        error: null,
      }

    case CREATE_MILTIPLE_STALL_BOOKING_RECORD.ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      }

    default:
      return state
  }
}

export default stallBookingReducer
