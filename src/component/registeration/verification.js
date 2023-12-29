/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap'
import { ArrowLeft, Plus, User } from 'react-feather'
import { apiRequest, apiRequestFile } from '../api/apiRequest';
import NotifySnackbar from '../snackbar/notiySnackbar';
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next';


const Verification = ({ setProfileImage, onNextStep, onPrevStep }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { t } = useTranslation()
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const fileUpload = async (file) => {
        // setProfileImage("image1")/
        setIsLoading(true)
        await apiRequestFile(file)
            .then((result) => {
                if (result.result) {
                    setIsLoading(false)
                    setProfileImage(result.file_name)
                    // toast.success(result.message)
                } else {
                    setIsLoading(false)
                    setMessage(result.message)
                    setMessageType('error')
                    setOpen(true)
                }
            }).catch((err) => {
                setMessage(err.message)
                setIsLoading(false)
                setMessageType('error')
                setOpen(true)
                console.log(err)
            });
    }
    // Event handler to handle file selection
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        fileUpload(file)
        if (file) {
            // Create a URL for the selected image
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))

    const updateSteps = async () => {
        setIsLoading(true)
        const body = new FormData()
        body.append('table', 'users')
        body.append('type', 'update_data')
        body.append('id', userData?.user_id)
        // body.append('platform', 3)
        await apiRequest({ body })
            .then((result) => {
                setIsLoading(false)
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
            });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        // onNextStep()
        if (selectedImage) {
            // await updateSteps()
            onNextStep()
        }
        else {
            toast.warn('please upload image')
        }
    }


    return (
        <>
            <NotifySnackbar handleClose={handleClose} open={open} message={message} messageType={messageType} />
            <Container fluid="xxl" className="px-0 h-100" >
                <section className='px-sm-3 d-flex align-items-center h-100 justify-content-center'  >
                    <div className='login_card' >
                        <div className='me-auto' onClick={onPrevStep}> <ArrowLeft className='leftArrow' /></div>
                        <div>
                            <div className='heading text-center'>
                                {t("USER_PICTURE")}
                            </div>
                            <div className='fs_07 text-center'>
                                {t("PLEASE_UPLOAD")}
                            </div>
                        </div>
                        <Form className='w-100 mt-4' onSubmit={handleSubmit}>
                            <Form.Group>
                                <div className='d-flex flex-column gap-1 register'>
                                    <Form.Label className='ps-2'>{t("ADD_PHOTO")}</Form.Label>
                                    <div className='profile_image mx-auto'>
                                        {selectedImage ? (<img src={selectedImage} alt="Selected" className='display_flex2' />) :
                                            (<div>
                                                <div className='position-absolute top-0 w-100 bottom-0'>
                                                    <div className='display_flex2 h-100 '>
                                                        <div className='user_image'>
                                                            <User className='user' />
                                                            <div className='plus display_flex2'>
                                                                <Plus style={{ width: "1.2rem", height: "1.2rem" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)}
                                        <Form.Control type='file' className='upload' accept="image/*"  // Restrict to image files
                                            onChange={handleFileChange} placeholder='Enter Code' />
                                    </div>
                                </div>
                            </Form.Group>
                            <div className='my-4'>
                                <div className='d-flex'>
                                    <button disabled={isLoading ? true : false} type='submit' className='btn1 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
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

export default Verification