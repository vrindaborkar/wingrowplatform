import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ROUTE_PATH } from '../constant/urlConstant'
import Header from '../common/Header'

import LoginScreen from '../containers/loginScreen'
import RegisterScreen from '../containers/registerScreen'
import HomeScreen from '../containers/homeScreen'
import { useSelector } from 'react-redux'
import { USER_ROLE } from '../constant/role/index'
import CustomerScreen from '../containers/customerScreen'
import AboutUsScreen from '../containers/aboutScreen'
import MarketScreen from '../containers/marketScreen'

import StallScreen from '../containers/stallScreen'
import AdminScreen from '../containers/adminScreen'
import FarmersListComponent from '../components/admin/farmerList'
import CustomersListComponent from '../components/admin/customerList'

import FarmerScreen from '../containers/farmerScreen'
import MyBookingScreen from '../containers/farmerScreen/myBookingScreen'
import InwardScreen from '../containers/farmerScreen/inwardScreen'
import OutwardScreen from '../containers/farmerScreen/outwardScreen'
import InOutDataScreen from '../containers/farmerScreen/inOutDataScreen'

import { isVerify, userRole } from '../redux/selectors/auth/index'
import SubMarketScreen from '../containers/farmerScreen/subscriptionScreen/subMarketScreen'

const Routing = () => {
  const verified = useSelector(isVerify)
  const role = useSelector(userRole)

  if (role === USER_ROLE.FARMER && verified) {
    return (
      <React.Fragment>
        <header>
          <Header role={role} verified={verified} />
        </header>
        <main>
          <Routes>
            <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
            <Route path={ROUTE_PATH.BASE.HOME} element={<AboutUsScreen />} />
            <Route path={ROUTE_PATH.FARMER.HOME} element={<FarmerScreen />} />
            <Route
              path={ROUTE_PATH.CUSTOMER.HOME}
              element={<CustomerScreen />}
            />
            <Route path={ROUTE_PATH.FARMER.MARKET} element={<MarketScreen />} />

            <Route
              path={ROUTE_PATH.FARMER.MY_BOOKING}
              element={<MyBookingScreen />}
            />
            <Route path={ROUTE_PATH.FARMER.INWARD} element={<InwardScreen />} />
            <Route
              path={ROUTE_PATH.FARMER.OUTWARD}
              element={<OutwardScreen />}
            />
            <Route path={ROUTE_PATH.BOOKING.STALL} element={<StallScreen />} />

            <Route
              path={ROUTE_PATH.FARMER.DATA}
              element={<InOutDataScreen />}
            />
            <Route
              path={ROUTE_PATH.FARMER.SUBCRIPTION}
              element={<SubMarketScreen />}
            />
            <Route
              path='*'
              element={<Navigate to={ROUTE_PATH.FARMER.HOME} />}
            />
          </Routes>
        </main>

       
      </React.Fragment>
    )
  }

  // Customer Routes
  if (role === USER_ROLE.CUSTOMER && verified) {
    return (
      <React.Fragment>
        <header>
          <Header role={role} verified={verified} />
        </header>
        <main>
          <Routes>
            <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
            <Route path={ROUTE_PATH.BASE.HOME} element={<AboutUsScreen />} />
            <Route
              path={ROUTE_PATH.CUSTOMER.HOME}
              element={<CustomerScreen />}
            />
            <Route
              path='*'
              element={<Navigate to={ROUTE_PATH.CUSTOMER.HOME} />}
            />
          </Routes>
        </main>

     
      </React.Fragment>
    )
  }

  // Admin Routes
  if (role === USER_ROLE.ADMIN && verified) {
    return (
      <React.Fragment>
        <header>
          <Header role={role} verified={verified} />
        </header>
        <main>
          <Routes>
            <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
            <Route path={ROUTE_PATH.BASE.HOME} element={<AboutUsScreen />} />
            <Route path={ROUTE_PATH.ADMIN.HOME} element={<AdminScreen />} />
            <Route
              path={ROUTE_PATH.CUSTOMER.HOME}
              element={<CustomerScreen />}
            />
            <Route
              path={ROUTE_PATH.FARMERS_LIST.HOME}
              element={<FarmersListComponent />}
            />
            <Route
              path={ROUTE_PATH.CUSTOMER_LIST.HOME}
              element={<CustomersListComponent />}
            />
            <Route path='*' element={<Navigate to={ROUTE_PATH.ADMIN.HOME} />} />
          </Routes>
        </main>

      </React.Fragment>
    )
  }

  // Fallback: If no role matches, show Login/Register
  return (
    <React.Fragment>
      <header>
        <Header role={role} verified={verified} />
      </header>
      <main>
        <Routes>
          <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
          <Route path={ROUTE_PATH.BASE.HOME} element={<AboutUsScreen />} />
          <Route path={ROUTE_PATH.BASE.LOGIN} element={<LoginScreen />} />
          <Route path={ROUTE_PATH.BASE.REGISTER} element={<RegisterScreen />} />
          <Route path={ROUTE_PATH.CUSTOMER.HOME} element={<CustomerScreen />} />
          <Route path={ROUTE_PATH.FARMER.MARKET} element={<MarketScreen />} />
          <Route path={ROUTE_PATH.BOOKING.STALL} element={<StallScreen />} />
          <Route path='*' element={<Navigate to={ROUTE_PATH.BASE.HOME} />} />
        </Routes>
      </main>

    </React.Fragment>
  )
}

export default Routing
