/* eslint-disable no-unused-vars */
import { Container } from "react-bootstrap";
import Business from "../assests/png/business-man.png";
import BusinessIcon from "../assests/svg/InvestorIcon";
import EntrepreneurIcon from "../assests/svg/EntrepreneurIcon";
import investor from "../assests/png/investor.png";
import accept from "../assests/png/accept.svg";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";

import { ArrowLeft, ArrowLeftCircle } from "react-feather";
import { useTranslation } from "react-i18next";

const AccountType = ({
  onNextStep,
  userType,
  setUserType,
  setAccountType,
  accountType,
}) => {
  const { t } = useTranslation();
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);

  // Event handler to update the selected option
  const handleRadioChange = (event) => {
    setAccountType(event.target.value);
  };

  const handleAccount = () => {
    setChecked(true);
    setChecked2(false);
    setUserType("business");
    setAccountType("");
  };
  const handleAccount2 = () => {
    setUserType("investor");
    setAccountType("individual");
    setChecked2(true);
    setChecked(false);
  };
  useEffect(() => {
    if (userType === "investor") {
      setChecked2(true);
      setChecked(false);
    } else if (userType === "business") {
      setChecked(true);
      setChecked2(false);
    }
  }, [userType]);

  return (
    <>
      <Container fluid="xxl" className="px-0 h-100">
        <section className="px-sm-3 d-flex align-items-center h-100 justify-content-center rounded-4">
          <div className="login_card">
            <span className="heading ">Signup</span>
            <p className="m-0 pb-2 fs_08 text-center">Choose Your Account Type</p>
            <div className="account_type pb-4 pt-4 ">
              <div
                className={`card_account d-flex align-items-center justify-content-center rounded-4 ${
                  checked2 ? "bg-light-yellow custom-yellow-border" : "border"
                }`}
                onClick={handleAccount2}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <BusinessIcon color={checked2 ? "#FFBE16" : "#212529"} />
                  </div>
                  <div className="text-center popins_medium">
                    {t("BTN_INVESTOR")}
                  </div>
                </div>
              </div>
              <div
                className={`card_account d-flex align-items-center justify-content-center  rounded-4 ${
                  checked ? "custom-yellow-border bg-light-yellow" : "border"
                }`}
                onClick={handleAccount}
                style={{ cursor: "pointer" }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <EntrepreneurIcon color={checked ? "#FFBE16" : "#212529"} />
                  </div>
                  <div className="text-center popins_medium">
                    Startup
                  </div>
                </div>
                {/* {checked ? <img src={accept} alt='checked' className='bg-white checked_account' /> : ''} */}
              </div>
            </div>
            <div className="login_section d-flex mt-3 flex-column align-items-center justify-content-center">
              {checked2 ? (
                <p className="m-0">
                  Hello Investor!
                </p>
              ) : (
                `Hello Startup!`
              )}
              {checked === false && <p className="m-0 pb-2 fs_08 text-center">{t("FILL_FORM")}</p>}
            </div>
            <div className="mb-4">
              {checked === false &&
                ["radio"].map((type) => (
                  <div
                    key={`inline-${type}`}
                    className="mb-3  display_flex2 gap-2"
                  >
                    <Form.Check
                      style={{ fontSize: "14px" }}
                      inline
                      label={t("INDIVIDUAL")}
                      name="group1"
                      type={type}
                      id={`inline-${type}-1`}
                      value="individual"
                      checked={accountType === "individual"}
                      onChange={handleRadioChange}
                    />
                    <Form.Check
                      style={{ fontSize: "14px" }}
                      inline
                      label={t("COMPANY")}
                      name="group1"
                      type={type}
                      id={`inline-${type}-2`}
                      value="company"
                      checked={accountType === "company"}
                      onChange={handleRadioChange}
                    />
                  </div>
                ))}
              <div className="d-flex mt-4">
                <button
                  type="submit"
                  onClick={onNextStep}
                  className="btn1 btn2 mx-auto fs_09 btn_primary rounded_3 px-3 py-2"
                >
                  {t("BTN_NEXT")}
                </button>
              </div>
              <div className="popins_semibold mt-4 fs_08">
                {t("ALREAD_ACC")}?{" "}
                <Link
                  className="popins_semibold"
                  to={"/login"}
                  style={{ color: "#4caf50" }}
                >
                  {t("SIGN_IN")}
                </Link>
              </div>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default AccountType;
