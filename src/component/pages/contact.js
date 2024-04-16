/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import Button from "./pagesComponent/button";
import Footer from "./pagesComponent/footer";
import { apiRequest } from "../api/apiRequest";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import NotifySnackbar from "../snackbar/notiySnackbar";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ContactIcon from "../assests/svg/ContactIcon";

const Contact = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    title: "",
    mobileNumber: "",
    about: "investor",
    message: "",
  });
  const [phoneNumber, setPhoneNumber] = useState("");
  const handlePhoneInputChange = (value) => {
    setPhoneNumber(value);
  };
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const isLogin = useSelector((state) => state.auth.isLogin);
  const handleSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);
    // You can access form data in the `formData` state
    const body = new FormData();
    body.append("table_name", "contact_us");
    body.append("type", "add_data");
    body.append("name", formData.fullName);
    body.append("email", formData.email);
    body.append("title", formData.title);
    body.append("phone", phoneNumber);
    body.append("about", formData.about);
    body.append("description", formData.message);
    apiRequest({ body })
      .then((result) => {
        if (result.result) {
          setMessage("Message Sent Successfully!");
          setMessageType("success");
          setOpen(true);
          setFormData({
            fullName: "",
            email: "",
            title: "",
            mobileNumber: "",
            message: "",
          });
          setPhoneNumber("");
        } else {
          setMessage(result.message);
          setOpen(true);
          setMessageType("error");
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        setMessage(err);
        setMessageType("error");
        setOpen(true);
      });

    // Here, you can send the form data to your server or perform any other actions
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const { t } = useTranslation();
  return (
    <div>
      <NotifySnackbar
        handleClose={handleClose}
        open={open}
        message={message}
        messageType={messageType}
      />

      <div className="main" id="main">
        <Container fluid="xxl" className="px-0">
          <section className="mx-3 mb-3">
            <div className="pt-5 banner_main px-3">
              <div className="row ps-md-5 ps-1">
                <div className="col-md-8 mb-5">
                  <p className="hero-heading">{t("work_together")}</p>
                  <p className="hero-detail">{t("corporate")}</p>
                </div>
                <div className="col-md-4 col-sm-12">
                  <div
                    style={{
                      width: "-webkit-fill-available",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <ContactIcon />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="mx-3 margin-bottom-content">
            <h3 className="main-headings display-center popins_semibold">
              Contact Us
            </h3>
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
                      <div className="contact_inputs register mb-3">
                        <PhoneInput
                          required={true}
                          country={"il"}
                          enableAreaCodes={true}
                          enableSearch={true}
                          disableSearchIcon={true}
                          value={phoneNumber}
                          onChange={handlePhoneInputChange}
                          containerClass=" rounded-4"
                          inputClass="w-100"
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
                  <div className="col-md-12 mb-1">
                    <div className="d-flex flex-column gap-2 contact_inputs">
                      <label>Who are you?</label>
                      <select
                        name="about"
                        value={formData.about}
                        onChange={handleChange}
                      >
                        <option value="investor">Investor</option>
                        <option value="startup">Startup</option>
                        <option value="other">Other</option>
                      </select>
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
                    <button
                      disabled={isLoading ? true : false}
                      type="submit"
                      className="btn1 btn2 mx-auto fs_09 btn_primary rounded_3 px-4 py-3 mt-3"
                    >
                      {isLoading ? (
                        <span className="px-3">
                          <Spinner animation="border" size="sm" />
                        </span>
                      ) : (
                        `Send Message`
                      )}
                    </button>
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
  );
};

export default Contact;
