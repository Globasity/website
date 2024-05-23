/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, lazy, Suspense, useState } from 'react'
import { Route, Routes, Navigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './component/styles/main.css'
// import './component/styles/main.min.css'
import './component/styles/font_Sizes.css'
import { useLocation } from 'react-router-dom';
import NavHeader from './component/header/navHeader'
// import Pricing from './component/pages/pricing';
import Contact from './component/pages/contact';
import Startups from './component/pages/startups';
import Investors from './component/pages/investors';
import Login from './component/registeration/login';
import CircularProgress from '@mui/material/CircularProgress';
import NavHeader2 from './component/header/navHeader2';
import 'react-image-crop/dist/ReactCrop.css'
import { useDispatch, useSelector } from 'react-redux';
import './component/messages/chat.css'
import { Form, Modal } from 'react-bootstrap';
import { apiRequest } from './component/api/apiRequest';
import { handleLogin, handleUserData, setLogin, setPassCodeValue } from './component/redux/loginForm';
import { toast } from 'react-toastify';
import NotifySnackbar from './component/snackbar/notiySnackbar';
import { Eye, EyeOff } from 'react-feather';
const Forgot = lazy(() => import('./component/registeration/forgot'))
const UserAccount = lazy(() => import('./component/registeration/account'))
const InvestmentInfo = lazy(() => import('./component/registeration/investmentInfo'))
const About = lazy(() => import('./component/pages/about'));
const MainPage = lazy(() => import('./component/pages/mainPage'));
const NoMatch = lazy(() => import('./component/snackbar/nomatch'));
const SellBusiness = lazy(() => import('./component/pages/sellBusiness'))
const FavBusiness = lazy(() => import('./component/pages/favBusiness'))
const Message2 = lazy(() => import('./component/messages/message2'))
const InvestorList = lazy(() => import('./component/pages/investorList'))
const Investment = lazy(() => import('./component/pages/investment'))
const InvestmentDetail = lazy(() => import('./component/pages/investmentDetail'))
const InitialContract = lazy(() => import('./component/pages/initialContract'))
const ViewInitialContract = lazy(() => import('./component/pages/viewInitialContract'))
const SignUp = lazy(() => import('./component/registeration/signUp'))
const BusinessContract = lazy(() => import('./component/pages/businessContract'))
const BusinessDetail = lazy(() => import('./component/pages/businessDetail'))
const CreateBusiness = lazy(() => import('./component/registeration/createBusiness'))
const ViewContract = lazy(() => import('./component/pages/viewContract'))
const InvestorDetail = lazy(() => import('./component/pages/investorDetail'))
const MyBusinessPage = lazy(() => import('./component/pages/myBusinessPage'))
const MyBusiness = lazy(() => import('./component/pages/myBusiness'))
const WaitForLogin = lazy(() => import('./component/snackbar/waitForLogin'))
const BusinessContractView = lazy(() => import('./component/pages/businessContractView'))
const Notification = lazy(() => import('./component/pages/notification'))
const FavInvestorList = lazy(() => import('./component/pages/favInvestorList'))

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

const App = () => {
  const dispatch = useDispatch()
  const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
  const [passcode, setPasscode] = useState('')
  const [passcodeData, setPasscodeData] = useState('')
  const [loading, setloading] = useState(false)
  const isLogin = useSelector((state) => state.auth.isLogin)
  const passcodeValue = useSelector((state) => state.auth.passcodeValue);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };
  const getUserData = async () => {
    const body = new FormData()
    body.append('type', 'get_data')
    body.append('table_name', 'users')
    body.append('id', userData?.user_id)
    await apiRequest({ body })
      .then((result) => {
        const data = result.data[0]
        if (data) {
          const data2 = {
            email: data?.email,
            is_active: data?.is_active,
            phone: data?.phone,
            result: true,
            url: data?.url,
            user_id: data?.id,
            user_image: data?.image,
            user_name: data?.name,
            user_type: data?.user_type,
          }
          if (data?.is_active === "true") {
            dispatch(setLogin(true));
            dispatch(handleLogin(data2));
            dispatch(handleUserData(Math.random()));
            if (loading === false) {
              toast.success("Login Successfully ")
              setloading(true)
            }
          }
        }
      }).catch((err) => {
        console.log(err)
      });
  }
  const getPasscodeData = async () => {
    const body = new FormData()
    body.append('type', 'get_data')
    body.append('table_name', 'passcode')
    apiRequest({ body })
      .then((result) => {
        setPasscodeData(result?.data[0]?.passcode)
      }).catch((err) => {
        console.log(err)
      });
  }
  // useEffect(() => {
  //   global.BASEURL = 'https://globasity.com/api/api.php/';
  //   // global.BASEURL = 'https://locatestudent.com/globasity/api.php/';
  // }, []);
  const [show, setShow] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleCloseModal = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => { 
    if (isLogin && passcodeValue === false) {
      getPasscodeData()
      handleShow()
    } else {
      dispatch(setPassCodeValue(false))
    }
    if (userData?.is_active === "false") {
      getUserData()
    }
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault()
    if (passcode === passcodeData) {
      handleCloseModal()
      setPasscodeData('')
      setPasscode('')
      setShowPassword(false)
      e.target.reset()
      dispatch(setPassCodeValue(true))
    } else {
      setMessage("Wrong Passcode...")
      setMessageType('error')
      setOpen(true)
    } 
  }

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (!document.hidden) {
        return;
      }
      dispatch(setPassCodeValue(false));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('visibilitychange', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('visibilitychange', handleBeforeUnload);
    };
  }, [dispatch])

  return (
    <>
      <NotifySnackbar handleClose={handleClose} open={open} message={message} messageType={messageType} />
      {/* <Modal className='' show={show} centered>
        <Modal.Header >
          <Modal.Title className=' fs_13'>User Authentication Required</Modal.Title>
        </Modal.Header>
        <Modal.Body className='' >
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Enter Passcode:</Form.Label>
              <div className='position-relative'>
                <Form.Control required type={showPassword ? 'text' : 'password'} onChange={(e) => setPasscode(e.target.value)} value={passcode} className='py-2 my-0' style={{ fontSize: "14px" }} placeholder='Kindly input the passcode to proceed on the website.' />
                {passcode &&
                  <div className="position-absolute eyeOff">
                    {showPassword && <EyeOff className="eyeShow" onClick={handleTogglePassword} />}
                    {!showPassword && <Eye className="eyeShow" onClick={handleTogglePassword} />}
                  </div>}
              </div>
            </Form.Group>
            <div className='my-3 px-3 d-flex'>
              <button type='submit' className='btn1 btn2 mx-auto fs_09 btn_primary rounded_3 px-4 py-2' >
                Save Changes
              </button>
            </div>
          </Form>
        </Modal.Body>

      </Modal> */}
      <ScrollToTop />
      {!isLogin ? (<NavHeader />) : (<NavHeader2 />)}
      <Suspense fallback={
        <div className='w-100 vh_90 main_app d-flex justify-content-center align-items-center' >
          <div className='d-flex align-items-center position-relative' >
            <div className='position-absolute'>
            </div>
          </div>
          <CircularProgress size={'3rem'} />
        </div>}>
        <Routes>
          <Route index element={<MainPage />} ></Route>
          <Route path='/' element={<MainPage />} ></Route>
          <Route path='/about-us' element={<About />} ></Route>
          {/* <Route path='/pricing' element={<Pricing />} ></Route> */}
          <Route path='/contact' element={<Contact />} ></Route>
          <Route path='/startups' element={<Startups />} ></Route>
          <Route path='/investors' element={<Investors />} ></Route>
          <Route path='/login' element={isLogin ? (<Navigate replace to="/" />) : <Login />} ></Route>
          <Route path='/sign-up' element={isLogin ? (<Navigate replace to="/" />) : <SignUp />} ></Route>
          <Route path='/wait-for-login' element={isLogin ? (<Navigate replace to="/" />) : <WaitForLogin />} ></Route>
          <Route path='/sell-business' element={!isLogin ? (<Navigate replace to="/login" />) : <SellBusiness />} ></Route>

          {userData?.user_type === "investor" &&
            <Route path='/fav-business' element={!isLogin ? (<Navigate replace to="/login" />) : <FavBusiness />} ></Route>}

          <Route path='/investment' element={!isLogin ? (<Navigate replace to="/login" />) : <Investment />} ></Route>
          {/* <Route path='/fav-investor' element={!isLogin ? (<Navigate replace to="/login" />) : <FavInvestorList />} ></Route> */}
          <Route path='/notification' element={!isLogin ? (<Navigate replace to="/login" />) : <Notification />} ></Route>
          <Route path='/my-profile' element={!isLogin ? (<Navigate replace to="/login" />) : <UserAccount />} ></Route>
          <Route path='/investment-detail' element={!isLogin ? (<Navigate replace to="/login" />) : <InvestmentDetail />} ></Route>
          <Route path='/initial-contract' element={!isLogin ? (<Navigate replace to="/login" />) : <InitialContract />} ></Route>
          <Route path='/business-contract' element={!isLogin ? (<Navigate replace to="/login" />) : <BusinessContract />} ></Route>
          <Route path='/chat' element={!isLogin ? (<Navigate replace to="/login" />) : <Message2 />} ></Route>
          <Route path='/forgot' element={isLogin ? (<Navigate replace to="/" />) : <Forgot />} ></Route>
          <Route path='/investInfo' element={!isLogin ? (<Navigate replace to="/login" />) : <InvestmentInfo />} ></Route>
          <Route path='/business-detail' element={!isLogin ? (<Navigate replace to="/login" />) : <BusinessDetail />} ></Route>
          <Route path='/view-contract' element={!isLogin ? (<Navigate replace to="/login" />) : <ViewContract />} ></Route>
          <Route path='/view-initial-contract' element={!isLogin ? (<Navigate replace to="/login" />) : <ViewInitialContract />} ></Route>
          <Route path='/business-contract-view' element={!isLogin ? (<Navigate replace to="/login" />) : <BusinessContractView />} ></Route>
          {userData?.user_type === "business" &&
            (<>
              {/* <Route path='/create-business' element={!isLogin ? (<Navigate replace to="/login" />) : <CreateBusiness />} ></Route> */}
              <Route path='/investor-list' element={!isLogin ? (<Navigate replace to="/login" />) : <InvestorList />} ></Route>
              <Route path='/investor-detail' element={!isLogin ? (<Navigate replace to="/login" />) : <InvestorDetail />} ></Route>
              <Route path='/my-business' element={!isLogin ? (<Navigate replace to="/login" />) : <MyBusiness />} ></Route>
              <Route path='/my-startup' element={!isLogin ? (<Navigate replace to="/login" />) : <MyBusinessPage />} ></Route>
            </>)}

          <Route path="*" element={<NoMatch />} />
        </Routes >
      </Suspense>
    </>
  )
}

export default App;
