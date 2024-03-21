/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import Button from "./pagesComponent/button";
import Footer from "./pagesComponent/footer";
import { useTranslation } from "react-i18next";
import "react-phone-input-2/lib/style.css";
import InvestorsIcon from "../assests/svg/investorsIcon.js";
import OurValues from "./pagesComponent/ourValues.js";
import ResearchIcon from "../assests/svg/ResearchIcon";
import IdentityIcon from "../assests/svg/IdentityIcon";
import InsightsIcon from "../assests/svg/InsightsIcon";
import VerifiedIcon from "../assests/svg/VerifiedIcon.js";

const Investors = () => {
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
                    <InvestorsIcon />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="px-1 mx-3 py-5">
            <div style={{ marginBottom: "100px" }}>
              <h3
                className="main-headings popins_semibold"
                style={{
                  alignItems: "center",
                  marginBottom: "50px",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                Verified Investors <VerifiedIcon />
              </h3>
            </div>
          </section>
          <OurValues headings={headings} paragraphs={paragraphs} />
        </Container>

        <Footer />
      </div>
    </div>
  );
};

export default Investors;
