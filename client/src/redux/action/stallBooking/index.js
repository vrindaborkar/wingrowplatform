import {
  INIT_STALL_BOOKING,
  CREATE_MILTIPLE_STALL_BOOKING_RECORD,
} from '../../../constant/actionTypes/stallBooking'
import { stallBookingService } from '../../../services'

export const initTenant = () => ({
  type: INIT_STALL_BOOKING,
})

export const createMultipleStallBookStart = payload => ({
  type: CREATE_MILTIPLE_STALL_BOOKING_RECORD.START,
  payload,
})

export const createMultipleStallBookSuccess = stallBookings => ({
  type: CREATE_MILTIPLE_STALL_BOOKING_RECORD.SUCCESS,
  payload: stallBookings,
})

export const createMultipleStallBookError = error => ({
  type: CREATE_MILTIPLE_STALL_BOOKING_RECORD.ERROR,
  payload: { error },
})

export const createMultipleStallBook = payload => {
  return dispatch => {
    dispatch(createMultipleStallBookStart(payload))
    stallBookingService.bookMultipleStalls(payload).then(stallBookingData => {
      if (!stallBookingData.isError) {
        dispatch(createMultipleStallBookSuccess(stallBookingData))
      } else {
        dispatch(createMultipleStallBookError(stallBookingData))
      }
    })
  }
}
