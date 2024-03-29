import React from 'react'
import Button from "./button"
import tick from '../../assests/png/tick.png'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

const PricingCard = (props) => {
    const { t } = useTranslation()
    return (
        <div>
            <div className='main px-2' id="pricing" style={{ width: "22.5rem" }}>
                <div className='card_'>
                    <div className='card_header ' style={{ paddingBottom: "2.1rem" }}>
                        <div className='mt-2 mb-2'>
                            <Button fs=".89rem" content={props.content} padding="10px 40px" type="heading"/>
                        </div>
                        <h4 className='pb-2 pt-4 mb-0' >
                            {props.amount}
                        </h4>
                        <p className='m-0 pe-2'>
                            {props.subcription}
                        </p>

                    </div>
                    <div className='card_body'>
                        <span className='fs_07 text-center'> The Professional Plan provides advanced tools to search, analyze, and manage deals.</span>
                        {/* <div className='card_body_content  d-flex gap-3 align-items-center w-100 pb-3 '>
                            <img className='' src={tick} alt="tick" style={{ width: "16px", height: "16px" }} />
                            <p className='m-0'>
                                {t("pro1")}
                            </p>
                        </div> */}
                        <div className='card_body_content  d-flex gap-3 align-items-center w-100 pb-3 '>
                            <img className='' src={tick} alt="tick" style={{ width: "16px", height: "16px" }} />
                            <p className='m-0'>
                                {t("pro2")}
                            </p>
                        </div>
                        <div className='card_body_content  d-flex gap-3 align-items-center w-100 pb-3 '>
                            <img className='' src={tick} alt="tick" style={{ width: "16px", height: "16px" }} />
                            <p className='m-0'>
                                {t("pro3")}
                            </p>
                        </div>
                        <div className='card_body_content  d-flex gap-3 align-items-center w-100 pb-3 '>
                            <img className='' src={tick} alt="tick" style={{ width: "16px", height: "16px" }} />
                            <p className='m-0'>
                                {t("pro4")}
                            </p>
                        </div>
                        <div className='card_body_content  d-flex gap-3 align-items-center w-100 pb-3 '>
                            <img className='' src={tick} alt="tick" style={{ width: "16px", height: "16px" }} />
                            <p className='m-0'>
                                {t("pro5")}
                            </p>
                        </div>


                    </div>
                    <div className='text-center mb-2'>
                        <Link to={'/login'}>
                            <Button content={t("Choose_Plan")} padding="18px 50px" br="40px" fs="14px" />
                        </Link>
                    </div>

                </div>


            </div>
        </div>
    )
}

export default PricingCard
