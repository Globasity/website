/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from "react";
import Carousel from "react-bootstrap/Carousel";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import Button from "./button";
import { Link } from "react-router-dom";
import HeroMain from "./../../assests/svg/HeroMain";
import HeroMain2 from "./../../assests/svg/HeroMain2";
import HeroMain3 from "./../../assests/svg/HeroMain3";
import InvestorsIcon from "../../assests/svg/investorsIcon";

function HeroSlider() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const { t } = useTranslation();
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <section className="px-3">
          <div className="pt-5 banner_main px-3">
            <div className="row special-padding">
              <div className="col-md-6 mb-5">
                <h6 className="hero-font text-center">
                  A New World of Connecting Small Startups & Investors.
                </h6>
                {isLogin === false && (
                  <div className="d-flex justify-content-center">
                    <Link to={"/sign-up"}>
                      <Button
                        padding=".84rem 1.7rem"
                        fs="0.9rem"
                        content={t("Get_Started")}
                      />
                    </Link>
                  </div>
                )}
              </div>{" "}
              <div className="col-md-6 col-sm-12">
                <div
                  style={{
                    width: "-webkit-fill-available",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <HeroMain />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <section className="px-3">
          <div className="pt-5 banner_main px-3">
            <div className="row special-padding">
              <div className="col-md-6 mb-5">
                <h6 className="hero-font text-center">
                  Empowering Small Businesses to Thrive with Investor Support.
                </h6>
                {isLogin === false && (
                  <div className="d-flex justify-content-center">
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
              <div className="col-md-6 col-sm-12">
                <div
                  style={{
                    width: "-webkit-fill-available",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <HeroMain2 />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <section className="px-3">
          <div className="pt-5 banner_main px-3">
            <div className="row special-padding">
              <div className="col-md-6 mb-5">
                <h6 className="hero-font text-center">
                  Linking Entrepreneurs with the Capital they Need to Succeed.
                </h6>
                {isLogin === false && (
                  <div className="d-flex justify-content-center">
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
              <div className="col-md-6 col-sm-12">
                <div
                  style={{
                    width: "-webkit-fill-available",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <HeroMain3 />
                </div>
              </div>
            </div>
          </div>
        </section>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroSlider;
