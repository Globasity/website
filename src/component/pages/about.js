/* eslint-disable no-unused-vars */
import React from 'react'
import { Container } from 'react-bootstrap'
import Button from './pagesComponent/button'
import loginPeople from '../assests/png/loginPeople.png'
import mission from "../assests/png/mission.png"
import vission from "../assests/png/vission.png"
import cardimg1 from "../assests/png/cardimg1.png"
import cardimg2 from "../assests/png/cardimg2.png"
import cardimg3 from "../assests/png/cardimg3.png"
import cardimg4 from "../assests/png/cardimg4.png"
import manCooking from "../assests/png/man-cooking.jpg"
import our_value from "../assests/png/our_value.jpg"
import our_team from "../assests/png/choosing-right-strategy.jpg"
import facebook from "../assests/png/facebook.png"
import insta from "../assests/png/Instagram.png"
import linkdin from "../assests/png/linkedin.png"
import tick from "../assests/png/Tick Square.png"
import Register from './pagesComponent/register'
import Footer from './pagesComponent/footer'
import { useTranslation } from 'react-i18next'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
const About = () => {
    const { t } = useTranslation()
    const isLogin = useSelector((state) => state.auth.isLogin)
    const cardData = [
        {
            img: mission,
            name: 'Pansy Parkinson',
            skill: 'UI/UX DESIGNER'
        },
        {
            img: vission,
            name: 'Rubeus Hagrid',
            skill: 'DEVELOPMENT'
        },
        {
            img: cardimg3,
            name: 'Hagaruka Leua',
            skill: 'DEVELOPMENT'
        }, {
            img: cardimg1,
            name: 'Nimakia Hasial',
            skill: 'UI/UX DESIGNER'
        }, {
            img: cardimg2,
            name: 'Thishis Hangama',
            skill: 'DEVELOPMENT'
        }, {
            img: cardimg4,
            name: 'Garlika Ambase',
            skill: 'DEVELOPMENT'
        },


    ]
    return (
        <div className='main' id="about">
            <Container fluid="xxl" className="px-0" >
                <section className='px-3'>
                    <div className='banner_main' style={{ height: "auto" }}>
                        <div className=' d-flex flex-column gap-3 align-items-center justify-content-center about_page_header'>
                            <span>
                                {t("About_Headline")}
                            </span>
                            {isLogin === false &&
                                <div className='d-flex align-items-center gap-4 mt-3 about_page_btns'>
                                    <Link to={"/login"}>
                                        <Button ff="Popins_semibold" padding="14px 30px" br="40px" fs="0.7rem" content={t("Get_Started")} />
                                    </Link>
                                    <Link to={"/pricing"}>
                                        <Button color="#161925" bg="#F3F7F5" border="1px solid #161925" ff="Popins_bold" padding="14px 30px" br="40px" fs="0.7rem" content={t("View_Pricing")} />
                                    </Link>
                                </div>}
                            <div className='mt-3'>
                                <img src={loginPeople} className='img-fluid' alt='login' />
                            </div>
                        </div>
                    </div>
                    <div className='px-sm-4 px-2 mb-4' >
                        <div className='story row justify-content-center align-items-center pt-lg-5 pt-3  mt-lg-5 m-0 '>
                            <div className='story_col_1'>
                                <span>
                                    {t("OUR_STORY")}
                                </span>
                                <div className='living mt-3'>
                                    <p>{t("About_Paragraph1")}</p>

                                </div>
                            </div>
                            <div className=' pt-2  story_col_2 '>
                                <div className='research_main'>
                                    <div className='text-center research'>
                                        {/* <h6 style={{ fontSize: "1.6rem" }}>01.</h6> */}
                                        <span >
                                            {t("How_It_Works")}
                                        </span>
                                    </div>
                                    <p className='mt-2  text-center' >
                                        {t("how_content")}
                                    </p>
                                </div>
                                <div className=' row '>
                                    <div className='research_main col-md-6'>
                                        <div className='d-flex gap-3 align-items-baseline research'>
                                            <h6 style={{ fontSize: "1.1rem" }}>01.</h6>
                                            <span style={{ fontSize: "1.1rem" }}>
                                                {t("For_Businesses")}
                                            </span>
                                        </div>
                                        <ul className='mt-2 ps-5 pe-lg-5 ms-1 '>
                                            <li>{t("b1")}</li>
                                            <li>{t("b3")}</li>
                                            <li>{t("b4")}</li>
                                        </ul>
                                    </div>
                                    <div className='research_main mt-4 col-md-6'>
                                        <div className='d-flex gap-3 align-items-baseline research'>
                                            <h6 style={{ fontSize: "1.1rem" }}>01.</h6>
                                            <span style={{ fontSize: "1.1rem" }}>
                                                {t("For_Investors")}
                                            </span>
                                        </div>


                                        <ul className='mt-2 ps-5 ms-1 pe-lg-5'>
                                            <li>{t("In1")}</li>
                                            <li>{t("In2")}</li>
                                            <li>{t("In3")}</li>
                                            <li>{t("In4")}</li>
                                        </ul>
                                    </div>
                                </div>

                            </div>
                        </div>
                        <section id='mission'>
                            <div className='row align-items-stretch mt-4 responsive_mission '>
                                <div className='col-md-6  mission_col_1'>
                                    <div className='d-flex flex-column  gap-2 mission_col_1_data'>
                                        <h6>
                                            {t("Our_Mission")}
                                        </h6>
                                        <p >
                                            {t("About_Paragraph2")}
                                        </p>
                                        <p className=''>
                                            {t("About_Paragraph3")}
                                        </p>
                                    </div>
                                </div>
                                <div className='col-md-6 mission_img'>
                                    <img className='img-fluid rounded-5 h-100' style={{ objectFit: "cover" }} src={manCooking} alt='ourMission' />
                                </div>

                            </div>

                        </section>
                        <section id='mission' className='mb-5'>
                            <div className='row align-items-stretch justify-content-between '>

                                <div className='col-md-6  pe-md-5 vission_img'>
                                    <img className='img-fluid rounded-5 h-100' style={{ objectFit: "cover" }} src={our_value} alt='ourMission' />
                                </div>
                                <div className='col-md-6  mission_col_1'>
                                    <div className='d-flex flex-column gap-2 mission_col_1_data'>
                                        <h6 className='ps-0'>
                                            {t("Our_Values")}
                                        </h6>
                                        <p className='ps-0 '  >
                                            {t("three_value")}
                                        </p>
                                        <div className='mb-2' >
                                            <span className='popins_semibold me-2'>{t("Accessibility")}:</span> {t("Accessibility_content")}
                                        </div>
                                        <div className='mb-2' >
                                            <span className='popins_semibold me-2'>{t("Transparency")}:</span> {t("Transparency_content")}
                                        </div>
                                        <div className='mb-2'>
                                            <span className='popins_semibold me-2'>{t("Support")}:</span> {t("Support_content")}
                                        </div>
                                    </div>
                                </div>

                            </div>

                        </section>
                        <section id='mission'>
                            <div className='row align-items-stretch mt-4 responsive_mission '>
                                <div className='col-md-6  mission_col_1'>
                                    <div className='d-flex flex-column  gap-2 mission_col_1_data'>
                                        <h6>
                                            {t("Meet_Our_Team")}
                                        </h6>
                                        <p >
                                            {t("meet_team_content1")}
                                        </p>
                                        <p className=''>
                                            {t("meet_team_content2")}
                                        </p>
                                    </div>
                                </div>
                                <div className='col-md-6 mission_img'>
                                    <img className='img-fluid rounded-5 h-100' style={{ objectFit: "cover" }} src={our_team} alt='ourMission' />
                                </div>

                            </div>

                        </section>
                        {/*
                        <section id='team'>
                            <div className=' creative_team' >
                                <p className='text-center'>
                                    Our Leading, Strong And Creative Team
                                </p>

                            </div>
                            <div className='teamates d-flex gap-5 justify-content-center flex-row flex-sm-wrap '>
                                {
                                    cardData.map((item, index) => {
                                        return (<>
                                            <div className=' '>
                                                <div className="card p-3 " style={{ height: "31rem", width: "21rem" }}>
                                                    <img src={item.img} className="card-img-top w-100" style={{ height: "18.125rem" }} alt="..." />
                                                    <div className="card-body d-flex flex-column  align-items-center">
                                                        <h5 className="card-title mt-3">{item.name}</h5>
                                                        <p className="card-text">{item.skill}</p>
                                                        <div className='icons d-flex flex-row  gap-3'>
                                                            <div className='icon_bg'>
                                                                <img src={twitter} style={{ width: "20px" }} alt='icon' />
                                                            </div>
                                                            <div className='icon_bg'>
                                                                <img src={facebook} style={{ width: "20px" }} alt='icon' />
                                                            </div>  <div className='icon_bg'>
                                                                <img src={insta} style={{ width: "20px" }} alt='icon' />
                                                            </div>
                                                            <div className='icon_bg'>
                                                                <img src={linkdin} style={{ width: "20px" }} alt='icon' />
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </>)
                                    })
                                }
                            </div>
                            <div className='d-flex justify-content-center py-5'>
                                <Button color="#161925" bg="transparent" border="1px solid #161925" ff="Popins_bold" padding="23px 44px" br="40px" fs="1rem" content="View All" />
                            </div>
                        </section>
                       <Register/> */}
                    </div>

                </section>


            </Container>
            <Footer />

        </div>

    )
}

export default About
