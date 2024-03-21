/* eslint-disable no-unused-vars */
import React from 'react'
import { Container, Modal } from 'react-bootstrap'
import fb from '../../assests/png/facebookfooter.png'
import tweeter from '../../assests/png/twitterfooter.png'
import linkdin from '../../assests/png/linkedinfooter.png'
import yt from '../../assests/png/youtube.png'
import insta from '../../assests/png/Instagramfooter.png'
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { useState } from 'react'
import TermConditionModal from './term&conditionModal'
import { ArrowUp, Facebook, Instagram, Linkedin, Twitter } from 'react-feather'
import BackToTop from './backToTop'

const Footer = () => {
    const [show, setShow] = useState(false)
    const [show2, setShow2] = useState(false)
    const { t } = useTranslation()
    const shareUrl = 'https://globasity.com/';
    const shareMessage = 'Check out this website: Globasity';

    const handleShareClick = (socialMedia) => {
        let socialMediaUrl = '';

        switch (socialMedia) {
            case 'facebook':
                socialMediaUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
                break;
            case 'linkedin':
                socialMediaUrl = `https://www.linkedin.com/shareArticle?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareMessage)}`;
                break;
            case 'twitter':
                socialMediaUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareMessage)}`;
                break;
            default:
                break;
        }
        if (socialMediaUrl) {
            window.open(socialMediaUrl, '_blank');
        }
    };
    const terms = [
        t("terms1"),
        t("terms2"),
        t("terms3"),
        t("terms4"),
        t("terms5"),
    ]
    const condition = [
        t("com1"),
        t("com2"),
        t("com3"),
        t("com4"),
    ]
    return (
        <Container fluid="xxl" className="px-0">
            <BackToTop />
            <TermConditionModal show={show} setShow={setShow} data={terms} title={t("TERM_AND_COND")} />
            <TermConditionModal show={show2} setShow={setShow2} data={condition} title={t("Commercial_Terms")} />
            <section className='main mx-3' id='footer'>
                <footer className='px-3'>
                    <div className="footer-container align-items-center flex-column">

                        <div className='popins_bold fs_13 text-center d-flex mx-auto mb-3'>Globasity</div>
                        <div className="d-flex justify-content-center flex-wrap mx-auto gap-3 col_gap ">
                            <Link className="link-style" to="/">{t("Home")}</Link> <span className='light_line d-sm-flex d-none'>|</span>
                            <Link className="link-style" to="/about-us">{t("About_us")}</Link>  <span className='light_line d-sm-flex d-none'>|</span>
                            <Link className="link-style" to="/contact">{t("BTN_CONTACT_US")}</Link>
                        </div>
                        <ul className="social-icons  align-items-center justify-content-center mt-3" style={{ listStyle: "none" }}>
                            <li className='fb'>
                                <Link onClick={() => handleShareClick('facebook')}>
                                    <Facebook className='img_icon text-white' />
                                </Link>
                            </li>
                            <li className='ins'>
                                <Link onClick={() => handleShareClick('linkedin')}>
                                    <Linkedin className='img_icon text-white' />
                                </Link>
                            </li>
                            <li className='twitter'>
                                <Link onClick={() => handleShareClick('twitter')}>
                                    <Twitter className='img_icon text-white' />
                                </Link>
                            </li>
                        </ul>
                        <div className='d-flex popins_bold gap-2 mt-3 fs_09'>  Info:  <Link className=' text_secondary underline popins_bold' to={'mailto:info@globasity.com'}> info@globasity.com</Link></div>
                    </div>
                    <div className="footer-bottom px-4">
                        <div className="footer-bottom-column" >
                            <ul className='d-inline-flex justify-content-center gap-sm-4 gap-3 flex-wrap '>
                                <li>
                                    <Link className="link-style" onClick={() => setShow(true)} >{t("terms")} </Link>
                                </li>
                                {/* <li>
                                    <Link className="link-style" to="/">{t("Privacy")} </Link>
                                </li> */}
                                <li>
                                    <Link className="link-style" onClick={() => setShow2(true)}>{t("Commercial_Terms")} </Link>
                                </li>

                            </ul>
                        </div>
                        <div className="footer-right-column fs_08">
                            Copiright © 2023, Globasity
                        </div>
                    </div>
                </footer>
            </section>

        </Container>
    )
}

export default Footer
