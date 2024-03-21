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

const MainPage = () => {
  const { t } = useTranslation();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const logos = [Logo1, Logo2, Logo3];
  const headings = [
    { title: "Insights", icon: <InsightsIcon color={"#212529"} /> },
    { title: "Research", icon: <ResearchIcon color={"#212529"} /> },
    { title: "Identity", icon: <IdentityIcon color={"#212529"} /> },
  ];

  const paragraphs = ["Insights_detail", "Research_detail", "Identity_detail"];
  return (
    <div>
      <div className="main" id="main">
        <Container fluid="xxl" className="px-0 position-relative">
          <section className="px-0 position-relative">
            {/* <Carousel fade  slide> */}
            {/* <Carousel.Item> */}
            <section className="px-3 mb-5">
              <div className="pt-5 banner_main px-xl-5 px-lg-4 px-3">
                <div
                  className="banner_grid"
                  style={{ display: "flex", flexDirection: "column" }}
                >
                  <div className="width5">
                    <div className="d-flex gap-2 ">
                      <div className="banner_col_1">
                        <h6>
                          A New World of Connecting Small Businesses &
                          Investors.
                        </h6>
                        {/* <p> {t("Subheadline")} </p> */}
                        {isLogin === false && (
                          <div style={{ textAlign: "center" }}>
                            <Link to={"/login"}>
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
            </section>
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
          <section>
            <div className="py-5 mb-5 px-sm-5 px-3">
              <h3 className="secondary-headings popins_semibold">About Us</h3>
              <div className="grid2">
                <div className="text_width w-100">{t("Paragraph1")}</div>
                <div className="justify-content-center d-lg-flex d-none">
                  <img
                    src={line}
                    alt=""
                    className=""
                    style={{ height: "90%" }}
                  />
                </div>
                <div className="d-flex align-items-sm-start flex-sm-row flex-column align-items-center justify-content-md-around justify-content-sm-between  justify-content-center gap-sm-3 gap-5 px-lg-0 pe-3">
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
            </div>
          </section>
          <section style={{ marginBottom: "7rem" }}>
            <div>
              <h3 className="main-headings display-center popins_semibold">
                Confirmed Companies <VerifiedIcon />
              </h3>
              <LogoSlider logos={logos} />
            </div>
          </section>
          <section className="mb-5 pb-5">
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
                        <h1 className=" m-0 font_size_inherit  popins_bold">
                          125+
                        </h1>
                        <h6 className="popins_bold">{t("Business_Man")}</h6>
                      </div>
                    </div>
                  </div>
                  <div className="rec1">
                    <div className="text-center" style={{ color: "#9CD161" }}>
                      <h1 className=" m-0 font_size_inherit popins_semibold">
                        10K+
                      </h1>
                      <h6 className="popins_semibold">
                        {t("Investment_Ideas")}
                      </h6>
                    </div>
                  </div>
                  <div className="rec3">
                    <div className="text-center" style={{ color: "#6EBECE" }}>
                      <h1 className=" m-0 font_size_inherit popins_semibold">
                        450
                      </h1>
                      <h6 className="popins_semibold">{t("Business_Ideas")}</h6>
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
                  {/* <Button padding=".84rem 1.7rem" content={t("Read_more")} /> */}
                </div>
              </div>
            </div>
          </section>

          <div className="business_interest px-md-5 px-sm-5 px-3">
            <div className="row pb-5">
              <div className="col-lg-6 business_interest_col_1 ">
                <h3 className="work2 popins_semibold">Investment Ecosystem</h3>
                <div className="my-3 d-flex flex-column gap-3">
                  {/* <p className="m-0 p-0">{t("Para3_Point1")}</p> */}
                  <p className="font_size_inherit" style={{ lineHeight: "2" }}>
                    {t("Para3_Point3")}
                  </p>
                  <p className="font_size_inherit" style={{ lineHeight: "2" }}>
                    {t("Para3_Point3")}
                  </p>
                </div>
              </div>
              <div className="col-lg-6 image-styling-center">
                <InvestEcoIcon />
                {/* <div className="px-sm-5 px-2 py-4 portfolio_image h-100 w-100"> */}
                {/* <div className="front_end">
                                        <div
                                            style={{ display: "inline-block" }}
                                            className="parent_google_bg" >
                                            <div
                                                className="google_bg"
                                                style={{ display: "inline-block" }} >
                                                <img src={google} style={{ width: "20px" }} alt="" />
                                            </div>
                                        </div>

                                        <span className="pt-2">Front-end</span>
                                        <p className="m-0">Google</p>
                                    </div>
                                    <div className="apple">
                                        <img src={apple} style={{ width: "6rem" }} alt="" />
                                    </div>
                                    <div
                                        className="notification noti2"
                                        style={{ position: "absolute", top: "60%", left: "-48%" }}
                                    >
                                        <div className="display_flex2 h-100">
                                            <div className="content position-relative display_flex2">
                                                <img
                                                    src={check}
                                                    style={{ maxWidth: "63px" }}
                                                    alt="notification"
                                                    className="bg_avatar_orange"
                                                />

                                                <p className="m-0 ps-3 font_inherit">
                                                    <span className="popins_semibold">Domey </span>
                                                    has liked this community
                                                </p>
                                                <img
                                                    className="heart mt-2"
                                                    style={{ maxWidth: "65px" }}
                                                    src={liked}
                                                    alt="like"
                                                />
                                            </div>
                                        </div>
                                    </div> */}
                {/* </div> */}
              </div>
            </div>
          </div>
          <section className="px-3 text-center mb-3">
            <div className="banner_main py-5">
              <div className="best_product d-flex justify-content-center  ">
                <p className="mb-4">
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
                      fs="0.9rem"
                      content={t("Get_Started")}
                    />
                  </Link>
                  <Link to={"/pricing"}>
                    <Button
                      color="#161925"
                      bg="transparent"
                      border="1px solid #161925"
                      ff="Popins_medium"
                      padding="14px 30px"
                      br="40px"
                      fs="0.9rem"
                      content={t("View_Pricing")}
                    />
                  </Link>
                </div>
              )}
              {/* <div className=" d-flex gap-3 justify-content-center flex-row flex-wrap px-3">
                <MainPageCards
                  amount="$49.00"
                  img={businessman}
                  name={t("Business_Man_Subcription")}
                /> */}
              {/* <MainPageCards amount={`$5.00/${t("Contract")}`} img={investor} name={t("Investor_Payment")} /> */}
              {/* </div> */}
            </div>
          </section>
          <section className="">
            <div className="row align-items-center justify-content-center mb-5 mt-5">
              <div className="col-lg-6 image-styling-center">
                <SmartInvestIcon />
                {/* <img
                  src={smart_investment}
                  className="client_img"
                  style={{}}
                  alt=""
                /> */}
              </div>
              <div className="col-xl-6 col-lg-7 client_col_2 py-5 pe-4">
                <p>{t("Smarter")}</p>
                <div className="d-flex flex-column gap-4">
                  {t("Paragraph4")}
                </div>
              </div>
            </div>
          </section>
          {/* <section className="px-md-5 px-4 " >

                        <div className="row  justify-content-center ">
                            <div className="col-xl-6 order-2 col-lg-5 py-5 ">
                                <img src={brands} className="client_img" style={{}} alt="" />
                            </div>
                            <div className="col-xl-6 col-lg-7 research_col_2  d-flex flex-column gap-4 ps-5 pt-5 mt-5 ">
                                <p>
                                    We work with brands world wide
                                </p>
                                <div className="hey">
                                    Only companies you apply to will see you’re looking for a job. Your current boss won’t know. Compare jobs using our salary tool
                                </div>

                                <div className="d-flex flex-md-row flex-column gap-4">
                                    <div className="research_main">
                                        <div className="research d-flex  align-items-start gap-2 mb-3">
                                            <h6 className="m-0" style={{ fontSize: "1.6rem" }}>01.</h6>
                                            <p className="m-0" style={{ lineHeight: "25px" }}>
                                                We research and <br />
                                                analyze the market
                                            </p>

                                        </div>
                                        <p>
                                            Turpis maecenas facilisis ultricies ut id. Pellentesque diam dui id ac cras suspendisse enim egestas arcu.
                                        </p>
                                    </div>
                                    <div className="research_main">
                                        <div className="research d-flex align-items-start gap-2 mb-3">
                                            <h6 className="m-0" style={{ fontSize: "1.6rem" }}>02.</h6>
                                            <p className="m-0" style={{ lineHeight: "25px" }}>
                                                We research and <br />
                                                analyze the market
                                            </p>

                                        </div>
                                        <p>
                                            Turpis maecenas facilisis ultricies ut id. Pellentesque diam dui id ac cras suspendisse enim egestas arcu.
                                        </p>
                                    </div>


                                    <div>

                                    </div>

                                </div>


                            </div>
                        </div>
                    </section> */}
          {/* <section id="craft" className="px-md-5 px-4 ">
            <div className="d-flex align-items-center justify-content-center craft">
              <span>{t("Revolutionizing_Financing")}</span>
            </div>
            <div className="row py-5 align-items-center justify-content-between px-2">
              <div className="col-lg-8 ">
                <img
                  src={invest_img8}
                  alt=""
                  style={{
                    width: "100%",
                    maxHeight: "28rem",
                    objectFit: "cover",
                    borderRadius: "20px",
                  }}
                />
              </div>
              <div className="col-lg-4 offset-0  px-2 py-4">
                <div className="d-flex flex-column gap-2 pt-lg-0 pt-md-0 ">
                  <div className="insight d-flex flex-column gap-1">
                    <h5 className="fw-bold">{t("Insights")}</h5>
                    <p>{t("Insights_detail")}</p>
                  </div>
                  <div className="insight d-flex flex-column gap-1">
                    <h5 className="fw-bold">{t("Research")}</h5>
                    <p>{t("Research_detail")}</p>
                  </div>
                  <div className="insight d-flex flex-column gap-1">
                    <h5 className="fw-bold">{t("Identity")}</h5>
                    <p>{t("Identity_detail")} </p>
                  </div>
                </div>
              </div>
            </div>
          </section> */}
          <OurValues
            headings={headings}
            paragraphs={paragraphs}
            topHeader={t("Revolutionizing_Financing")}
          />
        </Container>
        <Footer />
      </div>
    </div>
  );
};
export default MainPage;
