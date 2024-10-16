import React from "react";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Routing from "./routing";
import "./assets/fonts/fontStyle.css"
import { useSelector } from "react-redux";
import { ToastContainer } from 'react-toastify';

const App = () => {
  const currentLanguage = useSelector(state => state.translatorReducer.language); 
  return (
    <BrowserRouter>
      <Routing />
      <ToastContainer />
    </BrowserRouter>
  );
};

export default App;









// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { useTranslation } from 'react-i18next';
// import { changeLanguage } from './redux/action/translator/index'; // Import your changeLanguage action creator

// const App = () => {
//   const { t } = useTranslation();
//   const dispatch = useDispatch();
//   const currentLanguage = useSelector(state => state.translatorReducer.language); // Assuming language state is stored in translatorReducer

//   const handleChangeLanguage = (newLanguage) => {
//     dispatch(changeLanguage(newLanguage)); // Dispatch action to change language
//   };

//   return (
//     <div>
//       {/* Display current language */}
//       {/* <p>{t('current_language')}: {currentLanguage}</p> */}
//       {t("home")}

//       {/* Language switch buttons */}
//       <button onClick={() => handleChangeLanguage('en')}>{t('en')}</button>
//       <button onClick={() => handleChangeLanguage('hi')}>{t('hi')}</button>
//       <button onClick={() => handleChangeLanguage('mr')}>{t('mr')}</button>
//       {/* Add more buttons for other languages if needed */}
//     </div>
//   );
// };

// export default App;
