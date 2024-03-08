/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Container, Form, Spinner } from 'react-bootstrap'
import Button from './pagesComponent/button'
import Footer from './pagesComponent/footer'
import { apiRequest } from '../api/apiRequest'
import { toast } from 'react-toastify'
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import NotifySnackbar from '../snackbar/notiySnackbar'
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    title: '',
    mobileNumber: '',
    message: ''
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const handlePhoneInputChange = (value) => {
    setPhoneNumber(value);
  };
  const [isLoading, setIsLoading] = useState(false)
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const handleClose = (reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const isLogin = useSelector((state) => state.auth.isLogin)
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true)
    // You can access form data in the `formData` state
    const body = new FormData()
    body.append('table_name', 'contact_us')
    body.append('type', 'add_data')
    body.append('name', formData.fullName)
    body.append('email', formData.email)
    body.append('title', formData.title)
    body.append('phone', phoneNumber)
    body.append('description', formData.message)
    apiRequest({ body })
      .then((result) => {
        if (result.result) {
          setMessage("Message Sent Successfully!")
          setMessageType('success')
          setOpen(true)
          setFormData({
            fullName: '',
            email: '',
            title: '',
            mobileNumber: '',
            message: ''
          });
          setPhoneNumber('')
        }else{
          setMessage(result.message)
          setOpen(true)
          setMessageType('error')
        }
        setIsLoading(false)
      }).catch((err) => {
        setIsLoading(false)
        setMessage(err)
        setMessageType('error')
        setOpen(true)
      });


    // Here, you can send the form data to your server or perform any other actions
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };
  const { t } = useTranslation()
  return (
    <div>
      <NotifySnackbar handleClose={handleClose} open={open} message={message} messageType={messageType} />

      <div className='main' id="main">
        <Container fluid="xxl" className="px-0" >
          <section className='px-3'>
            <div className='pt-5 banner_main d-flex flex-column align-items-center justify-content-center contact_banner' >
              <span style={{ color: "#9CD161" }}>{t("Contact")}</span>
              <h5 className=' text-center'>
                {t("work_together")}
              </h5>
              <p className='text-center px-sm-5 px-3 width1'>
                {t("corporate")}
              </p>
              {isLogin === false &&
                <div className='d-flex align-items-center gap-4 mt-3 about_page_btns'>
                  <Link to={'/login'}>
                    <Button ff="Popins_semibold" padding="14px 30px" br="40px" fs="0.75rem" content={t("Get_in_Touch")} />
                  </Link>
                  {/* <Link to={'/pricing'}>
                    <Button color="#161925" bg="#F3F7F5" border="1px solid #161925" ff="Popins_bold" padding="14px 30px" br="40px" fs="0.75rem" content={t("View_Pricing")} />
                  </Link> */}
                </div>}
            </div>
          </section>
          <section className='px-md-5 px-1 mx-3 py-5'>
            <div id="contact_form">
              <form onSubmit={handleSubmit}>
                <div className="row justify-content-center">
                  <div className="col-md-6">
                    <div className="d-flex flex-column contact_inputs gap-2">
                      <label>{t("Name")}</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder={t("Name")}
                        value={formData.fullName}
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-column contact_inputs gap-2">
                      <label>{t("TITLE_EMAIL")}</label>
                      <input
                        type="text"
                        name="email"
                        placeholder={t("PLACE_EMAIL")}
                        value={formData.email}
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-column gap-2 contact_inputs">
                      <label>{t("Title")}</label>
                      <input
                        type="text"
                        name="title"
                        placeholder={t("Enter_Title")}
                        value={formData.title}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="d-flex flex-column gap-2 contact_inputs">
                      <label>{t("HEAD_ENTER_PHONE")}</label>
                      <div className='contact_inputs register mb-3'>
                        <PhoneInput
                          required={true}
                          country={'il'}
                          enableAreaCodes={true}
                          enableSearch={true}
                          disableSearchIcon={true}
                          value={phoneNumber}
                          onChange={handlePhoneInputChange}
                          containerClass=" rounded-4"
                          inputClass='w-100'
                        />
                      </div>
                      {/* <input
                        type="text"
                        name="mobileNumber"
                        placeholder={t("PLACEHOLDER_ENTER_PHONE")}
                        value={formData.mobileNumber}
                        onChange={handleChange}
                      /> */}
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="d-flex flex-column gap-2 contact_inputs">
                      <textarea
                        id="w3review"
                        name="message"
                        placeholder={t("help")}
                        rows="4"
                        cols="50"
                        value={formData.message}
                        required
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="d-flex align-items-center justify-content-center">

                    <Button disabled={isLoading} type="submit"
                      content={<>
                        {
                          isLoading ?
                            <Spinner animation="border" variant="light" size="sm" />
                            : t("message")
                        }
                      </>} padding="15px 47px" fs="12px" />
                  </div>
                </div>
              </form>
            </div>

          </section>
          {/* <section className='px-md-5 px-1 mx-3 py-5'>
            <div className='row justify-content-center align-items-center '>
              <div className='col-lg-6 col-9   location_col_1 '>
                <span>Location</span> 
                <h4>Our offices</h4>
                <p>We are built for recruiters and hiring managers who care about their applicants.</p>
                <h5>New York, USA</h5>
                <p>545 Park Avenue New York,
                  New York 10171</p>
                <h5>
                  Toronto, Canada
                </h5>
                <p>124 Stamford Street,
                  London SE1 9LQ</p>
              </div>
              <div className='col-lg-6 col-sm-9 '>
                <img style={{ width: "100%" , height:"70%" , objectFit:"contain"}}  src={location} alt='location' className='ms-md-0 mx-auto d-flex align-items-center location_img' />
              </div>
            </div>
          </section>
          <section className='pt-5'>
            <Register />
          </section> */}
        </Container>

        <Footer />

      </div>
    </div>
  )
}

export default Contact
