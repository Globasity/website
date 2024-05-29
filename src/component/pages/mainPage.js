/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Carousel, Container } from "react-bootstrap";
import heart from "../assests/png/heart.png";
import Button from "./pagesComponent/button";
import bannerImage from "../assests/bannerImage.png";
import chat from "../assests/png/chat.png";
import notifier from "../assests/png/notifier.png";
import line from "../assests/svg/line.svg";
import ellipse1 from "../assests/svg/ellipse1.svg";
import ellipse2 from "../assests/svg/ellipse2.svg";
import lines2 from "../assests/svg/lines2.svg";
import circle from "../assests/svg/3dCircle.svg";
import hand_shaking from "../assests/png/hand_shaking.png";
import Investment_eco from "../assests/png/Investment_eco.png";
import smart_investment from "../assests/png/smart_investment.png";
import Logo1 from "../assests/png/Logo1.png";
import Logo2 from "../assests/png/Logo2.png";
import Logo3 from "../assests/png/Logo3.png";
import MainPageCards from "./pagesComponent/mainPageCards";
import businessman from "../assests/png/businessman.png";
import client from "../assests/svg/client_img.svg";
import craft from "../assests/svg/craft.svg";
import Footer from "./pagesComponent/footer";
import invest_img2 from "../assests/invest_img2.png";
import invest_img6 from "../assests/invest_img6.jpg";
import invest_img8 from "../assests/invest_img8.jpg";
import graph1 from "../assests/graph.jpg";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import OurValues from "./pagesComponent/ourValues";
import ResearchIcon from "../assests/svg/ResearchIcon";
import IdentityIcon from "../assests/svg/IdentityIcon";
import InsightsIcon from "../assests/svg/InsightsIcon";
import HeroMain from "../assests/svg/HeroMain";
import VerifiedIcon from "../assests/svg/VerifiedIcon";
import LogoSlider from "./pagesComponent/LogoSlider";
import SmartInvestIcon from "../assests/svg/SmartInvestIcon";
import InvestEcoIcon from "../assests/svg/InvestEcoIcon";
import DollarSpIcon from "../assests/svg/dollarSpIcon";
import AnalyticsSpIcon from "../assests/svg/analyticsSpIcon";
import ResearchSpIcon from "../assests/svg/researchSpIcon";
import MainSlider from "./pagesComponent/mainSlider";
import DnbLogo from "../assests/svg/dnbLogo";
import arnonLogo from "../assests/png/arnonLogo.png";
import ProcessWork from "../assests/svg/ProcessWork";
import MainToggle from "./pagesComponent/mainToggle";
import TextAnimation from "./pagesComponent/textAnimation";
import HeroSlider from "./pagesComponent/heroSlider";
import PortfolioCompany from "./pagesComponent/portfolioComponent";

