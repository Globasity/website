/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { ArrowLeft } from "react-feather";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest, apiRequestEmail } from "../api/apiRequest";
import { useTranslation } from "react-i18next";
import NotifySnackbar from "../snackbar/notiySnackbar";

const ForgotPassword = ({ onNextStep }) => {
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
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();
    const form = e.target;
    const email = form.elements.email.value;
    const body = new FormData();
    body.append("type", "forgot_password");
    body.append("email", email);
    apiRequest({ body })
      .then((result) => {
        if (result.result) {
          const body = new FormData();
          body.append("type", "email_send");
          body.append("email", email);
          apiRequestEmail({ body }).then((res) => {
            if (res.result) {
              const data = { ...result, ...res };
              window.localStorage.setItem(
                "globasity_reset_password",
                JSON.stringify(data)
              );
              e.target.reset();
              onNextStep();
            }
          });
        } else {
          setMessage(result.message);
          setMessageType("error");
          setOpen(true);
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };
  return (
    <>
      <div>
        <NotifySnackbar
          handleClose={handleClose}
          open={open}
          message={message}
          messageType={messageType}
        />

        <Container fluid="xxl" className="px-0">
          <section className="px-sm-3 d-flex align-items-center justify-content-center">
            <div className="login_card">
              <div className="me-auto" onClick={() => navigate(-1)}>
                {" "}
                <ArrowLeft className="leftArrow" />
              </div>
              <div>
                <div className="heading text-center">
                  {t("Email_Verification")}
                </div>
                <div className="fs_07 text-center">{t("send_code")}</div>
                <div className="fs_07 text-center"></div>
              </div>

              <Form className="w-100 mt-4" onSubmit={handleSubmit}>
                <div className="d-flex flex-column contact_inputs gap-1 register">
                  <Form.Group controlId="email">
                    <Form.Label className="ps-2">{t("EMAIL")}</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder={t("PLC_EMAIL")}
                      style={{ fontSize: "14px" }}
                      required
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
                        t("send_code_bnt")
                      )}
                    </button>
                  </div>
                </div>
              </Form>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default ForgotPassword;
