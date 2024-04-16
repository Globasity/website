/* eslint-disable no-unused-vars */
import React from "react";
import { Container } from "react-bootstrap";
import Button from "./pagesComponent/button";
import mission from "../assests/png/mission.png";
import vission from "../assests/png/vission.png";
import cardimg1 from "../assests/png/cardimg1.png";
import cardimg2 from "../assests/png/cardimg2.png";
import cardimg3 from "../assests/png/cardimg3.png";
import cardimg4 from "../assests/png/cardimg4.png";
import Footer from "./pagesComponent/footer";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import AboutIcon from "../assests/svg/AboutIcon";
import OurMissionIcon from "../assests/svg/OurMissionIcon";
import ProcessWork from "../assests/svg/ProcessWork";
import Team from "../assests/png/team.png";
import Logo1 from "../assests/png/Logo1.png";
import Logo2 from "../assests/png/Logo2.png";
import Logo3 from "../assests/png/Logo3.png";
import LogoSlider from "./pagesComponent/LogoSlider";
import VerifiedIcon from "../assests/svg/VerifiedIcon";
import {
  ArrowUp,
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Mail,
} from "react-feather";
import AndIcon from "../assests/svg/AndIcon";

const About = () => {
  const { t } = useTranslation();
  const isLogin = useSelector((state) => state.auth.isLogin);
  const logos = [Logo1, Logo2, Logo3];
  const handleShareClick = (socialMedia) => {
    let socialMediaUrl = "";

    switch (socialMedia) {
      case "facebook":
        socialMediaUrl = `https://www.facebook.com/`;
        break;
      case "linkedin":
        socialMediaUrl = `https://www.linkedin.com/`;
        break;
      case "twitter":
        socialMediaUrl = `https://twitter.com/`;
        break;
      default:
        break;
    }
    if (socialMediaUrl) {
      window.open(socialMediaUrl, "_blank");
    }
  };
  const cardData = [
    {
      img: mission,
      name: "Pansy Parkinson",
      skill: "UI/UX DESIGNER",
    },
    {
      img: vission,
      name: "Rubeus Hagrid",
      skill: "DEVELOPMENT",
    },
    {
      img: cardimg3,
      name: "Hagaruka Leua",
      skill: "DEVELOPMENT",
    },
    {
      img: cardimg1,
      name: "Nimakia Hasial",
      skill: "UI/UX DESIGNER",
    },
    {
      img: cardimg2,
      name: "Thishis Hangama",
      skill: "DEVELOPMENT",
    },
    {
      img: cardimg4,
      name: "Garlika Ambase",
      skill: "DEVELOPMENT",
    },
  ];
  return (
    <div className="main" id="about">
      <Container fluid="xxl" className="px-0">
        <section className="mx-3 mb-3">
          <div className="pt-5 banner_main px-3">
            <div className="row ps-md-5 ps-1">
              <div className="col-md-8 resp-margin-bottom">
                <p className="hero-heading">{t("About_Headline")}</p>
                <p className="hero-detail">{t("corporate")}</p>
              </div>
              <div className="col-md-4 col-sm-12">
                <div
                  style={{
                    width: "-webkit-fill-available",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <AboutIcon />
                </div>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-3 margin-bottom-content">
          <div className="px-2">
            <div className="story row justify-content-center align-items-center margin-bottom-content">
              <div className="story_col_1 mb-5">
                <h3 className="main-headings display-center popins_semibold">
                  {t("OUR_STORY")}
                </h3>
                <div className="mb-4 mt-4 display-center">
                  <p className="text_width w-100">{t("About_Paragraph1")}</p>
                </div>
              </div>
              <div className=" pt-2">
                <div className="col-lg-12 image-styling-center-2 resp-img-width-2">
                  <div className="mx-3" style={{ display: "contents" }}>
                    <ProcessWork />
                  </div>
                </div>
                <div className="resp-process-work">
                  <div className="row">
                    <div className="col-md-6 resp-margin-bottom">
                      <div className="research_main hori-s-mar">
                        <div className="d-flex gap-3 align-items-baseline research">
                          <span
                            style={{ fontSize: "1.1rem", marginLeft: "50px" }}
                          >
                            For Startups
                          </span>
                        </div>
                        <ul className="mt-2 ps-5 pe-lg-5 ms-1">
                          <li>{t("b1")}</li>
                          <li>{t("b3")}</li>
                          <li>{t("b4")}</li>
                        </ul>
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="research_main hori-s-mar">
                        <div className="d-flex gap-3 align-items-baseline research">
                          <span
                            style={{ fontSize: "1.1rem", paddingLeft: "50px" }}
                          >
                            {t("For_Investors")}
                          </span>
                        </div>
                        <ul className="mt-2 ps-5 ms-1 pe-lg-5">
                          <li>{t("In1")}</li>
                          <li>{t("In2")}</li>
                          <li>{t("In3")}</li>
                          <li>{t("In4")}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <section id="mission" className="margin-bottom-content">
              <div className="row ">
                <div className="col-lg-6 m-auto">
                  <div className="px-lg-0 px-sm-3 px-sm-4">
                    <h3 className="secondary-headings popins_semibold">
                      {t("Our_Mission")}
                    </h3>
                    <div className="work mb-4 mt-4">
                      <p className="text_width w-100">
                        {t("About_Paragraph2")}
                      </p>
                      <p className="text_width w-100">
                        {t("About_Paragraph3")}
                      </p>
                    </div>
                    {/* <Button padding=".84rem 1.7rem" content={t("Read_more")} /> */}
                  </div>
                </div>
                <div className="col-lg-6 image-styling-center resp-img-width">
                  <div className="mx-3" style={{display:'contents'}}>
                    <OurMissionIcon />
                  </div>
                </div>
              </div>
            </section>
            <section id="mission">
              <div className="row align-items-stretch mt-4 responsive_mission reverse-flow mb-5 mx-1">
                <div
                  className="col-lg-6 image-styling-center-s resp-img-width"
                  style={{ padding: "0px" }}
                >
                  <div className="">
                    <img
                      className="img-fluid h-100"
                      style={{ objectFit: "cover", borderRadius: "15px" }}
                      src={Team}
                      alt="ourMission"
                    />
                  </div>
                </div>
                <div className="col-lg-6 m-auto custom-pad-left custom-pad-top">
                  <div className="px-lg-0 px-sm-5 px-sm-4 px-3">
                    <h3 className="secondary-headings popins_semibold">
                      {t("Meet_Our_Team")}
                    </h3>
                    <div className="work mb-4 mt-4">
                      <p className="text_width w-100">
                        {t("meet_team_content2")}
                      </p>
                      <ul
                        className="social-icons  align-items-center justify-content-start mt-3"
                        style={{ listStyle: "none" }}
                      >
                        <li className="fb">
                          <Link onClick={() => handleShareClick("facebook")}>
                            <Facebook className="img_icon text-white" />
                          </Link>
                        </li>
                        <li className="ins">
                          <Link onClick={() => handleShareClick("linkedin")}>
                            <Linkedin className="img_icon text-white" />
                          </Link>
                        </li>
                        <li className="twitter">
                          <Link onClick={() => handleShareClick("twitter")}>
                            <Twitter className="img_icon text-white" />
                          </Link>
                        </li>
                      </ul>
                    </div>
                    {/* <Button padding=".84rem 1.7rem" content={t("Read_more")} /> */}
                  </div>
                </div>
              </div>
              <div className="row">
              <div className="col-md-1 research_main-s resp-img-width">
                  <div className="mx-3">
                    <AndIcon/>
                  </div>
                </div>
                <div className="col-md-11">
                  <div className="research_main-s-2 hori-s-mar">
                    <div className="d-flex gap-3 align-items-baseline research">
                      <span style={{ fontSize: "1.1rem"}}>
                        Company History
                      </span>
                    </div>
                    <ul className="list-style-none">
                      <li>Established in 2021 as a family-owned venture.</li>
                      <li>Rebranded in 2022 to reflect expanded market presence.</li>
                      <li>Celebrated 1 millionth customer milestone in 2024.</li>
                      <li>Launched international operations in 2018.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
            {/* <section className="margin-bottom-content mt-5">
            <div>
              <h3 className="main-headings display-center popins_semibold">
                Trustful Partners <VerifiedIcon />
              </h3>
              <LogoSlider logos={logos} />
            </div>
          </section> */}
            {/*
                        <section id='team'>
                            <div className=' creative_team' >
                                <p className='text-center'>
                                    Our Leading, Strong And Creative Team
                                </p>

                            </div>
                            <div className='teamates d-flex gap-5 justify-content-center flex-row flex-sm-wrap '>
                                {
                                    cardData.map((item, index) => {
                                        return (<>
                                            <div className=' '>
                                                <div className="card p-3 " style={{ height: "31rem", width: "21rem" }}>
                                                    <img src={item.img} className="card-img-top w-100" style={{ height: "18.125rem" }} alt="..." />
                                                    <div className="card-body d-flex flex-column  align-items-center">
                                                        <h5 className="card-title mt-3">{item.name}</h5>
                                                        <p className="card-text">{item.skill}</p>
                                                        <div className='icons d-flex flex-row  gap-3'>
                                                            <div className='icon_bg'>
                                                                <img src={twitter} style={{ width: "20px" }} alt='icon' />
                                                            </div>
                                                            <div className='icon_bg'>
                                                                <img src={facebook} style={{ width: "20px" }} alt='icon' />
                                                            </div>  <div className='icon_bg'>
                                                                <img src={insta} style={{ width: "20px" }} alt='icon' />
                                                            </div>
                                                            <div className='icon_bg'>
                                                                <img src={linkdin} style={{ width: "20px" }} alt='icon' />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>)
                                    })
                                }
                            </div>
                            <div className='d-flex justify-content-center py-5'>
                                <Button color="#161925" bg="transparent" border="1px solid #161925" ff="Popins_bold" padding="23px 44px" br="40px" fs="1rem" content="View All" />
                            </div>
                        </section>
                       <Register/> */}
          </div>
        </section>
      </Container>
      <Footer />
    </div>
  );
};

export default About;
