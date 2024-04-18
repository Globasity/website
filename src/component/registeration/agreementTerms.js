/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { ArrowLeft } from "react-feather";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { apiRequest } from "../api/apiRequest";
import { useTranslation } from "react-i18next";
import { Link } from "react-feather";
import TermConditionModal from "../pages/pagesComponent/term&conditionModal";
import Button from "../pages/pagesComponent/button";

const AgreementTerms = ({ onNextStep, onPrevStep }) => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const [show, setShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [expand, setExpand] = useState(true);
  const [IsLoading, setIsLoading] = useState(false);
  const [paymentLink, setPaymentLink] = useState("");
  const [newWindow, setNewWindow] = useState(null);
  const [userPaymentInfo, setUserPaymentInfo] = useState("");
  const [nextBtn, setNextBtn] = useState(false);
  const [paymentResult, setPaymentResult] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );

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
    body.append("amount", 49.99);
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
  // Function to handle checkbox change
  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const updateSteps = async () => {
    setIsLoading(true);
    const body = new FormData();
    body.append("table", "users");
    body.append("type", "update_data");
    body.append("id", userData?.user_id);
    body.append("platform", 6);
    await apiRequest({ body })
      .then((result) => {
        // console.log(result)
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  // Function to handle form submission payment_fix
  // const handleSubmit = async (event) => {
  //     event.preventDefault();
  //     if (isChecked) {
  //         // onNextStep()
  //         await payment()
  //     } else {
  //         toast.warn('Please Accept the Commercial Subscription')
  //     }

  //     // Add code to handle the checkbox data as needed
  // };
  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isChecked) {
      // await updateSteps(); // Assuming this function updates some steps in your process
      onNextStep(); // Directly proceed to the next step without initiating payment
    } else {
      toast.warn("Please Accept the Agreement Terms");
    }
  };

  const handleToggle = () => {
    if (expand) {
      setExpand(false);
    } else {
      setExpand(true);
    }
  };
  const terms = [
    t("terms1"),
    t("terms2"),
    t("terms3"),
    t("terms4"),
    t("terms5"),
  ];

  return (
    <div>
      <Container fluid="md">
        <TermConditionModal
          show={show}
          setShow={setShow}
          data={terms}
          title={t("TERM_AND_COND")}
        />
        <section className="px-sm-3 px-1 d-flex align-items-center justify-content-center">
          <div className="login_card position-relative    ">
            <div className="me-auto" onClick={onPrevStep}>
              {" "}
              <ArrowLeft className="leftArrow" />
            </div>
            <div>
              <h5 className="text-center popins_semibold fs_12">
                Terms & Agreement
              </h5>
              <p className="fs_08 text-center popins_light">{t("com_des")}</p>
            </div>
            <div className="mt-4">
              <div className="term-conditions">
                {
                // eslint-disable-next-line
                <a
                 onClick={() => setShow(true)}>
                  <Button
                    type="inverse"
                    padding=".5rem 1.7rem"
                    fs="14px"
                    content={"View Agreement"}
                  />
                </a>
                }
              </div>
              {/* <div className="fs_09" style={{ textAlign: "justify" }}>
                {expand ? (
                <ul className="ps-4">
                  <li className="mb-2">
                    Users agree to abide by Globasity's service agreement for
                    platform usage.
                  </li>
                  <li className="mb-2">
                    A finder's fee is applicable for successful investor-startup
                    connections.
                  </li>
                  <li className="mb-2">
                    Fee structure is outlined in the agreement and may vary.
                  </li>
                  <li className="mb-2">
                    Payment of the finder's fee is due upon successful
                    transactions. <span className="popins_semibold fs_09 my-2" style={{cursor:'pointer', }} onClick={handleToggle}>View More Detail</span>
                  </li>
                </ul>
                ):(
                  <ul className="ps-4">
                  <li className="mb-3">
                    Users agree to abide by Globasity's service agreement for platform usage, including but not limited to compliance with community guidelines, data privacy policies, and any other terms and conditions set forth by Globasity.
                  </li>
                  <li className="mb-3">
                    A finder's fee is applicable for successful investor-startup connections facilitated through Globasity's platform. This fee serves as compensation for the matchmaking services provided by Globasity.
                  </li>
                  <li className="mb-3">
                    The fee structure for finder's fees is outlined in the agreement between users and Globasity and may vary based on factors such as the size and complexity of the investment or partnership opportunity.
                  </li>
                  <li className="mb-3">
                    Payment of the finder's fee is due upon successful transactions resulting from connections made through Globasity's platform. This fee is payable to Globasity as outlined in the agreement and serves to support the ongoing operation and development of the platform.
                  </li>
                  <li className="mb-3">
                    Users acknowledge that Globasity reserves the right to modify the finder's fee structure and service agreement terms at its discretion. Any changes will be communicated to users through platform notifications or direct communication channels.
                    <span className="popins_semibold fs_09 my-2" style={{cursor:'pointer',marginLeft:"10px"}} onClick={handleToggle}>Shrink View</span>
                  </li>
                </ul>
                
                )}
              </div> */}

              <Form onSubmit={handleSubmit}>
                <Form.Check
                  label={
                    <>
                      <div className="popins_semibold fs_09 ms-2">
                        {t("accept_btn")}
                      </div>
                    </>
                  }
                  name="group1"
                  type="checkbox"
                  onChange={handleCheckboxChange}
                  checked={isChecked}
                />
                <div className="mt-4">
                  <button
                    disabled={IsLoading ? true : false}
                    type="submit"
                    className="btn1 btn2 fs_09 btn_primary rounded_3 px-3 py-2 mx-auto"
                  >
                    {isLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      "Agree"
                    )}
                  </button>{" "}
                </div>
              </Form>
            </div>
          </div>
        </section>
      </Container>
    </div>
  );
};

export default AgreementTerms;
