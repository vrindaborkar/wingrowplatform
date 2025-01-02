import {
  FETCH_MARKET_LIST,
  INIT_MARKET,
} from '../../../constant/actionTypes/market'
import { marketService } from '../../../services'

export const initialMarketScreen = payload => {
  return {
    type: INIT_MARKET,
    payload,
  }
}

export const fetchMarketListStart = () => {
  return {
    type: FETCH_MARKET_LIST.START,
  }
}

export const fetchMarketListSuccess = payload => {
  return {
    type: FETCH_MARKET_LIST.SUCCESS,
    payload,
  }
}

export const fetchMarketListError = error => {
  return {
    type: FETCH_MARKET_LIST.ERROR,
    payload: { error },
  }
}

export const fetchMarketList = city => {
  return dispatch => {
    dispatch(fetchMarketListStart())

    marketService
      .fetchMarketList(city)
      .then(marketData => {
        if (!marketData.isError) {
          dispatch(fetchMarketListSuccess({ data: marketData.markets, city }))
        } else {
          dispatch(fetchMarketListError(marketData))
        }
      })
      .catch(error => {
        dispatch(fetchMarketListError(error))
      })
  }
}
