/* eslint-disable no-unused-vars */
import React from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { apiRequest } from "../api/apiRequest";
import { useState } from "react";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/loginForm";
import { useTranslation } from "react-i18next";

const InvestmentInfo = ({
  profileImage,
  profileBanner,
  category,
  brief,
  description,
  socialEmail,
  socialLinkedin,
  socialWebsite,
  socialTwitter,
  socialFacebook
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const updateSteps = async () => {
    setIsLoading(true);
    const body = new FormData();
    body.append("table", "users");
    body.append("type", "update_data");
    body.append("id", userData?.user_id);
    body.append("platform", 5);
    await apiRequest({ body })
      .then((result) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const [formData, setFormData] = useState({
    minAmount: 0,
    maxAmount: 0,
  });

  const [errors, setErrors] = useState({
    minAmount: "",
    maxAmount: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: value,
    });
    // Validate min and max values dynamically
    if (name === "minAmount" && value > (parseInt(formData.maxAmount) === 0)) {
      setErrors({
        ...errors,
        [name]: "",
      });
    } else if (name === "maxAmount" && value < parseInt(formData.minAmount)) {
      setErrors({
        ...errors,
        maxAmount: "Max Amount should be greater than Min Amount",
      });
    } else {
      setErrors({
        ...errors,
        [name]: "",
      });
    }
  };

  const AdminAlert = () => {
    const body = new FormData();
    body.append("type", "admin_alert");
    apiRequest({ body });    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (parseInt(formData.minAmount) > parseInt(formData.maxAmount)) {
      toast.error("Max Amount should be greater than Min Amount");
      return;
    }
    setIsLoading(true);
    const company = e.target.company.value;
    const desc = e.target.desc.value;
    const investAmount = e.target.investAmount.value;
    const minAmount = formData.minAmount;
    const maxAmount = formData.maxAmount;
    const formData2 = {
      image: profileImage,
      banner: profileBanner,
      category: category,
      brief: brief,
      description: description,
      socialEmail : socialEmail,
      socialLinkedin : socialLinkedin,
      socialWebsite : socialWebsite,
      socialTwitter : socialTwitter,
      socialFacebook : socialFacebook,
      company_name: company ? company : "",
      company_description: desc ? desc : "",
      invested_amount: investAmount ? investAmount : "",
      min_investing_amount: minAmount ? minAmount : "",
      max_investing_amount: maxAmount ? maxAmount : "",
    };
    const body = new FormData();
    body.append("type", "update_data");
    body.append("table_name", "users");
    body.append("id", userData?.user_id);
    body.append("image", formData2?.image);
    body.append("banner", formData2?.banner);
    body.append("category", formData2?.category);
    body.append("brief", formData2?.brief);
    body.append("description", formData2?.description);
    body.append("socialEmail", formData2?.socialEmail);
    body.append("socialLinkedin", formData2?.socialLinkedin);
    body.append("socialWebsite", formData2?.socialWebsite);
    body.append("socialTwitter", formData2?.socialTwitter);
    body.append("socialFacebook", formData2?.socialFacebook);
    // body.append('id_front', formData2.id_front)
    // body.append('id_back', formData2.id_back)
    // body.append('id_number', formData2.id_number)
    body.append("company_name", formData2.company_name);
    body.append("company_description", formData2.company_description);
    body.append("invested_amount", formData2.invested_amount);
    body.append("min_investing_amount", formData2.min_investing_amount);
    body.append("max_investing_amount", formData2.max_investing_amount);
    apiRequest({ body })
      .then((result) => {
        if (result.result) {
          toast.success(
            "Please be patient, as the activation process may require up to 24 hours."
          );
          setIsLoading(false);
          e.target.reset();
          if (userData?.is_active === "true") {
            dispatch(setLogin(true));
            navigate("/");
          } else {
            navigate("/wait-for-login");
            AdminAlert();
          }
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };

  // const handleSkip = () => {
  //   setIsLoading(true)
  //   const formData = {
  //     image: profileImage,
  //     id_front: id_front,
  //     id_back: id_back,
  //     id_number: id_Number,
  //   }
  //   const body = new FormData()
  //   body.append('table_name', 'users')
  //   body.append('type', 'update_data')
  //   body.append('id', userData?.user_id)
  //   body.append('image', formData.image)
  //   body.append('id_front', formData.id_front)
  //   body.append('id_back', formData.id_back)
  //   body.append('id_number', formData.id_number)
  //   apiRequest({ body })
  //     .then((result) => {
  //       if (result.result) {
  //         toast.success(result.message)
  //         dispatch(setLogin(true));
  //         navigate('/')
  //         setIsLoading(false)
  //       } else {
  //         setIsLoading(false)
  //       }
  //     }).catch((err) => {
  //       setIsLoading(false)
  //       console.log(err)
  //     });

  // }

  const handleSkip = (e) => {
    setIsLoading(true);
    const formData = {
      image: profileImage,
      // id_front: id_front,
      // id_back: id_back,
      // id_number: id_Number,
      banner: profileBanner,
      category: category,
      brief: brief,
      description: description,
      socialEmail : socialEmail,
      socialLinkedin : socialLinkedin,
      socialWebsite : socialWebsite,
      socialTwitter : socialTwitter,
      socialFacebook : socialFacebook,
    };
    const body = new FormData();
    body.append("table_name", "users");
    body.append("type", "update_data");
    body.append("id", userData?.user_id);
    body.append("image", formData?.image);
    body.append("banner", formData?.banner);
    body.append("category", formData?.category);
    body.append("brief", formData?.brief);
    body.append("description", formData?.description);
    body.append("socialEmail", formData?.socialEmail);
    body.append("socialLinkedin", formData?.socialLinkedin);
    body.append("socialWebsite", formData?.socialWebsite);
    body.append("socialTwitter", formData?.socialTwitter);
    body.append("socialFacebook", formData?.socialFacebook);
    // body.append('id_front', formData.id_front)
    // body.append('id_back', formData.id_back)
    // body.append('id_number', formData.id_number)
    apiRequest({ body })
      .then((result) => {
        if (result.result) {
          toast.success(
            "Please be patient, as the activation process may require up to 24 hours."
          );
          setIsLoading(false);
          if (userData?.is_active === "true") {
            dispatch(setLogin(true));
            navigate("/");
          } else {
            navigate("/wait-for-login");
            AdminAlert();
          }
        } else {
          setIsLoading(false);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  return (
    <>
      <Container fluid="xxl" className="px-0">
        <section className="px-sm-3 d-flex align-items-center justify-content-center">
          <div className="login_card">
            <button
              className="fs_09 ms-auto btn bg-white text-danger"
              onClick={handleSkip}
            >
              {t("SKIP")}
            </button>
            <div>
              <div className="heading text-center">Your Information</div>
              <div className="fs_07 text-center">
                Please fill the following form
              </div>
              <div className="fs_07 text-center"></div>
            </div>

            <Form className="w-100 mt-4" onSubmit={handleSubmit}>
              <div className="d-flex flex-column contact_inputs gap-1 register">
                <Form.Label className="ps-2">{t("Company_Name")}</Form.Label>
                <Form.Control
                  name="company"
                  type="text"
                  placeholder={t("Company_Name")}
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div className="d-flex flex-column contact_inputs gap-1 register">
                <Form.Label className="ps-2">
                  {t("Company_Description")}
                </Form.Label>
                <Form.Control
                  name="desc"
                  type="Enter last name"
                  as="textarea"
                  placeholder={t("Company_Description")}
                  style={{
                    fontSize: "14px",
                  }}
                  rows={4} // Set the number of rows you want
                  cols={50}
                />
              </div>
              <div className="d-flex flex-column contact_inputs gap-1 register mb-2-rem">
                <Form.Label className="ps-2">
                  {t("already_invested")}
                </Form.Label>
                <Form.Control
                  name="investAmount"
                  type="text"
                  placeholder={t("already_invested")}
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div className="fs_09 text-center pb-2">
                {t("current_invested")}
              </div>
              <div className="d-flex flex-column contact_inputs gap-1 register">
                <Form.Label className="ps-2">{t("min_amount")}</Form.Label>
                <Form.Control
                  name="minAmount"
                  type="number"
                  placeholder={t("min_amount")}
                  style={{ fontSize: "14px" }}
                  value={formData.minAmount}
                  className="mb-0"
                  onChange={handleChange}
                />
                <div className="mb-3 fs_08" style={{ color: "red" }}>
                  {errors.minAmount}
                </div>
              </div>

              <div className="d-flex flex-column contact_inputs gap-1 register">
                <Form.Label className="ps-2">{t("max_amount")}</Form.Label>
                <Form.Control
                  name="maxAmount"
                  type="number"
                  placeholder={t("max_amount")}
                  style={{ fontSize: "14px" }}
                  className="mb-0"
                  value={formData.maxAmount}
                  onChange={handleChange}
                />
                <div className="mb-3 fs_08" style={{ color: "red" }}>
                  {errors.maxAmount}
                </div>
              </div>
              {/* <div className="d-flex flex-column contact_inputs gap-1 register">
                <Form.Label className="ps-2">{t("min_amount")}</Form.Label>
                <Form.Control
                  name="minAmount"
                  type="text"
                  placeholder={t("min_amount")}
                  style={{ fontSize: "14px" }}
                />
              </div>
              <div className="d-flex flex-column contact_inputs gap-1 register">
                <Form.Label className="ps-2">{t("max_amount")}</Form.Label>
                <Form.Control
                  name="maxAmount"
                  type="text"
                  placeholder={t("max_amount")}
                  style={{ fontSize: "14px" }}
                />
              </div> */}
              <div className="mb-4">
                <Form.Group className="my-3">
                  <div className="d-flex gap-3">
                    <button
                      disabled={isLoading ? true : false}
                      type="submit"
                      className="btn1 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                    >
                      {isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        t("BTN_SUBMIT")
                      )}
                    </button>
                  </div>
                </Form.Group>
              </div>
            </Form>
          </div>
        </section>
      </Container>
    </>
  );
};

export default InvestmentInfo;
