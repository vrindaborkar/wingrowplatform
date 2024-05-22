import React, { Suspense, lazy } from 'react';
import { Routes, Route } from "react-router-dom";
import './styles/Styles.css'
import IdleTimerContainer from "./components/IdleTimerContainer";
import Employee from './Routes/Employee/Employee';
import ProtectedRoute from "./utils/ProtectedRoutes";
import AuthService from "./services/auth.service";
import Spinner from './components/Spinner';
import './fonts/stylesheet.css'
import i18n from "i18next";
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import LanguageDetector from 'i18next-browser-languagedetector';
import HttpApi from 'i18next-http-backend';
import { useTranslation } from "react-i18next";
import { initReactI18next } from "react-i18next";
import Temp from './Routes/Farmer/Temp';
import Ticket from './Routes/Farmer/TicketTemp';
import TestTemp from './Routes/Farmer/TestTemp';
import { useState } from 'react';
import PaymentPage from './Routes/Farmer/PaymentPage';
import { Helmet, HelmetProvider } from 'react-helmet-async';







const Main = lazy(() => import('./Routes/Main'))
const Profile = lazy(() => import('./Routes/Profile'))
const NotFound = lazy(() => import('./Routes/NotFound'))
const Terms = lazy(() => import('./Routes/Terms'))
const Home = lazy(() => import('./Routes/Home'))
const Customer = lazy(() => import('./Routes/Customer/Customer'))
const Register = lazy(() => import('./Routes/Register'))
const Login = lazy(() => import('./Routes/Login'))
const Farmer = lazy(() => import('./Routes/Farmer/Farmer'))
const Admin = lazy(() => import('./Routes/Admin/Admin'))
const user = AuthService.getCurrentUser();
const Forgot = lazy(() => import("./Routes/Forgot"))
const NewPassword = lazy(() => import("./Routes/NewPassword"))
const ResetPasswordSuccessful = lazy(() => import("./Routes/ResetPasswordSuccessful"))
const RegisterSucces = lazy(() => import("./Routes/RegisterSucces"))



i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(LanguageDetector)
  .use(HttpApi)
  .init({
    // the translations
    // (tip move them in a JSON file and import them,
    // or even better, manage them via a UI: https://react.i18next.com/guides/multiple-translation-files#manage-your-translations-with-a-management-gui)
    supportedLngs: ['en', 'hi', 'mr'],
    fallbackLng: "en",

    detection: {
      order: ['cookie', 'htmlTag', 'localStorage', 'path', 'subdomain'],
      caches: ['cookie']
    },
    backend: {
      loadPath: '/assets/locals/{{lng}}/translation.json',
    },
    react: { useSuspense: false }
  });

const languages = [
  {
    code: 'mr',
    name: 'मराठी',
  },
  {
    code: 'hi',
    name: 'हिंदी'
  },
  {
    code: 'en',
    name: 'English'
  },
]


const App = () => {

  const { t } = useTranslation()
  const [bookingDetails, setbookingDetails] = useState({
    farmer: "",
    phone: "",
    paymentDetails: "",
    BookedStalls: null,
    stallsBooked: null,
    totalAmount: null,
  });
  const today = new Date();
  const [selected, setSelected] = useState([]);
  var [date, setdate] = useState(null);
  const [bookedStalls, setBookedStalls] = useState([]);

  return (
    <HelmetProvider>
      <Helmet>
        <title>Wingrow Agritech-Book your stall in Wingrow Market by one click</title>
        <meta
          name="description"
          content="We at Wingrow Agritech facilitate direct interaction between consumers and farmers. Consumers get access to produce direct from farms which is much fresher and lasts longer, at reasonable prices."
        />;
      </Helmet>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Suspense fallback={<Spinner />}>
          <Routes>
            <Route path='/' element={<Main
              t={t}
            />}>
              <Route index element={<Home
                t={t}
                languages={languages}
              />} />

              <Route
                path="customers/*"
                element={
                  <ProtectedRoute isAllowed={!!user && user.role === "customer"}>
                    <Customer
                      t={t}
                      languages={languages}
                    />
                  </ProtectedRoute>
                }>
              </Route>


              <Route
                path="/customers/*"
                element={
                  <ProtectedRoute isAllowed={!!user && user.role === "customer"}>
                    <Customer
                      t={t}
                      languages={languages}
                    />
                  </ProtectedRoute>
                }>
              </Route>

              <Route
                path='/farmers/*'
                element={
                  <ProtectedRoute isAllowed={!!user && user.role === "farmer"}>
                    <Farmer
                      t={t}
                      languages={languages}
                    />
                  </ProtectedRoute>
                }>
              </Route>

              {/* Changes************** */}
              <Route path='/home/temp' element={<Temp t={t} />} />
              <Route path='/home/temp/stallsTemp/:Id/paymentpage' element={<PaymentPage t={t} languages={languages}
                selected={selected} setSelected={setSelected}
                date={date} setdate={setdate} today={today} setbookingDetails={setbookingDetails} bookingDetails={bookingDetails}
              />} />
              <Route path='/home/temp' element={<Temp t={t} />} />
              {/* <Route path='/farmers/mybookings' element={<PaymentPage t={t} languages={languages}
              selected={selected} setSelected={setSelected}
              date={date} setdate={setdate} today={today} setbookingDetails={setbookingDetails} bookingDetails={bookingDetails}
            />} /> */}
              <Route
                path="/home/temp/stallsTemp/:Id"
                element={<TestTemp setbookingDetails={setbookingDetails} selected={selected} setSelected={setSelected}
                  date={date} setdate={setdate} today={today} t={t}

                />}
              />
              <Route
                path="/home/temp/ticket"
                element={<Ticket bookingDetails={bookingDetails} setbookingDetails={setbookingDetails} selected={selected} setSelected={setSelected}
                  date={date} setdate={setdate} today={today}

                />}
              />
              {/* end************** */}

              <Route
                path="/admin/*"
                element={
                  <ProtectedRoute isAllowed={!!user && user.role === "admin"}>
                    <Admin
                      t={t}
                      languages={languages}
                    />
                  </ProtectedRoute>
                }>
              </Route>
              <Route
                path="/employee/*"
                element={
                  <ProtectedRoute isAllowed={!!user && user.role === "employee"}>
                    <Employee />
                  </ProtectedRoute>
                }>

              </Route>

              <Route
                path="profile"
                element={
                  <ProtectedRoute isAllowed={!!user}>
                    <Profile
                      t={t}
                      languages={languages}
                    />
                  </ProtectedRoute>
                }>
              </Route>


              <Route path='/login' element={<Login t={t} languages={languages} date={date} />} />
              <Route path='/register' element={<Register t={t} />} />
              <Route path='/registeration-successfull' element={<RegisterSucces t={t} />} />
              <Route path='/Forgot' element={<Forgot t={t} />} />
              <Route path='/newpassword' element={<NewPassword t={t} />} />
              <Route path='/ResetPasswordSuccessful' element={<ResetPasswordSuccessful t={t} />} />
              <Route path='/terms' element={<Terms t={t} />} />
            </Route>
            <Route path="*" element={<NotFound t={t} />} />
          </Routes>
        </Suspense>
        <IdleTimerContainer></IdleTimerContainer>

      </LocalizationProvider>
    </HelmetProvider>
  );
};

export default App;