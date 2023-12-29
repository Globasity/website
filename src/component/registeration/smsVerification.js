/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { apiRequest } from '../api/apiRequest';
import { handleLogin, handleUserData } from '../redux/loginForm';
import { useDispatch } from 'react-redux';
import { ArrowLeft } from 'react-feather'
import NotifySnackbar from '../snackbar/notiySnackbar';
import { useTranslation } from 'react-i18next';
const SMSVerification = ({ onNextStep, verifyEmail, userType, forgotPassword, onPrevStep, onSubmitData }) => {
    const [inputValue, setInputValue] = useState('');
    const userData = JSON.parse(window.localStorage.getItem('encrypted_data_of_GB'))
    const userRecover = JSON.parse(window.localStorage.getItem('globasity_reset_password'))
    const [isLoading, setIsLoading] = useState(false);
    const {t} =useTranslation()
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const navigate = useNavigate()
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };
    const decodeCode = (encodedString) => {
        const encodedChars = encodedString.split(',');
        const decodedStr = encodedChars.map((code) => String.fromCharCode(parseInt(code, 10))).join('');
        const originalCode = parseInt(decodedStr.split('').reverse().join(''), 10);
        return originalCode;
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        const code2 = userData ? decodeCode(userData) : ""
        if (forgotPassword === true) {
            if (userRecover.code === parseInt(inputValue)) {
                onNextStep()
            } else {
                setMessage('Code not match')
                setMessageType('error')
                setOpen(true)
            }
        } else
            if (parseInt(code2) === parseInt(inputValue)) {
                setIsLoading(true)
                await onSubmitData()
                window.localStorage.removeItem('encrypted_data_of_GB')
                setIsLoading(false)
                onNextStep()
            }
            else {
                setMessage('Code not match')
                setMessageType('error')
                setOpen(true)
            }
    };

    return (
        <>
            <NotifySnackbar handleClose={handleClose} open={open} message={message} messageType={messageType} />
            <Container fluid="xxl" className="px-0" >
                <section className='px-sm-3 d-flex align-items-center justify-content-center'  >
                    <div className='login_card' >
                        <div className='me-auto' onClick={onPrevStep}> <ArrowLeft className='leftArrow' /></div>
                        <div>
                            <div className='heading text-center'>
                                {t("code_email")}
                            </div>
                            <div className='fs_07 text-center'>{t("send_code2")}</div>
                            <div className='fs_07 text-center'>{verifyEmail}</div>
                        </div>

                        <Form className='w-100 mt-4' onSubmit={handleSubmit}>
                            <div className='d-flex flex-column contact_inputs gap-1 register'>
                                <Form.Group controlId='code'>
                                    <Form.Label className='ps-2'>{t("enter_code")}</Form.Label>
                                    <Form.Control type='number' placeholder={t("enter_code")} value={inputValue}
                                        onChange={handleInputChange} style={{ fontSize: "14px" }} />
                                </Form.Group>
                            </div>
                            <div className='mb-4'>
                                <div className='d-flex'>
                                    <button disabled={isLoading ? true : false} type='submit' className='btn1 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
                                        {
                                            isLoading ?
                                                <Spinner animation="border" variant="light" size="sm" />
                                                : t("Approval")
                                        }
                                    </button>
                                </div>
                            </div>
                        </Form>
                    </div>

                </section>
            </Container>
        </>
    )
}

export default SMSVerification