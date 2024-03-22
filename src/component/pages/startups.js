import React, { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import OurValues from "./pagesComponent/ourValues";
import StartupsIcon from "../assests/svg/startupsIcon";
import ResearchIcon from "../assests/svg/ResearchIcon";
import IdentityIcon from "../assests/svg/IdentityIcon";
import InsightsIcon from "../assests/svg/InsightsIcon";
import VerifiedIcon from "../assests/svg/VerifiedIcon";
import CustomCard from "./pagesComponent/customCard";
import Button from "./pagesComponent/button";
import Footer from "./pagesComponent/footer";
import StartupsData from "./pagesComponent/startupsData";

const Startups = () => {
  const [formData, setFormData] = useState({ fullName: "", businessType: "" });
  const { t } = useTranslation();
  const [visibleCards, setVisibleCards] = useState(6);
  const [filteredCards, setFilteredCards] = useState([]);
  const [searchMessage, setSearchMessage] = useState("");
  const [searchPerformed, setSearchPerformed] = useState(false); // Track if search has been performed

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleClear = () => {
    setFormData({ fullName: "", businessType: "" });
    setFilteredCards([]);
    setVisibleCards(6); // Reset visibleCards to initial value
    setSearchMessage(""); // Clear search message
    setSearchPerformed(false); // Reset searchPerformed
  };

  const handleSearch = () => {
    const filtered = StartupsData.filter((card) => {
      const titleMatch = card.title
        .toLowerCase()
        .includes(formData.fullName.toLowerCase());
      const typeMatch = formData.businessType
        ? card.type.toLowerCase() === formData.businessType.toLowerCase()
        : true;
      return titleMatch && typeMatch;
    });
    setFilteredCards(filtered);
    setVisibleCards(filtered.length);
    setSearchMessage(filtered.length === 0 ? t("No_Search_Found") : ""); // Set search message if no results found
    setSearchPerformed(true); // Set searchPerformed to true
  };

  const handleLoadMore = () => {
    setVisibleCards((prevVisibleCards) => prevVisibleCards + 3);
  };

  const headings = [
    { title: "Insights", icon: <InsightsIcon color={"#212529"} /> },
    { title: "Research", icon: <ResearchIcon color={"#212529"} /> },
    { title: "Identity", icon: <IdentityIcon color={"#212529"} /> },
  ];

  const paragraphs = ["Insights_detail", "Research_detail", "Identity_detail"];

  return (
    <div>
      <div className="main" id="main">
        <Container fluid="xxl" className="px-0">
          <section className="px-3">
            <div className="pt-5 banner_main px-3">
              <div className="row ps-md-5 ps-1">
                <div className="col-md-8 mb-5">
                  <p className="hero-heading">Empowering Futures - Globasity Impactful Portfolio Showcase</p>
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
                    <StartupsIcon />
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="px-1 mx-3 py-5">
            <div>
              <h3
                className="main-headings popins_semibold"
                style={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "center",
                  gap: "10px",
                }}
              >
                Company Portfolio <VerifiedIcon />
              </h3>
            </div>
            <div className="border p-4 rounded-4 my-5">
              <h6 className="popins_medium mb-3">{t("ADVANCE_SEARCH")}</h6>
              <Form>
                <div className="display_flex gap-md-4 flex_wrap">
                  <Form.Group className="w-100">
                    <div className="d-flex flex-column contact_inputs gap-2">
                      <label>{t("Name")}</label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder={t("Name")}
                        value={formData.fullName}
                        onChange={(e) => handleInputChange(e)}
                      />
                    </div>
                  </Form.Group>
                  <Form.Group className="w-100">
                    <Form.Label className="fs_08 ps-2 mb-2">
                      {t("TITLE_B_TYPE")}
                    </Form.Label>
                    <Form.Select
                      name="businessType"
                      value={formData.businessType}
                      onChange={(e) => handleInputChange(e)}
                    >
                      <option value="" className="fs_09">
                        {t("PLACE_B_TYPE")}
                      </option>
                      <option value="it">IT</option>
                      <option value="foods">Foods</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <Form.Group>
                  <div className="display_flex gap-3 flex_wrap">
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="btn1 fs_09 btn_primary rounded_3 px-3 py-2"
                    >
                      {t("Search")}
                    </button>
                    <button
                      type="button"
                      onClick={handleClear}
                      className="btn1 fs_09 btn_primary_outline rounded_3 px-3 py-2"
                    >
                      {t("Clear")}
                    </button>
                  </div>
                </Form.Group>
              </Form>
            </div>
            {searchMessage && <p>{searchMessage}</p>}
            <div className="row">
              {(filteredCards.length > 0 ? filteredCards : StartupsData)
                .slice(0, visibleCards)
                .map((card) => (
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
              {visibleCards < StartupsData.length &&
                !searchPerformed && ( 
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
          <section className="margin-bottom-content">
          <OurValues
            headings={headings}
            paragraphs={paragraphs}
            topHeader={"Why You Should Register?"}
          />
          </section>
        </Container>
        <Footer />
      </div>
    </div>
  );
};

export default Startups;
