import React from 'react'
import './App.css'
import { BrowserRouter } from 'react-router-dom'
import Routing from './routing'
import './assets/fonts/fontStyle.css'
import { useSelector } from 'react-redux'
import { ToastContainer } from 'react-toastify'

const App = () => {
  // eslint-disable-next-line
  const currentLanguage = useSelector(state => state.translatorReducer.language)
  return (
    <BrowserRouter>
      <Routing />
      <ToastContainer />
    </BrowserRouter>
  )
}

export default App