/* eslint-disable no-unused-vars */
import React from "react";
import { useState, useEffect } from "react";
import { Container, Form, Spinner } from "react-bootstrap";
import { ArrowLeft, Plus, Image, User } from "react-feather";
import { apiRequest, apiRequestFile } from "../api/apiRequest";
import NotifySnackbar from "../snackbar/notiySnackbar";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

const Verification = ({
  setProfileImage,
  setProfileBanner,
  setCategory,
  setBrief,
  setDescription,
  setSocialEmail,
  setSocialLinkedin,
  setSocialWebsite,
  setSocialTwitter,
  setSocialFacebook,
  onNextStep,
  onPrevStep,
}) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedBanner, setSelectedBanner] = useState(null);
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [businessType, setBusinessType] = useState([]);
  let userLangauge = JSON.parse(
    window.localStorage.getItem("globasity_language")
  );
  const handleClose = (reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  const fileUpload = async (file) => {
    // setProfileImage("image1")/
    setIsLoading(true);
    await apiRequestFile(file)
      .then((result) => {
        if (result.result) {
          setIsLoading(false);
          setProfileImage(result.file_name);
          // toast.success(result.message)
        } else {
          setIsLoading(false);
          setMessage(result.message);
          setMessageType("error");
          setOpen(true);
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setIsLoading(false);
        setMessageType("error");
        setOpen(true);
        console.log(err);
      });
  };
  const BannerUpload = async (file) => {
    // setProfileImage("image1")/
    setIsLoading(true);
    await apiRequestFile(file)
      .then((result) => {
        if (result.result) {
          setIsLoading(false);
          setProfileBanner(result.file_name);
          // toast.success(result.message)
        } else {
          setIsLoading(false);
          setMessage(result.message);
          setMessageType("error");
          setOpen(true);
        }
      })
      .catch((err) => {
        setMessage(err.message);
        setIsLoading(false);
        setMessageType("error");
        setOpen(true);
        console.log(err);
      });
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
  useEffect(() => {
    getBusinessType();
  }, []);
  // Event handler to handle file selection
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    fileUpload(file);
    if (file) {
      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  const handleBannerChange = (event) => {
    const file = event.target.files[0];
    BannerUpload(file);
    if (file) {
      // Create a URL for the selected image
      const imageUrl = URL.createObjectURL(file);
      setSelectedBanner(imageUrl);
    }
  };
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );

  const updateSteps = async () => {
    setIsLoading(true);
    const body = new FormData();
    body.append("table", "users");
    body.append("type", "update_data");
    body.append("id", userData?.user_id);
    // body.append('platform', 3)
    await apiRequest({ body })
      .then((result) => {
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // onNextStep()
    if (selectedImage && selectedBanner) {
      // await updateSteps()
      onNextStep();
    } else {
      toast.warn("please upload Logo & Banner");
    }
  };

  const handleBrief = (event) => {
    setBrief(event.target.value);
  };

  const handleDescription = (event) => {
    setDescription(event.target.value);
  };

  const handleSocialEmail = (event) => {
    setSocialEmail(event.target.value);
  };

  const handleSocialLinkedin = (event) => {
    setSocialLinkedin(event.target.value);
  };

  const handleSocialWebsite = (event) => {
    setSocialWebsite(event.target.value);
  };

  const handleSocialTwitter = (event) => {
    setSocialTwitter(event.target.value);
  };

  const handleSocialFacebook = (event) => {
    setSocialFacebook(event.target.value);
  };

  const handleCategory = (event) => {
    setCategory(event.target.value);
  };

  return (
    <>
      <NotifySnackbar
        handleClose={handleClose}
        open={open}
        message={message}
        messageType={messageType}
      />
      <Container fluid="xxl" className="px-0 h-100">
        <section className="px-sm-3 d-flex align-items-center h-100 justify-content-center">
          <div className="login_card">
            <div className="me-auto" onClick={onPrevStep}>
              {" "}
              <ArrowLeft className="leftArrow" />
            </div>
            <div>
              <div className="heading text-center">Your Information</div>
              <div className="fs_07 text-center">
                Please fill the following
              </div>
            </div>
            <Form className="w-100 mt-4" onSubmit={handleSubmit}>
              <Form.Group controlId="category" className="mb-1-rem">
                <Form.Label className="custom-label">Category*</Form.Label>
                <Form.Select required onChange={handleCategory}>
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
              <Form.Group controlId="brief" className="mb-1-rem">
                <Form.Label className="custom-label">Brief*</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Brief description about you"
                  onChange={handleBrief}
                  style={{ fontSize: "14px" }}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="description" className="mb-2-rem">
                <Form.Label className="custom-label">Description*</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Company Description"
                  onChange={handleDescription}
                  style={{ fontSize: "14px" }}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group>
                <div className="d-flex flex-column gap-1 register mb-1-rem">
                  <Form.Label className="ps-2 custom-label">
                    Upload Logo / Avatar*
                  </Form.Label>
                  <div className="profile_image mx-auto">
                    {selectedImage ? (
                      <img
                        src={selectedImage}
                        alt="Selected"
                        className="display_flex2"
                      />
                    ) : (
                      <div>
                        <div className="position-absolute top-0 w-100 bottom-0">
                          <div className="display_flex2 h-100 ">
                            <div className="user_image">
                              <Image className="user" />
                              <div className="plus display_flex2">
                                <Plus
                                  style={{ width: "1.2rem", height: "1.2rem" }}
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
                      onChange={handleFileChange}
                      placeholder="Enter Code"
                    />
                  </div>
                </div>
              </Form.Group>
              <Form.Group>
                <div className="d-flex flex-column gap-1 register mb-2-rem">
                  <Form.Label className="ps-2 custom-label">
                    Upload Banner*
                  </Form.Label>
                  <div className="identity_image mx-auto">
                    {selectedBanner ? (
                      <img
                        src={selectedBanner}
                        alt="Selected"
                        className="display_flex2"
                      />
                    ) : (
                      <div>
                        <div className="position-absolute top-0 w-100 bottom-0">
                          <div className="display_flex2 h-100 ">
                            <div className="id_image">
                              <Image className="user" />
                              <div className="plus display_flex2">
                                <Plus
                                  style={{ width: "1.2rem", height: "1.2rem" }}
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
                      onChange={handleBannerChange}
                      placeholder="Enter Code"
                    />
                  </div>
                </div>
              </Form.Group>
              <div>
                <div className="heading text-center">Public Profiles</div>
                <div className="fs_07 text-center mb-2-rem">
                  Please fill your public profiles
                </div>
              </div>
              <Form.Group controlId="socialEmail" className="mb-1-rem">
                <Form.Control
                  required
                  type="text"
                  placeholder="Email"
                  onChange={handleSocialEmail}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="socialLinkedin" className="mb-1-rem">
                <Form.Control
                  type="text"
                  placeholder="Linkedin"
                  onChange={handleSocialLinkedin}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="socialWebsite" className="mb-1-rem">
                <Form.Control
                  type="text"
                  placeholder="Website"
                  onChange={handleSocialWebsite}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="socialTwitter" className="mb-1-rem">
                <Form.Control
                  type="text"
                  placeholder="X / Twitter"
                  onChange={handleSocialTwitter}
                  className="custom-input"
                />
              </Form.Group>
              <Form.Group controlId="socialFacebook" className="mb-2-rem">
                <Form.Control
                  type="text"
                  placeholder="Facebook"
                  onChange={handleSocialFacebook}
                  className="custom-input"
                />
              </Form.Group>

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
                      t("BTN_NEXT")
                    )}
                  </button>
                </div>
              </div>
            </Form>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Verification;
