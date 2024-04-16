// Import Swiper React components
import React, { useRef, useEffect } from "react";
import SwiperCore, { Navigation, Pagination } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.min.css"; // Make sure to import swiper styles
import HeroMain from "../../assests/svg/HeroMain";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "./button";
// Install Swiper modules
SwiperCore.use([Navigation, Pagination]);

const MainSlider = () => {
  const swiperRef = useRef(null);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const { t } = useTranslation();

  useEffect(() => {
    const swiperInstance = swiperRef.current.swiper;

    const interval = setInterval(() => {
      if (swiperInstance) {
        swiperInstance.slideNext();
      }
    }, 10000); // Move every 10 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <Swiper
      ref={swiperRef}
      slidesPerView={1}
      spaceBetween={20}
      loop={true}
      pagination={{
        clickable: true,
      }}
      navigation={true}
    >
      <SwiperSlide>
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
                  {/* <p> {t("Subheadline")} </p> */}
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
      </SwiperSlide>
      <SwiperSlide>
        {" "}
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
                  {/* <p> {t("Subheadline")} </p> */}
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
      </SwiperSlide>
      <SwiperSlide>
        {" "}
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
                  {/* <p> {t("Subheadline")} </p> */}
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
      </SwiperSlide>
    </Swiper>
  );
};

export default MainSlider;
