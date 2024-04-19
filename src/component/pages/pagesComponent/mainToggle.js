import { useState } from "react";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import ToggleButton from "react-bootstrap/ToggleButton";
import ProcessWork from "../../assests/svg/ProcessWork";
import { useTranslation } from "react-i18next";
import ProcessWork2 from "../../assests/svg/ProcessWork2";

function MainToggle() {
  const { t } = useTranslation();
  const [radioValue, setRadioValue] = useState("1");
  const radios = [
    { name: "Guide For Startups", value: "1", color: "#FFBE16" },
    { name: "Guide For Investors", value: "2", color: "#FFBE16" },
  ];

  return (
    <>
      <div>
        <div className="main-headings display-center resp-img-width-2">
          <ButtonGroup>
            {radios.map((radio, idx) => (
              <ToggleButton
                key={idx}
                id={`radio-${idx}`}
                type="radio"
                variant={null}
                style={{
                  backgroundColor:
                    radioValue === radio.value ? radio.color : "",
                  color: radioValue === radio.value ? "black" : "",
                  fontFamily: "Poppins",
                  border: "1px solid #FFBE16",
                  borderRadius:
                    idx % 2
                      ? "0rem 1.7rem 1.7rem 0rem"
                      : "1.7rem 0px 0px 1.7rem",
                  fontWeight: "500",
                  fontSize: "14px",
                  padding: "0.7rem 1.7rem",
                  transition: "all 0.3s ease", 
                }}
                className={radioValue !== radio.value ? "hover-toggle" : ""}
                name="radio"
                value={radio.value}
                checked={radioValue === radio.value}
                onChange={(e) => setRadioValue(e.currentTarget.value)}
              >
                {radio.name}
              </ToggleButton>
            ))}
          </ButtonGroup>
        </div>
      </div>

      <div className="pt-2">
        <div className="col-lg-12 image-styling-center-2 resp-img-width-2">
          <div className="mx-3" style={{ display: "contents" }}>
            {radioValue === "1" ? (
              <div className="mx-3" style={{ display: "contents" }}>
                <ProcessWork />
              </div>
            ) : radioValue === "2" ? (
              <div className="mx-3" style={{ display: "contents" }}>
                <ProcessWork2 />
              </div>
            ) : null}
          </div>
        </div>
        <div className="resp-process-work">
          <div className="row">
            <div className="col-md-6 resp-margin-bottom">
              <div
                className="research_main hori-s-mar mx-3"
                style={{ minHeight: "325px" }}
              >
                <div className="d-flex gap-3 align-items-baseline research">
                  <span style={{ fontSize: "1.1rem", marginLeft: "50px" }}>
                    For Startups
                  </span>
                </div>
                <ul className="mt-2 ps-5 pe-lg-5 ms-1">
                  <li>
                    Submit your startup profile and key business details through
                    our online application.
                  </li>
                  <li>
                    Our team conducts thorough due diligence on your startup,
                    including legal review, business analysis and founder
                    interviews.
                  </li>
                  <li>
                    Once approved, your startup is featured on the Globasity
                    platform and matched with relevant investors.
                  </li>
                  <li>
                    Connect directly with interested investors, negotiate terms,
                    and close your investment round through Globasity.
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-md-6">
              <div
                className="research_main hori-s-mar mx-3"
                style={{ minHeight: "400px" }}
              >
                <div className="d-flex gap-3 align-items-baseline research">
                  <span style={{ fontSize: "1.1rem", paddingLeft: "50px" }}>
                    {t("For_Investors")}
                  </span>
                </div>
                <ul className="mt-2 ps-5 ms-1 pe-lg-5">
                  <li>
                    Register as an accredited investor on Globasity and specify
                    your investment preferences.
                  </li>
                  <li>
                    Browse pre-vetted startup investment opportunities tailored
                    to your criteria.
                  </li>
                  <li>
                    Engage directly with startup founders, access key due
                    diligence materials, and conduct your own assessment.
                  </li>
                  <li>
                    Select companies to invest in, sign deal terms, and transfer
                    funds, all facilitated through the Globasity platform.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MainToggle;
