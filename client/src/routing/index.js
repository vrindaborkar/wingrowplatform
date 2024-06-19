import React, { lazy } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { ROUTE_PATH } from "../constant/urlConstant";
import Header from "../common/Header";
import Footer from "../common/Footer";
import LoginScreen from "../containers/loginScreen";
import RegisterScreen from "../containers/registerScreen";
import CustomerScreen from "../containers/customerScreen";
const HomeScreen = lazy(() => import("../containers/homeScreen/index"));
const Routing = () => {
  const isLoggedIn = false;

  if (!isLoggedIn) {
    return (
      <React.Fragment>
        <header>
          <Header isLoggedIn={isLoggedIn} />
        </header>
        <main>
          <Routes>
            <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
            <Route path={ROUTE_PATH.BASE.LOGIN} element={<LoginScreen />} />
            <Route path={ROUTE_PATH.BASE.REGISTER} element={<RegisterScreen />} />
            <Route path={ROUTE_PATH.BASE.CUSTOMER} element={<CustomerScreen />} />
            <Route path="*" element={<Navigate to={ROUTE_PATH.BASE.HOME} />} />
          </Routes>
        </main>
        <footer>
          <Footer/>
        </footer>
      </React.Fragment>
    );
  }

  return (
    <Routes>
      <Route path={ROUTE_PATH.BASE.HOME} element={<HomeScreen />} />
      <Route path={ROUTE_PATH.BASE.LOGIN} element={<LoginScreen />} />
      <Route path={ROUTE_PATH.BASE.REGISTER} element={<RegisterScreen />} />
      <Route path="*" element={<Navigate to={ROUTE_PATH.BASE.HOME} />} />
    </Routes>
  );
};

export default Routing;
