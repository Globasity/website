/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { File, Image, Paperclip, Plus, User } from "react-feather";
import FinancialInformation from "./financailInformation";
import { apiRequest, apiRequestFile } from "../api/apiRequest";
import { toast } from "react-toastify";
import NotifySnackbar from "../snackbar/notiySnackbar";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { setLogin } from "../redux/loginForm";
import { countries } from "countries-list";

const CreateBusiness = ({
  profileImage,
  profileBanner,
  category,
  brief,
  description,
  socialEmail,
  socialLinkedin,
  socialWebsite,
  socialTwitter,
  socialFacebook,
}) => {
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );
  const dispatch = useDispatch();
  const [businessImages, setBusinessImages] = useState([]);
  const [selectedImg, setSelectedImg] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading1, setIsLoading1] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [isLoading3, setIsLoading3] = useState(false);
  const [isLoading4, setIsLoading4] = useState(false);
  const [isLoading5, setIsLoading5] = useState(false);
  const [isLoading6, setIsLoading6] = useState(false);
  const [statement, setStatement] = useState(null);
  const [statementImg, setStatementImg] = useState(null);
  const [legalDiligence, setLegalDiligence] = useState(null);
  const [businessDiligence, setBusinessDiligence] = useState(null);
  const [legalDiligenceImg, setLegalDiligenceImg] = useState(null);
  const [businessDiligenceImg, setBusinessDiligenceImg] = useState(null);
  const [busCertificate, setBusCertificate] = useState(null);
  const [busCertificateImg, setBusCertificateImg] = useState(null);
  const [otherDoc, setOtherDoc] = useState(null);
  const [otherDocImg, setOtherDocImg] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [businessType, setBusinessType] = useState([]);
  const [businessStatus, setBusinessStatus] = useState([]);
  const [raisedAmount, setRaisedAmount] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const AdminAlert = () => {
    const body = new FormData();
    body.append("type", "admin_alert");
    apiRequest({ body });    
  };
  const handleSkipUpdate = () => {
    setIsLoading(true);
    const formData = {
      image: profileImage,
      banner: profileBanner,
      category: category,
      brief: brief,
      description: description,
      socialEmail: socialEmail,
      socialLinkedin: socialLinkedin,
      socialWebsite: socialWebsite,
      socialTwitter: socialTwitter,
      socialFacebook: socialFacebook,
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
    // body.append('platform', 3)
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
  const handleAmountChange = (event) => {
    let value = event.target.value;
    // Ensure the value is a number
    if (isNaN(value)) {
      value = "";
      setErrorMessage("");
    } else {
      // Limit the value to the range [0, 100]
      // value = Math.min(Math.max(Number(value), 0), 100);

      // Check if the value is greater than 100
      if (value > 100) {
        setErrorMessage("Value must be 100 or less.");
      } else {
        setErrorMessage("");
      }
    }

    setRaisedAmount(value);
  };
  const { t } = useTranslation();
  const navigate = useNavigate();
  let userLangauge = JSON.parse(
    window.localStorage.getItem("globasity_language")
  );
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userLangauge = JSON.parse(
      window.localStorage.getItem("globasity_language")
    );
  }, [t]);
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const handleFileChange = async (e) => {
    const selectedImages = Array.from(e.target.files);
    if (selectedImages?.length > 0) {
      setSelectedImg([...selectedImg, ...selectedImages]);
      for (let index = 0; index < selectedImages?.length; index++) {
        const element = selectedImages[index];
        setIsLoading1(true);
        await fileUpload(element, setBusinessImages, true);
        setIsLoading1(false);
        // console.log(businessImages)
      }
    }
  };
  const fileUpload = async (file, setProfileImage, multiple) => {
    await apiRequestFile(file)
      .then((result) => {
        if (result.result) {
          const imageName = result.file_name;
          if (multiple === true) {
            setBusinessImages((prevImages) => [...prevImages, imageName]);
          } else setProfileImage(imageName);
          // toast.success(result.message)
        } else {
          setMessage(result.message);
          setMessageType("error");
          setOpen(true);
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setMessageType("error");
        setOpen(true);
        console.log(err);
      });
  };
  const handleFileChange3 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setStatementImg(imageUrl);
      setIsLoading2(true);
      await fileUpload(file, setStatement, false);
      setIsLoading2(false);
    }
  };
  const handleFileChange6 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setLegalDiligenceImg(imageUrl);
      setIsLoading5(true);
      await fileUpload(file, setLegalDiligence, false);
      setIsLoading5(false);
    }
  };
  const handleFileChange7 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBusinessDiligenceImg(imageUrl);
      setIsLoading6(true);
      await fileUpload(file, setBusinessDiligence, false);
      setIsLoading6(false);
    }
  };
  const getBusinessType = () => {
    const body = new FormData();
    body.append("table_name", "business_types");
    body.append("type", "get_data");
    apiRequest({ body })
      .then((result) => {
        setBusinessType(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStatusType = () => {
    const body = new FormData();
    body.append("table_name", "business_status");
    body.append("type", "get_data");
    apiRequest({ body })
      .then((result) => {
        setBusinessStatus(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getStatusType();
    getBusinessType();
  }, []);
  const handleFileChange4 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setBusCertificateImg(imageUrl);
      setIsLoading3(true);
      await fileUpload(file, setBusCertificate, false);
      setIsLoading3(false);
    }
  };
  const handleFileChange5 = async (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setOtherDocImg(imageUrl);
      setIsLoading4(true);
      await fileUpload(file, setOtherDoc, false);
      setIsLoading4(false);
    }
  };
  const handleSubmit = (e) => {
    handleSkipUpdate();
    e.preventDefault();
    setIsLoading(true);
    const form = e.target;
    const name = form.elements.name.value;
    const location = form.elements.location.value;
    const since = form.elements.since.value;
    const type = form.elements.type.value;
    const status = form.elements.status.value;
    // const amount = form.elements.amount.value;
    const description = form.elements.description.value;
    const obligations = form.elements.obligations.value;
    const company_address = form.elements.company_address.value;
    const company_name = form.elements.company_name.value;
    const company_number = form.elements.company_number.value;
    const currency = form.elements.currency.value;
    const funding_amount = form.elements.funding_amount.value;
    const formData = {
      user_id: userData.user_id,
      images: JSON.stringify(businessImages),
      location: location,
      since: since,
      business_type: type,
      business_status: status,
      requested_amount: raisedAmount,
      description: description,
      obligations: obligations,
      certificate: busCertificate,
      statement: statement,
      company_address: company_address,
      company_name: company_name,
      company_number: company_number,
      other_doc: otherDoc ? otherDoc : "",
      business_diligence: businessDiligence ? businessDiligence : "",
      legal_diligence: legalDiligence ? legalDiligence : "",
      currency_type: currency,
      funding_amount: funding_amount,
    };
    // console.log(formData)
    const body = new FormData();
    body.append("table_name", "business");
    body.append("type", "add_data");
    body.append("user_id", formData.user_id);
    body.append("images", formData.images);
    body.append("location", formData.location);
    body.append("since", formData.since);
    body.append("business_type", formData.business_type);
    body.append("business_status", formData.business_status);
    body.append("requested_amount", formData.requested_amount);
    body.append("description", formData.description);
    body.append("company_address", formData.company_address);
    body.append("company_name", formData.company_name);
    body.append("company_number", formData.company_number);
    body.append("obligations", formData.obligations);
    body.append("business_diligence", formData.business_diligence);
    body.append("legal_diligence", formData.legal_diligence);
    body.append("currency_type", formData.currency_type);
    body.append("certificate", formData.certificate);
    body.append("certificate", formData.certificate);
    body.append("funding_amount", formData.funding_amount);
    body.append("statement", formData.statement);
    body.append("other_doc", formData.other_doc);

    apiRequest({ body })
      .then((result) => {
        // console.log(result)
        if (result.result) {
          setIsLoading(false);
          e.target.reset();
          setBusinessImages([]);
          setSelectedImg([]);
          setStatement(null);
          setStatementImg(null);
          setBusCertificate(null);
          setBusCertificateImg(null);
          setOtherDoc(null);
          setOtherDocImg(null);
          setLegalDiligenceImg(null);
          setBusinessDiligenceImg(null);
          setRaisedAmount("");
          toast.success(result.message);
          if (userData.is_active !== "true") {
            navigate("/wait-for-login");
          } else {
            navigate("/create-business");
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message);
        setIsLoading(false);
      });
  };

  const removeImage = (index) => {
    const newImages = [...businessImages];
    const newImagesName = [...selectedImg];
    newImages.splice(index, 1);
    newImagesName.splice(index, 1);
    setBusinessImages(newImages);
    setSelectedImg(newImagesName);
  };

  return (
    <>
      <NotifySnackbar
        handleClose={handleClose}
        open={open}
        message={message}
        messageType={messageType}
      />
      <div
        className="main pt-4 pb-5 display_flex2 flex-column"
        style={{ backgroundColor: "#F3F7F5", minHeight: "90vh" }}
        id="main"
      >
        <Container fluid="xxl" className="px-0">
          <section className="px-sm-3 d-flex align-items-center justify-content-center">
            <div className="login_card">
              <button
                className="fs_09 ms-auto btn bg-white text-danger"
                onClick={handleSkipUpdate}
              >
                {t("SKIP")}
              </button>
              <div>
                <div className="heading text-center">
                  {t("HEAD_C_BUSINESS")}
                </div>
                <div className="fs_07 text-center">{t("DESC_C_BUSINESS")}</div>
              </div>

              <Form className="w-100 mt-4" onSubmit={handleSubmit}>
                <Form.Label className="ps-2 fs_11 popins_medium">
                  {t("BUSINESS_INFORMATION")}
                </Form.Label>
                <div className="d-flex flex-column contact_inputs gap-1 register">
                  <Form.Group controlId="name">
                    <Form.Label className="ps-2 mt-4 mb-2">
                      {t("TITLE_B_NAME")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("PLACE_B_NAME")}
                      className="fs_09"
                    />
                  </Form.Group>
                  <Form.Group className="mb-2">
                    <Form.Label className="ps-2 mb-2">
                      {t("Business_Images")}
                    </Form.Label>
                    <div className="position-relative">
                      <div
                        className="identity_image position-relative mx-auto"
                        style={{ overflow: "auto" }}
                      >
                        {selectedImg?.length > 0 ? (
                          <>
                            {isLoading1 ? (
                              <div className="display_flex2 h-100">
                                <Spinner
                                  animation="border"
                                  variant="black"
                                  size="lg"
                                />
                              </div>
                            ) : (
                              <div className="bus_grid h-100">
                                {selectedImg.map((image, index) => (
                                  <div
                                    key={index}
                                    className="position-relative bus_img"
                                  >
                                    <img
                                      src={URL.createObjectURL(image)}
                                      alt={`imageNew_${index + 1}`}
                                      className="w-100 h-100"
                                    />
                                    <div className="remove_button">
                                      <button
                                        type="button"
                                        onClick={() => removeImage(index)}
                                        className=" btn btn-light fs_08 p-0"
                                      >
                                        X
                                      </button>
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </>
                        ) : (
                          <div>
                            <div className="position-absolute top-0 w-100 bottom-0">
                              <div className="display_flex2 h-100 ">
                                <div className="id_image">
                                  <Image className="user" />
                                  <div className="plus display_flex2">
                                    <Plus
                                      style={{
                                        width: "1.2rem",
                                        height: "1.2rem",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <Form.Control
                          required
                          type="file"
                          className="upload"
                          accept="image/*" // Restrict to image files
                          onChange={handleFileChange}
                          placeholder="Enter Code"
                          multiple
                        />
                      </div>
                      {selectedImg?.length > 0 && (
                        <div
                          className="position-absolute "
                          style={{ top: "-10px", right: "20px", zIndex: 9999 }}
                        >
                          <div className=" display_flex2">
                            <Plus
                              className="bg-black rounded-circle text-white p-1"
                              style={{ width: "1.6rem", height: "1.6rem" }}
                            />
                          </div>
                          <Form.Control
                            type="file"
                            className="upload"
                            accept="image/*" // Restrict to image files
                            onChange={handleFileChange}
                            placeholder="Enter Code"
                            multiple
                          />
                        </div>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="location">
                    <Form.Label className="ps-2 mb-2">Location</Form.Label>
                    <Form.Select required>
                      <option value="">Location</option>
                      {Object.keys(countries).map((countryCode) => (
                        <option key={countryCode} value={[countryCode].name}>
                          {countries[countryCode].name}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="since">
                    <Form.Label className="ps-2 mb-2">
                      {t("PLACE_SINCE")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="date"
                      placeholder="Enter Since"
                      className="fs_09"
                      style={{ paddingRight: "15px" }}
                    />
                  </Form.Group>
                  <Form.Group controlId="type">
                    <Form.Label className="ps-2 mb-2">
                      {t("TITLE_B_TYPE")}
                    </Form.Label>
                    <Form.Select required>
                      <option value="">{t("PLACE_B_TYPE")}</option>
                      {businessType?.length > 0 &&
                        businessType?.map(
                          (item) =>
                            userLangauge === "en" && (
                              <option
                                key={item.id}
                                value={
                                  userLangauge === "en"
                                    ? item.name_eng
                                    : item.name_heb
                                }
                              >
                                {userLangauge === "en"
                                  ? item.name_eng
                                  : item.name_heb}
                              </option>
                            )
                        )}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="status">
                    <Form.Label className="ps-2 mb-2">
                      {t("TITLE_B_STATUS")}
                    </Form.Label>
                    <Form.Select required>
                      <option value="">{t("PLACE_B_STATUS")}</option>
                      {businessStatus?.length > 0 &&
                        businessStatus?.map(
                          (item) =>
                            userLangauge === "en" && (
                              <option
                                key={item.id}
                                value={
                                  userLangauge === "en"
                                    ? item.status_eng
                                    : item.status_heb
                                }
                              >
                                {userLangauge === "en"
                                  ? item.status_eng
                                  : item.status_heb}
                              </option>
                            )
                        )}
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="company_name">
                    <Form.Label className="ps-2 mb-2">
                      {t("CompanyName")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("CompanyName")}
                      className="fs_09"
                    />
                  </Form.Group>
                  <Form.Group controlId="company_number">
                    <Form.Label className="ps-2 mb-2">
                      {t("CompanyAddress")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("CompanyAddress")}
                      className="fs_09"
                    />
                  </Form.Group>
                  <Form.Group controlId="company_address">
                    <Form.Label className="ps-2 mb-2">
                      {t("CompanyNumber")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="text"
                      placeholder={t("CompanyNumber")}
                      className="fs_09"
                    />
                  </Form.Group>
                  <Form.Group controlId="funding_amount">
                    <Form.Label className="ps-2 mb-2">
                      {t("Funding_Amount")}
                    </Form.Label>
                    <Form.Control
                      required
                      type="number"
                      placeholder={t("Funding_Amount")}
                      className="fs_09"
                    />
                  </Form.Group>
                  <Form.Group controlId="amount">
                    <Form.Label className="ps-2 mb-2">
                      {t("RAISED_AMOUNT")}% ({t("optional")})
                    </Form.Label>
                    <div className="mb-3">
                      <Form.Control
                        type="number"
                        placeholder={t("RAISED_AMOUNT")}
                        className="fs_09 mb-0"
                        min={0}
                        max={100}
                        value={raisedAmount}
                        onChange={handleAmountChange}
                      />
                      {errorMessage && (
                        <h6 className="fs_07 text-danger">{errorMessage}</h6>
                      )}
                    </div>
                  </Form.Group>
                  <Form.Group controlId="currency">
                    <Form.Label className="ps-2 mb-2">
                      {t("CURRENCY_TYPE")}
                    </Form.Label>
                    <Form.Select required>
                      <option value="">{t("PLH_CURRENCY_TYPE")}</option>
                      <option value="$usd">$USD</option>
                      <option value="₪shekel">₪Shekel</option>
                    </Form.Select>
                  </Form.Group>
                  <Form.Group controlId="description">
                    <Form.Label className="ps-2 mb-2">
                      {t("TITLE_DESC")}
                    </Form.Label>
                    <Form.Control
                      required
                      as={"textarea"}
                      rows={3}
                      placeholder={t("PLACE_DESC")}
                      className="fs_09"
                      style={{ resize: "none" }}
                    />
                  </Form.Group>
                  <Form.Group controlId="obligations">
                    <Form.Label className="ps-2 mb-2">
                      {t("OBLIGATION_RES")}
                    </Form.Label>
                    <Form.Control
                      required
                      as={"textarea"}
                      rows={3}
                      placeholder={t("OBLIGATION_RES")}
                      className="fs_09"
                      style={{ resize: "none" }}
                    />
                  </Form.Group>
                  <div className="heading text-center my-4">
                    {t("BUSINESS_DESC")}
                  </div>
                  <Form.Group className="mb-3">
                    <Form.Label className="ps-2 mb-2">
                      {t("Legal_Diligence")}
                    </Form.Label>
                    <div className="identity_image mx-auto">
                      {legalDiligenceImg ? (
                        isLoading5 ? (
                          <div className="display_flex2 h-100">
                            <Spinner
                              animation="border"
                              variant="black"
                              size="lg"
                            />
                          </div>
                        ) : (
                          <img
                            src={legalDiligenceImg}
                            alt="Selected"
                            className="display_flex2"
                          />
                        )
                      ) : (
                        <div>
                          <div className="position-absolute top-0 w-100 bottom-0">
                            <div className="display_flex2 h-100 ">
                              <div className="id_image">
                                <Paperclip className="paperClip" />
                                <div className="plus display_flex2">
                                  <Plus
                                    style={{
                                      width: "1.2rem",
                                      height: "1.2rem",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <Form.Control
                        required
                        type="file"
                        className="upload"
                        accept="image/*" // Restrict to image files
                        onChange={handleFileChange6}
                        placeholder="Enter Code"
                      />
                    </div>
                  </Form.Group>
                  <Form.Group>
                    <Form.Label className="ps-2 mb-2">
                      {t("Business_Diligence")}
                    </Form.Label>
                    <div className="identity_image mx-auto">
                      {businessDiligenceImg ? (
                        isLoading6 ? (
                          <div className="display_flex2 h-100">
                            <Spinner
                              animation="border"
                              variant="black"
                              size="lg"
                            />
                          </div>
                        ) : (
                          <img
                            src={businessDiligenceImg}
                            alt="Selected"
                            className="display_flex2"
                          />
                        )
                      ) : (
                        <div>
                          <div className="position-absolute top-0 w-100 bottom-0">
                            <div className="display_flex2 h-100 ">
                              <div className="id_image">
                                <Paperclip className="paperClip" />
                                <div className="plus display_flex2">
                                  <Plus
                                    style={{
                                      width: "1.2rem",
                                      height: "1.2rem",
                                    }}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                      <Form.Control
                        required
                        type="file"
                        className="upload"
                        accept="image/*" // Restrict to image files
                        onChange={handleFileChange7}
                        placeholder="Enter Code"
                      />
                    </div>
                  </Form.Group>
                  <div className="heading text-center mt-5 mb-4 ">
                    {t("FINANCIAL_INFO")}
                  </div>
                  <div className="d-flex flex-column contact_inputs gap-3 register">
                    <Form.Group>
                      <Form.Label className="ps-2 mb-2">
                        {t("Financial_Statement")}
                      </Form.Label>
                      <div className="identity_image mx-auto">
                        {statementImg ? (
                          isLoading2 ? (
                            <div className="display_flex2 h-100">
                              <Spinner
                                animation="border"
                                variant="black"
                                size="lg"
                              />
                            </div>
                          ) : (
                            <img
                              src={statementImg}
                              alt="Selected"
                              className="display_flex2"
                            />
                          )
                        ) : (
                          <div>
                            <div className="position-absolute top-0 w-100 bottom-0">
                              <div className="display_flex2 h-100 ">
                                <div className="id_image">
                                  <Paperclip className="paperClip" />
                                  <div className="plus display_flex2">
                                    <Plus
                                      style={{
                                        width: "1.2rem",
                                        height: "1.2rem",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <Form.Control
                          required
                          type="file"
                          className="upload"
                          accept="image/*" // Restrict to image files
                          onChange={handleFileChange3}
                          placeholder="Enter Code"
                          multiple
                        />
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="ps-2 mb-2">
                        {t("Business_Certificate")}
                      </Form.Label>
                      <div className="identity_image mx-auto">
                        {busCertificateImg ? (
                          isLoading3 ? (
                            <div className="display_flex2 h-100">
                              <Spinner
                                animation="border"
                                variant="black"
                                size="lg"
                              />
                            </div>
                          ) : (
                            <img
                              src={busCertificateImg}
                              alt="Selected"
                              className="display_flex2"
                            />
                          )
                        ) : (
                          <div>
                            <div className="position-absolute top-0 w-100 bottom-0">
                              <div className="display_flex2 h-100 ">
                                <div className="id_image">
                                  <Paperclip className="paperClip" />
                                  <div className="plus display_flex2">
                                    <Plus
                                      style={{
                                        width: "1.2rem",
                                        height: "1.2rem",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <Form.Control
                          required
                          type="file"
                          className="upload"
                          accept="image/*" // Restrict to image files
                          onChange={handleFileChange4}
                          placeholder="Enter Code"
                        />
                      </div>
                    </Form.Group>
                    <Form.Group>
                      <Form.Label className="ps-2 mb-2">
                        {t("Other_Relevant_Document")}
                      </Form.Label>
                      <div className="identity_image mx-auto">
                        {otherDocImg ? (
                          isLoading4 ? (
                            <div className="display_flex2 h-100">
                              <Spinner
                                animation="border"
                                variant="black"
                                size="lg"
                              />
                            </div>
                          ) : (
                            <img
                              src={otherDocImg}
                              alt="Selected"
                              className="display_flex2"
                            />
                          )
                        ) : (
                          <div>
                            <div className="position-absolute top-0 w-100 bottom-0">
                              <div className="display_flex2 h-100 ">
                                <div className="id_image">
                                  <Paperclip className="paperClip" />
                                  <div className="plus display_flex2">
                                    <Plus
                                      style={{
                                        width: "1.2rem",
                                        height: "1.2rem",
                                      }}
                                    />
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                        <Form.Control
                          type="file"
                          className="upload"
                          accept="image/*" // Restrict to image files
                          onChange={handleFileChange5}
                          placeholder="Enter Code"
                        />
                      </div>
                    </Form.Group>
                  </div>
                  <div className="my-4">
                    <div className="d-flex">
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
                  </div>
                </div>
              </Form>
            </div>
          </section>
        </Container>
      </div>
    </>
  );
};

export default CreateBusiness;
