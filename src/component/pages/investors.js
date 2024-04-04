/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
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
import CustomCard from "./pagesComponent/customCard.js";
import InvestorsData from "./pagesComponent/investorsData.js";
import { useLocation } from "react-router-dom";

const Investors = () => {
  const headings = [
    { title: "Insights", icon: <InsightsIcon color={"#212529"} /> },
    { title: "Research", icon: <ResearchIcon color={"#212529"} /> },
    { title: "Identity", icon: <IdentityIcon color={"#212529"} /> },
  ];
  const ourValuesRef = useRef(null);
  const mainRef = useRef(null);
  const location = useLocation();
  const paragraphs = ["Insights_detail", "Research_detail", "Identity_detail"];
  const [visibleCards, setVisibleCards] = useState(6);

  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };
  const { t } = useTranslation();
  useEffect(() => {
    if (location.hash === "#ourValues") {
      scrollToOurValues();
    }
    if (location.hash === "#main") {
      scrollToMain();
    }
  }, [location.hash]);
  const scrollToOurValues = () => {
    // if (ourValuesRef.current) {
    //   ourValuesRef.current.scrollIntoView({ behavior: "smooth" });
    // }
    window.scrollTo(0, 50000);
  };
  const scrollToMain = () => {
    if (mainRef.current) {
      mainRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <div>
      <div style={{position:'absolute', top:'0px'}} id="main" ref={mainRef}></div>
      <div className="main">
        <Container fluid="xxl" className="px-0">
          <section className="px-3">
            <div className="pt-5 banner_main px-3">
              <div className="row ps-md-5 ps-1">
              <div className="col-md-8 mb-5">
                  <p className="hero-heading">Empowering Futures - Globasity Impactful Investors Showcase</p>
                  <p className="hero-detail">
                    {t("corporate")}
                  </p>
                </div>
                <div className="col-md-4 col-sm-12">
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
          <section className="px-1 mx-3 pb-5">
            <div className="mb-5">
              <h3
                className="main-headings popins_semibold"
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                Verified Investors <VerifiedIcon />
              </h3>
            </div>

            <div className="row">
              {/* Mapping over only the visible cards */}
              {InvestorsData.slice(0, visibleCards).map((card) => (
                <div
                  key={card.id}
                  className="col-lg-4 col-md-4 col-sm-4 col-12 mb-3"
                >
                  <CustomCard
                    image={card.image}
                    href={card.href}
                    title={card.title}
                    description={card.description}
                  />
                </div>
              ))}
            </div>
            <div
              style={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                gap: "10px",
              }}
            >
              {visibleCards < InvestorsData.length && (
                // eslint-disable-next-line
                <a onClick={handleLoadMore}>
                  <Button
                    padding=".84rem 1.7rem"
                    fs="0.9rem"
                    content={t("Load_More")}
                  />
                </a>
              )}
            </div>
          </section>
          <section className="margin-bottom-content" ref={ourValuesRef} id="our-values">
          <OurValues headings={headings} paragraphs={paragraphs} topHeader={"Why You Should Register?"} />
          </section>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default Investors;
