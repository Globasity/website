import React from "react";
import { GiBackwardTime } from "react-icons/gi";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Button from "../pages/pagesComponent/button";
const WaitForLogin = () => {
  // eslint-disable-next-line
  const { t } = useTranslation();
  return (
    <div
      className="w-100 d-grid justify-content-center align-items-center px-4 py-5 "
      style={{ height: "89vh" }}
    >
      <div className="light_gray_bg_border">
        <div className="display_flex2 mb-3">
          <GiBackwardTime className="fs_50 text-warning" />
        </div>
        <h6 className="popins_medium text-center">
          Please be patient, as the activation process may require up to 24
          hours.
        </h6>
        <div className="d-flex align-items-center justify-content-center mt-3">
        <Link to={"/"}>
          <Button
            padding=".84rem 1.7rem"
            fs="0.9rem"
            content="Okay"
          />
        </Link>
        </div>
      </div>
    </div>
  );
};

export default WaitForLogin;
