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
  return <></>;
};
export default MainPage;
