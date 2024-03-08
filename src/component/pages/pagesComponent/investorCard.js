/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react'
import { Heart } from 'react-feather'
import { useNavigate } from 'react-router-dom'
import { RxHeart, RxHeartFilled } from 'react-icons/rx'
import { apiRequest } from '../../api/apiRequest'

const InvestorCard = ({ name, totalAmount, description, profile, lastInvest, investorId, getInvestors, favourite }) => {
    const navigate = useNavigate()
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const [check, setCheck] = useState(false)
    useEffect(() => {
        if (favourite === "like")
            setCheck(true)
    }, [])
    const addFav = (status) => {
        const body = new FormData()
        body.append('type', 'like_dislike_investor')
        body.append('user_id', userData.user_id)
        body.append('investor_id', investorId)
        body.append('status', status)
        apiRequest({ body })
            .then((result) => {
                // console.log(result)
                if (result.result) {
                    getInvestors(null, true)
                } else {
                    getInvestors(null, true)
                }
            }).catch((err) => {
                console.log(err)
            });
    }
    const handleViewAdd = () => {
        navigate("/investor-detail", { state: { investorId: investorId } })
    }
    return (
        <>
            <div className='border p-3 rounded-4 shadow1 flex-column h-100 d-flex justify-content-between investorCard'>
                <div onClick={handleViewAdd}>
                    <div className='display_flex justify-content-between'>
                        <div className='display_flex'>
                            <img alt='' className='detailCard_image' src={profile} />
                            <div className='ms-3 fs_10'>
                                {name}
                            </div>
                        </div>
                        <div>
                            <div className='popins_semibold text-center fs_09'>${totalAmount}</div>
                            <div className='fs_07 popins_light1' style={{ color: "#1E2131", opacity: "0.8" }}>Total Invest </div>
                        </div>
                    </div>
                    <hr className=' mx-4' style={{ opacity: "0.12" }}></hr>
                    <div>
                        <h6 className='popins_semibold fs_09'>Investments Detail:</h6>
                        <div className='popins_light fs_08 text_detail2'>
                            {description}
                        </div>
                    </div>
                </div>
                <div className='mt-4 '>
                    <div className='display_flex justify-content-between'>
                        <div>
                        {userData?.user_type === "business" &&
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
                        </div>
                        <div>
                            <div className='popins_medium text-center fs_09'>{lastInvest} </div>
                            <div className='fs_07 popins_light1 text-center' style={{ color: "#1E2131", opacity: "0.8" }}>Last Invest </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default InvestorCard