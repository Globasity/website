/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Nav, Container, Form, Offcanvas } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './navbar.css'
import icon2 from '../assests/svg/icon2.svg'
import logo from '../assests/logo2.png'
import Language from './language';
import { useTranslation } from 'react-i18next';
import Button from '../pages/pagesComponent/button';
// function ScrollHandler() {

//     useEffect(() => {
//         const handleScroll = () => {
//             const element = document.getElementById('navbar');
//             if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
//                 element.classList.add('nav_shadow')
//             } else {
//                 element.classList.remove('nav_shadow')
//             }
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => {
//             window.removeEventListener('scroll', handleScroll);
//         };
//     }, []);
//     return null;
// }
function ScrollHandler() {
    const prevScrollY = useRef(0);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('navbar');
            const scrollPosition = window.scrollY;
            if (scrollPosition > prevScrollY.current) {
                // navbar.style.top = '-80px';
            } else {
                navbar.style.top = '0';
            }
            prevScrollY.current = scrollPosition;
        };
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []); // Empty dependency array means this effect runs once after the initial render

    return null;
}
const NavHeader = () => {
    const { t } = useTranslation()
    const navigate = useNavigate();
    const handleLoginClick = () => {
        navigate('/login');
    };

    const navItems = [
        { id: "1", items: t("Home"), path: '/' },
        { id: "6", items: "Startups", path: '/startups' },
        { id: "7", items: "investors", path: '/investors' },
        // { id: "3", items: t("Pricing"), path: "/pricing" },
        { id: "5", items: t("Contact"), path: "/contact" },
        { id: "2", items: t("About_us"), path: '/about-us' },
    ]
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleHover = (itemId) => {
        setHoveredItemId(itemId);
        handleClose()
    };

    const handleMouseHover = (itemId) => {
        setHoveredItemId(itemId);
    };
    const handleMouseLeave = () => {
        setHoveredItemId(null);
    };

    return (
        <>
            <ScrollHandler />
            <Navbar bg="white" expand="lg" sticky="top" className='main_nav px-sm-4 px-3 py-4 ' id="navbar">
                <Container fluid="xxl" className='px-sm-3 px-0 main_nav2' >
                    <Navbar.Brand className='order_1' >
                        <Link to='/' style={{ textDecoration: "none" }} className='text_primary' >
                            <img src={logo} alt='' className='' style={{ width: "7.7rem" }} />
                        </Link>
                    </Navbar.Brand>
                    <Nav className='order_3 flex-row align-items-center ms-lg-0 ms-auto mb-1' style={{gap:'10px'}}>
                        {/*<span className='xs_none'> <Language login={false} /></span> */}
                        <Link to={"/login"}>
                        <Button type="header" padding=".5rem 1.7rem" fs="14px" content={t("LOGIN_BTN_TXT")} />
                        </Link>
                    </Nav>
                    <Navbar.Toggle onClick={handleShow} className='ms-2 border-0 p-0 mb-1' style={{
                        fontSize: "13px",
                        paddingInline: "6px"
                    }} >
                        <img src={icon2} alt='' className='' style={{ width: "80%" }} />
                    </Navbar.Toggle>
                    <Nav className='nav_link mx-lg-auto fs_09 order_2  d-none d-lg-flex' >
                        {navItems.map(items => (
                            <NavLink className={''} onClick={() => handleHover(items.id)} onMouseLeave={handleMouseLeave} onMouseEnter={() => handleMouseHover(items.id)} key={items.id} to={items.path}>
                                <span className=''>
                                    {items.items}
                                    <div key={items.id} className={`mt-1 ${hoveredItemId === items.id ? 'visible1' : 'visible1'}`} >
                                        <span className='border1'>
                                            <span></span>
                                            {/* <span></span>
                                            <span></span>
                                            <span></span>
                                            <span></span> */}
                                        </span>
                                    </div>
                                </span>
                            </NavLink>
                        ))}
                    </Nav>
                    <Nav>
                        <Offcanvas show={show} onHide={handleClose} placement={'top'} className="main_nav pb-3">
                            <Offcanvas.Header closeButton>
                            </Offcanvas.Header>
                            <Nav className='nav_link fs_10 justify-content-center align-items-center  gap-3' >
                                {navItems.map(items => (
                                    <NavLink className={''} onClick={() => handleHover(items.id)} key={items.id} to={items.path}>
                                        <span className=''>
                                            {items.items}
                                        </span>
                                        <div key={items.id} className={`${hoveredItemId === items.id ? 'visible1' : 'visible1'}`} >
                                            <span className='border1'>
                                                <span></span>
                                                {/* <span></span>
                                                <span></span>
                                                <span></span>
                                                <span></span> */}
                                            </span>
                                        </div>
                                    </NavLink>
                                ))}
                                {/* Language_removed <div className='xs_none_show'> 
                                    <Language login={false} />
                                </div> */}
                            </Nav>
                        </Offcanvas>
                    </Nav>
                </Container>
            </Navbar>
        </>

    )
}

export default NavHeader
