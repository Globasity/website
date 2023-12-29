/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import { ArrowLeft, Image, Plus, User } from 'react-feather';
import { apiRequest, apiRequestFile } from '../api/apiRequest';
import { toast } from 'react-toastify'
import NotifySnackbar from '../snackbar/notiySnackbar';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/loginForm';
import { useTranslation } from 'react-i18next';


const VerfyById = ({ setId_Number, setId_back, setId_front, onNextStep, onPrevStep, userType, profileImage }) => {
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [fileName1, setFileName1] = useState('');
    const [fileName2, setFileName2] = useState('');
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isLoading2, setIsLoading2] = useState(false);
    const [isLoading3, setIsLoading3] = useState(false);
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { t } = useTranslation()
    const fileUpload = async (file, setImageName) => {
        await apiRequestFile(file)
            .then((result) => {
                if (result.result) {
                    setImageName(result.file_name)
                    // toast.success(result.message)
                } else {
                    setMessage(result.message)
                    setMessageType('error')
                    setOpen(true)
                }
            }).catch((err) => {
                setMessage(err.message)
                setMessageType('error')
                setOpen(true)
                console.log(err)
            });
    }
    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        setIsLoading2(true)
        await fileUpload(file, setFileName1)
        setIsLoading2(false)
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };

    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const handleFileChange2 = async (event) => {
        const file = event.target.files[0];
        setIsLoading3(true)
        await fileUpload(file, setFileName2)
        setIsLoading3(false)
        if (file) {
            // Create a URL for the selected image
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage2(imageUrl);
        }
    };

    const updateSteps = async () => {
        setIsLoading(true)
        const body = new FormData()
        body.append('table', 'users')
        body.append('type', 'update_data')
        body.append('id', userData?.user_id)
        body.append('platform', 4)
        await apiRequest({ body })
            .then((result) => {
                setIsLoading(false)
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
            });
    }
    const formSubmit = (e) => {
        e.preventDefault();
        const form = e.target;
        const idNum = form.elements.idNum.value;
        if (fileName1 && fileName2 && idNum) {
            if (userType === "business") {
                setIsLoading(true)
                const formData = {
                    image: profileImage,
                    id_front: fileName1,
                    id_back: fileName2,
                    id_number: idNum,
                }
                const body = new FormData()
                body.append('table_name', 'users')
                body.append('type', 'update_data')
                body.append('id', userData?.user_id)
                body.append('image', formData.image)
                body.append('id_front', formData.id_front)
                body.append('id_back', formData.id_back)
                body.append('id_number', formData.id_number)
                apiRequest({ body })
                    .then((result) => {
                        if (result.result) {
                            if (userData?.user_type === "business") {
                                onNextStep()
                                // updateSteps()
                                // navigate('/create-business')
                            } else {
                                // toast.success(result.message)
                                setIsLoading(false)
                                if (userData.is_active === "true") {
                                    dispatch(setLogin(true));
                                    // navigate('/create-business')
                                    // updateSteps()
                                } else {

                                }
                            }

                        } else {
                            setIsLoading(false)
                        }
                    }).catch((err) => {
                        setIsLoading(false)
                        console.log(err)
                    });
            } else {
                setId_Number(idNum)
                setId_front(fileName1)
                setId_back(fileName2)
                onNextStep()
            }
        } else {
            toast.error('Please fill all feilds!')
        }
    }
    return (
        <>
            <NotifySnackbar handleClose={handleClose} open={open} message={message} messageType={messageType} />
            <Container fluid="xxl" className="px-0" >
                <section className='px-sm-3 d-flex align-items-center justify-content-center'  >
                    <div className='login_card' >
                        <div className='me-auto' onClick={onPrevStep}> <ArrowLeft className='leftArrow' /></div>
                        <div>
                            <div className='heading text-center'>
                                {t("HEAD_IDENTITY")}
                            </div>
                            <div className='fs_07 text-center'>
                                {t("DETAIL_IDENTITY")}
                            </div>
                        </div>
                        <Form className='w-100 mt-4' onSubmit={formSubmit}>
                            <div className='d-flex flex-column gap-1 register '>
                                <Form.Label className='ps-2 fs_11 popins_medium'>{t("DESC_IDENTITY")}</Form.Label>
                                <Form.Group className='verify_image'>
                                    <Form.Label className='ps-2 mt-3 mb-2'>{t("FRONT")}</Form.Label>
                                    <div className='identity_image mx-auto'>
                                        {isLoading2 ?
                                            (<div className='display_flex2 h-100'>
                                                <Spinner animation="border" variant="black" size="lg" />
                                            </div>) :
                                            (selectedImage ? (<img src={selectedImage} alt="Selected" className='display_flex2' />) :
                                                (<div>
                                                    <div className='position-absolute top-0 w-100 bottom-0'>
                                                        <div className='display_flex2 h-100 '>
                                                            <div className='id_image'>
                                                                <Image className='user' />
                                                                <div className='plus display_flex2'>
                                                                    <Plus style={{ width: "1.2rem", height: "1.2rem" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>))
                                        }
                                        <Form.Control type='file' disabled={isLoading2} className='upload' accept="image/*"  // Restrict to image files
                                            onChange={handleFileChange} placeholder='Enter Code' />
                                    </div>
                                </Form.Group>
                                <Form.Group className='verify_image'>
                                    <Form.Label className='ps-2 mt-3 mb-2'>{t("BACK")}</Form.Label>
                                    <div className='identity_image mx-auto'>

                                        {isLoading3 ?
                                            (<div className='display_flex2 h-100'>
                                                <Spinner animation="border" variant="black" size="lg" />
                                            </div>) :
                                            (selectedImage2 ? (<img src={selectedImage2} alt="Selected" className='display_flex2' />) :
                                                (<div>
                                                    <div className='position-absolute top-0 w-100 bottom-0'>
                                                        <div className='display_flex2 h-100 '>
                                                            <div className='id_image'>
                                                                <Image className='user' />
                                                                <div className='plus display_flex2'>
                                                                    <Plus style={{ width: "1.2rem", height: "1.2rem" }} />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>))}
                                        <Form.Control disabled={isLoading3} type='file' className='upload' accept="image/*"  // Restrict to image files
                                            onChange={handleFileChange2} placeholder='Enter Code' />
                                    </div>
                                </Form.Group>
                                <div className='d-flex flex-column contact_inputs gap-1 register'>
                                    <Form.Group controlId='idNum'>
                                        <Form.Label className='ps-2 mt-4 mb-2'>{t("BTN_ID_NUMBER")}</Form.Label>
                                        <Form.Control type='text' placeholder={t("PLACE_ID_NUMBER")} style={{ fontSize: "14px" }} />
                                    </Form.Group>
                                </div>
                            </div>
                            <div className='my-3'>
                                <div className='d-flex'>
                                    <button type='submit' disabled={isLoading || isLoading3 || isLoading2} className='btn1 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
                                        {
                                            isLoading ?
                                                <Spinner animation="border" variant="light" size="sm" />
                                                : t("BTN_NEXT")
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

export default VerfyById