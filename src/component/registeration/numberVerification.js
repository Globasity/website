/* eslint-disable no-unused-vars */
import { Container, Spinner } from "react-bootstrap";
import Business from "../assests/png/business-man.png";
import investor from "../assests/png/investor.png";
import InvestorIcon from "../assests/svg/InvestorIcon";
import EntrepreneurIcon from "../assests/svg/EntrepreneurIcon";
import accept from "../assests/png/accept.svg";
import { Link, useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiRequest";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { handleLogin, handleUserData, setLogin } from "../redux/loginForm";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { Eye, EyeOff } from "react-feather";
import NotifySnackbar from "../snackbar/notiySnackbar";

const NumberVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);
  const [checked2, setChecked2] = useState(true);
  const [password, setPassword] = useState("");
  const [userType, setUserType] = useState("investor");
  const [showPassword, setShowPassword] = useState(false);
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };
  const handleSubmit = (event) => {
    // Language_removed const userLangauge = JSON.parse(
    //   window.localStorage.getItem("globasity_language")
    // );

    // if (!userLangauge) {
    //   const lan = "en";
    //   localStorage.setItem("globasity_language", JSON.stringify(lan));
    // }
    event.preventDefault();
    const e_mail = event.target.Email.value;
    // const p_assord = event.target.Password.value;

    const data = {
      email: e_mail,
      password: password,
    };
    const body = new FormData();
    body.append("type", "login");
    body.append("email", data.email);
    body.append("password", data.password);
    setIsLoading(true);
    apiRequest({ body })
      .then((res) => {
        if (res.result) {
          const data2 = res;
          setIsLoading(false);
          if (data2.user_type === userType) {
            if (data2.is_active === "true") {
              toast.success(res.message);
              dispatch(setLogin(true));
              dispatch(handleLogin(res));
              dispatch(handleUserData(Math.random()));
              navigate("/");
            } else {
              dispatch(handleLogin(res));
              dispatch(handleUserData(Math.random()));
              dispatch(setLogin(false));
              navigate("/wait-for-login");
            }
          } else {
            setMessage(
              `This is an ${
                data2.user_type === "business"
                  ? "Startup"
                  : data2.user_type
              } account. Kindly choose the '${
                data2.user_type === "business"
                  ? "Startup"
                  : data2.user_type
              }' option when logging in.`
            );
            setMessageType("warning");
            setOpen(true);
          }
        } else {
          setMessage(
            "Invalid email and password. Kindly sign up to create a new account."
          );
          setMessageType("error");
          setOpen(true);
          setIsLoading(false);
        }
      })
      .catch(() => {
        setIsLoading(false);
      });
  };
  const handleAccount = () => {
    setChecked(true);
    setChecked2(false);
    setUserType("business");
  };
  const handleAccount2 = () => {
    setUserType("investor");
    setChecked2(true);
    setChecked(false);
  };
  return (
    <>
      <NotifySnackbar
        handleClose={handleClose}
        open={open}
        message={message}
        messageType={messageType}
      />

      <Container fluid="xxl" className="px-0">
        <section className="px-sm-3 d-flex align-items-center justify-content-center">
          <div className="login_card">
            <span className="heading">Login</span>
            <p className="m-0 pb-2 fs_08 text-center">Choose Your Account Type</p>
            <div className="row m-4 w-100">
              <div style={{padding:"10px"}} className="col-6">
              <div
                className={`d-flex justify-content-center rounded-special margin-special ${
                  checked2 ? "custom-yellow-border bg-light-yellow" : "border"
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
                  <InvestorIcon color={checked2 ? "#FFBE16" : "#212529"} />
    
                  <div
                    className="text-center popins_medium"
                  >
                    {t("BTN_INVESTOR")}
                  </div>
                </div>
              </div>
              </div>
              <div style={{padding:"10px"}} className="col-6">
              <div
                className={`d-flex justify-content-center rounded-special-2 ${
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
                  <EntrepreneurIcon color={checked ? "#FFBE16" : "#212529"} />
                  <div
                    className="text-center popins_medium"
                  >
                    Startup
                  </div>
                </div>
              </div>
              </div>
            </div>
            <div className="login_section d-flex mt-3 flex-column align-items-center justify-content-center">
              {checked2 ? (
                <p className="m-0">
                  Hello Investor!
                </p>
              ) : (
                <p className="m-0">{`${t("HELLO")} Startup!`}</p>
              )}
              <p className="m-0 pb-2 fs_08 text-center">{t("FILL_FORM")}</p>
            </div>
            <form className="w-100 mt-3" onSubmit={handleSubmit}>
              <div className="d-flex flex-column contact_inputs gap-1 register">
                <Form.Group>
                  <Form.Label className="">{t("EMAIL")}</Form.Label>
                  <Form.Control
                    type="email"
                    name="Email"
                    placeholder={t("PLC_EMAIL")}
                    style={{ fontSize: "14px" }}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label className="">{t("PASS")}</Form.Label>
                  <div className="position-relative">
                    <Form.Control
                      className="mb-0"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter your password"
                      style={{ fontSize: "14px" }}
                    />
                    {password && (
                      <div className="position-absolute eyeOff">
                        {showPassword && (
                          <EyeOff
                            className="eyeShow"
                            onClick={handleTogglePassword}
                          />
                        )}
                        {!showPassword && (
                          <Eye
                            className="eyeShow"
                            onClick={handleTogglePassword}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </Form.Group>
                <div className="forgot_pass mt-2 d-flex justify-content-end">
                  <Link to="/forgot">
                    <p
                      className="m-0"
                      style={{ fontSize: "12px", color: "red" }}
                    >
                      {" "}
                      {t("FORGOT_PASS")}{" "}
                    </p>
                  </Link>
                </div>
              </div>

              <div className="mb-4 mt-3">
                {/* {checked === false &&
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
                      />
                      <Form.Check
                        style={{ fontSize: "14px" }}
                        inline
                        label={t("COMPANY")}
                        name="group1"
                        type={type}
                        id={`inline-${type}-2`}
                      />
                    </div>
                  ))} */}

                <div className="mt-4">
                  <button
                    disabled={isLoading ? true : false}
                    type="submit"
                    className="btn1 btn2 mx-auto fs_09 btn_primary rounded_3 px-3 py-2"
                  >
                    {isLoading ? (
                      <span className="px-3">
                      <Spinner animation="border" size="sm" />
                      </span>
                    ) : (
                      `${t("LOGIN_BTN_TXT")}`
                    )}
                  </button>
                  {/* </Link> */}
                </div>
              </div>
            </form>
            <div className="popins_semibold fs_08">
              {t("HV_ACCOUNT")}?{" "}
              <Link
                className="popins_semibold"
                to={"/sign-up"}
                style={{ color: "#4caf50" }}
              >
                {t("SIGN_UP")}
              </Link>
            </div>
          </div>
        </section>
      </Container>
    </>
  );
};

export default NumberVerification;
