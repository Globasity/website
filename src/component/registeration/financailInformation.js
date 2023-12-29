/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react';
import { Container, Form } from 'react-bootstrap';
import { File, Image, Paperclip, Plus, User } from 'react-feather';

const FinancialInformation = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedImage2, setSelectedImage2] = useState(null);
    const [selectedImage3, setSelectedImage3] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage(imageUrl);
        }
    };
    const handleFileChange2 = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage2(imageUrl);
        }
    };
    const handleFileChange3 = (event) => {
        const file = event.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setSelectedImage3(imageUrl);
        }
    };
    return (
        <>
            <Container fluid="xxl" className="px-0" >
                <section className='px-3 d-flex align-items-center justify-content-center'  >
                    <div className='login_card' >
                        <div>
                            <div className='heading text-center'>
                                Create Business
                            </div>
                            <div className='fs_07 text-center'>
                                You can create your business here
                            </div>
                        </div>
                        <Form className='w-100 mt-4'>
                            <Form.Label className='ps-2 fs_11 popins_medium'>Financial Information</Form.Label>
                            <div className='d-flex flex-column contact_inputs gap-3 register'>
                                <Form.Group>
                                    <Form.Label className='ps-2 mb-2'>Financial Statement</Form.Label>
                                    <div className='identity_image mx-auto'>
                                        {selectedImage ? (<img src={selectedImage} alt="Selected" className='display_flex2' />) :
                                            (<div>
                                                <div className='position-absolute top-0 w-100 bottom-0'>
                                                    <div className='display_flex2 h-100 '>
                                                        <div className='id_image'>
                                                            <Paperclip className='paperClip' />
                                                            <div className='plus display_flex2'>
                                                                <Plus style={{ width: "1.2rem", height: "1.2rem" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)}
                                        <Form.Control type='file' className='upload' accept="image/*"  // Restrict to image files
                                            onChange={handleFileChange} placeholder='Enter Code' multiple />
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className='ps-2 mb-2'>Business Certificate</Form.Label>
                                    <div className='identity_image mx-auto'>
                                        {selectedImage2 ? (<img src={selectedImage2} alt="Selected" className='display_flex2' />) :
                                            (<div>
                                                <div className='position-absolute top-0 w-100 bottom-0'>
                                                    <div className='display_flex2 h-100 '>
                                                        <div className='id_image'>
                                                            <Paperclip className='paperClip' />
                                                            <div className='plus display_flex2'>
                                                                <Plus style={{ width: "1.2rem", height: "1.2rem" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)}
                                        <Form.Control type='file' className='upload' accept="image/*"  // Restrict to image files
                                            onChange={handleFileChange2} placeholder='Enter Code' />
                                    </div>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Label className='ps-2 mb-2'>Other Relevant Document</Form.Label>
                                    <div className='identity_image mx-auto'>
                                        {selectedImage3 ? (<img src={selectedImage3} alt="Selected" className='display_flex2' />) :
                                            (<div>
                                                <div className='position-absolute top-0 w-100 bottom-0'>
                                                    <div className='display_flex2 h-100 '>
                                                        <div className='id_image'>
                                                            <Paperclip className='paperClip' />
                                                            <div className='plus display_flex2'>
                                                                <Plus style={{ width: "1.2rem", height: "1.2rem" }} />
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>)}
                                        <Form.Control type='file' className='upload' accept="image/*"  // Restrict to image files
                                            onChange={handleFileChange3} placeholder='Enter Code' />
                                    </div>
                                </Form.Group>
                            </div>
                            <div className='my-4'>
                                <div className='d-flex'>
                                    <button type='submit' className='btn1 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2'>
                                        Submit
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

export default FinancialInformation