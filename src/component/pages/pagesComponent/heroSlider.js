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

function HeroSlider() {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const { t } = useTranslation();
  return (
    <Carousel>
      <Carousel.Item interval={3000}>
        <section className="px-3">
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
        </section>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <section className="px-3">
          <div className="pt-5 banner_main px-xl-5 px-lg-4 px-3">
            <div
              className="banner_grid"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="width5">
                <div className="d-flex gap-2 ">
                  <div className="banner_col_1">
                    <h6 className="reponsive-font">
                      Empowering Small Businesses to Thrive with Investor
                      Support.
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
                <HeroMain2 />
              </div>
            </div>
          </div>
        </section>
      </Carousel.Item>
      <Carousel.Item interval={3000}>
        <section className="px-3">
          <div className="pt-5 banner_main px-xl-5 px-lg-4 px-3">
            <div
              className="banner_grid"
              style={{ display: "flex", flexDirection: "column" }}
            >
              <div className="width5">
                <div className="d-flex gap-2 ">
                  <div className="banner_col_1">
                    <h6 className="reponsive-font">
                      Linking Entrepreneurs with the Capital they Need to
                      Succeed.
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
                <HeroMain3 />
              </div>
            </div>
          </div>
        </section>
      </Carousel.Item>
    </Carousel>
  );
}

export default HeroSlider;
