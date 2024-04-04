/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../api/apiRequest";
import { handleLogin, handleUserData } from "../redux/loginForm";
import { useDispatch } from "react-redux";
import { ArrowLeft } from "react-feather";
import NotifySnackbar from "../snackbar/notiySnackbar";
import { useTranslation } from "react-i18next";
const SMSVerification = ({
  onNextStep,
  verifyEmail,
  userType,
  forgotPassword,
  onPrevStep,
  onSubmitData,
}) => {
  const [inputValue, setInputValue] = useState("");
  const userData = JSON.parse(
    window.localStorage.getItem("encrypted_data_of_GB")
  );
  const userRecover = JSON.parse(
    window.localStorage.getItem("globasity_reset_password")
  );
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
  };

  const verifyEmailData = async (email, code) => {
    const body = new FormData();
    body.append("type", "verify_email");
    body.append("email", email);
    body.append("code", code);
    const response = await apiRequest({ body });
    return response.result;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (forgotPassword === true) {
      const response = await verifyEmailData(userRecover.email, inputValue);
      if (response) {
        onNextStep();
      } else {
        setMessage("Code not match");
        setMessageType("error");
        setOpen(true);
      }
    } else {
      const response = await verifyEmailData(userData?.email, inputValue);
      if (response) {
        setIsLoading(true);
        await onSubmitData();
        setIsLoading(false);
        onNextStep();
      } else {
        setMessage("Code not match or email verification failed");
        setMessageType("error");
        setOpen(true);
      }
    }
  };

  return (
    <>
      <NotifySnackbar
        handleClose={handleClose}
        open={open}
        message={message}
        messageType={messageType}
      />
      <Container fluid="xxl" className="px-0">
        <section className="px-sm-3 d-flex align-items-center justify-content-center">
          <div className="login_card">
            <div className="me-auto" onClick={onPrevStep}>
              {" "}
              <ArrowLeft className="leftArrow" />
            </div>
            <div>
              <div className="heading text-center">{t("code_email")}</div>
              <div className="fs_07 text-center">{t("send_code2")}</div>
              <div className="fs_07 text-center">{verifyEmail}</div>
            </div>

            <Form className="w-100 mt-4" onSubmit={handleSubmit}>
              <div className="d-flex flex-column contact_inputs gap-1 register">
                <Form.Group controlId="code">
                  <Form.Label className="ps-2">{t("enter_code")}</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder={t("enter_code")}
                    value={inputValue}
                    onChange={handleInputChange}
                    style={{ fontSize: "14px" }}
                  />
                </Form.Group>
              </div>
              <div className="mb-4">
                <div className="d-flex">
                  <button
                    disabled={isLoading ? true : false}
                    type="submit"
                    className="btn1 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      t("Approval")
                    )}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </section>
      </Container>
    </>
  );
};

export default SMSVerification;
