/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import BusinessContractForm from './businessContractForm'
import { toast } from 'react-toastify'
import { apiRequest } from '../../api/apiRequest'
import { Spinner } from 'react-bootstrap';
import { Download } from 'react-feather'
const BusinessContractCard = ({ name, businessName, description, profile, businessData, completed, url }) => {
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const { t } = useTranslation()
    const [formInfo, setFormInfo] = useState(null)
    const handleViewAdd = (linkData, businessData2) => {
        navigate(linkData, { state: { businessData: businessData2, url: url, status: businessData?.status } })
    }
    // console.log(businessData)
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const [businessFormData, setBusinessFormData] = useState('');
    const handleBusinessCreate = (businessData2, contractDetail) => {
        navigate('/business-contract-view', { state: { businessData: businessData2, url: url, contractDetail: contractDetail, businessCotract: true } })
    }
    useEffect(() => {
        if (businessData) {
            getDataForViewContract(businessData)
        }
    }, [businessData])
    const handleShow = async (businessData2) => {
        if (businessData.contract_from === userData?.user_type) {
            getFormData(businessData2)
        }
        else {
            setIsLoading(true)
            const body = new FormData();
            body.append('table_name', 'bc_form');
            body.append('type', 'get_data');
            body.append('investor_id', businessData2.investor_id);
            body.append('business_user', businessData2.business_user.id);
            body.append('business_id', businessData2.business_id);
            apiRequest({ body })
                .then((result) => {
                    if (result?.length > 0 || result?.data?.length > 0) {
                        handleBusinessCreate(businessData2, result.data)
                    } else {
                        toast.info(`You cannot create the business contract because it was originally generated by ${businessData?.business_user?.name}`)
                    }
                    setIsLoading(false)
                }).catch((err) => {
                    console.log(err)
                    setIsLoading(false)
                    toast.error(err.message)
                });
        }
    }
    const getFormData = async (data) => {
        setIsLoading(true)
        const body = new FormData();
        body.append('table_name', 'bc_form');
        body.append('type', 'get_data');
        body.append('investor_id', data.investor_id);
        body.append('business_user', data.business_user.id);
        body.append('business_id', data.business_id);
        apiRequest({ body })
            .then((result) => {
                if (result?.length > 0 || result?.data?.length > 0) {
                    handleBusinessCreate(data, result.data)
                } else {
                    setShow(true);
                    setBusinessFormData(data)
                }
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
                setIsLoading(false)
                toast.error(err.message)
            });
    }
    const getDataForViewContract = async (data) => {
        setIsLoading(true)
        const body = new FormData();
        body.append('table_name', 'bc_form');
        body.append('type', 'get_data');
        body.append('investor_id', data.investor_id);
        body.append('business_user', data.business_user.id);
        body.append('business_id', data.business_id);
        apiRequest({ body })
            .then((result) => {
                if (result?.length > 0 || result?.data?.length > 0) {
                    setFormInfo(result.data)
                }
                setIsLoading(false)
            }).catch((err) => {
                console.log(err)
                setIsLoading(false)
                toast.error(err.message)
            });
    }
    return (
        <>
            <BusinessContractForm show={show} handleClose={handleClose} businessFormData={businessFormData} url={url} />
            <div className='border p-3 rounded-4 shadow1 d-flex flex-column h-100 justify-content-between'>
                <div className='' style={{ cursor: "pointer" }} >
                    <div className='display_flex justify-content-between'>
                        <div className='display_flex'>
                            <img alt='' className='detailCard_image' src={profile} />
                            <div className='ms-3' style={{ lineHeight: 1 }}>
                                <div className='popins_semibold fs_09'>{name}</div>
                                <span className='fs_06' style={{ opacity: "0.7" }}>Business Name: </span>  <span className=' popins_semibold fs_08 '>{businessName}</span>
                            </div>
                        </div>
                    </div>
                    <hr className=' mx-4' style={{ opacity: "0.12" }}></hr>
                    <div className='popins_light fs_08 text_detail2'>
                        {description}
                    </div>
                </div>
                <div>
                    {completed === false && (<div className='mt-4 display_flex2 gap-3 flex-wrap'>
                        <button disabled={isLoading ? true : false} onClick={() => handleShow(businessData)} className=' btn1 btn_minWidth fs_07 btn_primary rounded-3 px-3 py-2'>
                            {
                                isLoading ?
                                    <Spinner animation="border" variant="light" size="sm" />
                                    : t("CREATE_BUS_CONTRACT")}
                        </button>
                    </div>)}
                    {completed === true &&
                        (<>
                            {businessData ?
                                <div className='mt-2'>
                                    {userData.user_type === "investor" && (businessData?.investor_signature ?
                                        <>
                                            <div className='text-danger popins_semibold text-center fs_09'>
                                                {t("ALREADY_CREATED")}
                                            </div>
                                            <div className='mt-2 display_flex2 gap-3 flex-wrap'>
                                                <button onClick={() => handleBusinessCreate(businessData, formInfo)} className=' btn1 btn_minWidth fs_07 btn_primary rounded-3 px-3 py-2'>
                                                    {t("VIEW_CONTRACT")}
                                                </button>
                                                <button onClick={() => handleBusinessCreate(businessData, formInfo)}  className=' btn1 btn_minWidth fs_07 btn_primary_outline fs_09 rounded-3 px-3 py-2'>
                                                    <Download className='' style={{ height: "1rem" }} />
                                                </button>
                                            </div>
                                        </>
                                        :
                                        <div className='mt-3 display_flex2 gap-3 flex-wrap'>
                                            <button disabled={isLoading ? true : false} onClick={() => handleBusinessCreate(businessData, formInfo)} className=' btn1 btn_minWidth fs_07 btn_primary rounded-3 px-3 py-2'>
                                                {
                                                    isLoading ?
                                                        <Spinner animation="border" variant="light" size="sm" />
                                                        : t("CREATE_BUS_CONTRACT")}
                                            </button>
                                        </div>)}
                                    {userData.user_type === "business" && (businessData?.business_signature ?
                                        <>
                                            <div className='text-danger popins_semibold text-center fs_09'>
                                                {t("ALREADY_CREATED")}
                                            </div>
                                            <div className='mt-2 display_flex2 gap-3 flex-wrap'>
                                                <button onClick={() => handleBusinessCreate(businessData, formInfo)} className=' btn1 btn_minWidth fs_07 btn_primary rounded-3 px-3 py-2'>
                                                    {t("VIEW_CONTRACT")}
                                                </button>
                                                <button onClick={() => handleBusinessCreate(businessData, formInfo)}  className=' btn1 btn_minWidth fs_07 btn_primary_outline fs_09 rounded-3 px-3 py-2'>
                                                    <Download className='' style={{ height: "1rem" }} />
                                                </button>
                                            </div>
                                        </> :
                                        <div className='mt-3 display_flex2 gap-3 flex-wrap'>
                                            <button  disabled={isLoading ? true : false} onClick={() => handleShow(businessData)} className=' btn1 btn_minWidth fs_07 btn_primary rounded-3 px-3 py-2'>
                                                {
                                                    isLoading ?
                                                        <Spinner animation="border" variant="light" size="sm" />
                                                        : t("CREATE_BUS_CONTRACT")}
                                            </button>
                                        </div>)}
                                </div> : null
                                // <div className='mt-3 display_flex2 gap-3 flex-wrap'>
                                //     <button disabled={isLoading ? true : false} onClick={() => { handleShow(businessData) }} className=' btn1 btn_minWidth fs_07 btn_primary rounded-3 px-3 py-2'>
                                //         {
                                //             isLoading ?
                                //                 <Spinner animation="border" variant="light" size="sm" />
                                //                 : t("CREATE_BUS_CONTRACT")}
                                //     </button>
                                // </div>
                            }

                        </>)}
                </div>
            </div>
        </>
    )
}

export default BusinessContractCard