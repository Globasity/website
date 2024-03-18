/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { useRef } from 'react';
import { Container, Form, Modal, Spinner } from 'react-bootstrap'
import SignatureCanvas from 'react-signature-canvas';
import whiteImage from '../assests/png/white.png'
import { apiRequest, apiRequestBase64File, apiRequestFile } from '../api/apiRequest';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ArrowLeft } from 'react-feather';
import { Margin, usePDF } from "react-to-pdf";
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import BackToTop from './pagesComponent/backToTop';

const ViewInitialContract = () => {
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const [show, setShow] = useState(false);
    const { t } = useTranslation()
    const [isLoading, setIsLoading] = useState(false);
    const [digitalSignature, setDigitalSignature] = useState(false);
    const [uploadFile, setUploadFile] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [selectedImage, setSelectedImage] = useState(null);
    const [constractData, setConstractData] = useState(null);
    const [senderName, setSenderName] = useState(null);
    const [senderEmail, setSenderEmail] = useState(null);
    const [newWindow, setNewWindow] = useState(null)
    const [receiverName, setReceiverName] = useState(null);
    const [receiverEmail, setReceiverEmail] = useState(null);
    const [imageName, setImageName] = useState(null);
    const { state } = useLocation()
    let userLangauge = JSON.parse(window.localStorage.getItem('globasity_language'))
    const { investorData, businessData, investorId, checkMyBus } = state ? state : {}
    useEffect(() => {
        userLangauge = JSON.parse(window.localStorage.getItem('globasity_langauge'))
    }, [t, userLangauge])
    const handleClose = () => {
        setDigitalSignature(false)
        setUploadFile(false)
        setShow(false);
        setSelectedFile(selectedImage)
        setSelectedImage(null)
    }

    const [nextBtn, setNextBtn] = useState(false)
    const [paymentResult, setPaymentResult] = useState(false)
    let childWindow;

    const openPaymentPage = (paymentPageLink) => {
        const childWindow = window.open(paymentPageLink, 'PaymentPage', 'width=600,height=800');
        return childWindow; // Return a reference to the child window
    };
    const updateData = async () => {
        const body = new FormData();
        body.append('table_name', 'users');
        body.append('type', 'update_data');
        body.append('id', userData?.user_id);
        body.append('website_payment_date', "00000-00-00");
        await apiRequest({ body })
            .then((result) => {
                // console.log(result.data);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const payment = async () => {
        const body = new FormData()
        body.append('type', 'payment_link')
        body.append('amount', "5")
        body.append('name', userData?.user_name)
        body.append('phone', userData?.phone)
        body.append('email', userData?.email)
        // Declare a variable to hold the reference to the child window
        setIsLoading(false)
        await apiRequest({ body })
            .then((result) => {
                // const data = JSON.parse(result.result);
                // const paymentPage = data?.data.payment_page_link;
                setNextBtn(true)
                // childWindow = openPaymentPage(true);
                setNewWindow(true)
            }).catch((err) => {
                console.log(err);
            });
    }
    const fetchData = () => {
        const body = new FormData();
        body.append('table_name', 'users');
        body.append('type', 'get_data');
        body.append('email', userData?.email);
        apiRequest({ body })
            .then((result) => {
                const parsedGivenDate = new Date(result.data[0].website_payment_date);
                const currentDate = new Date();
                if (parsedGivenDate.toDateString() === currentDate.toDateString()) {
                    setPaymentResult(true)
                    setNextBtn(false)
                    // console.log('Given date matches the current date!');
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const addPaymentData = async () => {
        const body = new FormData();
        body.append('table_name', 'payments');
        body.append('type', 'add_data');
        body.append('user_id', userData?.user_id);
        body.append('amount', 5);
        body.append('business_id', businessData?.id);
        body.append('contract_id', 0);
        body.append('payment_method', 'payplus');
        body.append('status', 'approved');
        body.append('payment_type', 'contract');
        apiRequest({ body })
            .then(async (result) => {
                if (result.result === true) {
                    toast.success("Transaction successfully")
                    if (newWindow && !newWindow.closed) {
                        newWindow.close();
                    }
                    await updateData()
                    creatContract()
                }
            })
            .catch((err) => {
                toast.error(err)
                console.log(err);
            });
    }
    useEffect(() => {
        if (paymentResult === true) {
            addPaymentData()
        }
    }, [paymentResult])
    useEffect(() => {
        if (nextBtn === true) {
            fetchData(); // Fetch data immediately
            const interval = setInterval(fetchData, 1000); // Fetch data every 5 seconds
            return () => clearInterval(interval);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [nextBtn]);
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        await apiRequestFile(file)
            .then((result) => {
                if (result.result) {
                    setImageName(result.file_name)
                }
            }).catch((err) => {
                console.log(err)
            });
        const imageUrl = URL.createObjectURL(file);
        setSelectedImage(imageUrl);
    };
    const handleShow = () => {
        if (userData?.user_type === "business") setShow(true)
        if (userData?.user_type === "investor") setShow(true)
    }
    const signatureRef = useRef();

    const clearSignature = () => {
        signatureRef.current.clear();
    };
    const navigate = useNavigate()

    const saveSignature = async () => {
        setIsLoading2(true)
        const signatureDataURL = signatureRef.current.toDataURL();
        setSelectedFile(signatureDataURL)

        await apiRequestBase64File(signatureDataURL)
            .then((result) => {
                // console.log(result)
                if (result.result) {
                    setShow(false);
                    setDigitalSignature(false)
                    setUploadFile(false)
                    setImageName(result.file_name)

                }
                setIsLoading2(false)
            }).catch((err) => {
                setIsLoading2(false)
                console.log(err)
            });
    };
    const handlePrev = () => {
        setDigitalSignature(false)
        setUploadFile(false)
    }
    useEffect(() => {
        if (userData?.user_type === "business") {
            setSenderName(businessData?.name)
            setSenderEmail(businessData?.email)
            setReceiverEmail(investorData?.email)
            setReceiverName(investorData?.name)
        } else if (userData?.user_type === "investor") {
            setSenderName(investorData?.name)
            setSenderEmail(investorData?.email)
            setReceiverEmail(businessData?.email)
            setReceiverName(businessData?.name)
        }
    }, [businessData])
    // const getContractInfo = () => {
    //     const body = new FormData()
    //     body.append('table_name', 'initial_contract')
    //     body.append('type', 'get_data')
    //     body.append('id', businessData?.id)
    //     apiRequest({ body })
    //         .then((result) => {
    //             const data = result.data
    //             if (data?.length > 0) {
    //                 // console.log(data)
    //                 for (let index = 0; index < 1; index++) {
    //                     const element = data[index];
    //                     setConstractData(element)
    //                     if (element?.contract_from === "business") {
    //                         setSenderName(element.business_user?.name)
    //                         setSenderEmail(element.business_user?.email)
    //                         setReceiverEmail(element.investor_user?.email)
    //                         setReceiverName(element.investor_user?.name)
    //                     } else if (element?.contract_from === "investor") {
    //                         setSenderName(element.investor_user?.name)
    //                         setSenderEmail(element.investor_user?.email)
    //                         setReceiverEmail(element.business_user?.email)
    //                         setReceiverName(element.business_user?.name)
    //                     }
    //                 }
    //                 // setConstractData(data)

    //             }
    //         }).catch((err) => {
    //             console.log(err)
    //         });
    // }
    // useEffect(() => {
    //     getContractInfo()
    // }, [businessData])
    const checkPayement = () => {
        if (imageName) {
            if (userData?.user_type === "investor") {
                setIsLoading(true)
                const body = new FormData();
                body.append('table_name', 'payments');
                body.append('type', 'get_data');
                body.append('user_id', userData?.user_id);
                body.append('business_id', businessData?.id);
                apiRequest({ body })
                    .then(async (result) => {
                        if (result?.length > 0) {
                            creatContract()
                        } else {
                            await payment()
                        }
                    }).catch((err) => {
                        console.log(err)
                    });
            }
        } else {
            toast.warn('Please sign the Contract')
        }
    }
    const creatContract = () => {
        if (imageName) {
            setIsLoading(true)
            const formData = {
                business_id: checkMyBus.id,
                investor_id: investorId,
                business_user: checkMyBus?.user_id,
                business_signature: imageName,
                investor_signature: imageName,
                status: "ongoing",
                contract_from: userData?.user_type
            }
            const body = new FormData()
            body.append('table_name', 'initial_contract')
            body.append('type', 'add_data')
            body.append('business_id', formData.business_id)
            body.append('investor_id', formData.investor_id)
            body.append('business_user', formData.business_user)
            body.append('investor_signature', userData?.user_type === "investor" ? formData.investor_signature : "")
            body.append('business_signature', userData?.user_type === "business" ? formData.business_signature : "")
            body.append('status', formData.status)
            body.append('contract_from', formData.contract_from)
            apiRequest({ body })
                .then((result) => {
                    if (result.result) {
                        toast.success("Sending successfully")
                        handleClose()
                        navigate('/Initial-contract')
                    }
                    setIsLoading(false)
                }).catch((err) => {
                    toast.success(err)
                    setIsLoading(false)
                    console.log(err)
                });
        }
        else {
            toast.warn('Please sign the Contract')
        }
    }
    // const signatureData = async () => {
    //     let contract = ""
    //     const formData = {
    //         id: businessData?.id,
    //         signImage: imageName,
    //         status: "completed",
    //     }
    //     if (imageName) {
    //         setIsLoading(true)
    //         const body = new FormData()
    //         body.append('table_name', 'initial_contract')
    //         body.append('type', 'update_data')
    //         body.append('id', formData.id)
    //         userData?.user_type === "investor" && body.append('investor_signature', formData.signImage)
    //         userData?.user_type === "business" && body.append('business_signature', formData.signImage)
    //         if (businessData?.business_signature !== "") {
    //             if (businessData?.investor_signature === "") {
    //                 body.append('status', formData.status)
    //             }

    //         }
    //         if (businessData?.investor_signature !== "") {
    //             if (businessData?.business_signature === "") {
    //                 body.append('status', formData.status)
    //             }
    //         }
    //         body.append('contract', contract)
    //         apiRequest({ body })
    //             .then((result) => {
    //                 // console.log(result)
    //                 if (result.result) {
    //                     setIsLoading(false)
    //                     toast.success(result.message)
    //                     navigate(-1)
    //                 }
    //             }).catch((err) => {
    //                 setIsLoading(false)
    //                 console.log(err)
    //             });
    //     } else {
    //         toast.warn('Please sign the Contract')
    //     }
    // }

    const handleChat = (checkMyBus, investorData) => {
        // navigate("/chat", { state: { businessData: checkMyBus, investorData: investorData } })
    }
    function extractDateFromDateStr(dateStr) {
        const dateObject = new Date(dateStr);
        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Adding 1 to month because it's zero-indexed
        const day = String(dateObject.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }
    return (
        <>
            <BackToTop />
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton className="border-0">
                    {(digitalSignature === true || uploadFile === true) && <div className='me-auto' onClick={handlePrev}> <ArrowLeft className='leftArrow' /></div>}
                    <h5 className="popins_semibold">Signature</h5>
                </Modal.Header>
                <Modal.Body className='sign_width'>
                    {(uploadFile === false && digitalSignature === false) &&
                        (<div className='display_flex2 flex-column gap-2 px-3' style={{ minHeight: "10rem" }}>
                            <button className='btn w-100 btn_primary' onClick={() => setDigitalSignature(true)}>
                                Digital Signature
                            </button>
                            <button className='btn w-100 btn_primary_outline' onClick={() => setUploadFile(true)}>
                                Upload Image
                            </button>
                        </div>)}
                    {digitalSignature &&
                        (<>
                            <SignatureCanvas
                                ref={signatureRef}
                                penColor="black"
                            />
                            <div className=" display_flex2">
                                <button type='button' disabled={isLoading2} onClick={saveSignature} className='btn1 btn2 me-3 btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
                                    {isLoading2 ? <>
                                    <Spinner size='sm' /> </> :
                                        "Save"}
                                </button>
                                <button type='button' disabled={isLoading2} onClick={clearSignature} className='btn1 btn2 fs_09 btn_primary_outline rounded_3 px-4 py-2' >
                                    {"Clear"}
                                </button>
                            </div>
                        </>)}
                    {uploadFile && <div className='display_flex2 flex-column ' style={{ minHeight: "10rem" }}>
                        <div className='w-100'>
                            <Form.Group className='w-100'>
                                <Form.Label>Upload File</Form.Label>
                                <Form.Control type='file' onChange={handleFileChange} />
                                {selectedImage &&
                                    <>
                                        <div className='d-flex'>
                                            <img className='mt-4 mx-auto' src={selectedImage} alt='' style={{ objectFit: "cover", height: "10rem", width: "10rem" }}></img>
                                        </div>
                                    </>}
                            </Form.Group>
                            <div className=" display_flex2 mt-4">
                                <button type='button' onClick={handleClose} className='btn1 btn2 me-3 btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
                                    {"Save"}
                                </button>
                            </div>
                        </div>
                    </div>}
                </Modal.Body>
            </Modal>
            <Container fluid="xxl" className='px-0'>
                <section className='mt-4 nda_con'>
                    <Container>
                        <div>
                            <h5 className='text-center popins_semibold fs_12'>{t("NDA_Confidentiality_Agreement")}</h5>
                            <p className='fs_08 text-center popins_light'>{t("NDA_Confidentiality_Agreement_Detail")}</p>
                        </div>

                        {userLangauge === ("en") && (<div className='popins_light fs_09 mt-5' style={{ lineHeight: "1.6", textAlign: "justify", minHeight: "20rem" }}>
                            <p className='fs_09'>
                                This Nondisclosure Agreement or ("Agreement") has been entered into on the date of <span className='underline popins_semibold'>

                                    {constractData && extractDateFromDateStr(constractData?.updated_timestamp)}
                                </span> and is by and between:
                            </p>
                            <p>
                                <span className='popins_semibold'> Party Disclosing Information: </span> <span className='underline popins_semibold'>
                                    {senderName}
                                </span> with a mailing address
                                of <span className='underline popins_semibold'>
                                    {senderEmail}
                                </span> ('Disclosing Party').</p>
                            <p>
                                <span className='popins_semibold'> Party Receiving Information: </span> <span className='underline popins_semibold'>{receiverName}</span> with a mailing address
                                of <span className='underline popins_semibold'>{receiverEmail}</span> ( "Receiving Party").
                            </p>
                            <p>
                                For the purpose of preventing the unauthorized disclosure of Confidential Information as defined
                                below. The parties agree to enter into a confidential relationship concerning the disclosure of
                                certain proprietary and confidential information ("Confidential Information").
                            </p>

                            <div className='popins_semibold mb-2'>   l. Definition of Confidential Information: </div>
                            <p>
                                For purposes of this Agreement, "Confidential
                                Information" shall include all information or material that has or could have commercial value or
                                other utility in the business in which Disclosing Party is engaged. If Confidential Information is in
                                written form, the Disclosing Party shall label or stamp the materials with the word "Confidential"
                                or some similar warning. If Confidential Information is transmitted orally, the Disclosing Party
                                shall promptly provide writing indicating that such oral communication constituted Confidential
                                Information.
                            </p>

                            <div className='popins_semibold mb-2'>    2. Exclusions from Confidential Information: </div>
                            <p>
                                Receiving Party's obligations under this
                                Agreement do not extend to information that is: (a) publicly known at the time of disclosure or
                                subsequently becomes publicly known through no fault of the Receiving Party; (b) discovered or
                                created by the Receiving Party before disclosure by Disclosing Party; (c) learned by the
                                Receiving Party through legitimate means other than from the Disclosing Party or Disclosing
                                Party's representatives; or (d) is disclosed by Receiving Party with Disclosing Party's prior
                                written approval.
                            </p>
                            <div className='popins_semibold mb-2'>     3. Obligations of Receiving Party: </div>
                            <p>
                                Receiving Party shall hold and maintain the Confidential
                                Information in strictest confidence for the sole and exclusive benefit of the Disclosing Party.
                                Receiving Party shall carefully restrict access to Confidential Information to employees,
                                contractors and third parties as is reasonably required and shall require those persons to sign
                                nondisclosure restrictions at least as protective as those in this Agreement. Receiving Party
                                shall not, without the prior written approval of Disclosing Party, use for Receiving Party's benefit,
                                publish, copy, or otherwise disclose to others, or permit the use by others for their benefit or to
                                the detriment of Disclosing Party, any Confidential Information. Receiving Party shall return to
                                Disclosing Party any and all records, notes, and other written, printed, or tangible materials in its
                                possession pertaining to Confidential Information immediately if Disclosing Party requests it in
                                writing.
                            </p>
                            <div className='popins_semibold mb-2'>      4. Time Periods.</div>
                            <p>
                                The nondisclosure provisions of this Agreement shall survive the termination
                                of this Agreement and Receiving Party's duty to hold Confidential Information in confidence
                                shall remain in effect until the Confidential Information no longer qualifies as a trade secret or
                                until Disclosing Party sends Receiving Party written notice releasing Receiving Party from this
                                Agreement, whichever occurs first
                            </p>
                            <div className='popins_semibold mb-2'>  5. Relationships:</div>
                            <p>
                                Nothing contained in this Agreement shall be deemed to constitute either
                                party a partner, joint venture or employee of the other party for any purpose.
                            </p>
                            <div className='popins_semibold mb-2'>     6. Severability:</div>
                            <p>
                                If a court finds any provision of this Agreement invalid or unenforceable, the
                                remainder of this Agreement shall be interpreted so as best to affect the intent of the parties.
                            </p>
                            <div className='popins_semibold mb-2'>    7. Integration:</div>
                            <p>
                                This Agreement expresses the complete understanding of the parties with
                                respect to the subject matter and supersedes all prior proposals, agreements, representations,
                                and understandings. This Agreement may not be amended except in writing signed by both
                                parties.</p>
                            <div className='popins_semibold mb-2'>  8. Waiver:</div>
                            <p>
                                The failure to exercise any right provided in this Agreement shall not be a waiver of
                                prior or subsequent rights.</p>
                            <div className='popins_semibold mb-2'>    9. Notice Of Immunity:</div>
                            <p>
                                Employee is provided notice that an individual shall not be held
                                criminally or civilly liable under any federal or state trade secret law for the disclosure of a trade
                                secret that is made (i) in confidence to a federal, state, or local government official, either
                                directly or indirectly, or to an attorney; and (ii) solely for the purpose of reporting or investigating
                                a suspected violation of law; or is made in a complaint or other document filed in a lawsuit or
                                other proceeding, if such filing is made under seal. An individual who files a lawsuit for
                                retaliation by an employer for reporting a suspected violation of law may disclose the trade
                                secret to the attorney of the individual and use the trade secret information in the court
                                proceeding, if the individual (i) files any document containing the trade secret under seal; and (ii)
                                does not disclose the trade secret, except pursuant to court order.
                            </p>
                            <div className='popins_semibold mb-2'>
                                <p className=' mb-3'>This Agreement and each party's obligations shall be binding on the representatives, assigns
                                    and successors of such party. Each party has signed this Agreement through its authorized
                                    representative.</p>
                                DISCLOSING PARTY
                            </div>
                        </div>)}

                        {userLangauge === ("he") && (<div className='popins_light fs_09 mt-5' style={{ lineHeight: "1.6", textAlign: "justify", minHeight: "20rem" }}>
                            <p className='fs_09'>
                                הסכם סודיות או ("הסכם") זה נכרת בתאריך <span className='underline popins_semibold'> {constractData && extractDateFromDateStr(constractData?.updated_timestamp)} </span> והוא על ידי ובין:
                            </p>
                            <p>
                                <span className='popins_semibold'> מידע על גילוי צד: </span> <span className='underline popins_semibold'> {senderName} </span> עם כתובת דואר של <span className='underline popins_semibold'> {senderEmail} </span> ('צד חושפני').
                            </p>
                            <p>
                                <span className='popins_semibold'> מידע שמקבל צד: </span> <span className='underline popins_semibold'>{receiverName}</span> עם כתובת למשלוח דואר
                                של <span className='underline popins_semibold'>{receiverEmail}</span> ("הצד המקבל").
                            </p>
                            <p>
                                לצורך מניעת חשיפה בלתי מורשית של מידע סודי כהגדרתו
                                לְהַלָן. הצדדים מסכימים להיכנס ליחסי סודיות בנוגע לגילוי
                                מידע קנייני וסודי מסוים ("מידע סודי").
                            </p>

                            <div className='popins_semibold mb-2'> l. הגדרה של מידע סודי: </div>
                            <p>
                                למטרות הסכם זה, "חסוי
                                מידע" יכלול כל מידע או חומר שיש או יכול להיות בעל ערך מסחרי או
                                שירות אחר בעסק שבו עוסק הצד החושפני. אם יש מידע סודי
                                טופס כתוב, הצד החושף יסמן או יטביע את החומרים במילה "סודי"
                                או אזהרה דומה. אם מידע סודי מועבר בעל פה, הצד החושף
                                יספק מיידית בכתב המציין שתקשורת בעל פה כזו מהווה חסוי
                                מֵידָע.
                            </p>
                            <div className='popins_semibold mb-2'> 2. אי הכללות ממידע סודי: </div>
                            <p>
                                התחייבויות הצד המקבל לפי זה
                                ההסכם אינו מתרחב למידע שהוא: (א) ידוע בציבור בזמן החשיפה או
                                לאחר מכן נודע בציבור שלא באשמת הצד המקבל; (ב) גילה או
                                נוצר על ידי הצד המקבל לפני החשיפה על ידי הצד החושף; (ג) למד על ידי ה
                                הצד המקבל באמצעים לגיטימיים שאינם מהצד החושפני או החושפני
                                נציגי המפלגה; או (ד) נחשף על ידי הצד המקבל עם הצד המגלה קודם
                                אישור בכתב.
                            </p>
                            <div className='popins_semibold mb-2'> 3. חובות הצד המקבל: </div>
                            <p>
                                הצד המקבל יחזיק ותשמור על הסודיות
                                מידע בסודיות מוחלטת לטובתו הבלעדית והבלעדית של הצד החושף.
                                הצד המקבל יגביל בזהירות את הגישה למידע סודי לעובדים,
                                קבלנים וצדדים שלישיים כנדרש באופן סביר וידרשו מאותם אנשים לחתום
                                הגבלות סודיות מגנות לפחות כמו אלו המופיעות בהסכם זה. הצד המקבל
                                לא ישתמש, ללא אישור מראש ובכתב של הצד החושף, לטובת הצד המקבל,
                                לפרסם, להעתיק או לחשוף לאחרים, או לאפשר שימוש על ידי אחרים לטובתם או למענם
                                לרעת הצד החושף, כל מידע סודי. הצד המקבל יחזור אל
                                הצד החושף כל רישומים, הערות וחומרים כתובים, מודפסים או מוחשיים אחרים המצויים בו
                                החזקה הנוגעת למידע סודי באופן מיידי אם הצד החושפני יבקש זאת
                                כְּתִיבָה.
                            </p>
                            <div className='popins_semibold mb-2'> 4. פרקי זמן.</div>
                            <p>
                                הוראות סודיות החשיפה של הסכם זה יישארו לאחר סיום הסיום
                                של הסכם זה וחובתו של הצד המקבל להחזיק מידע סודי בסודיות
                                יישאר בתוקף עד שהמידע הסודי לא יתאים עוד כסוד מסחרי או
                                עד שהצד המגלה ישלח לצד המקבל הודעה בכתב המשחררת את הצד המקבל מכך
                                הסכם, המוקדם מביניהם
                            </p>
                            <div className='popins_semibold mb-2'> 5. מערכות יחסים:</div>
                            <p>
                                שום דבר הכלול בהסכם זה לא ייחשב ככזה
                                צד שותף, מיזם משותף או עובד של הצד השני לכל מטרה.
                            </p>
                            <div className='popins_semibold mb-2'> 6. הפרדה:</div>
                            <p>
                                אם בית משפט ימצא תנאי כלשהו בהסכם זה בלתי חוקי או בלתי ניתן לאכיפה, ה
                                שאר הסכם זה יפורש כך שישפיע בצורה הטובה ביותר על כוונת הצדדים.
                            </p>
                            <div className='popins_semibold mb-2'> 7. אינטגרציה:</div>
                            <p>
                                הסכם זה מבטא את ההבנה המלאה של הצדדים עם
                                כבוד לנושא ומחליף כל הצעות, הסכמים, ייצוגים קודמים,
                                והבנות. אין לתקן הסכם זה אלא בכתב חתום על ידי שניהם
                                מסיבות.</p>
                            <div className='popins_semibold mb-2'> 8. ויתור:</div>
                            <p>
                                אי מימוש זכות כלשהי המופיעה בהסכם זה לא יהווה ויתור על
                                זכויות קודמות או עוקבות.</p>
                            <div className='popins_semibold mb-2'> 9. הודעה על חסינות:</div>
                            <p>
                                לעובד ניתנת הודעה כי אדם לא יוחזק
                                אחריות פלילית או אזרחית על פי כל חוק סודות מסחריים פדרליים או ממלכתיים בגין חשיפת מסחר
                                סוד שנעשה (i) בסודיות לפקיד ממשל פדרלי, מדינתי או מקומי
                                במישרין או בעקיפין, או לעורך דין; וכן (ii) אך ורק למטרת דיווח או חקירה
                                חשד להפרת חוק; או נעשית בתלונה או במסמך אחר שהוגש בתביעה או
                                הליך אחר, אם הגשה כזו נעשית בחתימה. אדם המגיש תביעה עבורו
                                תגמול מצד מעסיק בגין דיווח על חשד להפרת חוק עשויה לחשוף את המקצוע
                                סוד לעורך הדין של הפרט ולהשתמש במידע הסודי המסחרי בבית המשפט
                                בהליך, אם היחיד (א) מגיש כל מסמך המכיל את הסוד המסחרי תחת חותמת; ו-(ii)
                                אינו חושף את הסוד המסחרי, אלא על פי צו בית משפט.
                            </p>
                            <div className='popins_semibold mb-2'>
                                <p className=' mb-3'>הסכם זה וההתחייבויות של כל צד יחייבו את הנציגים, המקצה
                                    וממשיכיה של מפלגה כזו. כל צד חתם על הסכם זה באמצעות המורשה שלו
                                    נציג.</p>
                                מסיבת גילוי נאות
                            </div>
                        </div>)}

                        <div className='d-flex gap-4 justify-content-between' style={{ alignItems: "stretch" }} >
                            {userData?.user_type === "business" ?
                                (<div className=''>
                                    <div onClick={handleShow} style={{ cursor: "pointer" }}>
                                        <div className='display_flex2'>  <img src={(selectedFile ? selectedFile : whiteImage)} alt='' className=' signature_img' /></div>

                                        <hr className='mx-2 my-1' style={{ opacity: "1" }}></hr>
                                        <h6 className='popins_semibold text-center fs_08 pt-1'>{t("Business_Owner_Signatures")}</h6>
                                    </div>
                                </div>) :
                                (<div className=''>
                                    <div>
                                        <div className='display_flex2'>  <img src={whiteImage} alt='' className=' signature_img' /></div>

                                        <hr className='mx-2 my-1' style={{ opacity: "1" }}></hr>
                                        <h6 className='popins_semibold text-center fs_08 pt-1'>{t("Business_Owner_Signatures")}</h6>
                                    </div>
                                </div>)}
                            {userData?.user_type === "investor" ?
                                (<div className='' onClick={handleShow} style={{ cursor: "pointer" }}>
                                    <div className='display_flex2'>  <img src={(selectedFile ? selectedFile : whiteImage)} alt='' className=' signature_img' /></div>
                                    <hr className='mx-2 my-1' style={{ opacity: "1" }}></hr>
                                    <h6 className='popins_semibold text-center fs_08 pt-1'>{t("Investor_Signatures")}</h6>
                                </div>) :
                                (<div className=''>
                                    <div className='display_flex2'>  <img src={whiteImage} alt='' className=' signature_img' /></div>
                                    <hr className='mx-2 my-1' style={{ opacity: "1" }}></hr>
                                    <h6 className='popins_semibold text-center fs_08 pt-1'>{t("Investor_Signatures")}</h6>
                                </div>)}
                        </div>
                    </Container>
                    <Container>
                        <div className='display_flex2 gap-3 my-5'>
                            <button disabled={isLoading} type='button' onClick={userData?.user_type === "investor" ? checkPayement : creatContract} className='btn1 btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2'>
                                {
                                    isLoading ?
                                        <Spinner animation="border" variant="light" size="sm" />
                                        : t("SEND_OWNER")
                                }
                            </button>
                        </div>
                    </Container>
                </section>
            </Container>
        </>
    )
}

export default ViewInitialContract