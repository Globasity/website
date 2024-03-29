/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Container, Form, Spinner } from 'react-bootstrap'
import { apiRequest, apiRequestEmail } from '../api/apiRequest'
import { RxCrossCircled } from 'react-icons/rx'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import NotifySnackbar from '../snackbar/notiySnackbar';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast } from 'react-toastify'
import { ArrowLeft, Eye, EyeOff } from 'react-feather'
import { useDispatch } from 'react-redux'
import { handleLogin, handleUserData, setLogin } from '../redux/loginForm'
import { useEffect } from 'react'
import SMSVerification from './smsVerification'
import { useTranslation } from 'react-i18next'

const UserInformation = ({ onNextStep, onPrevStep, accountType, setVerifyEmail, userType }) => {
    const [email, setEmail] = useState('')
    const [emailCheck, setEmailCheck] = useState(false)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setformData] = useState();
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [next, setNext] = useState(0);
    const [endcod, setEndcod] = useState();
    const [phoneNumber, setPhoneNumber] = useState('');
    const dispatch = useDispatch();
    const { t } = useTranslation()
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [password2, setPassword2] = useState('');
    const [showPassword2, setShowPassword2] = useState(false);
    const handleTogglePassword = () => {
        setShowPassword(!showPassword);
    };
    const handleTogglePassword2 = () => {
        setShowPassword2(!showPassword2);
    };
    const handlePhoneInputChange = (value) => {
        setPhoneNumber(value);
    };
    const handleNextStep = () => {
        setNext(next + 1);
    };
    const handlePrevStep = () => {
        setNext(next - 1);
    };

    const encodeCode = (code) => {
        const strCode = String(code);
        const reversedStr = strCode.split('').reverse().join('');
        const encodedChars = reversedStr.split('').map((char) => char.charCodeAt(0));
        const encodedString = encodedChars.join(',');
        return encodedString;
    };
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleChangeEmail = async (e) => {
        const data = e.target.value
        setEmail(data);
        setVerifyEmail(data)
        await checkEmail(data)
    }
    const checkEmail = async (email) => {
        const body = new FormData()
        body.append('type', 'check_email')
        body.append('email', email)
        await apiRequest({ body })
            .then((result) => {
                if (result.result) {
                    setEmailCheck(true)
                } else {
                    setEmailCheck(false)
                    setMessage(result.message)
                    setMessageType('error')
                    setOpen(true)
                }
            }).catch((err) => {
                setEmailCheck(false)
                console.log(err)
            });
    }
    const handleSubmitUserData = (e) => {
        e.preventDefault();
        const form = e.target;
        const firstName = form.elements.firstName.value;
        const lastName = form.elements.lastName.value;
        const passwords = password;
        // const gender = form.elements.gender.value;
        const conPassword = password2;
        // const address = form.elements.address.value;
        // const currency = form.elements.currency.value;
        const formData1 = {
            phone: phoneNumber,
            name: `${firstName} ${lastName}`,
            email: email,
            password: passwords,
            // gender: gender,
            userType: userType,
            accountType: accountType,
            // currency_type: currency,
            // address: address
        }
        setformData(formData1)
        setIsLoading(true)
        if (emailCheck) {
            if (passwords === conPassword) {

                const body = new FormData()
                body.append('type', 'email_send')
                body.append('email', email)
                apiRequestEmail({ body })
                    .then((result) => {
                        if (result.result) {
                            handleNextStep()
                            const code = encodeCode(result.code)
                            window.localStorage.setItem('encrypted_data_of_GB', JSON.stringify(result))
                            // dispatch(handleLogin(result));
                            // dispatch(handleUserData(Math.random()));
                            setIsLoading(false)
                        } else {
                            setIsLoading(false)
                            setMessage(result.message)
                            setMessageType('error')
                            setOpen(true)
                        }
                    }).catch((err) => {
                        setIsLoading(false)
                        console.log(err)
                    });
            } else {
                toast.error('Password Not match')
                setIsLoading(false)
            }
        } else {
            setMessage('This Email is already register! please try another email')
            setMessageType('error')
            setOpen(true)
            setIsLoading(false)
        }
    }
    const handleSubmit = () => {
        // e.preventDefault(); 
        //  Language_removed if (!localStorage.getItem('globasity_language')) {
        //     const lan = 'en';
        //     localStorage.setItem('globasity_language', JSON.stringify(lan));
        // }
        setIsLoading(true)
        const body = new FormData()
        body.append('type', 'register')
        body.append('phone', formData.phone)
        body.append('name', formData.name)
        body.append('email', formData.email)
        body.append('password', formData.password)
        // body.append('gender', formData.gender)
        // body.append('address', formData.address)
        body.append('user_type', formData.userType)
        body.append('account_type', formData.accountType)
        // body.append('currency_type', formData.currency_type)
        // body.append('platform', 2)
        apiRequest({ body })
            .then((result) => {
                if (result.result) {
                    onNextStep()
                    dispatch(handleLogin(result));
                    dispatch(handleUserData(Math.random()));
                    setIsLoading(false)
                } else {
                    setIsLoading(false)
                    setMessage(result.message)
                    setMessageType('error')
                    setOpen(true)
                }
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
            });

    }
    useEffect(() => {
        if (password === '') {
            setShowPassword(false)
        }
        if (password2 === '') {
            setShowPassword2(false)
        }
    }, [password, password2]);
    return (
        <>
            <NotifySnackbar handleClose={handleClose} open={open} message={message} messageType={messageType} />
            {next === 0 && (
                <Container fluid="xxl" className="px-0 w-100" >
                    <section className='px-sm-3 d-flex align-items-center justify-content-center'  >
                        <div className='login_card position-relative    ' >
                            <div className='me-auto' onClick={onPrevStep}> <ArrowLeft className='leftArrow' /></div>
                            <div className=''>
                                <div className='heading text-center'>
                                    {t("HEAD_P_INFO")}
                                </div>
                                <div className='fs_07 text-center'>{t("DESC_P_INFO")}</div>
                            </div>
                            <Form className='w-100 mt-3' onSubmit={handleSubmitUserData}>
                                <div className='d-flex flex-column contact_inputs gap-1 register'>
                                    <Form.Group controlId='firstName' >
                                        <Form.Label className=''>{t("TITLE_FIRST_NAME")}</Form.Label>
                                        <Form.Control required type='text' placeholder={t("PLACE_FIRST_NAME")} style={{ fontSize: "14px" }} />
                                    </Form.Group>
                                    <Form.Group controlId='lastName' >
                                        <Form.Label className=''>{t("TITLE_LAST_NAME")}</Form.Label>
                                        <Form.Control required type='text' placeholder={t("PLACE_LAST_NAME")} style={{ fontSize: "14px" }} />
                                    </Form.Group>
                                    <Form.Group controlId='phone'>
                                        <Form.Label className=''>{t("HEAD_ENTER_PHONE")}</Form.Label>
                                        <div className='contact_inputs register mb-3'>
                                            <PhoneInput
                                                required={true}
                                                country={'il'}
                                                enableAreaCodes={true}
                                                enableSearch={true}
                                                disableSearchIcon={true}
                                                value={phoneNumber}
                                                onChange={handlePhoneInputChange}
                                                containerClass=" rounded-4"
                                                inputClass='w-100'
                                            />
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId='email' className=''>
                                        <Form.Label className=''>{t("TITLE_EMAIL")}</Form.Label>
                                        <div className='position-relative'>
                                            <Form.Control required type='email' placeholder={t("PLACE_EMAIL")}
                                                value={email}
                                                onChange={handleChangeEmail}
                                                style={{ fontSize: "14px" }} />
                                            <div className='position-absolute d-flex align-items-center' style={{ right: 0, top: 0, bottom: 0, backgroundColor: "#f9f9f9", padding: "0.5rem 1rem", borderRadius: "7px" }} >
                                                {
                                                    email &&
                                                    (!emailCheck ? <RxCrossCircled className='text-danger fs-4' /> : <AiOutlineCheckCircle className='text-success fs-4 ' />)
                                                }
                                            </div>
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId='password' >
                                        <Form.Label className=''>{t("TITLE_PASS")}</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control
                                                required
                                                value={password}
                                                onChange={(e) => setPassword(e.target.value)}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder={t("PLACE_PASS")}
                                                style={{ fontSize: "14px" }}
                                            />
                                            {password &&
                                                <div className="position-absolute eyeOff">
                                                    {showPassword && <EyeOff className="eyeShow" onClick={handleTogglePassword} />}
                                                    {!showPassword && <Eye className="eyeShow" onClick={handleTogglePassword} />}
                                                </div>}
                                        </div>
                                    </Form.Group>
                                    <Form.Group controlId='conPassword' >
                                        <Form.Label className=''>{t("CON_PASS")}</Form.Label>
                                        <div className="position-relative">
                                            <Form.Control required value={password2}
                                                onChange={(e) => setPassword2(e.target.value)} type={showPassword2 ? 'text' : 'password'} placeholder={t("CON_PASS")} style={{ fontSize: "14px" }} />
                                            {password2 &&
                                                <div className="position-absolute eyeOff">
                                                    {showPassword2 && <EyeOff className="eyeShow" onClick={handleTogglePassword2} />}
                                                    {!showPassword2 && <Eye className="eyeShow" onClick={handleTogglePassword2} />}
                                                </div>}
                                        </div>
                                    </Form.Group>
                                    {/* <Form.Group controlId='address' >
                                        <Form.Label className=''>{t("Address")}</Form.Label>
                                        <Form.Control required type='text' placeholder={t("Address")} style={{ fontSize: "14px" }} />
                                    </Form.Group>
                                    <Form.Group controlId='gender'>
                                        <Form.Label className=''>
                                            {t("TITLE_GENDER")}
                                        </Form.Label>
                                        <Form.Select required >
                                            <option value="">{t("PLACE_GENDER")}</option>
                                            <option value="male">{t("MALE")}</option>
                                            <option value="female">{t("FEMALE")}</option>
                                            <option value="other">{t("OTHER")}</option>
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group controlId='currency'>
                                        <Form.Label className='ps-2 mb-2'>{t("CURRENCY_TYPE")}</Form.Label>
                                        <Form.Select required>
                                            <option value="">{t("PLH_CURRENCY_TYPE")}</option>
                                            <option value="$usd">$USD</option>
                                            <option value="₪shekel">₪Shekel</option>
                                        </Form.Select>
                                    </Form.Group> */}
                                    <Form.Group className='my-3'>
                                        <div className='d-flex gap-3'>
                                            <button disabled={isLoading ? true : false} type='submit' className='btn1 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
                                                {
                                                    isLoading ?
                                                        <Spinner animation="border" variant="light" size="sm" />
                                                        : t("BTN_SUBMIT")
                                                }
                                            </button>
                                        </div>
                                    </Form.Group>
                                </div>
                            </Form>
                        </div>

                    </section>
                </Container>)}
            {next === 1 && (<SMSVerification forgotPassword={false} onSubmitData={handleSubmit} verifyEmail={email} onNextStep={onNextStep} onPrevStep={handlePrevStep} />)}
        </>
    )
}
export default UserInformation