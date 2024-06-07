/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { Container, Form, Modal, Spinner } from "react-bootstrap";
import DetailCard from "./pagesComponent/detailCard";
import { apiRequest } from "../api/apiRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import paper from "../assests/png/paper.png";
import BackToTop from "./pagesComponent/backToTop";
import CircularProgress from "@mui/material/CircularProgress";
import { Send } from "react-feather";
import profileAvatar from "../assests/png/profileAvatar.png";

const MyBusiness = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );
  const [allBusinessType, setAllBusinessType] = useState([]);
  const [businessType, setBusinessType] = useState([]);
  const [isInvestor, setIsInvestor] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoadingButton, setIsLoadingButton] = useState(false);
  const [checkMyBus, setCheckMyBus] = useState("");
  const [contractData, setContractData] = useState();
  const { state } = useLocation();
  const { investorId, investor, investorData } = state ? state : {};
  const [businessId, setBusinessId] = useState(null);
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState(false);
  // const [investors, setInvestors] = useState([]);
  const handleClose = () => {
    setShow(false);
    setBusinessId(null);
  };
  const handleShow = () => setShow(true);
  const navigate = useNavigate();
  const handleChat = async () => {
    console.log(checkMyBus.user_id, );
    setIsLoadingButton(true);
    const body = new FormData();
    body.append("type", "check_if_exist");
    body.append("from_id", checkMyBus.user_id);
    console.log(investorData)
    body.append("to_id", investorData.id);
    await apiRequest({ body })
      .then((result) => {
        setIsLoadingButton(false);
        if (result.exists) {
          navigate("/chat");
        } else {
          setChat(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // navigate("/chat", {
    //   state: { businessData: checkMyBus, investorData: investorData },
    // });
  };
  const sendMessage = async () => {
    const body = new FormData();
    body.append("type", "new_chat_send");
    body.append("msg", message);
    body.append("from_id", checkMyBus.user_id);
    body.append("to_id", investorData.id);
    await apiRequest({ body })
      .then((result) => {
        setChat(false);
        navigate("/chat");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const { t } = useTranslation();
  const handleBusinessSelect = async (business) => {
    handleShow();
    setIsLoading(true);
    setBusinessId(business.id);
    setCheckMyBus(business);
    await getMyBusiness(business.id, business?.user?.id, investorId);
  };
  const getMyBusiness = async (id, user_business, investor) => {
    const body = new FormData();
    body.append("table_name", "business");
    body.append("type", "get_data");
    body.append("id", id);
    body.append("user_business", user_business);
    body.append("investor_id", investor);
    await apiRequest({ body })
      .then((result) => {
        setIsLoading(false);
        setContractData(result.data);
        setPageLoad(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const getBusinessType = () => {
    const body = new FormData();
    body.append("table_name", "business_types");
    body.append("type", "get_data");
    apiRequest({ body })
      .then((result) => {
        setBusinessType(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (investor === true) {
      setIsInvestor(investor);
    }
  }, [investor, investorId]);
  const handleViewAdd = (investorData2, businessData2, checkMyBus) => {
    navigate("/view-initial-contract", {
      state: {
        investorData: investorData2,
        businessData: businessData2,
        investorId: investorId,
        checkMyBus: checkMyBus,
      },
    });
  };
  const getAllBusiness = () => {
    const body = new FormData();
    body.append("table_name", "business");
    body.append("type", "get_data");
    body.append("user_id", userData.user_id);
    apiRequest({ body })
      .then((result) => {
        setAllBusinessType(result.data);
        setPageLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getBusinessType();
    getAllBusiness();
  }, []);
  const creatContract = () => {
    handleViewAdd(investorData, checkMyBus, checkMyBus);
    handleClose();

    // setIsLoading2(true)
    // const formData = {
    //     business_id: checkMyBus.id,
    //     investor_id: investorId,
    //     business_user: userData?.user_id,
    //     business_signature: "",
    //     investor_signature: "",
    //     status: "ongoing",
    //     contract_from: checkMyBus?.user?.user_type
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
    //     .then((result) => {
    //         if (result.result) {
    //             toast.success(result.message)
    //             handleClose()
    //             navigate(-1)
    //         }
    //         setIsLoading2(false)
    //     }).catch((err) => {
    //         toast.success(err)
    //         setIsLoading2(false)
    //         console.log(err)
    //     });
  };

  const handleMessage = (e) => {
    setMessage(e.target.value);
  };

  return (
    <>
      {pageLoad ? (
        <div className="w-100 vh_90 main_app d-flex justify-content-center align-items-center">
          <div className="d-flex align-items-center position-relative">
            <div className="position-absolute"></div>
          </div>
          <CircularProgress size={"3rem"} />
        </div>
      ) : (
        <>
          <BackToTop />
          <Modal show={chat} onHide={() => setChat(false)} centered>
            <Modal.Header closeButton className="border-0">
              <div>
                <img
                  src={
                    investorData?.image
                      ? investorData.url + investorData.image
                      : profileAvatar
                  }
                  className="chat_profile_img"
                />
              </div>
              <div className="ps-3">
                <h5 className="chat_detail fs_09">
                  {investorData?.name}
                </h5>
              </div>
            </Modal.Header>
            <Modal.Body>
              <div className=" position-relative">
                <div className="   w-100">
                  <div className="d-flex my-3 mx-3">
                    <div className="position-relative w-100 me-1">
                      <input
                        type="text"
                        required
                        onChange={handleMessage}
                        className="form-control rounded-3 ps-2 py-2 fs_10 "
                        placeholder="Try to..."
                      />
                    </div>
                    <button
                      className="send_btn rounded-3 bg_darkSec"
                      onClick={sendMessage}
                    >
                      <Send
                        className="text-white p-0 m-0"
                        style={{ width: "1.2rem" }}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </Modal.Body>
          </Modal>
          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton className="border-0">
              <h5 className="popins_semibold">{t("Terms_Condition")}</h5>
            </Modal.Header>
            <Modal.Body>
              {isLoading ? (
                <div className="display_flex2">
                  <Spinner animation="border" variant="black" size="" />
                </div>
              ) : (
                <div>
                  {contractData?.length > 0 &&
                  contractData[0]?.nda_created === "yes" ? (
                    <div className="fs_09 text-center">
                      {t("Already_bus_created")}
                      <button
                        type="button"
                        onClick={handleChat}
                        className="btn1 mt-4 btn2 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                      >
                        {isLoadingButton ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          "Chat"
                        )}
                      </button>
                    </div>
                  ) : (
                    <>
                      <div>
                        <div className="text-center fs_09 mb-3">
                          {t("Terms_Condition_Business")}
                        </div>
                        <div className="">
                          <button
                            type="button"
                            disabled={isLoading2 ? true : false}
                            onClick={creatContract}
                            className="btn1 btn2 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                          >
                            {isLoading2 ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              t("Accept")
                            )}
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}
            </Modal.Body>
          </Modal>
          <Container fluid="xxl" className="px-0">
            <section className="businessInfo">
              <Container fluid="lg">
                <div className="mb-5 mt-4">
                  <h5 className="popins_semibold text-center mb-0">
                    My Startup
                  </h5>
                  <div className="fs_08 popins_light text-center mt-1">
                    You can see your startup here
                  </div>
                </div>
                <div className="mt-5">
                  {isInvestor && (
                    <div className="popins_semibold fs_11 mb-4 text-danger">
                      Please Select Your Startup
                    </div>
                  )}
                  <div className="row contentCenter">
                    {isInvestor ? (
                      allBusinessType?.length > 0 ? (
                        allBusinessType?.map((items) => (
                          <div
                            key={items.id}
                            className="col-xl-4 col-lg-5 col-md-6 col-sm-9 p-2 h-100"
                          >
                            <Form.Check
                              type="radio"
                              name="businessId"
                              id={items.id}
                              label={
                                <div>
                                  <DetailCard
                                    getAllBusiness={getAllBusiness}
                                    id={items.id}
                                    url={items.url}
                                    name={items.name}
                                    favourite={items.favourite}
                                    profile={items.thumb}
                                    businessData={items}
                                    description={items.description}
                                    amountPer={items.requested_amount}
                                    isInvestor={businessId}
                                    investor_log={true}
                                  />
                                </div>
                              }
                              checked={businessId === items.id}
                              onChange={() => handleBusinessSelect(items)}
                            />
                          </div>
                        ))
                      ) : (
                        <>
                          <div className="d-flex justify-content-center flex-column align-items-center">
                            <img src={paper} alt="" className="paper" />
                            <div className="mt-1">{t("No_Business_Found")}</div>
                          </div>
                        </>
                      )
                    ) : allBusinessType?.length > 0 ? (
                      allBusinessType?.map((items) => (
                        <div
                          key={items.id}
                          className="col-xl-4 col-lg-5 col-md-6 col-sm-9  p-2"
                        >
                          <DetailCard
                            getAllBusiness={getAllBusiness}
                            id={items.id}
                            url={items.url}
                            name={items.name}
                            favourite={items.favourite}
                            profile={items.thumb}
                            businessData={items}
                            description={items.description}
                            amountPer={items.requested_amount}
                            investor_log={false}
                          />
                        </div>
                      ))
                    ) : (
                      <>
                        <div className="d-flex justify-content-center flex-column align-items-center">
                          <img src={paper} alt="" className="paper" />
                          <div className="mt-1">{t("No_Business_Found")}</div>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              </Container>
            </section>
          </Container>{" "}
        </>
      )}
    </>
  );
};

export default MyBusiness;
