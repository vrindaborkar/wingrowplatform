import React, { useEffect } from 'react'
import StallComponent from '../../components/stall'
import { connect } from 'react-redux'
import { fetchStallList, initStall } from '../../redux/action/stall'
import { fetchMarketList } from '../../redux/action/market'
import { useParams } from 'react-router-dom'

const StallScreen = props => {
  const { fetchStallList, stallList, formFieldValueMap, marketList } = props
  const { id } = useParams()

  useEffect(() => {
    fetchStallList(id)
    fetchMarketList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const stallProps = {
    fetchStallList,
    formFieldValueMap,
    marketList,
    stallList,
  }

  return (
    <>
      <StallComponent stallProps={stallProps} />
    </>
  )
}

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,

  stallList: state.stallReducer.stallList,
  userRole: state.loginReducer.userRole,
  marketList: state.marketReducer.marketList,
})

const mapDispatchToProps = dispatch => ({
  initStall: () => dispatch(initStall()),
  fetchStallList: payload => dispatch(fetchStallList(payload)),
  fetchMarketList: () => dispatch(fetchMarketList()),
})

export default connect(mapStateToProps, mapDispatchToProps)(StallScreen)
