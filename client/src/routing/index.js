import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTE_PATH } from "../constant/urlConstant";
import Header from "../common/Header";
import Footer from "../common/Footer";
import LoginScreen from "../containers/loginScreen";
import RegisterScreen from "../containers/registerScreen";
import HomeScreen from "../containers/homeScreen";
import { useSelector } from "react-redux";
import { USER_ROLE } from "../constant/role/index";
import CustomerScreen from "../containers/customerScreen";
import AboutUsScreen from "../containers/aboutScreen";
import MarketScreen from "../containers/marketScreen";
import StallBookingScreen from "../containers/stallBookingScreen";
import StallScreen from "../containers/stallScreen";
// import ErrorPage from "../common/Error";
// import AccessDeniedPage from "../common/Access";

const Routing = () => {
  const isLoggedIn = useSelector((state) => state.loginReducer.isLoggedIn);
  const isVerify = useSelector((state) => state.msg91Reducer.isVerify);
  const userRole = useSelector((state) => state.loginReducer.userRole);
  

  if (isLoggedIn && isVerify && userRole === USER_ROLE.FARMER)
    return (
      <Routes>
        <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
        <Route path={ROUTE_PATH.BASE.LOGIN} element={<LoginScreen />} />
        <Route path={ROUTE_PATH.BASE.REGISTER} element={<RegisterScreen />} />
        <Route path="*" element={<Navigate to={ROUTE_PATH.BASE.HOME} />} />
      </Routes>
    );
  else if (!!isLoggedIn && !!isVerify && userRole === USER_ROLE.CUSTOMER)
    return (
      <Routes>
        <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
        <Route path={ROUTE_PATH.BASE.LOGIN} element={<LoginScreen />} />
        <Route path={ROUTE_PATH.BASE.REGISTER} element={<RegisterScreen />} />
        <Route path="*" element={<Navigate to={ROUTE_PATH.BASE.HOME} />} />
      </Routes>
    );
  else if (!!isLoggedIn && !!isVerify && userRole === USER_ROLE.ADMIN)
    return (
      <Routes>
        <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
        <Route path={ROUTE_PATH.BASE.LOGIN} element={<LoginScreen />} />
        <Route path={ROUTE_PATH.BASE.REGISTER} element={<RegisterScreen />} />
        <Route path="*" element={<Navigate to={ROUTE_PATH.BASE.HOME} />} />
      </Routes>
    );
  else {
    return (
      <React.Fragment>
        <header>
          <Header userRole={userRole} />
        </header>
        <main>
          <Routes>
            <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
            <Route path={ROUTE_PATH.BASE.LOGIN} element={<LoginScreen />} />
            <Route
              path={ROUTE_PATH.BASE.REGISTER}
              element={<RegisterScreen />}
            />
               <Route
              path={ROUTE_PATH.BOOKING.STALL}
              element={<StallScreen />}
            />
                <Route path={ROUTE_PATH.FARMER.MARKET} element={<MarketScreen />} />
               <Route path={ROUTE_PATH.CUSTOMER.HOME} element={<CustomerScreen />} />
            <Route path="*" element={<Navigate to={ROUTE_PATH.BASE.LOGIN} />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </React.Fragment>
    );
  }
};

export default Routing;
