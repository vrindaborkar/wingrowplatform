import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import {
  fetchMarketList,
  initialMarketScreen,
} from '../../../../redux/action/market'
import data from './data.json'
import MarketComponent from '../../../../components/farmer/subcriptionMarket/market'

const SubMarketScreen = props => {
  const { initMarketScreen, fetchMarketList, marketList, isPageLevelError } =
    props

  const [city, setCity] = useState(null)

  useEffect(() => {
    initMarketScreen()
  }, [initMarketScreen])

  useEffect(() => {
    if (city) {
      fetchMarketList(city)
    }
  }, [city, fetchMarketList])

  return (
    <div>
      <MarketComponent
        marketList={marketList}
        setCity={setCity}
        isPageLevelError={isPageLevelError}
        screenPermission={data.screenPermission}
      />
    </div>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    initMarketScreen: () => dispatch(initialMarketScreen()),
    fetchMarketList: city => dispatch(fetchMarketList(city)),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    marketList: state.marketReducer.marketList,
    isPageLevelError: state.marketReducer.isPageLevelError,
    isLoading: state.marketReducer.isLoading,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubMarketScreen)
