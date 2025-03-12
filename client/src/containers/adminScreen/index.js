import React, { useEffect } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import AdminComponent from '../../components/admin'
import {
  fetchCancelledStallsList,
  fetchCustomerList,
  fetchFarmerList,
  initialCancelledStalls,
  initialCustomer,
  initialFarmer,
} from '../../redux/action/admin'
import { connect } from 'react-redux'
import farmerTableData from './data.json'
import customerTableData from './data.json'
import { ROUTE_PATH } from '../../constant/urlConstant'
import { useNavigate } from 'react-router-dom'

const AdminScreen = props => {
  const {
    fetchFarmerList,
    fetchCustomerList,
    fetchCancelledStallsList,
    initFarmer,
    initCustomer,
    initCancelledStalls,
    farmerList,
    customerList,
    cancelledStallsList,
    isLoading,
    isPageLevelError,
    error,
  } = props
  const history = useNavigate()

  useEffect(() => {
    initFarmer()
    initCustomer()
    initCancelledStalls()
    fetchFarmerList()
    fetchCustomerList()
    fetchCancelledStallsList()
    // eslint-disable-next-line
  }, [])
  const handleOnFetchFarmersRecord = () => {
    history(ROUTE_PATH.FARMERS_LIST.HOME)
  }

  const handleOnFetchCustomerRecord = () => {
    history(ROUTE_PATH.CUSTOMER_LIST.HOME)
  }

  const farmerProps = {
    farmerList,
    customerList,
    fetchFarmerList,
    fetchCustomerList,
    cancelledStallsList,
    fetchCancelledStallsList,
    isPageLevelError,
    isLoading,
    farmerTableData,
    customerTableData,
    error,
    handleOnFetchFarmersRecord,
    handleOnFetchCustomerRecord,
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <AdminComponent farmerProps={farmerProps} />
          </Col>
        </Row>
      </Container>
    </>
  )
}
const mapDispatchToProps = dispatch => {
  return {
    initFarmer: () => dispatch(initialFarmer()),
    initCustomer: () => dispatch(initialCustomer()),
    initCancelledStalls: () => dispatch(initialCancelledStalls()),
    fetchFarmerList: payload => dispatch(fetchFarmerList(payload)),
    fetchCustomerList: payload => dispatch(fetchCustomerList(payload)),
    fetchCancelledStallsList: payload =>
      dispatch(fetchCancelledStallsList(payload)),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    isPageLevelError: state.adminReducer.isPageLevelError,
    isLoading: state.adminReducer.isLoading,
    error: state.adminReducer.error,
    farmerList: state.adminReducer.farmerList,
    customerList: state.adminReducer.customerList,
    cancelledStallsList: state.adminReducer.cancelledStallsList,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminScreen)
