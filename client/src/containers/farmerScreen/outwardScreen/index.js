import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AddOutwardComponent from '../../../components/farmer/outward'
import { MzToast, TOAST_SEVERITY } from '../../../common/MzToast'
import { ProgressBar } from 'primereact/progressbar'
import {
  createOutwardRecord,
  fetchOutwardRecord,
  initOutward,
} from '../../../redux/action/in-out-ward'
import { commodity } from '../commodity'
import { marketData } from '../market'

const OutwardScreen = props => {
  const {
    isCreateOutwardSuccess,
    isCreateOutwardError,
    isOutwardDetailSuccess,
    isOutwardDetailError,
    isEditOutwardSuccess,
    isEditOutwardError,
    isEdit,
    error,
    isLoading,
    createOutwardRecord,
    formFieldValueMap,
    isPageLevelError,
    fetchOutwardRecord,
    initOutward,
  } = props

  useEffect(() => {
    initOutward()
    // eslint-disable-next-line
  }, [])

  const getToastProps = () => {
    if (isCreateOutwardSuccess || isEditOutwardSuccess) {
      const toastTitle = isEdit
        ? 'Outward Updated Successfully'
        : 'Outward Add Successfully'
      return {
        severity: TOAST_SEVERITY.SUCCESS,
        toastTitle,
        shouldShowToast: true,
      }
    }

    if (isCreateOutwardError || isOutwardDetailError || isEditOutwardError) {
      let toastTitle = error ? error : 'Error while Creating Outward'
      if (isEditOutwardError) {
        toastTitle = error ? error : 'Error while updating Outward'
      } else if (isOutwardDetailError) {
        toastTitle =
          'Error while performing operation. Please refresh your browser'
      }

      return {
        severity: TOAST_SEVERITY.ERROR,
        toastTitle,
        shouldShowToast: true,
      }
    }
  }
  const handleFetchOutwardRecord = payload => {
    fetchOutwardRecord(payload)
  }
  const renderProgressBar = () => {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />
  }

  const addOutwardProps = {
    createOutwardRecord,
    formFieldValueMap,
    isPageLevelError,
    isLoading,
    isEdit,
    isCreateOutwardSuccess,
    isEditOutwardSuccess,
    isOutwardDetailSuccess,
    commodity,
    marketData,
    initOutward,
    handleFetchOutwardRecord,
  }
  return (
    <>
      {isLoading && renderProgressBar()}
      <MzToast {...getToastProps()} />
      <AddOutwardComponent addOutwardProps={addOutwardProps} />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    createOutwardRecord: payload => dispatch(createOutwardRecord(payload)),
    initOutward: () => dispatch(initOutward()),
    fetchOutwardRecord: payload => dispatch(fetchOutwardRecord(payload)),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    formFieldValueMap: selectFormFieldValueMap(state.inOutWardReducer),
    isPageLevelError: state.inOutWardReducer.isPageLevelError,
    isLoading: state.inOutWardReducer.isLoading,
    error: state.inOutWardReducer.error,
    isCreateOutwardSuccess: state.inOutWardReducer.isCreateOutwardSuccess,
    isCreateOutwardError: state.inOutWardReducer.isCreateOutwardError,
    isEditOutwardSuccess: state.inOutWardReducer.isEditOutwardSuccess,
    isEditOutwardError: state.inOutWardReducer.isEditOutwardError,
    isOutwardDetailError: state.inOutWardReducer.isOutwardDetailError,
  }
}

const selectFormFieldValueMap = inOutWardReducer => {
  return inOutWardReducer.formFieldValueMap
}

export default connect(mapStateToProps, mapDispatchToProps)(OutwardScreen)
