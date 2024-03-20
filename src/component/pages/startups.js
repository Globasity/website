/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import Button from "./pagesComponent/button";
import Footer from "./pagesComponent/footer";
import { useTranslation } from "react-i18next";
import "react-phone-input-2/lib/style.css";
import OurValues from "./pagesComponent/ourValues";
import StartupsIcon from "../assests/svg/startupsIcon";
import ResearchIcon from "../assests/svg/ResearchIcon";
import IdentityIcon from "../assests/svg/IdentityIcon";
import InsightsIcon from "../assests/svg/InsightsIcon";
const Startups = () => {
  const headings = [
    { title: "Insights", icon: <InsightsIcon color={"#212529"} /> },
    { title: "Research", icon: <ResearchIcon color={"#212529"} /> },
    { title: "Identity", icon: <IdentityIcon color={"#212529"} /> },
  ];

  const paragraphs = ["Insights_detail", "Research_detail", "Identity_detail"];
  const { t } = useTranslation();
  return (
    <div>
      <div className="main" id="main">
        <Container fluid="xxl" className="px-0">
          <section className="px-3">
            <div className="pt-5 banner_main px-3">
              <div className="row ps-md-5 ps-1">
                <div className="col-md-6 pricing_col_1 ">
                  <h4 className="m-0 p-0">{t("work_together")}</h4>
                  <p style={{ textWrap: "balance", width: "100%" }}>
                    {t("corporate")}
                  </p>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div
                    style={{
                      width: "-webkit-fill-available",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <StartupsIcon />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="px-1 mx-3 py-5">
            <h3 className="main-headings display-center popins_semibold">
              Startups
            </h3>
            <div className="border p-4 rounded-4 my-5">
              <h6 className="popins_medium mb-3">{t("ADVANCE_SEARCH")}</h6>
              {/* <Form onSubmit={handleFormSubmit}> */}
              <Form>
                <div className="display_flex gap-md-4 flex_wrap">
                <Form.Group className="w-100">
                    <Form.Label className="fs_08 ps-2 mb-2">
                      {t("TITLE_B_TYPE")}
                    </Form.Label>
                    <Form.Control
                      name="businessType"
                      className="d-flex flex-column contact_inputs gap-2"
                      // value={formData.businessType}
                      // onChange={handleInputChange}
                    >
                    </Form.Control>
                  </Form.Group>
                  <Form.Group className="w-100">
                    <Form.Label className="fs_08 ps-2 mb-2">
                      {t("TITLE_B_TYPE")}
                    </Form.Label>
                    <Form.Select
                      name="businessType"
                      // value={formData.businessType}
                      // onChange={handleInputChange}
                    >
                      <option value="" className="fs_09">
                        {t("PLACE_B_TYPE")}
                      </option>
                      {/* {businessType?.length > 0 &&
                        businessType?.map(
                          (item) =>
                            userLangauge === "en" && (
                              <option
                                key={item.id}
                                value={
                                  userLangauge === "en"
                                    ? item.name_eng
                                    : item.name_heb
                                }
                              >
                                {userLangauge === "en"
                                  ? item.name_eng
                                  : item.name_heb}
                              </option>
                            )
                        )} */}
                    </Form.Select>
                  </Form.Group>
                </div>
                <Form.Group>
                  <div className="display_flex gap-3 flex_wrap">
                    <button
                      type="submit"
                      className="btn1 fs_09 btn_primary rounded_3 px-3 py-2"
                    >
                      {t("Search")}
                    </button>
                    <button
                      // onClick={handleClear}
                      type="button"
                      className="btn1 fs_09 btn_primary_outline rounded_3 px-3 py-2"
                    >
                      {t("Clear")}
                    </button>
                  </div>
                </Form.Group>
              </Form>
            </div>
          </section>
          <OurValues headings={headings} paragraphs={paragraphs} />
        </Container>

        <Footer />
      </div>
    </div>
  );
};

export default Startups;
