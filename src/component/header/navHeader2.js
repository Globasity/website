/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from 'react'
import { Navbar, Nav, Container, Form, Offcanvas, NavDropdown, Dropdown } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import './navbar.css'
import logo from '../assests/logo2.png'
import icon2 from '../assests/svg/icon2.svg'
import Profile from './profile';
import { useDispatch } from 'react-redux';
import { setLogin } from '../redux/loginForm';
import { Bell } from 'react-feather';
import { apiRequest } from '../api/apiRequest';
import Language from './language';
import { useTranslation } from 'react-i18next';

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
                navbar.style.top = '-80px';
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
const NavHeader2 = () => {
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const { t } = useTranslation()
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let navItems = []
    userData?.user_type === "investor" && (navItems = [
        { id: "1", items: "Selling Startups", path: 'sell-business' },
        { id: "2", items: "Favorite Startups", path: '/fav-business' },
        { id: "3", items: t("NDA_CONTRACT"), path: "/Initial-contract" },
        { id: "4", items: t("Bus_CONTRACT"), path: "/business-contract" },
    ])
    userData?.user_type === "business" && (navItems = [
        { id: "2", items: t("INVESTOR_LIST"), path: 'investor-list' },
        // { id: "3", items: t("Favorite_Investor_List"), path: '/fav-investor' },
        { id: "4", items: t("NDA_CONTRACT"), path: "/Initial-contract" },
        { id: "5", items: t("Bus_CONTRACT"), path: "/business-contract" },
        { id: "1", items: "My Startup", path: '/my-startup' },
    ])
    const [hoveredItemId, setHoveredItemId] = useState(null);
    const [notifications, setNotifications] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleHover = (itemId) => {
        setHoveredItemId(itemId);
        handleClose()
    };

    const handleLogout = () => {
        window.localStorage.removeItem('globasity_user_data')
        window.localStorage.removeItem('globasity_Login_Form')
        dispatch(setLogin(false));
        navigate('/login')
    };
    const getNotification = () => {
        const body = new FormData()
        body.append('type', 'get_unseen')
        body.append('to_id', userData?.user_id)
        apiRequest({ body })
            .then((result) => {
                setNotifications(result.count)
            }).catch((err) => {
                console.log(err)
            });
    }
    //Dependency removed : userData,
    useEffect(() => {
        getNotification()
    }, [hoveredItemId, show])

    return (
        <>
            <ScrollHandler />
            <Navbar bg="white" expand="lg" sticky="top" className='main_nav px-sm-4 px-3 py-4 ' id="navbar">
                <Container fluid="xxl" className='px-sm-3 px-0' >
                    <Navbar.Brand className='order_1' >
                        <Link to='/' style={{ textDecoration: "none" }} className='text_primary' >
                            <img src={logo} alt='' className='' style={{ width: "7.7rem" }} />
                        </Link>
                    </Navbar.Brand>
                    <Nav className='order_3 flex-row ms-lg-0 ms-auto'>
                        <div className='d-flex align-items-center gap-3'>
                            <div className='bell'>
                                {/* <Dropdown className='p-0' align={"end"} > */}
                                <Link to={'/notification'} className='fs_09 px-0 border-0 display_flex' >
                                    <div className='position-relative'>
                                        <Bell className='text-black' />
                                        {notifications > 0 && <div className='bell_notify bg-danger'> {notifications} </div>}
                                    </div>
                                </Link>
                                {/* <Dropdown.Menu> */}
                                {/* <div className='px-3'>{"No-Notification"}</div> */}
                                {/* {userData?.user_type === "business" && <NavLink to={'/my-business'} className='dropdown-item w-100 fs_09 h-100'> My Business</NavLink>}
                                        {userData?.user_type === "business" && <NavLink to={'/create-business'} className='dropdown-item w-100 fs_09 h-100'> Create Business</NavLink>}
                                        <div onClick={handleLogout} style={{ cursor: "pointer" }} className='dropdown-item w-100 fs_09 h-100'> Logout</div>
                                    */}
                                {/* </Dropdown.Menu> */}
                                {/* </Dropdown> */}
                            </div>
                            <Profile handleLogout={handleLogout} />
                        </div>
                    </Nav>
                    <Navbar.Toggle onClick={handleShow} className='ms-3 border-0 p-0 mb-0' style={{
                        fontSize: "13px",
                        paddingInline: "6px",
                    }} >
                        <img src={icon2} alt='' className='' style={{ width: "80%" }} />
                    </Navbar.Toggle>
                    <Nav className='nav_link mx-lg-auto fs_09 order_2 gap-lg-5  d-none d-lg-flex' >
                        {navItems.map(items => (
                            <NavLink className={''} onClick={() => handleHover(items.id)} key={items.id} to={items.path}>
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
                                    <NavLink className={''} onClick={() => handleHover(items.id)}
                                        key={items.id} to={items.path}>
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
                            </Nav>
                        </Offcanvas>
                    </Nav>
                </Container>
            </Navbar>
        </>

    )
}

export default NavHeader2
