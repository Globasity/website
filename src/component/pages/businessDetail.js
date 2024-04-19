/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import { Accordion, Container, Modal } from "react-bootstrap";
import Carousel from "react-bootstrap/Carousel";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { apiRequest } from "../api/apiRequest";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { Download } from "react-feather";
import BackToTop from "./pagesComponent/backToTop";

const BusinessDetail = () => {
  const { state } = useLocation()
  const [Images, setImages] = useState([])
  const { businessData, url, status, isfav } = state ? state : {}
  const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
  const [contractData, setContractData] = useState();
  const [newWindow, setNewWindow] = useState(null)
  const [InvestorData, setInvestorData] = useState();
  const { t } = useTranslation()
  const [paymentLink, setPaymentLink] = useState('')
  const [userPaymentInfo, setUserPaymentInfo] = useState('')
  const [nextBtn, setNextBtn] = useState(false)
  const [paymentResult, setPaymentResult] = useState(false)
  const [isLoading, setisLoading] = useState(false)
  let childWindow;

  const openPaymentPage = (paymentPageLink) => {
    const childWindow = window.open(paymentPageLink, 'PaymentPage', 'width=600,height=800');
    return childWindow; // Return a reference to the child window
  };
  const handleViewAdd = (investorData2, businessData2, checkMyBus) => {
    navigate('/view-initial-contract', { state: { investorData: investorData2, businessData: businessData2, investorId: userData?.user_id, checkMyBus: checkMyBus } })
  }
  const updateData = async () => {
    const body = new FormData();
    body.append('table_name', 'users');
    body.append('type', 'update_data');
    body.append('id', userData?.user_id);
    body.append('website_payment_date', "00000-00-00");
    await apiRequest({ body })
      .then((result) => {
        console.log(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const payment = async () => {
    const body = new FormData()
    body.append('type', 'payment_link')
    body.append('amount', "5")
    body.append('name', userData?.user_name)
    body.append('phone', userData?.phone)
    body.append('email', userData?.email)
    // Declare a variable to hold the reference to the child window

    await apiRequest({ body })
      .then((result) => {
        const data = JSON.parse(result.result);
        const paymentPage = data?.data.payment_page_link;
        setPaymentLink(paymentPage);
        setNextBtn(true)
        childWindow = openPaymentPage(paymentPage);
        setNewWindow(childWindow)
      }).catch((err) => {
        console.log(err);
      });
  }
  const fetchData = () => {
    const body = new FormData();
    body.append('table_name', 'users');
    body.append('type', 'get_data');
    body.append('email', userData?.email);
    apiRequest({ body })
      .then((result) => {
        const parsedGivenDate = new Date(result.data[0].website_payment_date);
        const currentDate = new Date();
        if (parsedGivenDate.toDateString() === currentDate.toDateString()) {
          setPaymentResult(true)
          setNextBtn(false)
          setUserPaymentInfo(result.data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const addPaymentData = async () => {
    setisLoading(true)
    const body = new FormData();
    body.append('table_name', 'payments');
    body.append('type', 'add_data');
    body.append('user_id', userData?.user_id);
    body.append('amount', 5);
    body.append('business_id', businessData?.business_id);
    body.append('contract_id', 0);
    body.append('payment_method', 'payplus');
    body.append('status', 'approved');
    body.append('payment_type', 'contract');
    apiRequest({ body })
      .then(async (result) => {
        if (result.result === true) {
          toast.success("Transaction successfully")
          if (newWindow && !newWindow.closed) {
            newWindow.close();
          }
          await updateData()
          creatContract()
        }
        setisLoading(false)
      })
      .catch((err) => {
        toast.error(err)
        setisLoading(false)
        console.log(err);
      });
  }
  useEffect(() => {
    if (paymentResult === true) {
      addPaymentData()
    }
  }, [paymentResult])
  // Use setInterval to fetch data at regular intervals (e.g., every 5 seconds)
  useEffect(() => {
    if (nextBtn === true) {
      fetchData(); // Fetch data immediately
      const interval = setInterval(fetchData, 1000); // Fetch data every 5 seconds
      return () => clearInterval(interval);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nextBtn]);
  useEffect(() => {
    const imgData = (businessData?.images)
    setImages(imgData)
  }, [businessData])
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getInvestors = async () => {
    const body = new FormData()
    body.append('table_name', 'users')
    body.append('type', 'get_data')
    body.append('id', userData?.user_id)
    await apiRequest({ body })
      .then((result) => {
        handleViewAdd(result.data[0], businessData, businessData)
        handleClose()
      }).catch((err) => {
        console.log(err)
      });
  }
  const creatContract = () => {
    getInvestors()
    // const formData = {
    //   business_id: businessData?.id,
    //   investor_id: userData?.user_id,
    //   business_user: businessData?.user?.id,
    //   business_signature: "",
    //   investor_signature: "",
    //   status: "ongoing",
    //   contract_from: businessData?.user?.user_type
    // }
    // const body = new FormData()
    // body.append('table_name', 'initial_contract')
    // body.append('type', 'add_data')
    // body.append('business_id', formData.business_id)
    // body.append('investor_id', formData.investor_id)
    // body.append('business_user', formData.business_user)
    // body.append('business_signature', formData.business_signature)
    // body.append('investor_signature', formData.investor_signature)
    // body.append('status', formData.status)
    // body.append('contract_from', formData.contract_from)
    // apiRequest({ body })
    //   .then((result) => {
    //     if (result.result) {
    //       navigate(-1)
    //     }
    //   }).catch((err) => {
    //     console.log(err)
    //   });
  }
  const getMyBusiness = async (id, user_business_id, investorId) => {
    const body = new FormData()
    body.append('table_name', 'business')
    body.append('type', 'get_data')
    body.append('id', id)
    body.append('user_business', user_business_id)
    body.append('investor_id', investorId)
    await apiRequest({ body })
      .then((result) => {
        setContractData(result.data[0])
      }).catch((err) => {
        console.log(err)
      });
  }
  useEffect(() => {
    // getInvestors()
    getMyBusiness(businessData?.id, isfav ? businessData?.user_id : businessData?.user?.id, userData.user_id)
  }, [businessData])
  const navigate = useNavigate()
  const handleChat = (businessUserId, investorUserId) => {
    navigate("/chat", { state: { businessUserId: businessUserId, investorUserId: investorUserId } })
  }
  const download = (file) => {
    if (file === "undefined" || file === "" || file === undefined || file === "null" || file === null) {
      toast.info("This document not uploaded")
    } else {
      const fileUrl = businessData?.url + file;
      const downloadLink = document.createElement('a');
      downloadLink.href = fileUrl;
      downloadLink.target = '_blank'; // Open in a new tab or window
      downloadLink.click();
    }
  };


  return (
    <>
      <BackToTop />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          <h5 className="popins_semibold">{t("Terms_Condition")}</h5>
        </Modal.Header>
        <Modal.Body className="text-center">{t("Terms_Condition_Business")}</Modal.Body>
        <div className="py-3">
          <button type='button' onClick={creatContract} className='btn1 btn2 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
            {t("Accept")}
          </button>
        </div>
      </Modal>
      <Container fluid="xxl" className="px-0">
        <section className="my-5">
          <Container fluid="lg">
            <div className="mb-4 ">

              <Carousel>
                {Images?.map((items, index) => (
                  <Carousel.Item key={index}>
                    <img
                      src={url + items}
                      alt="banner"
                      style={{ width: "100%", height: "500px", objectFit: "cover", objectPosition: "top" }}
                    />
                  </Carousel.Item>
                ))}
              </Carousel>

            </div>
            <div className="parent" style={{ marginTop: "-5rem" }}>
              <div className=" d-flex flex-row gap-3 gap-sm-4 gap-lg-5 justify-content-center flex_wrap2 flex-nowrap">
                <div className="loka" style={{}}>
                  <h5 className="m-0 mb-1">{t("RAISED_AMOUNT")} %</h5>
                  <p className="m-0 text-black popins_semibold">
                    {businessData?.requested_amount}
                  </p>
                </div>
                <div className="loka" style={{}}>
                  <h5 className="m-0 mb-1">Location</h5>
                  <p className="m-0 text-black popins_semibold">
                    {businessData?.location}
                  </p>
                </div>
                <div className="loka" style={{}}>
                  <h5 className="m-0  mb-1">{t("SINCE")}</h5>
                  <p className="m-0 text-black popins_semibold">
                    {businessData?.since}
                  </p>
                </div>
              </div>
            </div>
            <div>
              <div className="d-flex gap-3 ps-1 flex-wrap mb-3" style={{ marginTop: "3rem" }}>
                <h5 className="popins_semibold ">Startup Name:</h5>
                <h5 className="width2" style={{ wordWrap: "break-word" }}>{businessData?.name}</h5>
              </div>
              <div
                className="border p-4 rounded-3   shadow1">
                <h6 className="popins_semibold mb-2">Description</h6>
                <p className="text_secondary" style={{ fontSize: "0.85rem", wordWrap: "break-word" }}>
                  {businessData?.description}
                </p>
              </div>
              <div className="border invest p-1 rounded-3 my-4 shadow1">
                <Accordion className="text-center border-0 w-100">
                  <Accordion.Item eventKey="0" className=" border-0">
                    <Accordion.Header className="border-0 popins_semibold fs_10">
                      Basic Information
                    </Accordion.Header>
                    <Accordion.Body className="border-0 pt-0 ">
                      <div className="d-flex align-items-sm-center flex-sm-row flex-column popins_semibold gap-3 mb-2">{t("CompanyName")}: <div className=" popins_regular"> {businessData?.company_name} </div> </div>
                      <div className="d-flex align-items-sm-center flex-sm-row flex-column popins_semibold gap-3 mb-2">{t("CompanyAddress")}: <div className=" popins_regular"> {businessData?.company_address}  </div></div>
                      <div className="d-flex align-items-sm-center flex-sm-row flex-column popins_semibold gap-3 mb-2">{t("CompanyNumber")}: <div className=" popins_regular">  {businessData?.company_number}  </div></div>
                      <div className="d-flex align-items-sm-center flex-sm-row flex-column popins_semibold gap-3 mb-2">{t("Business_Type")}: <div className=" popins_regular">  {businessData?.business_type}  </div></div>
                      <div className="d-flex align-items-sm-center flex-sm-row flex-column popins_semibold gap-3 mb-2">{t("TITLE_B_STATUS")}: <div className=" popins_regular">  {businessData?.business_status}  </div></div>
                      <div className="d-flex align-items-sm-center flex-sm-row flex-column popins_semibold gap-3 mb-2">{t("CURRENCY_TYPE")}: <div className=" popins_regular">  {businessData?.currency_type}  </div></div>
                      <div className="d-flex align-items-sm-center flex-sm-row flex-column popins_semibold gap-3 mb-2">{t("Funding_Amount")}: <div className=" popins_regular">  {businessData?.funding_amount}  </div></div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="border invest p-1 rounded-3 my-4 shadow1">
                <Accordion className="text-center border-0 w-100">
                  <Accordion.Item eventKey="0" className=" border-0">
                    <Accordion.Header className="border-0 popins_semibold fs_10">
                      {t("FINANCIAL_INFO")}
                    </Accordion.Header>
                    <Accordion.Body className="border-0 pt-0 ">
                      <div className="d-flex align-items-center gap-3 mb-2">{t("Financial_Statement")}: <div style={{ cursor: "pointer" }}> <Download onClick={() => download(businessData?.statement)} /> </div> </div>
                      <div className="d-flex align-items-center gap-3 mb-2">{t("Business_Certificate")}: <div style={{ cursor: "pointer" }}> <Download onClick={() => download(businessData?.certificate)} /> </div></div>
                      <div className="d-flex align-items-center gap-3 mb-2">{t("Other_Relevant_Document")}: <div style={{ cursor: "pointer" }}> <Download onClick={() => download(businessData?.other_doc)} /> </div></div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="border invest p-1 rounded-3 my-4 shadow1">
                <Accordion className="text-center border-0 w-100">
                  <Accordion.Item eventKey="0" className=" border-0">
                    <Accordion.Header className="border-0 popins_semibold fs_10">
                      {t("Diligence")}
                    </Accordion.Header>
                    <Accordion.Body className="border-0 pt-0 ">
                      <div className="d-flex align-items-center gap-3 mb-2">{t("Legal_Diligence")}: <div style={{ cursor: "pointer" }}> <Download onClick={() => download(businessData?.legal_diligence)} /> </div> </div>
                      <div className="d-flex align-items-center gap-3 mb-2">{t("Business_Diligence")}: <div style={{ cursor: "pointer" }}> <Download onClick={() => download(businessData?.business_diligence)} /> </div></div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
              <div className="border invest p-1 rounded-3 my-4 display_flex shadow1">
                <Accordion className="text-center border-0 w-100">
                  <Accordion.Item eventKey="0" className=" border-0">
                    <Accordion.Header className="border-0 popins_semibold fs_10">
                      {t("OBLIGATION_RES")}
                    </Accordion.Header>
                    <Accordion.Body className="border-0">
                      {businessData?.obligations}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </div>
            {userData?.user_type === "investor" &&
              (contractData?.nda_created === "no" ?
                (<div className="pb-5">
                  <button type='button' onClick={handleShow} className='btn1 btn2 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
                    {t("BTN_CONTACT_US")}
                  </button>
                </div>)
                : <>
                  {(contractData?.status) === "ongoing" &&
                    <div className="text-danger text-center">
                      {t("Bus_process")}
                    </div>}
                  {(contractData?.status) === "completed" &&
                    <button type='button' onClick={() => handleChat(businessData?.id, userData?.user_id)} className='btn1 btn2 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
                      {t("Chat")}
                    </button>}
                </>)
            }
          </Container>
        </section>
      </Container>
    </>
  );
};
export default BusinessDetail;
