/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
// import logo from './component/assests/logo.svg'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './component/redux/store';
import CircularProgress from '@mui/material/CircularProgress';
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import './component/extension/i18n.js'
import { I18nextProvider } from 'react-i18next';
import i18n from './component/extension/i18n.js';

const root = ReactDOM.createRoot(document.getElementById('root'));

const App = lazy(() => import('./App'))
root.render(

  <Provider store={store}>
    <Suspense fallback={
      <div className='main_app2' style={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100%", height: "100vh" }} >
        {/* <img src={logo} alt=''style={{position:"absolute"}} /> */}
        <div className='' style={{ position: "absolute" }}>
          <div className='d-flex align-items-center' >
          </div>
        </div>
        {/* <img src={logo} alt='' className='position-absolute' /> */}
        <CircularProgress size={'3rem'} />
      </div>}>
      <React.StrictMode>
        <I18nextProvider i18n={i18n}>
          <BrowserRouter>
            <App />
            <ToastContainer newestOnTop />
          </BrowserRouter>
        </I18nextProvider>
      </React.StrictMode>
    </Suspense>
  </Provider>

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
