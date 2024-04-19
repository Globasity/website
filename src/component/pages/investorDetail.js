/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Accordion, Container, Spinner } from 'react-bootstrap'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useEffect } from 'react'
import { apiRequest } from '../api/apiRequest'
import { useTranslation } from 'react-i18next'
import BackToTop from './pagesComponent/backToTop'

const InvestorDetail = () => {
    const { state } = useLocation()
    const { investorId } = state ? state : {}
    const [investors, setInvestors] = useState()
    const [isLoading, setIsLoading] = useState(false)
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const navigate = useNavigate()
    const { t } = useTranslation()
    // const handleViewAdd = (items) => {
    //     setInvestors(items)
    // }
    const handleShow = () => {
        navigate('/my-business', { state: { investorId: investorId, investor: true, investorData: investors } })
    }
    const getInvestors = () => {
        setIsLoading(true)
        const body = new FormData()
        body.append('table_name', 'users')
        body.append('type', 'get_data')
        body.append('id', investorId)
        body.append('user_type', "investor")
        apiRequest({ body })
            .then((result) => {
                // console.log(result.data)
                setInvestors(result.data[0])
                setIsLoading(false)
            }).catch((err) => {
                setIsLoading(false)
                console.log(err)
            });
    }
    useEffect(() => {
        getInvestors()
    }, [investorId])
    return (
        <>
                <BackToTop />
            <Container fluid="xxl" className="px-0">
                <section className='mt-5'>
                    <Container fluid="lg">
                        <div className='mb-5'>
                            <h5 className='popins_semibold text-center mb-0'>
                                {t("Investor_Detail")}
                            </h5>
                            <div className='fs_08 popins_light text-center'>
                                {t("Detail_of_Investor")}
                            </div>
                        </div>
                        <div>
                            <div className='border p-4 rounded-3 my-4 shadow1'>
                                <h6 className='popins_semibold mb-3'>
                                    {t("Company_Description")}
                                </h6>
                                <p className='text_secondary' style={{ fontSize: "0.85rem" }}>
                                    {investors?.company_description}
                                </p>
                            </div>
                            <div className="border invest p-1 rounded-3 my-4 shadow1">
                                {isLoading ?
                                    <div className='display_flex2' style={{ minHeight: "10rem" }}>
                                        <Spinner animation="border" variant="black" size="" />
                                    </div> :
                                    (<Accordion className="text-center border-0 w-100" defaultActiveKey={['0']}>
                                        <Accordion.Item eventKey="0" className=" border-0">
                                            <Accordion.Header className="border-0 popins_semibold fs_10">
                                                {t("Investor_Detail")}
                                            </Accordion.Header>
                                            <Accordion.Body className="border-0">
                                                <div className='d-flex flex-column gap-3'>
                                                    <div>
                                                        <span className='popins_semibold fs_09 me-3'>{t("Name")}: </span><span>
                                                            {investors?.name}
                                                        </span>
                                                    </div>
                                                    <div>
                                                        <span className='popins_semibold fs_09 me-3'>{t("HEAD_ENTER_PHONE")}: </span><span>    {investors?.phone}</span>
                                                    </div>
                                                    <div>
                                                        <span className='popins_semibold fs_09 me-3'>{t("TITLE_EMAIL")}: </span><span>    {investors?.email}</span>
                                                    </div>
                                                    <div>
                                                        <span className='popins_semibold fs_09 me-3'>{t("Invested_Amount")}: </span><span> {investors?.invested_amount}$</span>
                                                    </div>
                                                    <div>
                                                        <span className='popins_semibold fs_09 me-3'>{t("Company_Name")}: </span><span> {investors?.company_name}</span>
                                                    </div>
                                                    <div>
                                                        <span className='popins_semibold fs_09 me-3'>Interest: </span><span> {investors?.category}</span>
                                                    </div>
                                                    <div>
                                                        <span className='popins_semibold fs_09 me-3'>{t("Min_Invest_Am")}: </span><span>    {investors?.min_investing_amount}$</span>
                                                    </div>
                                                    <div>
                                                        <span className='popins_semibold fs_09 me-3'>{t("Max_Invest_Am")}: </span><span> {investors?.max_investing_amount}$</span>
                                                    </div>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>)}

                            </div>
                            {/* <div className='border invest p-1 rounded-3 mb-5 display_flex shadow1'>
                                <Accordion className='text-center border-0 w-100' >
                                    <Accordion.Item eventKey="0" className=' border-0'>
                                        <Accordion.Header className='border-0 popins_semibold fs_10'>Investors</Accordion.Header>
                                        <Accordion.Body className='border-0'>
                                            <div className='row contentCenter' style={{ rowGap: "1rem" }}>
                                                {investorList?.map((items, index) => (
                                                    <div className='col-xl-3 col-lg-4 col-md-5 col-sm-6' key={index}>
                                                        <div className='border-0 p-2 rounded-3 shadow1 investorCard' onClick={() => handleViewAdd(items)}>
                                                            <div className='display_flex justify-content-between'>
                                                                <div className='display_flex'>
                                                                    <img alt='' className='detailCard_image' src={items?.thumb} />
                                                                    <div className='ms-3 fs_09'>
                                                                        {items?.name}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className='popins_semibold text-center fs_09'>${items?.invested_amount}</div>
                                                                    <div className='fs_07 popins_light1' style={{ color: "#1E2131", opacity: "0.8" }}>Total Invest </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div> */}
                        </div>
                        <div className="pb-5">
                            <button type='button' onClick={handleShow} className='btn1 btn2 mx-auto btn2 fs_09 btn_primary rounded_3 px-4 py-2' >
                                Contact
                            </button>
                        </div>
                    </Container>

                </section>
            </Container>
        </>
    )
}
export default InvestorDetail