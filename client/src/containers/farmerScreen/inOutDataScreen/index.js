import React from 'react'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import { marketData } from '../market'
import {
  fetchInwardList,
  fetchOutwardList,
} from '../../../redux/action/in-out-ward'
import InOutData from '../../../components/farmer/InOutData'

const InwardOutwardScreen = props => {
  const {
    isLoading,
    isPageLevelError,
    fetchInwardList,
    fetchOutwardList,
    outwardList,
    inwardList,
  } = props

  const handleFetchInwardRecord = () => {
    fetchInwardList()
    fetchOutwardList()
  }
  const renderProgressBar = () => {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />
  }

  const InOutwardProps = {
    isPageLevelError,
    isLoading,
    marketData,
    outwardList,
    handleFetchInwardRecord,
    inwardList,
  }
  return (
    <>
      {isLoading && renderProgressBar()}
      <InOutData InOutwardProps={InOutwardProps} />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    fetchOutwardList: () => dispatch(fetchOutwardList()),
    fetchInwardList: () => dispatch(fetchInwardList()),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isPageLevelError: state.inOutWardReducer.isPageLevelError,
    isLoading: state.inOutWardReducer.isLoading,
    error: state.inOutWardReducer.error,
    outwardList: state.inOutWardReducer.outwardList,
    inwardList: state.inOutWardReducer.inwardList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(InwardOutwardScreen)
