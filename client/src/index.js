import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import 'primereact/resources/primereact.min.css'
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import reportWebVitals from './reportWebVitals'
import { Provider } from 'react-redux'
import store from './redux/store'
import './i18n'
import '../src/assets/color/index.css'

import Modal from 'react-modal'

Modal.setAppElement('#root')

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  // </React.StrictMode>
)

reportWebVitals()
