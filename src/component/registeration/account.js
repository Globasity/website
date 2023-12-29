/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { Container, Form, Spinner } from 'react-bootstrap'
import { apiRequest, apiRequestEmail, apiRequestFile } from '../api/apiRequest'
import { RxCrossCircled } from 'react-icons/rx'
import { AiOutlineCheckCircle } from 'react-icons/ai'
import NotifySnackbar from '../snackbar/notiySnackbar';
import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'
import { toast } from 'react-toastify'
import { ArrowLeft, Edit, Edit2, Eye, EyeOff, Plus, User } from 'react-feather'
import { useDispatch } from 'react-redux'
import { handleLogin, handleUserData, setLogin } from '../redux/loginForm'
import { useEffect } from 'react'
import SMSVerification from './smsVerification'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const UserAccount = () => {
    const [email, setEmail] = useState('')
    const [userForm, setUserForm] = useState(false)
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const dispatch = useDispatch()
    const [selectedImage, setSelectedImage] = useState(null);
    const [profileImage, setProfileImage] = useState(null);
    // const [formData, setformData] = useState();
    const [messageType, setMessageType] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [phoneNumber, setPhoneNumber] = useState('');
    const { t } = useTranslation()
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const handlePhoneInputChange = (value) => {
        setPhoneNumber(value);
    };
    const [formData, setFormData] = useState({
        image: "",
        url: "",
        name: '',
        address: '',
        gender: '',
        currency: '',
    });

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [id]: value,
        }));
    };
    const navigate = useNavigate()
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
    const handleClose = (reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };
    const getUserData = async () => {
        const body = new FormData()
        body.append('type', 'get_data')
        body.append('table_name', 'users')
        body.append('id', userData?.user_id)
        await apiRequest({ body })
            .then((result) => {
                console.log(result)
                const data = result.data[0]
                if (data) {
                    setFormData({
                        image: data.image,
                        url: data.url,
                        name: data.name,
                        address: data.address,
                        gender: data.gender,
                        currency: data.currency_type,
                    });
                    setEmail(data.email)
                    setPhoneNumber(data.phone)
                    if (userForm === true) {
                        const data2 = {
                            email: data?.email,
                            is_active: data?.is_active,
                            phone: data?.phone,
                            result: true,
                            url: data?.url,
                            user_id: data?.id,
                            user_image: data?.image,
                            user_name: data?.name,
                            user_type: data?.user_type,
                        }
                        dispatch(handleLogin(data2));
                    }
                }
            }).catch((err) => {
                console.log(err)
            });

    }
    const handleSubmit = (e) => {
        e.preventDefault();
        // Access the form data in the 'formData' object
        console.log(formData);
        setIsLoading(true)
        const body = new FormData()
        body.append('type', 'update_data')
        body.append('table_name', 'users')
        body.append('id', userData?.user_id)
        body.append('image', profileImage ? profileImage : formData.image)
        body.append('phone', phoneNumber)
        body.append('name', formData.name)
        body.append('gender', formData.gender)
        body.append('address', formData.address)
        body.append('currency_type', formData.currency)
        console.log(formData)
        apiRequest({ body })
            .then(async (result) => {
                setIsLoading(false)
                if (result.result) {
                    setMessage(result.message)
                    setMessageType('success')
                    setOpen(true)
                    setUserForm(false)
                    await getUserData()
                    navigate('/my-profile')
                } else {
                    setMessage(result.message)
                    setMessageType('error')
                    setOpen(true)
                }
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
            });
        // You can now send the form data to your backend or perform any other actions
    };
    useEffect(() => {
        getUserData()
    }, []);
    return (
        <div className='py-5' style={{ backgroundColor: "#F3F7F5", minHeight: "90vh" }}>
            <NotifySnackbar handleClose={handleClose} open={open} message={message} messageType={messageType} />
            <Container fluid="xxl" className="px-0  w-100" >
                <section className='px-sm-3 d-flex align-items-center justify-content-center'  >
                    <div className='login_card position-relative    ' >
                        <div className='d-flex justify-content-between align-items-center w-100'>
                            <div className='' onClick={() => navigate(-1)}> <ArrowLeft className='leftArrow' /></div>
                            {userForm === false ?
                                <div className='popins_medium fs_09 btn_primary rounded_3 py-2 btn_padd2' onClick={() => setUserForm(!userForm)} style={{ cursor: "pointer" }} > Edit </div> :
                                <div className='popins_medium fs_09 btn_primary bg-danger rounded_3 py-2 btn_padd2' onClick={() => setUserForm(!userForm)} style={{ cursor: "pointer" }} > Cancel </div>}
                        </div>
                        <div className=''>
                            <div className='heading text-center'>
                                {t("HEAD_P_INFO")}
                            </div>
                            <div className='fs_07 text-center'>{t("DESC_P_INFO")}</div>
                        </div>
                        <Form className='w-100 mt-3' onSubmit={handleSubmit}>
                            <div className='d-flex flex-column contact_inputs gap-1 register'>
                                <Form.Group>
                                    <div className='d-flex flex-column gap-1 register'>
                                        <Form.Label className='ps-2'>{t("ADD_PHOTO")}</Form.Label>
                                        <div className='profile_image mx-auto'>
                                            {(selectedImage || formData.image !== '') ? (<img src={selectedImage ? selectedImage : formData.url + formData.image} alt="Selected" className='display_flex2' />) :
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
                                            <Form.Control type='file' disabled={userForm === false ? true : false} className='upload' accept="image/*"  // Restrict to image files
                                                onChange={handleFileChange} placeholder='Enter Code' />
                                        </div>
                                    </div>
                                </Form.Group>
                                <Form.Group controlId='name' >
                                    <Form.Label className=''>{t("Name")}</Form.Label>
                                    <Form.Control required type='text' value={formData.name}
                                        onChange={handleChange} disabled={userForm === false ? true : false} placeholder={t("Name")} style={{ fontSize: "14px" }} />
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
                                            disabled={userForm === false ? true : false}
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
                                            defaultValue={email}
                                            style={{ fontSize: "14px" }} disabled />
                                    </div>
                                </Form.Group>
                                <Form.Group controlId='address' >
                                    <Form.Label className=''>{t("Address")}</Form.Label>
                                    <Form.Control required value={formData.address}
                                        onChange={handleChange} type='text' disabled={userForm === false ? true : false} placeholder={t("Address")} style={{ fontSize: "14px" }} />
                                </Form.Group>
                                <Form.Group controlId='gender'>
                                    <Form.Label className=''>
                                        {t("TITLE_GENDER")}
                                    </Form.Label>
                                    <Form.Select required value={formData.gender} disabled={userForm === false ? true : false}
                                        onChange={handleChange} >
                                        <option value="">{t("PLACE_GENDER")}</option>
                                        <option value="male">{t("MALE")}</option>
                                        <option value="female">{t("FEMALE")}</option>
                                        <option value="other">{t("OTHER")}</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group controlId='currency'>
                                    <Form.Label className='ps-2 mb-2'>{t("CURRENCY_TYPE")}</Form.Label>
                                    <Form.Select required value={formData.currency} disabled={userForm === false ? true : false}
                                        onChange={handleChange}>
                                        <option value="">{t("PLH_CURRENCY_TYPE")}</option>
                                        <option value="$usd">$USD</option>
                                        <option value="₪shekel">₪Shekel</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className='my-3'>
                                    <div className='d-flex gap-3'>
                                        <button disabled={userForm === false ? true : (isLoading ? true : false)} type='submit' className='btn1 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
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
            </Container>
        </div>
    )
}
export default UserAccount