const MainPage = () => {
  const { t } = useTranslation();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const logos = [Logo1, Logo2, Logo3];
  const images = [
    Logo1,
    Logo2,
    Logo3,
    // Add more image URLs as needed
  ];
  const headings = [
    { title: "Insights", icon: <InsightsIcon color={"#212529"} /> },
    { title: "Research", icon: <ResearchIcon color={"#212529"} /> },
    { title: "Identity", icon: <IdentityIcon color={"#212529"} /> },
  ];
  const textArray = [
    "A New World of Connecting Small Startups & Investors.",
    "Empowering Small Businesses to Thrive with Investor Support.",
    "Linking Entrepreneurs with the Capital they Need to Succeed.",
  ];
  const duration = 3000;
  const paragraphs = ["Insights_detail", "Research_detail", "Identity_detail"];
  return (
    <div>
      {/* <Carousel.Item> */}

      <div className="main" id="main">
        <Container fluid="xxl" className="px-0 position-relative">
          <section className="px-0 position-relative margin-bottom-content">
            {/* <Carousel fade  slide> */}
            <HeroSlider />
            {/* <section className="px-3">
              <div className="pt-5 banner_main px-xl-5 px-lg-4 px-3">
                <div
                  className="banner_grid"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div className="width5">
                    <div className="d-flex gap-2 ">
                      <div className="banner_col_1">
                        <h6 className="reponsive-font">
                           A New World of Connecting Small Startups & Investors.
                        </h6>
                        {isLogin === false && (
                          <div style={{ textAlign: "center" }}>
                            <Link to={"/sign-up"}>
                              <Button
                                padding=".84rem 1.7rem"
                                fs="0.9rem"
                                content={t("Get_Started")}
                              />
                            </Link>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div
                    className="h-100"
                    style={{
                      position: "relative",
                      display: "flex",
                      justifyContent: "center",
                      width: "-webkit-fill-available",
                    }}
                  >
                    <HeroMain />
                  </div>
                </div>
              </div>
            </section> */}
            {/* </Carousel.Item>
                        <Carousel.Item>
                            <section className="px-3">
                                <div className="pt-5 banner_main px-xl-5 px-lg-4 px-3">
                                    <div className="banner_grid">
                                        <div className="width5">
                                            <div className="d-flex gap-2 ">
                                                <div className="banner_col_1 px-lg-3 px-xl-0 px-md-4 px-sm-5 px-2">
                                                    <h6 className="">
                                                        {t("Headline2")}
                                                    </h6>
                                                    <p>
                                                        {t("Subheadline")}
                                                    </p>
                                                    {isLogin === false && <div className="">
                                                        <Link to={"/login"}>
                                                            <Button padding=".84rem 1.7rem" content={t("Get_Started")} />
                                                        </Link>
                                                    </div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-100" style={{ position: "relative" }}>
                                            <img
                                                src={invest_img2}
                                                className="banner_image"
                                                alt="bannerImage" />
                                        </div>
                                    </div>
                                </div>
                            </section>
                        </Carousel.Item>
                    </Carousel> */}
            {/* <div>
                        <div className="notification">
                            <div className="display_flex2 h-100">
                                <div className="content position-relative display_flex2">
                                    <div className="">
                                        <img
                                            src={notifier}
                                            alt="notification"
                                            className="bg_avatar"
                                        />
                                    </div>
                                    <p className="m-0 ps-3 fs_08">
                                        <span className="popins_semibold">{t("hey")} </span> , {t("about_invest")}
                                    </p>
                                    <img className="heart" src={heart} alt="heart" />
                                </div>
                            </div>
                        </div>
                        <div className="startup ">
                            <div className="content">
                                <div className="mb-3 position-relative">
                                    <img src={circle} alt="" />
                                    <div className="startupPer popins_bold fs_11">60%</div>
                                </div>
                                <div className="font1 text-center">{t("Startups")}</div>
                                <div className="popins_bold text-center font2">
                                    {t("BTN_BUSINESS")}
                                </div>
                            </div>
                        </div>
                    </div> */}
          </section>
          <section className="margin-bottom-content">
            <div>
              <h3 className="main-headings display-center popins_semibold">
                Trusted Companies <VerifiedIcon />
              </h3>
              <LogoSlider logos={logos} />
            </div>
          </section>
          <section className="margin-bottom-content-more">
            {/* <div className="px-sm-5 px-3">
              <div className="grid2">
                <div className="text_width w-100 resp-margin-bottom px-3">
                  <div className="secondary-headings popins_semibold margin-s-b">
                    About Us
                  </div>
                  <br />
                  {t("Paragraph1")}
                </div>
                <div className="justify-content-center d-lg-flex d-none margin-s-t">
                  <img
                    src={line}
                    alt=""
                    className=""
                    style={{ height: "80%" }}
                  />
                </div>
                <div className="d-flex align-items-sm-start resp-margin-bottom flex-sm-row flex-column align-items-center justify-content-md-around justify-content-sm-between  justify-content-center gap-sm-3 gap-5 px-lg-0 pe-3 margin-s-t">
                  <div className="position-relative">
                    <img src={ellipse1} alt="" className="ellipse1" />
                    <div className="content1">
                      <div className="fs_44 mb-0 popins_semibold">12</div>
                      <div className="fs_09 mt-0 popins_semibold">
                        {t("Investors")}
                      </div>
                    </div>
                  </div>
                  <div className="position-relative">
                    <img src={ellipse2} alt="" className="ellipse1 me-3" />
                    <div className="content1">
                      <div className="">
                        <div className="fs_44 mb-0 popins_semibold">11K</div>
                        <div className="fs_09 mt-0 popins_semibold">
                          {t("BTN_BUSINESS")}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div> */}
            <MainToggle />
          </section>
          {/* <section className="margin-bottom-content-more">
            <div className="row mx-0" style={{ flexWrap: "wrap-reverse" }}>
              <div className="col-lg-6 position-relative">
                <div className=" display_flex2 mt-lg-0 mt-5 gap-3 flex-wrap">
                  <img
                    src={lines2}
                    alt=""
                    className="mx-auto d-lg-flex d-none lines"
                    style={{ borderRadius: "50% 0 0 0 " }}
                  />

                  <div className="rec_height display_flex2">
                    <div className="rec2">
                      <div className="text-center" style={{ color: "#FFBE16" }}>
                        <h1 className="font_size_inherit  popins_bold margin-bottom-s">
                        <ResearchSpIcon color={"#FFBE16"}/>
                        </h1>
                        <h6 className="popins_bold">
                          Traction Strategy Sprint
                        </h6>
                      </div>
                    </div>
                  </div>
                  <div className="rec1">
                    <div className="text-center" style={{ color: "#9CD161" }}>
                      <h1 className=" font_size_inherit popins_semibold margin-bottom-s">
                        <DollarSpIcon color={"#9ED265"}/>
                      </h1>
                      <h6 className="popins_semibold">
                      Fundraising Support
                      </h6>
                    </div>
                  </div>
                  <div className="rec3">
                    <div className="text-center" style={{ color: "#6EBECE" }}>
                      <h1 className="font_size_inherit popins_semibold margin-bottom-s">
                        <AnalyticsSpIcon color={"#6EBECE"}/>
                      </h1>
                      <h6 className="popins_semibold">Market Validation</h6>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-6 m-auto">
                <div className="px-lg-0 px-sm-5 px-sm-4 px-3">
                  <h3 className="secondary-headings popins_semibold">
                    {t("How_Works")}
                  </h3>
                  <div className="work mb-4 mt-4">
                    <p className="text_width w-100">{t("Paragraph2")}</p>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          <section className="margin-bottom-content">
            <div className="business_interest">
              <div className="row mx-3">
                <div className="col-lg-6 m-auto">
                  <div className="px-lg-0 px-sm-5 px-sm-4 px-3">
                    <h3 className="secondary-headings popins_semibold">
                      Investment Ecosystem
                    </h3>
                    <div className="work mb-4 mt-4">
                      <p className="text_width w-100 resp-margin-bottom">
                        {t("Paragraph2")}
                      </p>
                    </div>
                    {/* <Button padding=".84rem 1.7rem" content={t("Read_more")} /> */}
                  </div>
                </div>
                <div className="col-lg-6 image-styling-center resp-img-width">
                  <div className="mx-3 display-contents">
                    <InvestEcoIcon />
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* <section className="px-3 text-center margin-bottom-content">?
            <div className="banner_main py-5">
              <div className="best_product d-flex justify-content-center  ">
                <p className="mb-4 font-custom-heading">
                  "Empower Your Investment Journey with Globasity - Where Dreams
                  Meet Capital"
                </p>
              </div>
              {isLogin === false && (
                <div
                  style={{
                    textAlign: "center",
                    display: "flex",
                    gap: "15px",
                    justifyContent: "center",
                  }}
                >
                  <Link to={"/login"}>
                    <Button
                      padding=".84rem 1.7rem"
                      fs="14px"
                      content={t("Get_Started")}
                    />
                  </Link>
                </div>
              )}
            </div>
          </section> */}
          <section className="margin-bottom-content">
            <div className="business_interest">
              <div className="row mx-3 reverse-flow">
                <div className="col-lg-6 image-styling-center resp-margin-bottom resp-img-width">
                  <div className="mx-3 display-contents">
                    <SmartInvestIcon />
                  </div>
                </div>
                <div className="col-lg-6 m-auto custom-pad-left custom-pad-top">
                  <div className="px-lg-0 px-sm-5 px-sm-4 px-3">
                    <h3 className="secondary-headings popins_semibold">
                      {t("Smarter")}
                    </h3>
                    <div className="work mb-4 mt-4">
                      <p className="text_width w-100">{t("Paragraph4")}</p>
                    </div>
                    {/* <Button padding=".84rem 1.7rem" content={t("Read_more")} /> */}
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section className="margin-bottom-content">
            <PortfolioCompany />
          </section>
          <section className="margin-bottom-content">
            <OurValues
              headings={headings}
              paragraphs={paragraphs}
              topHeader={t("Revolutionizing_Financing")}
            />
          </section>
          <section className="margin-bottom-content-special">
            <h3 className="main-headings display-center popins_semibold">
              Tursted Partners <VerifiedIcon />
            </h3>
            <div className="business_interest">
              <div className="row mx-3">
                <div className="col-lg-6">
                  <div
                    className="image-styling-center resp-img-width mb-3"
                    style={{ minHeight: "250px" }}
                  >
                    <div className="display-contents">
                      <DnbLogo />
                    </div>
                  </div>
                </div>
                <div className="col-lg-6">
                  <div className="image-styling-center resp-img-width mb-3">
                    <div className="display-contents">
                      <img src={arnonLogo} alt="heart" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </Container>
        <Footer />
      </div>
    </div>
  );
};
export default MainPage;
