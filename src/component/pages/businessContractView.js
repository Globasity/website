/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { useState } from "react";
import { useRef } from "react";
import { Container, Form, Modal, Spinner } from "react-bootstrap";
import SignatureCanvas from "react-signature-canvas";
import whiteImage from "../assests/png/white.png";
import {
  apiRequest,
  apiRequestBase64File,
  apiRequestFile,
} from "../api/apiRequest";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ArrowLeft, Download, Edit, Send } from "react-feather";
import { useTranslation } from "react-i18next";
import generatePDF, { Margin } from "react-to-pdf";
import BusinessContractForm from "./pagesComponent/businessContractForm";
import profileAvatar from "../assests/png/profileAvatar.png";
import { Fragment } from "react";
import ChatMessage from "../messages/chatMessage";
import BackToTop from "./pagesComponent/backToTop";

const BusinessContractView = () => {
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [digitalSignature, setDigitalSignature] = useState(false);
  const [uploadFile, setUploadFile] = useState(false);
  const [chat, setChat] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [contractInform, setContractInform] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [base64Image, setBase64Image] = useState("");
  const [chatImage, setchatImage] = useState("");
  const [chatName, setchatName] = useState("");
  const [imageName, setImageName] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(null);
  const [investorSignImage, setInvestorSignImage] = useState("");
  const [businessSignImage, setBusinessSignImage] = useState("");
  const [urlnew, setUrlnew] = useState("");
  const [businessFromData, setBusinessFromData] = useState("");
  const [pdf, setPdf] = useState(false);
  const [businessContract, setBusinessContract] = useState(""); 
  const { state } = useLocation();
  const { businessData, url, contractDetail, status, businessCotract } = state
    ? state
    : {};
  function generateRandomFilename() {
    const currentDate = new Date();
    const timestamp = currentDate.getTime(); // Get the current timestamp in milliseconds
    const randomSuffix = Math.floor(Math.random() * 1000); // Generate a random number between 0 and 999
    const filename = `file_${timestamp}_${randomSuffix}`;
    return filename;
  }
  // const filename = generateRandomFilename();
  // const { toPDF, targetRef } = usePDF({
  //     method: "build",
  //     filename: `business_Contract_${filename}.pdf`,
  //     page: { margin: Margin.LARGE },
  // });

  useEffect(() => {
    if (contractDetail) {
      for (let index = 0; index < 1; index++) {
        const element = contractDetail[index];
        setContractInform(element);
      }
    }
  }, [contractDetail]);
  const generateData = async () => {
    const filename = generateRandomFilename();
    const options = {
      method: "save",
      filename: filename,
      page: {
        margin: Margin.LARGE,
        format: "letter",
        orientation: "portrait",
      },
    };
    toast.info("File Dowloading");
    await generatePDF(pdfRef, options);
  };
  // let userLangauge = JSON.parse(
  //   window.localStorage.getItem("globasity_language")
  // );
  const userLangauge = 'en';
  const formatDate = (inputDate) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(inputDate).toLocaleDateString(undefined, options);
  };
  const { t } = useTranslation();
  const businessContractData = () => {
    const body = new FormData();
    body.append("table_name", "business_contract");
    body.append("type", "get_data");
    body.append("business_id", businessData?.business_id);
    if (userData?.user_type === "business") {
      body.append("investor_id", businessData?.investor_id);
      body.append("business_user", userData.user_id);
    } else {
      body.append("investor_id", userData.user_id);
      body.append("business_user", businessData?.business_user?.id);
    }
    apiRequest({ body })
      .then((result) => {
        const data = result.data;
        if (data.length > 0) {
          setBusinessContract(data);
          setUrlnew(data[0]?.url);
          setInvestorSignImage(data[0]?.investor_base64);
          setBusinessSignImage(data[0]?.business_base64);
        }
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  };
  // useEffect(() => {
  //   userLangauge = JSON.parse(
  //     window.localStorage.getItem("globasity_language")
  //   );
  // }, [t]);
  useEffect(() => {
    businessContractData();
  }, []);
  const [showForm, setShowForm] = useState(false);
  const handleCloseForm = () => setShowForm(false);
  const handleClose = () => {
    setDigitalSignature(false);
    setUploadFile(false);
    setShow(false);
    setSelectedFile(selectedImage);
    setSelectedImage(null);
  };
  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setIsLoading2(true);
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64String = e.target.result;
        setBase64Image(base64String);
      };
      reader.readAsDataURL(file);
      await apiRequestFile(file)
        .then((result) => {
          if (result.result) {
            setImageName(result.file_name);
          }
          setIsLoading2(false);
        })
        .catch((err) => {
          setIsLoading2(false);
          console.log(err);
        });
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };
  const handleShow = () => {
    if (businessContract?.length > 0) {
      if (
        businessContract[0]?.business_base64 === "" &&
        userData?.user_type === "business"
      )
        setShow(true);
      if (
        businessContract[0]?.investor_base64 === "" &&
        userData?.user_type === "investor"
      )
        setShow(true);
    } else {
      setShow(true);
    }
  };
  const pdfRef = useRef();
  const signatureRef = useRef();
  const handleChat = (businessUserId, investorUserId) => {
    navigate("/chat", {
      state: { businessUserId: businessUserId, investorUserId: investorUserId },
    });
  };
  const clearSignature = () => {
    signatureRef.current.clear();
  };
  const navigate = useNavigate();
  const handleViewAdd = () => {
    navigate("/business-detail", {
      state: { businessData: businessData?.business, url: url, status: status },
    });
  };
  const saveSignature = async () => {
    setIsLoading2(true);
    const signatureDataURL = signatureRef.current.toDataURL();
    setSelectedFile(signatureDataURL);
    setBase64Image(signatureDataURL);
    setDigitalSignature(false);
    setUploadFile(false);
    await apiRequestBase64File(signatureDataURL)
      .then((result) => {
        if (result.result) {
          setShow(false);
          setImageName(result.file_name);
        }
        setIsLoading2(false);
      })
      .catch((err) => {
        setIsLoading2(false);
        console.log(err);
      });
  };
  const handlePrev = () => {
    setDigitalSignature(false);
    setUploadFile(false);
  };
  const getFormData = () => {
    const formData = {
      investor_id: businessData?.investor_id || "",
      business_user: businessData?.business_user?.id || "",
      business_id: businessData?.business?.id || "",
    };
    const body = new FormData();
    body.append("table_name", "bc_form");
    body.append("type", "get_data");
    body.append("investor_id", formData.investor_id);
    body.append("business_user", formData.business_user);
    body.append("business_id", formData.business_id);
    apiRequest({ body })
      .then((result) => {
        // console.log(result?.data[0])
        setBusinessFromData(result?.data[0]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
        toast.error(err.message);
      });
  };
  useEffect(() => {
    getFormData();
  }, []);
  // const
  const signatureData = async () => {
    const formData = {
      id: businessContract[0]?.id,
      signImage: imageName,
      status: "completed",
      investor_id: businessData?.investor_id,
      business_id: businessData?.business_id,
      business_user: businessData?.business_user?.id,
      initial_contract: businessData?.id,
    };
    const jsonData = {
      investor_base64:
        userData?.user_type === "investor" ? base64Image : investorSignImage,
      business_base64:
        userData?.user_type === "business" ? base64Image : businessSignImage,
    };
    if (imageName) {
      setIsLoading(true);
      const body = new FormData();
      body.append("table_name", "business_contract");
      if (businessContract?.length > 0) {
        body.append("type", "update_data");
        body.append("id", formData.id);
      } else {
        body.append("type", "add_data");
        body.append("investor_id", formData.investor_id);
        body.append("business_id", formData.business_id);
        body.append("business_user", formData.business_user);
        body.append("initial_contract", formData.initial_contract);
        body.append("contract_from", userData?.user_type);
      }
      // body.append('pdf_json_web', JSON.stringify(jsonData))
      userData?.user_type === "investor" &&
        body.append("investor_signature", formData.signImage);
      userData?.user_type === "business" &&
        body.append("business_signature", formData.signImage);
      userData?.user_type === "investor" &&
        body.append("investor_base64", base64Image);
      userData?.user_type === "business" &&
        body.append("business_base64", base64Image);
      if (businessContract?.length > 0) {
        if (
          businessContract[0]?.business_base64 === "" &&
          businessContract[0]?.investor_base64 === ""
        ) {
          body.append("status", "ongoing");
        }
        if (businessContract[0]?.business_base64 !== "") {
          if (businessContract[0]?.investor_base64 === "") {
            body.append("status", formData.status);
          }
        }
        if (businessContract[0]?.investor_base64 !== "") {
          if (businessContract[0]?.business_base64 === "") {
            body.append("status", formData.status);
          }
        }
      } else {
        body.append("status", "ongoing");
      }

      // console.log(formData)
      apiRequest({ body })
        .then((result) => {
          if (result.result) {
            setPdf(true);
            setIsLoading(false);
            toast.success("Sending Successfully");
            businessContractData();
          }
        })
        .catch((err) => {
          setIsLoading(false);
          console.log(err);
        });
    } else {
      toast.warn("Please sign the Contract");
    }
  };

  useEffect(() => {
    if (pdf === true) {
      generateData();
      navigate(-1);
    }

  }, [pdf]);
  const [toChatId, setToChatId] = useState("");
  const checkInitiateChat = (businessUserId, investorUserId) => {
    let to_chat_id = "";
    if (businessContract[0]?.business_user?.id === userData?.user_id) {
      // console.log(true)
      to_chat_id = businessContract[0]?.investor_id;
      setToChatId(businessContract[0]?.investor_id);
      setchatImage(businessContract[0]?.investor_user?.image);
      setchatName(businessContract[0]?.investor_user?.name);
    } else if (businessContract[0]?.investor_user?.id === userData?.user_id) {
      to_chat_id = businessContract[0]?.business_user?.id;
      setToChatId(businessContract[0]?.business_user?.id);
      setchatImage(businessContract[0]?.business_user?.image);
      setchatName(businessContract[0]?.business_user?.name);
    }
    const body = new FormData();
    body.append("type", "chat_intiate");
    body.append("user_id", userData?.user_id);
    body.append("to_chat_id", to_chat_id);
    apiRequest({ body })
      .then((result) => {
        if (result.count !== 0) {
          handleChat(businessUserId, investorUserId);
        } else {
          setChat(true);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const [chatMsg, setChatMsg] = useState([]);
  const [timeStamp, setTimeStamp] = useState("");
  const chatMessagesRef = useRef(null);
  const getFormattedDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };
  const getFormattedTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const period = hours >= 12 ? "PM" : "AM";
    const formattedHours = String(hours % 12 || 12).padStart(2, "0");
    const formattedMinutes = String(minutes).padStart(2, "0");
    return `${formattedHours}:${formattedMinutes} ${period}`;
  };
  const currentDate = new Date();
  const formattedDate = getFormattedDate(currentDate);
  const formattedTime = getFormattedTime(currentDate);
  const sendMessage = async (e) => {
    e.preventDefault();
    const timestamp = Math.floor(currentDate.getTime() / 1000); // Convert to seconds

    const input = document.getElementById("chatInput");
    const message = input.value;
    const data = {
      sender_id: userData.user_id,
      time: formattedTime,
      timestamp: timestamp,
      msg: message,
      msg_type: "text",
    };
    // console.log(data)
    setChatMsg([...chatMsg, data]);
    chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    const scrollTimeout = setTimeout(() => {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }, 0.00000001);
    const body = new FormData();
    body.append("type", "sendmsg");
    body.append("user_id", data.sender_id);
    body.append("msg", data.msg);
    body.append("timestamp", data.timestamp);
    body.append("to_chat_id", toChatId);
    body.append("msg_type", "text");
    await apiRequest({ body })
      .then((result) => {
        if (result.result) {
          setTimeStamp(result.timestamp);
          clearTimeout(scrollTimeout);
        }
      })
      .catch((err) => {
        console.log(err);
      });
    input.value = "";
  };
  return (
    <>
      <BusinessContractForm
        handleClose={handleCloseForm}
        show={showForm}
        checkUpdate={true}
        contractFormData={businessFromData}
      />
      <BackToTop />
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton className="border-0">
          {(digitalSignature === true || uploadFile === true) && (
            <div className="me-auto" onClick={handlePrev}>
              {" "}
              <ArrowLeft className="leftArrow" />
            </div>
          )}
          <h5 className="popins_semibold">Signature</h5>
        </Modal.Header>
        <Modal.Body>
          {uploadFile === false && digitalSignature === false && (
            <div
              className="display_flex2 flex-column gap-2 px-3"
              style={{ minHeight: "10rem" }}
            >
              <button
                className="btn w-100 btn_primary"
                onClick={() => setDigitalSignature(true)}
              >
                Digital Signature
              </button>
              <button
                className="btn w-100 btn_primary_outline"
                onClick={() => setUploadFile(true)}
              >
                Upload Image
              </button>
            </div>
          )}
          {digitalSignature && (
            <>
              <SignatureCanvas ref={signatureRef} penColor="black" />
              <div className=" display_flex2">
                <button
                  type="button"
                  disabled={isLoading2}
                  onClick={saveSignature}
                  className="btn1 btn2 me-3 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                >
                  {"Save"}
                </button>
                <button
                  type="button"
                  disabled={isLoading2}
                  onClick={clearSignature}
                  className="btn1 btn2 fs_09 btn_primary_outline rounded_3 px-4 py-2"
                >
                  {"Clear"}
                </button>
              </div>
            </>
          )}
          {uploadFile && (
            <div
              className="display_flex2 flex-column "
              style={{ minHeight: "10rem" }}
            >
              <div className="w-100">
                <Form.Group className="w-100">
                  <Form.Label>Upload File</Form.Label>
                  <Form.Control type="file" onChange={handleFileChange} />
                  {selectedImage && (
                    <>
                      <div className="d-flex">
                        <img
                          className="mt-4 mx-auto"
                          src={selectedImage}
                          alt=""
                          style={{
                            objectFit: "cover",
                            height: "10rem",
                            width: "10rem",
                          }}
                        ></img>
                      </div>
                    </>
                  )}
                </Form.Group>
                <div className=" display_flex2 mt-4">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn1 btn2 me-3 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                  >
                    {"Save"}
                  </button>
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
      <Modal show={chat} onHide={() => setChat(false)} centered>
        <Modal.Header closeButton className="border-0">
          <div>
            <img
              src={chatImage ? urlnew + chatImage : profileAvatar}
              alt=""
              className="chat_profile_img"
            />
          </div>
          <div className="ps-3">
            <h5 className="chat_detail fs_09">{chatName}</h5>
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className=" position-relative">
            <div className="position-relative">
              <div
                ref={chatMessagesRef}
                className="chat_model scrolbar px-2 py-3"
              >
                {chatMsg?.map((msg, index) => (
                  <Fragment key={index}>
                    {/* <ChatMessage left={msg?.sender_id === userData?.user_id ? false : true} 
                                            message={msg?.msg} 
                                            timestamp={msg?.timestamp} 
                                            date={msg?.datetime} 
                                            time={`${msg?.time}`} /> */}
                    <ChatMessage
                      id={msg?.id}
                      msg_type={msg?.msg_type}
                      left={msg?.sender_id === userData?.user_id ? false : true}
                      message={msg?.msg}
                      date={msg?.datetime}
                      timestamp={msg?.timestamp}
                      index={index}
                      time={`${msg?.time}`}
                      chatMsg={chatMsg}
                      setChatMsg={setChatMsg}
                    />
                  </Fragment>
                ))}
              </div>
            </div>
            <form onSubmit={sendMessage}>
              <div className="   w-100">
                <div className="d-flex my-3 mx-3">
                  <div className="position-relative w-100 me-1">
                    <input
                      type="text"
                      id="chatInput"
                      required
                      className="form-control rounded-3 ps-2 py-2 fs_10 "
                      placeholder="Try to..."
                    />
                  </div>
                  <button
                    className="send_btn rounded-3 bg_darkSec"
                    type="submit"
                  >
                    <Send
                      className="text-white p-0 m-0"
                      style={{ width: "1.2rem" }}
                    />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
      <Container fluid="xxl" className="px-0">
        <section className="mt-4">
          <Container>
            {businessContract[0]?.investor_base64 !== "" &&
            businessContract[0]?.business_base64 !== ""
              ? ""
              : businessFromData?.business_contract?.contract_from ===
                  userData?.user_type && (
                  <div className="d-flex mb-3">
                    <div
                      className="ms-auto edit_btn"
                      onClick={() => setShowForm(true)}
                    >
                      {" "}
                      <Edit />
                    </div>
                  </div>
                )}
            <div ref={pdfRef}>
              <h5 className="text-center popins_semibold fs_12">
                {t("Investment_Agreement")}
              </h5>
              <p className="fs_08 text-center popins_light">
                {t("Sign_Terms")}
              </p>
              {userLangauge === "en" && (
                <div>
                  <div className="header">
                    <p>
                      Entered into in Tel Aviv on{" "}
                      {formatDate(contractInform?.contract_created)},{" "}
                      {new Date().getFullYear()}
                    </p>
                  </div>
                  <div className="party">
                    <p className="popins_semibold">Between:</p>
                    <div className="party-names">
                      <p className="mb-0">
                        <span className="popins_semibold ">A.</span>{" "}
                        {contractInform?.investor_user?.name} ID No.{" "}
                        {contractInform?.investor_user?.id_number} of{" "}
                        {contractInform?.investor_user?.address} (hereinafter:
                        "the Investor")
                      </p>
                      <p className="popins_semibold my-1">AND:</p>
                      <p>
                        <span className="popins_semibold">B.</span>{" "}
                        {contractInform?.business?.company_name} Ltd. Co. No.{" "}
                        {contractInform?.business?.company_number} of{" "}
                        {contractInform?.business?.company_address} represented
                        by its authorized signatories Mr/Ms.{" "}
                        {contractInform?.business_user?.name} ID No.{" "}
                        {contractInform?.business_user?.id_number} (hereinafter:
                        "the Company")
                      </p>
                    </div>
                  </div>
                  <div className="whereas">
                    <p className="popins_semibold">Whereas</p>
                    <ol>
                      <li>
                        The Company operates in the field of{" "}
                        {contractInform?.field} and wishes to raise capital for
                        expanding its startup activities as detailed in the
                        Investment Memorandum.
                      </li>
                      <p className="my-1 popins_semibold">And Whereas:</p>
                      <li>
                        The Investor wishes to invest in the Company an amount
                        of {contractInform?.investment_amount} USD in exchange
                        for an allocation of {contractInform?.regular_share}{" "}
                        regular/preference shares constituting{" "}
                        {contractInform?.investment_percent}% of the Company's
                        share capital, all subject to the terms of this
                        Agreement.
                      </li>
                    </ol>
                  </div>
                  <div className="agreement">
                    <p className="popins_semibold">
                      Therefore it is Declared, Stipulated and Agreed Between
                      the Parties as Follows:
                    </p>
                    <ol>
                      <li>
                        The preamble to this agreement constitutes an integral
                        part thereof.
                      </li>
                      <li>
                        The Company shall allocate to the Investor on the date
                        of executing this Agreement{" "}
                        {contractInform?.regular_share} regular/preference
                        shares of {contractInform?.share_each_value} USD par
                        value each, constituting{" "}
                        {contractInform?.share_issued_percent}% of the Company's
                        issued and paid-up share capital.
                      </li>
                      <li>
                        The Investor will pay the Company an amount of{" "}
                        {contractInform?.investment_amount} USD in consideration
                        for said share allocation within {contractInform?.days}{" "}
                        days of executing this Agreement. Payment shall be made
                        to the Company's Bank Account No{" "}
                        {contractInform?.company_bank_account}.
                      </li>
                      <li>
                        The Company undertakes to make use of the investment
                        funds in accordance with the business plan and
                        objectives detailed in the Investment Memorandum.
                      </li>
                      <li>
                        The Company will furnish the Investor with financial and
                        business reports on a quarterly basis. The Investor
                        shall also be invited to the Company's annual general
                        shareholder meeting.
                      </li>
                      <li>
                        The Investor may transfer the shares to third parties
                        subject to the Company's and other shareholders' right
                        of first refusal.
                      </li>
                      <li>
                        Sale and/or transfer of shares shall be subject to
                        approval by a special resolution of the Board of
                        Directors.
                      </li>
                      <li>
                        Any amendment to this Agreement shall be made in writing
                        and signed by both Parties.
                      </li>
                      <li>
                        Exclusive jurisdiction is granted to the competent
                        courts in Tel Aviv-Jaffa.
                      </li>
                    </ol>
                    <p className="popins_semibold my-1">
                      In Witness Whereof the Parties Have Set Their Hand:
                    </p>
                  </div>
                </div>
              )}

              {userLangauge === "he" && (
                <div>
                  <div className="header">
                    <p>
                      נכנס לתל אביב ב{" "}
                      {formatDate(contractInform?.contract_created)},{" "}
                      {new Date().getFullYear()}
                    </p>
                  </div>
                  <div className="party">
                    <p className="popins_semibold">בֵּין:</p>
                    <div className="party-names">
                      <p className="mb-0">
                        <span className="popins_semibold ">א.</span>{" "}
                        {contractInform?.investor_user?.name} מספר מזהה.{" "}
                        {contractInform?.investor_user?.id_number} של{" "}
                        {contractInform?.investor_user?.address} (להלן:
                        "המשקיע")
                      </p>
                      <p className="popins_semibold my-1">לבין:</p>
                      <p>
                        <span className="popins_semibold">ב.</span>{" "}
                        {contractInform?.business?.company_name} Ltd. Co. No.{" "}
                        {contractInform?.business?.company_number} מתוך{" "}
                        {contractInform?.business?.company_address} המיוצג על
                        ידי החותמים המורשים שלה מר/גב מספר זיהוי{" "}
                        {contractInform?.business_user?.name}.{" "}
                        {contractInform?.business_user?.id_number} (להלן:
                        "החברה")
                      </p>
                    </div>
                  </div>
                  <div className="whereas">
                    <p className="popins_semibold">הואיל:</p>
                    <ol>
                      <li>
                        החברה פועלת בתחום {contractInform?.field} ומבקשת לגייס
                        הון לצורך הרחבת פעילותה העסקית כמפורט בתזכיר ההשקעות.
                      </li>
                      <p className="my-1 popins_semibold">והואיל:</p>
                      <li>
                        המשקיע מעוניין להשקיע בחברה סכום של{" "}
                        {contractInform?.investment_amount} דולר בתמורה להקצאה
                        של {contractInform?.regular_share} מניות רגילות/מועדפות
                        המהוות את {contractInform?.investment_percent}% מהון
                        המניות של החברה, הכל בכפוף לתנאי הסכם זה.
                      </li>
                    </ol>
                  </div>
                  <div className="agreement">
                    <p>לפיכך הוצהר הותנה והוסכם בין הצדדים כדלקמן:</p>
                    <ol>
                      <li>המבוא להסכם זה מהווה חלק בלתי נפרד ממנו.</li>
                      <li>
                        החברה תקצה למשקיע בתאריך ביצוע הסכם זה{" "}
                        {contractInform?.regular_share} מניות רגילות/בכורה של{" "}
                        {contractInform?.share_each_value} דולר נקוב כל אחד,
                        המהווים {contractInform?.share_issued_percent}% מהון
                        המניות המונפק והנפרע של החברה.
                      </li>
                      <li>
                        המשקיע ישלם לחברה סכום של{" "}
                        {contractInform?.investment_amount} דולר בתמורה להקצאת
                        המניות האמורה בתוך {contractInform?.days} ימים מביצוע
                        הסכם זה. התשלום יתבצע לחשבון הבנק של החברה מספר{" "}
                        {contractInform?.company_bank_account}.
                      </li>
                      <li>
                        החברה מתחייבת לעשות שימוש בכספי ההשקעה בהתאם לתכנית
                        העסקית וליעדים המפורטים בתשקיף ההנפקה.
                      </li>
                      <li>
                        החברה תמסור למשקיע דיווחים כספיים ועסקיים אחת לרבעון.
                        כמו כן יוזמן המשקיע לאסיפה הכללית השנתית של בעלי המניות.
                      </li>
                      <li>
                        המשקיע יהיה זכאי להעביר את המניות לצדדים שלישיים בכפוף
                        לזכות סירוב ראשונה של החברה ויתר בעלי המניות.
                      </li>
                      <li>
                        מכירת ו/או העברת מניות תהיה כפופה לאישור בהחלטה מיוחדת
                        של הדירקטוריון.
                      </li>
                      <li>
                        כל שינוי של הסכם זה ייעשה בכתב בלבד ובחתימת שני הצדדים.
                      </li>
                      <li>
                        סמכות שיפוט ייחודית נתונה לבתי המשפט המוסמכים בתל אביב
                        יפו.
                      </li>
                    </ol>
                    <p className="popins_semibold my-1">
                      ולראיה נקטו הצדדים את ידם:
                    </p>
                  </div>
                </div>
              )}

              <div
                className="d-flex gap-4 justify-content-between"
                style={{ alignItems: "stretch" }}
              >
                {userData?.user_type === "business" ? (
                  <div className="">
                    <div onClick={handleShow} style={{ cursor: "pointer" }}>
                      <div className="display_flex2">
                        <img
                          src={
                            businessContract[0]?.business_base64
                              ? businessSignImage
                              : selectedFile
                              ? selectedFile
                              : whiteImage
                          }
                          alt=""
                          className=" signature_img"
                        />
                      </div>

                      <hr className="mx-2 my-1" style={{ opacity: "1" }}></hr>
                      <h6 className="popins_semibold text-center fs_08 pt-1">
                        {t("Business_Owner_Signatures")}
                      </h6>
                    </div>
                  </div>
                ) : (
                  <div className="">
                    <div>
                      <div className="display_flex2">
                        <img
                          src={
                            businessContract[0]?.business_base64
                              ? businessSignImage
                              : whiteImage
                          }
                          alt=""
                          className=" signature_img"
                        />
                      </div>

                      <hr className="mx-2 my-1" style={{ opacity: "1" }}></hr>
                      <h6 className="popins_semibold text-center fs_08 pt-1">
                        {t("Business_Owner_Signatures")}
                      </h6>
                    </div>
                  </div>
                )}
                {userData?.user_type === "investor" ? (
                  <div
                    className=""
                    onClick={handleShow}
                    style={{ cursor: "pointer" }}
                  >
                    <div className="display_flex2">
                      <img
                        src={
                          businessContract[0]?.investor_base64
                            ? investorSignImage
                            : selectedFile
                            ? selectedFile
                            : whiteImage
                        }
                        alt=""
                        className=" signature_img"
                      />
                    </div>
                    <hr className="mx-2 my-1" style={{ opacity: "1" }}></hr>
                    <h6 className="popins_semibold text-center fs_08 pt-1">
                      {t("Investor_Signatures")}
                    </h6>
                  </div>
                ) : (
                  <div className="">
                    <div className="display_flex2">
                      {" "}
                      <img
                        src={
                          businessContract[0]?.investor_base64
                            ? investorSignImage
                            : whiteImage
                        }
                        alt=""
                        className=" signature_img"
                      />
                    </div>
                    <hr className="mx-2 my-1" style={{ opacity: "1" }}></hr>
                    <h6 className="popins_semibold text-center fs_08 pt-1">
                      {t("Investor_Signatures")}
                    </h6>
                  </div>
                )}
              </div>
            </div>
            <div className="display_flex2 flex-wrap gap-3 my-5">
              {businessCotract === true &&
                (businessData ? (
                  <div className="d-flex gap-3 flex-wrap">
                    <button
                      onClick={generateData}
                      className=" btn1  fs_07 btn_primary_outline fs_09 rounded-3 px-3 py-2"
                    >
                      <Download className="" style={{ height: "1.3rem" }} />
                    </button>
                    {userData.user_type === "investor" &&
                      (businessData?.investor_base64 ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              checkInitiateChat(
                                businessData?.business_user?.id,
                                businessData?.investor_id
                              )
                            }
                            className="btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                          >
                            {isLoading ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              t("Chat")
                            )}
                          </button>
                        </>
                      ) : (
                        <button
                          disabled={isLoading ? true : false}
                          type="button"
                          onClick={signatureData}
                          className="btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                        >
                          {isLoading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            t("Apply_Contract")
                          )}
                        </button>
                      ))}
                    {userData.user_type === "business" &&
                      (businessData?.business_base64 ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              checkInitiateChat(
                                businessData?.business_user?.id,
                                businessData?.investor_id
                              )
                            }
                            className="btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                          >
                            {isLoading ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              t("Chat")
                            )}
                          </button>
                        </>
                      ) : (
                        <button
                          disabled={isLoading ? true : false}
                          type="button"
                          onClick={signatureData}
                          className="btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                        >
                          {isLoading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            t("Apply_Contract")
                          )}
                        </button>
                      ))}
                  </div>
                ) : (
                  <>
                    <button
                      disabled={isLoading ? true : false}
                      type="button"
                      onClick={signatureData}
                      className="btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                    >
                      {isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        t("Apply_Contract")
                      )}
                    </button>
                  </>
                ))}
              {businessCotract === (false || undefined) &&
                (businessData?.is_business_exist ? (
                  <div className="d-flex gap-3 flex-wrap">
                    <button
                      onClick={generateData}
                      className=" btn1  fs_07 btn_primary_outline fs_09 rounded-3 px-3 py-2"
                    >
                      <Download className="" style={{ height: "1.3rem" }} />
                    </button>
                    {userData.user_type === "investor" &&
                      (businessData?.is_business_exist?.investor_base64 ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              checkInitiateChat(
                                businessData?.business_user?.id,
                                businessData?.investor_id
                              )
                            }
                            className="btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                          >
                            {isLoading ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              t("Chat")
                            )}
                          </button>
                        </>
                      ) : (
                        <button
                          disabled={isLoading ? true : false}
                          type="button"
                          onClick={signatureData}
                          className="btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                        >
                          {isLoading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            t("Apply_Contract")
                          )}
                        </button>
                      ))}
                    {userData.user_type === "business" &&
                      (businessData?.is_business_exist?.business_base64 ? (
                        <>
                          <button
                            type="button"
                            onClick={() =>
                              checkInitiateChat(
                                businessData?.business_user?.id,
                                businessData?.investor_id
                              )
                            }
                            className="btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                          >
                            {isLoading ? (
                              <Spinner animation="border" size="sm" />
                            ) : (
                              t("Chat")
                            )}
                          </button>
                        </>
                      ) : (
                        <button
                          disabled={isLoading ? true : false}
                          type="button"
                          onClick={signatureData}
                          className="btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                        >
                          {isLoading ? (
                            <Spinner animation="border" size="sm" />
                          ) : (
                            t("Apply_Contract")
                          )}
                        </button>
                      ))}
                  </div>
                ) : (
                  <>
                    <button
                      disabled={isLoading ? true : false}
                      type="button"
                      onClick={signatureData}
                      className="btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2"
                    >
                      {isLoading ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        t("Apply_Contract")
                      )}
                    </button>
                  </>
                ))}
              <button
                type="button"
                onClick={handleViewAdd}
                className="btn1 btn2 btn2 fs_09 btn_primary_outline rounded_3 px-4 py-2"
              >
                {t("VIEW_BUSINESS")}
              </button>
            </div>
          </Container>
        </section>
      </Container>
    </>
  );
};

export default BusinessContractView;
