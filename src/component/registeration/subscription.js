/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Modal, Spinner } from "react-bootstrap";
import { IoDiamondSharp } from "react-icons/io5";
import { ArrowLeft } from "react-feather";
import { apiRequest } from "../api/apiRequest";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Subscription = ({ onNextStep, onPrevStep }) => {
  const { t } = useTranslation();
  const [paymentLink, setPaymentLink] = useState("");
  const [userPaymentInfo, setUserPaymentInfo] = useState("");
  const [nextBtn, setNextBtn] = useState(false);
  const [paymentResult, setPaymentResult] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );
  const [newWindow, setNewWindow] = useState(null);

  let childWindow;

  const openPaymentPage = (paymentPageLink) => {
    const childWindow = window.open(
      paymentPageLink,
      "PaymentPage",
      "width=600,height=800"
    );
    return childWindow; // Return a reference to the child window
  };

  const payment = async () => {
    const body = new FormData();
    body.append("type", "payment_link");
    body.append("amount", "49.99");
    body.append("name", userData?.user_name);
    body.append("phone", userData?.phone);
    body.append("email", userData?.email);
    // Declare a variable to hold the reference to the child window

    await apiRequest({ body })
      .then((result) => {
        const data = JSON.parse(result.result);
        const paymentPage = data?.data.payment_page_link;
        setPaymentLink(paymentPage);
        setNextBtn(true);
        childWindow = openPaymentPage(paymentPage);
        setNewWindow(childWindow);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const fetchData = () => {
    const body = new FormData();
    body.append("table_name", "users");
    body.append("type", "get_data");
    body.append("email", userData?.email);
    apiRequest({ body })
      .then((result) => {
        const parsedGivenDate = new Date(result.data[0].website_payment_date);
        const currentDate = new Date();
        if (parsedGivenDate.toDateString() === currentDate.toDateString()) {
          setPaymentResult(true);
          setNextBtn(false);
          // console.log('Given date matches the current date!');
          setUserPaymentInfo(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const updateData = () => {
    const body = new FormData();
    body.append("table_name", "users");
    body.append("type", "update_data");
    body.append("id", userData?.user_id);
    body.append("website_payment_date", "00000-00-00");
    // body.append('platform', 5)
    apiRequest({ body })
      .then((result) => {})
      .catch((err) => {
        console.log(err);
      });
  };
  const addPaymentData = () => {
    setisLoading(true);
    const body = new FormData();
    body.append("table_name", "payments");
    body.append("type", "add_data");
    body.append("user_id", userData?.user_id);
    body.append("amount", 49);
    body.append("status", "approved");
    body.append("payment_method", "payplus");
    body.append("payment_type", "subscription");
    apiRequest({ body })
      .then((result) => {
        if (result.result === true) {
          toast.success("Transaction successfully");
          if (newWindow && !newWindow.closed) {
            newWindow.close();
          }
          updateData();
          onNextStep();
        }
        setisLoading(false);
      })
      .catch((err) => {
        toast.error(err);
        setisLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    if (paymentResult === true) {
      addPaymentData();
    }
  }, [onNextStep, paymentResult]);
  // Use setInterval to fetch data at regular intervals (e.g., every 5 seconds)
  useEffect(() => {
    if (nextBtn === true) {
      fetchData(); // Fetch data immediately
      const interval = setInterval(fetchData, 1000); // Fetch data every 5 seconds
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextBtn]);
  return (
    <div>
      <Container fluid="md">
        <section className="px-sm-3 px-1 d-flex align-items-center justify-content-center">
          <div className="login_card position-relative    ">
            <div className="me-auto" onClick={onPrevStep}>
              {" "}
              <ArrowLeft className="leftArrow" />
            </div>
            <div>
              <h5 className="text-center popins_semibold fs_12">
                {t("Subscription")}
              </h5>
              <p className="fs_08 text-center popins_light">
                {t("Subscription_head")}
              </p>
            </div>
            <div
              className="mt-4 subcription_width"
              style={{ textAlign: "justify" }}
            >
              <div className="d-flex align-items-center justify-content-between">
                <IoDiamondSharp
                  className="fs_15"
                  style={{ color: "#8f5811" }}
                />
                <div className="popins_semibold fs_09">$49.99/{t("month")}</div>
              </div>
              <div className="mt-3">
                <p>{t("Subscription_desc")}</p>
                <ul className="fs_09 mt-2 ps-4">
                  <li className="mb-2">{t("basic")}</li>
                  <li className="">{t("Premium_sub")}</li>
                </ul>
              </div>
            </div>
            <div className="mt-4">
              <button
                disabled={isLoading ? true : false}
                onClick={onNextStep}
                className="btn1 btn2 fs_09 btn_primary rounded_3 px-3 py-2 mx-auto"
              >
                {isLoading ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  t("BTN_NEXT")
                )}
              </button>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default Subscription;
