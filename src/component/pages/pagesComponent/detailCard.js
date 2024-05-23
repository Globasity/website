/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Heart } from 'react-feather'
import { Link, useNavigate } from 'react-router-dom'
import { apiRequest } from '../../api/apiRequest'
import { RxHeart, RxHeartFilled } from 'react-icons/rx'
import accept from "../../assests/png/accept.svg"
import { useTranslation } from 'react-i18next'

const DetailCard = ({ name, amountPer, getAllBusiness,lastId, description, profile, url, id, businessData, isFav, favourite, isInvestor, investor_log }) => {
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const [check, setCheck] = useState(false)
    const [selectBusiness, setSelectBusiness] = useState(false)
    useEffect(() => {
        if (favourite === "like")
            setCheck(true)
    }, [])
    const { t } = useTranslation()
    useEffect(() => {
        if (investor_log === true) {
            setSelectBusiness(true)
        } else {
            setSelectBusiness(false)
        }
    }, [investor_log])
    const addFav = (status) => {
        const body = new FormData()
        body.append('type', 'like_dislike')
        body.append('user_id', userData.user_id)
        body.append('business_id', id)
        body.append('status', status)
        apiRequest({ body })
            .then((result) => {
                // console.log(result)
                // if (result.result) {
                //     getAllBusiness(null, true)
                // } else {
                //     getAllBusiness(null, true)
                // }
            }).catch((err) => {
                console.log(err)
            });
    }
    const navigate = useNavigate()
    const handleViewAdd = () => {
        navigate("/business-detail", { state: { businessData: businessData, url: url, isfav: isFav } })
    }
    return (
        <>
            <div className={`border p-3 ${selectBusiness === false && 'h-100'} d-flex justify-content-between flex-column  rounded-4 shadow1 ${selectBusiness === true && "investorCard myBusHeight"} ${isInvestor === id && "active"}`}>
                <div className='position-relative h-100'>
                    <div className='display_flex justify-content-between'>
                        <div className='display_flex'>
                            <img alt='' className='detailCard_image' src={profile} />
                            <div className='ms-3 '>
                                <div className='single-line-ellipsis'>{name}</div>

                                <div className='fs_08'>Raised Amount: <span className=' popins_semibold '>{amountPer}%</span></div>
                            </div>
                        </div>
                        {userData?.user_type === "investor" &&
                            <div>
                                {check ?
                                    <RxHeartFilled className='fs_16' style={{ color: "#D10000", cursor: "pointer" }} onClick={() => {
                                        addFav("dislike")
                                        setCheck(false)
                                    }} /> :
                                    <RxHeart className='fs_16' style={{ cursor: "pointer" }} onClick={() => {
                                        setCheck(true)
                                        addFav("like")
                                    }} />
                                }

                            </div>}
                        {isInvestor === id ? <img src={accept} alt='checked' className='checked_account rounded-circle' /> : ''}
                    </div>
                    <hr className=' mx-4' style={{ opacity: "0.12" }}></hr>
                    <div className='popins_light fs_08 text_detail'>
                        {description}
                    </div>
                </div>
                {selectBusiness === false &&
                    <div className='mt-4'>
                        <button onClick={handleViewAdd} className='w-75 btn1 fs_09 btn_primary rounded_3 px-3 py-2 mx-auto'>{t("BTN_VIEW_AD")}</button>
                    </div>}
            </div>
        </>
    )
}

export default DetailCard