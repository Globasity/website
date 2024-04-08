/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { Container, Tab, Tabs } from "react-bootstrap";
import InitialContractCard from "./pagesComponent/initialContractCard";
import profile from "../assests/png/cardimg1.png";
import paper from "../assests/png/paper.png";
import { apiRequest } from "../api/apiRequest";
import { useTranslation } from "react-i18next";
import BackToTop from "./pagesComponent/backToTop";
import CircularProgress from "@mui/material/CircularProgress";

const InitialContract = () => {
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );
  const [initailContract, setInitailContract] = useState([]);
  const [pageLoad, setPageLoad] = useState(true);
  const [ongoing, setOngoing] = useState([]);
  const { t } = useTranslation();
  const getInitialContract = () => {
    const body = new FormData();
    body.append("table_name", "initial_contract");
    body.append("type", "get_data");
    body.append("status", "completed");
    userData.user_type === "investor" &&
      body.append("investor_id", userData.user_id);
    userData.user_type === "business" &&
      body.append("business_user", userData.user_id);
    apiRequest({ body })
      .then((result) => {
        setInitailContract(result.data);
        setPageLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getInitialOngoingContract = () => {
    const body = new FormData();
    body.append("table_name", "initial_contract");
    body.append("type", "get_data");
    body.append("status", "ongoing");
    userData.user_type === "investor" &&
      body.append("investor_id", userData.user_id);
    userData.user_type === "business" &&
      body.append("business_user", userData.user_id);
    apiRequest({ body })
      .then((result) => {
        // console.log(result)
        setOngoing(result.data);
        setPageLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getInitialOngoingContract();
    getInitialContract();
  }, []);

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
        <Container fluid="xxl" className="px-0">
          <BackToTop />
          <section className="mt-5">
            <Container fluid="lg">
              <div className="mb-5">
                <h5 className="popins_semibold text-center mb-0">
                  {t("NDA_CONTRACT")}
                </h5>
                <div className="fs_08 popins_light text-center">
                  {t("CONTRACTS_DETAIL")}
                </div>
              </div>
              <div className="border invest p-3 rounded-4 my-5 shadow1">
                <Tabs
                  defaultActiveKey="ongoingContract"
                  id="tab-container"
                  className="w-100 initial_tabs"
                >
                  <Tab
                    eventKey="ongoingContract"
                    title={t("BTN_ONGOING")}
                    className=""
                  >
                    <section className="mt-5">
                      <div>
                        <div className="row contentCenter ">
                          {userData.user_type === "investor" &&
                            (ongoing?.length > 0 ? (
                              ongoing?.map((items) => (
                                <div
                                  key={items?.id}
                                  className="col-xl-4 col-lg-5 col-md-6 col-sm-9  p-2"
                                >
                                  {items?.status !== "completed" && (
                                    <InitialContractCard
                                      name={
                                        items?.contract_from === "business"
                                          ? items?.business_user?.name
                                          : items?.contract_from ===
                                              "investor" &&
                                            items?.business_user?.name
                                      }
                                      profile={
                                        items?.url + items?.business_user?.image
                                      }
                                      description={items?.business?.description}
                                      businessData={items}
                                      url={items?.url}
                                      businessName={items?.business?.name}
                                      completed={false}
                                    />
                                  )}
                                </div>
                              ))
                            ) : (
                              <>
                                <div className="d-flex justify-content-center flex-column align-items-center">
                                  <img src={paper} alt="" className="paper" />
                                  <div className="mt-1">
                                    {t("No_Contract_Found")}
                                  </div>
                                </div>
                              </>
                            ))}
                          {userData.user_type === "business" &&
                            (ongoing?.length > 0 ? (
                              ongoing?.map((items) => (
                                <div
                                  key={items?.id}
                                  className="col-xl-4 col-lg-5 col-md-6 col-sm-9  p-2"
                                >
                                  {items?.status !== "completed" && (
                                    <InitialContractCard
                                      name={
                                        items?.contract_from === "business"
                                          ? items?.investor_user?.name
                                          : items?.contract_from ===
                                              "investor" &&
                                            items?.investor_user?.name
                                      }
                                      profile={
                                        items?.url + items?.investor_user?.image
                                      }
                                      description={items?.business?.description}
                                      businessData={items}
                                      url={items?.url}
                                      businessName={items?.business?.name}
                                      completed={false}
                                    />
                                  )}
                                </div>
                              ))
                            ) : (
                              <>
                                <div className="d-flex justify-content-center flex-column align-items-center">
                                  <img src={paper} alt="" className="paper" />
                                  <div className="mt-1">
                                    {t("No_Contract_Found")}
                                  </div>
                                </div>
                              </>
                            ))}
                        </div>
                      </div>
                    </section>
                  </Tab>
                  <Tab eventKey="completeContract" title={t("BTN_COMPLETED")}>
                    <section className="mt-5">
                      <div>
                        <div className="row contentCenter ">
                          {userData.user_type === "investor" &&
                            (initailContract?.length > 0 ? (
                              initailContract?.map((items) => (
                                <div
                                  key={items?.id}
                                  className="col-xl-4 col-lg-5 col-md-6 col-sm-9  p-2"
                                >
                                  {items?.status === "completed" && (
                                    <InitialContractCard
                                      name={
                                        items?.contract_from === "business"
                                          ? items?.business_user?.name
                                          : items?.contract_from ===
                                              "investor" &&
                                            items?.business_user?.name
                                      }
                                      profile={
                                        items?.url + items?.business_user?.image
                                      }
                                      description={items?.business?.description}
                                      businessData={items}
                                      url={items?.url}
                                      businessName={items?.business.name}
                                      completed={true}
                                    />
                                  )}
                                </div>
                              ))
                            ) : (
                              <>
                                <div className="d-flex justify-content-center flex-column align-items-center">
                                  <img src={paper} alt="" className="paper" />
                                  <div className="mt-1">
                                    {t("No_Contract_Found")}
                                  </div>
                                </div>
                              </>
                            ))}
                          {userData.user_type === "business" &&
                            (initailContract?.length > 0 ? (
                              initailContract?.map((items) => (
                                <div
                                  key={items?.id}
                                  className="col-xl-4 col-lg-5 col-md-6 col-sm-9  p-2"
                                >
                                  {items?.status === "completed" && (
                                    <InitialContractCard
                                      name={
                                        items?.contract_from === "business"
                                          ? items?.investor_user?.name
                                          : items?.contract_from ===
                                              "investor" &&
                                            items?.investor_user?.name
                                      }
                                      profile={
                                        items?.url + items?.investor_user?.image
                                      }
                                      description={items?.business?.description}
                                      businessData={items}
                                      url={items?.url}
                                      businessName={items?.business.name}
                                      completed={true}
                                    />
                                  )}
                                </div>
                              ))
                            ) : (
                              <>
                                <div className="d-flex justify-content-center flex-column align-items-center">
                                  <img src={paper} alt="" className="paper" />
                                  <div className="mt-1">
                                    {t("No_Contract_Found")}
                                  </div>
                                </div>
                              </>
                            ))}
                        </div>
                      </div>
                    </section>
                  </Tab>
                </Tabs>
              </div>
            </Container>
          </section>
        </Container>
      )}
    </>
  );
};

export default InitialContract;
