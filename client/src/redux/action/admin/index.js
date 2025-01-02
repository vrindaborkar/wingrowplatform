import {
  FETCH_FARMER_LIST,
  INIT_FARMER,
  FETCH_CUSTOMER_LIST,
  INIT_CUSTOMER,
  FETCH_CANCELLED_STALLS_LIST,
  INIT_CANCELLED_STALLS,
} from '../../../constant/actionTypes/admin'
import { adminServices } from '../../../services'

export const initialFarmer = payload => {
  return {
    type: INIT_FARMER,
    payload,
  }
}

export const fetchFarmerListStart = payload => {
  return {
    type: FETCH_FARMER_LIST.START,
    payload,
  }
}

export const fetchFarmerListSuccess = payload => {
  return {
    type: FETCH_FARMER_LIST.SUCCESS,
    payload,
  }
}

export const fetchFarmerListError = payload => {
  return {
    type: FETCH_FARMER_LIST.ERROR,
    payload,
  }
}

export const fetchFarmerList = payload => {
  return dispatch => {
    dispatch(fetchFarmerListStart(payload))
    adminServices.fetchFarmerList(payload).then(FarmerData => {
      if (!FarmerData.isError) {
        dispatch(fetchFarmerListSuccess(FarmerData))
      } else {
        dispatch(fetchFarmerListError(FarmerData))
      }
    })
  }
}

export const initialCustomer = payload => {
  return {
    type: INIT_CUSTOMER,
    payload,
  }
}

export const fetchCustomerListStart = payload => {
  return {
    type: FETCH_CUSTOMER_LIST.START,
    payload,
  }
}

export const fetchCustomerListSuccess = payload => {
  return {
    type: FETCH_CUSTOMER_LIST.SUCCESS,
    payload,
  }
}

export const fetchCustomerListError = payload => {
  return {
    type: FETCH_CUSTOMER_LIST.ERROR,
    payload,
  }
}

export const fetchCustomerList = payload => {
  return dispatch => {
    dispatch(fetchCustomerListStart(payload))
    adminServices.fetchCustomerList(payload).then(CustomerData => {
      if (!CustomerData.isError) {
        dispatch(fetchCustomerListSuccess(CustomerData))
      } else {
        dispatch(fetchCustomerListError(CustomerData))
      }
    })
  }
}

export const initialCancelledStalls = payload => {
  return {
    type: INIT_CANCELLED_STALLS,
    payload,
  }
}

export const fetchCancelledStallsStart = payload => {
  return {
    type: FETCH_CANCELLED_STALLS_LIST.START,
    payload,
  }
}

export const fetchCancelledStallsSuccess = payload => {
  return {
    type: FETCH_CANCELLED_STALLS_LIST.SUCCESS,
    payload,
  }
}

export const fetchCancelledStallsError = payload => {
  return {
    type: FETCH_CANCELLED_STALLS_LIST.ERROR,
    payload,
  }
}

export const fetchCancelledStallsList = payload => {
  return dispatch => {
    dispatch(fetchCancelledStallsStart(payload))
    adminServices.fetchCancelledStallsList(payload).then(CustomerData => {
      if (!CustomerData.isError) {
        dispatch(fetchCancelledStallsSuccess(CustomerData))
      } else {
        dispatch(fetchCancelledStallsError(CustomerData))
      }
    })
  }
}
