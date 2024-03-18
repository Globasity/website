/* eslint-disable no-unused-vars */
import React from 'react'
import UserInformation from './userInformation'
import SMSVerification from './smsVerification'
import Verification from './verification'
import VerfyById from './verfyById'
import CreateBusiness from './createBusiness'
import FinancialInformation from './financailInformation'
import { useState } from 'react'
import { useEffect } from 'react'
import AccountType from './accountType'
import InvestmentInfo from './investmentInfo'
import CommercialTerms from './commercialTerms'
import Subscription from './subscription'
const SiginUp = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [id_front, setId_front] = useState('');
    const [id_back, setId_back] = useState('');
    const [id_Number, setId_Number] = useState('');
    const [userType, setUserType] = useState('investor');
    const [accountType, setAccountType] = useState('individual')
    const [profileImage, setProfileImage] = useState('');
    const [verifyEmail, setVerifyEmail] = useState('');
    const [progress, setProgress] = useState(0);
    useEffect(() => {
        const userLangauge = JSON.parse(window.localStorage.getItem('globasity_language'))
        if (!userLangauge) {
            const lan = 'en';
            localStorage.setItem('globasity_language', JSON.stringify(lan));
        }
    }, [])
    useEffect(() => {
        setProfileImage(profileImage)
        setId_Number(id_Number)
        setId_front(id_front)
        setId_back(id_back)
        setAccountType(accountType)
        setUserType(userType)
    }, [accountType, id_Number, id_back, id_front, profileImage, userType])
    const handleNextStep = () => {
        setCurrentStep(currentStep + 1);
    };
    const handlePrevStep = () => {
        setCurrentStep(currentStep - 1);
    };
    useEffect(() => {
        const calculateProgress = () => {
            const totalSteps = userType === 'investor' ? 5 : 7;
            const calculatedProgress = ((currentStep + 1) / totalSteps) * 100;
            setProgress(calculatedProgress);
        };

        calculateProgress();
    }, [currentStep, userType]);

    return (
        <>
            <div className='main pt-4 pb-5 display_flex2 flex-column' style={{ backgroundColor: "#F3F7F5", minHeight: "90vh" }} id="main">
                <div>
                    <div style={{ width: '200px', margin: '25px auto', backgroundColor: '#EEEEEE', borderRadius: '5px', overflow: 'hidden' }}>
                        <div style={{ width: `${progress}%`, height: '10px', backgroundColor: '#4caf50', transition: 'width 0.5s ease-in-out' }}></div>
                    </div>
                </div>
                {currentStep === 0 && <AccountType userType={userType} accountType={accountType} setAccountType={setAccountType} setUserType={setUserType} onNextStep={handleNextStep} />}
                {currentStep === 1 && (
                    <UserInformation
                        userType={userType}
                        accountType={accountType}
                        onNextStep={handleNextStep}
                        onPrevStep={handlePrevStep}
                        setVerifyEmail={setVerifyEmail}
                    />
                )}
                {/* {currentStep === 2 && <SMSVerification forgotPassword={false} verifyEmail={verifyEmail} onPrevStep={handlePrevStep} onNextStep={handleNextStep} />} */}
                {currentStep === 2 && <Verification setProfileImage={setProfileImage} onNextStep={handleNextStep} onPrevStep={handlePrevStep} />}
                {userType === "investor" &&
                    (<>
                        {currentStep === 3 && <VerfyById userType={userType} onPrevStep={handlePrevStep} setId_front={setId_front} setId_back={setId_back} setId_Number={setId_Number} onNextStep={handleNextStep} />}
                        {currentStep === 4 &&
                            <InvestmentInfo
                                profileImage={profileImage}
                                id_front={id_front}
                                id_back={id_back}
                                id_Number={id_Number}
                            />
                        }
                    </>)
                }
                {userType === "business" &&
                    (<>
                        {currentStep === 3 && <VerfyById profileImage={profileImage} userType={userType} onPrevStep={handlePrevStep} setId_front={setId_front} setId_back={setId_back} setId_Number={setId_Number} onNextStep={handleNextStep} />}
                        {currentStep === 4 && <Subscription onNextStep={handleNextStep} onPrevStep={handlePrevStep} />}
                        {currentStep === 5 && <CommercialTerms onNextStep={handleNextStep} onPrevStep={handlePrevStep} />}
                        {currentStep === 6 && <CreateBusiness />}
                    </>)
                }
            </div>
        </>
    )
}
export default SiginUp