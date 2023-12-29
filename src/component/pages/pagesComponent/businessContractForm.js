/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useState } from 'react';
import { Form, Modal, Spinner } from 'react-bootstrap';
import { apiRequest } from '../../api/apiRequest';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const BusinessContractForm = ({ show, handleClose, businessFormData, url, checkUpdate, contractFormData }) => {
    const [isLoading, setIsLoading] = useState(false)
    const [businessForm, setBusinessForm] = useState(null)
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const [errorMessage, setErrorMessage] = useState({});

    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        id: "",
        investor_id: businessForm?.investor_id || '',
        business_user: businessForm?.business_user?.id || '',
        business_id: businessForm?.business?.id || '',
        business_contract_id: businessForm?.business?.id || '',
        investment_amount: '',
        investment_share: '',
        investment_percent: '',
        regular_share: '',
        share_each_value: '',
        share_issued_percent: '',
        company_bank_account: '',
        field: '',
        days: '',
    });
    useEffect(() => {
        if (businessFormData) {
            setBusinessForm(businessFormData)
        }
    }, [businessFormData])
    useEffect(() => {
        if (checkUpdate === true) {
            setFormData({
                id: contractFormData?.id,
                investment_amount: contractFormData?.investment_amount,
                investment_share: contractFormData?.investment_share,
                investment_percent: contractFormData?.investment_percent,
                regular_share: contractFormData?.regular_share,
                share_each_value: contractFormData?.share_each_value,
                share_issued_percent: contractFormData?.share_issued_percent,
                company_bank_account: contractFormData?.company_bank_account,
                field: contractFormData?.field,
                days: contractFormData?.days,
            });
        }
    }, [checkUpdate, contractFormData])
    const handleBusinessCreate = (businessData2, contractDetail) => {
        navigate('/business-contract-view', { state: { businessData: businessData2, url: url, contractDetail: contractDetail } })
    }
    useEffect(() => {
        setFormData({
            investor_id: businessForm?.investor_id || '',
            business_user: businessForm?.business_user?.id || '',
            business_id: businessForm?.business?.id || '',
            business_contract_id: businessForm?.business?.id || '',
        })
    }, [businessForm])
    // useEffect(() => {
    //     if (formData) {
    //         getFormData()
    //     }
    // }, [formData])
    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "share_issued_percent" || name === "investment_percent") {
            if (value > 100) {
                setErrorMessage((prevErrors) => ({ ...prevErrors, [name]: `Value must be 100 or less.` }));
            } else {
                setFormData({ ...formData, [name]: value });
                setErrorMessage((prevErrors) => ({ ...prevErrors, [name]: `` }));
            }
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };
    const getFormData = () => {
        const body = new FormData();
        body.append('table_name', 'bc_form');
        body.append('type', 'get_data');
        body.append('investor_id', formData.investor_id);
        body.append('business_user', formData.business_user);
        body.append('business_id', formData.business_id);
        apiRequest({ body })
            .then((result) => {
                // console.log(result)
                handleBusinessCreate(businessFormData, result.data)
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
                toast.error(err.message)
            });
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const body = new FormData();
        body.append('table_name', 'bc_form');
        body.append('type', 'add_data');
        body.append('investor_id', formData.investor_id);
        body.append('business_user', formData.business_user);
        body.append('business_id', formData.business_id);
        body.append('business_contract_id', formData.business_contract_id);
        body.append('investment_amount', formData.investment_amount);
        body.append('investment_share', formData.investment_share);
        body.append('investment_percent', formData.investment_percent);
        body.append('regular_share', formData.regular_share);
        body.append('share_each_value', formData.share_each_value);
        body.append('share_issued_percent', formData.share_issued_percent);
        body.append('company_bank_account', formData.company_bank_account);
        body.append('field', formData.field);
        body.append('days', formData.days);
        // console.log(formData)
        apiRequest({ body })
            .then((result) => {
                // console.log(result)
                if (result.result) {
                    setIsLoading(false)
                    toast.success(result.message)
                    getFormData()
                    // handleBusinessCreate(businessForm)   1
                    handleClose()
                } else {
                    setIsLoading(false)
                    toast.error(result.message)
                }
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
                toast.error(err.message)
            });
    }
    const updateData = (e) => {
        e.preventDefault()
        setIsLoading(true)
        const body = new FormData();
        body.append('table_name', 'bc_form');
        body.append('type', 'update_data');
        body.append('id', formData.id);
        body.append('investment_amount', formData.investment_amount);
        body.append('investment_share', formData.investment_share);
        body.append('investment_percent', formData.investment_percent);
        body.append('regular_share', formData.regular_share);
        body.append('share_each_value', formData.share_each_value);
        body.append('share_issued_percent', formData.share_issued_percent);
        body.append('company_bank_account', formData.company_bank_account);
        body.append('field', formData.field);
        body.append('days', formData.days);
        // console.log(formData)
        apiRequest({ body })
            .then((result) => {
                // console.log(result)
                if (result.result) {
                    setIsLoading(false)
                    toast.success(result.message)
                    getFormData()
                    // handleBusinessCreate(businessForm)   1
                    handleClose()
                } else {
                    setIsLoading(false)
                    toast.error(result.message)
                }
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
                toast.error(err.message)
            });
    }
    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title className='fs_09 popins_semibold'>
                        Please enter business contract information
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form className='px-2 gap-1 d-flex flex-column' onSubmit={checkUpdate === true ? updateData : handleSubmit}>
                        <Form.Group controlId="days">
                            <Form.Label className=' fs_08 popins_medium mt-2 mb-1'>Days</Form.Label>
                            <Form.Control required className='fs_09' type="number" name="days" value={formData.days} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="field">
                            <Form.Label className=' fs_08 popins_medium mt-2 mb-1'>Field</Form.Label>
                            <Form.Control required className='fs_09' type="text" name="field" value={formData.field} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="investmentAmount">
                            <Form.Label className=' fs_08 popins_medium mt-2 mb-1'>Investment Amount</Form.Label>
                            <Form.Control required className='fs_09' type="number" name="investment_amount" value={formData.investment_amount} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="investmentShare">
                            <Form.Label className=' fs_08 popins_medium mt-2 mb-1'>Investment Share</Form.Label>
                            <Form.Control required className='fs_09' type="text" name="investment_share" value={formData.investment_share} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="investmentPercent">
                            <Form.Label className=' fs_08 popins_medium mt-2 mb-1'>Investment Percent</Form.Label>
                            <Form.Control required className='fs_09' type="number" name="investment_percent" value={formData.investment_percent} onChange={handleChange} />
                            {errorMessage?.investment_percent && <h6 className='fs_07 text-danger'>{errorMessage?.investment_percent}</h6>}
                        </Form.Group>
                        <Form.Group controlId="regularShare">
                            <Form.Label className=' fs_08 popins_medium mt-2 mb-1'>Regular Share</Form.Label>
                            <Form.Control required className='fs_09' type="number" name="regular_share" value={formData.regular_share} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="shareEachValue">
                            <Form.Label className=' fs_08 popins_medium mt-2 mb-1'>Share Each Value</Form.Label>
                            <Form.Control required className='fs_09' type="number" name="share_each_value" value={formData.share_each_value} onChange={handleChange} />
                        </Form.Group>
                        <Form.Group controlId="shareIssuedPercent">
                            <Form.Label className=' fs_08 popins_medium mt-2 mb-1'>Share Issued Percent</Form.Label>
                            <Form.Control required className='fs_09' type="number" name="share_issued_percent" value={formData.share_issued_percent} onChange={handleChange} />
                            {errorMessage?.share_issued_percent && <h6 className='fs_07 text-danger'>{errorMessage?.share_issued_percent}</h6>}
                        </Form.Group>
                        <Form.Group controlId="companyBankAccount">
                            <Form.Label className=' fs_08 popins_medium mt-2 mb-1'>Company Bank Account</Form.Label>
                            <Form.Control required className='fs_09' type="text" name="company_bank_account" value={formData.company_bank_account} onChange={handleChange} />
                        </Form.Group>

                        <Form.Group>
                            <div className='d-flex my-3'>
                                <button disabled={isLoading ? true : false} type='submit' className='btn1 mx-auto btn2 btn2 fs_09 btn_primary rounded_3 px-4 py-2'>
                                    {
                                        isLoading ?
                                            <Spinner animation="border" variant="light" size="sm" />
                                            : "Submit"
                                    }
                                </button>
                            </div>
                        </Form.Group>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default BusinessContractForm