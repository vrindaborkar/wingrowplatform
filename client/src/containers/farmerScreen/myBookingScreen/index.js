import React, { useEffect, useState } from 'react'
import MyBookingComponent from '../../../components/farmer/myBooking'
import { connect } from 'react-redux'
import { ProgressBar } from 'primereact/progressbar'
import {
  deleteStall,
  fetchStallBookByUserList,
  initStall,
} from '../../../redux/action/stall'

import { useNavigate } from 'react-router-dom'
import { ROUTE_PATH } from '../../../constant/urlConstant'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'
import { MzToast, TOAST_SEVERITY } from '../../../common/MzToast'

const MyBookingScreen = props => {
  const {
    fetchStallBookByUserList,
    initStall,
    isLoading,
    isPageLevelError,
    userRole,
    deleteStall,
    stallBookList,
    isDeleteStallSuccess,
    isDeleteStallError,
    user,
  } = props

  useEffect(() => {
    initStall()
    fetchStallBookByUserList()
  // eslint-disable-next-line
  }, [initStall, fetchStallBookByUserList, isDeleteStallSuccess, user])

  const history = useNavigate()

  const [isDeleteDialogVisible, setIsDeleteDialogVisible] = useState(false)
  // eslint-disable-next-line
  const [isReadDailogVisible, setIsReadDialogVisible] = useState(false)
  const [selectedStall, setSelectedStall] = useState(null)

  const handleOnDeleteRecord = data => {
    setSelectedStall(data)
    setIsDeleteDialogVisible(true)
  }
  const handleOnEditRecord = data => {
    history(`${ROUTE_PATH.COMPANY.EDIT.replace(':id', data?.id)}`)
  }

  const handleOnCreatedRecord = () => {
    history(ROUTE_PATH.COMPANY.ADD)
  }

  const navigatetoFarmer = () => {
    history(ROUTE_PATH.COMPANY.HOME)
  }

  const stallProps = {
    stallBookList,
    fetchStallBookByUserList,
    isPageLevelError,
    isLoading,
    user,
    userRole,
    navigatetoFarmer,
    handleOnDeleteRecord,
    handleOnEditRecord,
    handleOnCreatedRecord,
  }

  const renderProgressBar = () => (
    <ProgressBar mode='indeterminate' style={{ height: '6px' }} />
  )

  const confirmDelete = () => {
    if (selectedStall) {
      deleteStall(selectedStall?._id)
      setIsDeleteDialogVisible(false)
      setSelectedStall(null)
    }
  }

  const cancelDelete = () => {
    setIsDeleteDialogVisible(false)
    setSelectedStall(null)
  }

  // eslint-disable-next-line
  const cancelRead = () => {
    setIsReadDialogVisible(false)
    setSelectedStall(null)
  }
  const getToastProps = () => {
    if (isDeleteStallSuccess) {
      const toastTitle = 'Booking Delete Successfully'
      return {
        severity: TOAST_SEVERITY.SUCCESS,
        toastTitle,
        shouldShowToast: true,
      }
    }

    if (isDeleteStallError) {
      let toastTitle = 'Error while delete Booking'
      return {
        severity: TOAST_SEVERITY.ERROR,
        toastTitle,
        shouldShowToast: true,
      }
    }
  }
  return (
    <>
      {isLoading && renderProgressBar()}
      <MzToast {...getToastProps()} />
      <MyBookingComponent stallProps={stallProps} />
      <Dialog
        header='Confirm Delete'
        visible={isDeleteDialogVisible}
        onHide={cancelDelete}
        footer={
          <div>
            <Button
              rounded
              label='No'
              severity='secondary'
              icon='pi pi-times'
              onClick={cancelDelete}
              className=''
            />
            <Button
              rounded
              label='Yes'
              icon='common-btn pi pi-check'
              onClick={confirmDelete}
              autoFocus
              className='ml-2'
            />
          </div>
        }>
        <div className='text-center'>
          <p className='font-semibold mb-3'>
            Are you sure you want to cancel this booking?
          </p>
          <div className='text-primary text-xl mb-2'>
            {selectedStall?.stallNo}
          </div>
          <div className='text-600'>{selectedStall?.name}</div>
        </div>
      </Dialog>
    </>
  )
}

const mapDispatchToProps = dispatch => ({
  initStall: () => dispatch(initStall()),
  fetchStallBookByUserList: () => dispatch(fetchStallBookByUserList()),
  deleteStall: payload => dispatch(deleteStall(payload)),
})

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  isPageLevelError: state.stallReducer.isPageLevelError,
  isLoading: state.stallReducer.isLoading,
  error: state.stallReducer.error,
  stallBookList: state.stallReducer.stallBookList,

  user: state.loginReducer.user,
  userRole: state.loginReducer.userRole,
  isDeleteStallSuccess: state.stallReducer.isDeleteStallSuccess,
  isDeleteStallError: state.stallReducer.isDeleteStallError,
})

export default connect(mapStateToProps, mapDispatchToProps)(MyBookingScreen)
