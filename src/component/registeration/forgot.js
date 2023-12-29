/* eslint-disable no-unused-vars */
import React from "react";
import { useState } from "react";
import { Container, Form } from "react-bootstrap";
import { toast } from "react-toastify";
import ForgotPassword from "./forgotPassword";
import SMSVerification from "./smsVerification";
import NewPassword from "./newPassword";

const Forgot = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNextStep = () => {
    setCurrentStep(currentStep + 1);
  };
 
  return (
    <>
      <div className='main pt-4 pb-5 display_flex2' style={{ backgroundColor: "#F3F7F5", minHeight: "90vh" }} id="main">
         {currentStep===0 && <ForgotPassword onNextStep={handleNextStep}/>}
         {currentStep===1 && <SMSVerification  onNextStep={handleNextStep}   forgotPassword={true}/>}
         {currentStep===2 && <NewPassword />}
      </div>
    </>
  );
};

export default Forgot;
