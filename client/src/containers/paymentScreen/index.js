import React from 'react'
import PaymentPage from '../../components/payment'
import { connect } from 'react-redux'
import { initStall } from '../../redux/action/stall'
import { useNavigate } from 'react-router-dom'

const PaymentScreen = props => {
  const {
    amount,
    bookStalls,
    initStallScreen,
    setShowPaymentScreen,
    setShowDetails,
  } = props
  const navigate = useNavigate()
  const handlePaymentSuccess = () => {
    setShowDetails(false)
    initStallScreen()
    setShowPaymentScreen(false)
    navigate('/farmer')
  }
  const handlePaymentError = () => {
    setShowDetails(false)
    initStallScreen()
    setShowPaymentScreen(false)
  }

  return (
    <>
      <PaymentPage
        amount={amount}
        selectedStalls={bookStalls}
        onPaymentSuccess={handlePaymentSuccess}
        handlePaymentError={handlePaymentError}
      />
    </>
  )
}

const mapDispatchToProps = dispatch => {
  return {
    initStallScreen: () => dispatch(initStall()),
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    ...ownProps,
    bookStalls: state.stallReducer.selectedStalls,
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen)
