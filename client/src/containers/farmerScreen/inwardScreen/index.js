import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import AddInwardComponent from '../../../components/farmer/inward'
import { MzToast, TOAST_SEVERITY } from '../../../common/MzToast'
import { ProgressBar } from 'primereact/progressbar'
import {
  createInwardRecord,
  fetchInwardRecord,
  initInward,
} from '../../../redux/action/in-out-ward'
import { commodity } from '../commodity'
import { marketData } from '../market'

const InwardScreen = props => {
  const {
    isCreateInwardSuccess,
    isCreateInwardError,
    isInwardDetailSuccess,
    isInwardDetailError,
    isEditInwardSuccess,
    isEditInwardError,
    isEdit,
    error,
    isLoading,
    createInwardRecord,
    formFieldValueMap,
    isPageLevelError,
    fetchInwardRecord,
    initInward,
  } = props

  useEffect(() => {
    initInward()
    // eslint-disable-next-line
  }, [])

  const getToastProps = () => {
    if (isCreateInwardSuccess || isEditInwardSuccess) {
      const toastTitle = isEdit
        ? 'Inward Updated Successfully'
        : 'Inward Add Successfully'
      return {
        severity: TOAST_SEVERITY.SUCCESS,
        toastTitle,
        shouldShowToast: true,
      }
    }

    if (isCreateInwardError || isInwardDetailError || isEditInwardError) {
      let toastTitle = error ? error : 'Error while Creating Inward'
      if (isEditInwardError) {
        toastTitle = error ? error : 'Error while updating Inward'
      } else if (isInwardDetailError) {
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
  const handleFetchInwardRecord = payload => {
    fetchInwardRecord(payload)
  }
  const renderProgressBar = () => {
    return <ProgressBar mode='indeterminate' style={{ height: '6px' }} />
  }

  const addInwardProps = {
    createInwardRecord,
    formFieldValueMap,
    isPageLevelError,
    isLoading,
    isEdit,
    isCreateInwardSuccess,
    isEditInwardSuccess,
    isInwardDetailSuccess,
    commodity,
    marketData,
    initInward,
    handleFetchInwardRecord,
  }
  return (
    <>
      {isLoading && renderProgressBar()}
      <MzToast {...getToastProps()} />
      <AddInwardComponent addInwardProps={addInwardProps} />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    initInward: () => dispatch(initInward()),
    createInwardRecord: payload => dispatch(createInwardRecord(payload)),
    fetchInwardRecord: payload => dispatch(fetchInwardRecord(payload)),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    formFieldValueMap: selectFormFieldValueMap(state.inOutWardReducer),
    isPageLevelError: state.inOutWardReducer.isPageLevelError,
    isLoading: state.inOutWardReducer.isLoading,
    error: state.inOutWardReducer.error,
    isCreateInwardSuccess: state.inOutWardReducer.isCreateInwardSuccess,
    isCreateInwardError: state.inOutWardReducer.isCreateInwardError,
    isEditInwardSuccess: state.inOutWardReducer.isEditInwardSuccess,
    isEditInwardError: state.inOutWardReducer.isEditInwardError,
    isInwardDetailError: state.inOutWardReducer.isInwardDetailError,
  }
}

const selectFormFieldValueMap = inOutWardReducer => {
  return inOutWardReducer.formFieldValueMap
}

export default connect(mapStateToProps, mapDispatchToProps)(InwardScreen)
