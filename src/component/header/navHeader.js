/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useRef } from "react";
import { Navbar, Nav, Container, Form, Offcanvas } from "react-bootstrap";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./navbar.css";
import icon2 from "../assests/svg/icon2.svg";
import logo from "../assests/logo2.png";
import Language from "./language";
import { useTranslation } from "react-i18next";
import Button from "../pages/pagesComponent/button";
import { ChevronDown, ChevronUp } from "react-feather";
import Dropdown from "react-bootstrap/Dropdown";
import NavItem from "react-bootstrap/NavItem";

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
      const navbar = document.getElementById("navbar");
      const scrollPosition = window.scrollY;
      if (scrollPosition > prevScrollY.current) {
        // navbar.style.top = '-80px';
      } else {
        navbar.style.top = "0";
      }
      prevScrollY.current = scrollPosition;
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Empty dependency array means this effect runs once after the initial render

  return null;
}
const NavHeader = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const handleLoginClick = () => {
    navigate("/login");
  };

  const navItems = [
    { id: "1", items: t("Home"), path: "/" },
    { id: "6", items: "Startups", path: "/startups" },
    { id: "7", items: "investors", path: "/investors" },
    // { id: "3", items: t("Pricing"), path: "/pricing" },
    { id: "5", items: t("Contact"), path: "/contact" },
  ];

  const navItems2 = [
    { id: "2", items: t("Home"), path: "/" },
    { id: "3", items: "Startups", path: "/startups" },
    { id: "4", items: "investors", path: "/investors" },
    { id: "5", items: t("Contact"), path: "/contact" },
    { id: "1", items: "Login", path: "/login" },
  ];
  const [hoveredItemId, setHoveredItemId] = useState(null);
  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleShow2 = () => setShow2(true);
  const handleHover = (itemId) => {
    setHoveredItemId(itemId);
    handleClose();
  };

  const handleMouseHover = (itemId) => {
    setHoveredItemId(itemId);
  };
  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };
  // const buttonContent =
  //   location.pathname === "/startups" || location.pathname === "/investors"
  //     ? "Register"
  //     : "Login";
  const selectedPagePath = location.pathname;
  const isStartups = selectedPagePath === "/startups";
  const isInvestors = selectedPagePath === "/investors";
  return (
    <>
      <ScrollHandler />
      <Navbar
        bg="white"
        expand="lg"
        sticky="top"
        className="main_nav px-sm-4 px-3 py-4"
        id="navbar"
      >
        <Container fluid="xxl" className="px-sm-3 px-0 main_nav2">
          <Navbar.Brand className="order_1">
            <Link
              to="/"
              style={{ textDecoration: "none" }}
              className="text_primary"
            >
              <img src={logo} alt="" className="" style={{ width: "7.7rem" }} />
            </Link>
          </Navbar.Brand>
          <Nav
            className="order_3 flex-row align-items-center ms-lg-0 ms-auto mb-1 resp-button-none"
            style={{ marginRight: "7px" }}
          >
            {/*<span className='xs_none'> <Language login={false} /></span> */}
            <Link
              to={
                "/login"
              }
            >
              <Button
                type="inverse"
                padding=".5rem 1.7rem"
                fs="14px"
                content={"Login"}
              />
            </Link>
          </Nav>
          <Nav
            className="order_3 flex-row align-items-center ms-lg-0 ms-auto mb-1"
            style={{ gap: "10px" }}
          >
            {/*<span className='xs_none'> <Language login={false} /></span> */}
            <Link
              to={
                "/sign-up"
              }
            >
              <Button
                type="header"
                padding=".5rem 1.7rem"
                fs="14px"
                content={"Register"}
              />
            </Link>
          </Nav>
          <Navbar.Toggle
            onClick={handleShow}
            className="ms-2 border-0 p-0 mb-1"
            style={{
              fontSize: "13px",
              paddingInline: "6px",
            }}
          >
            <img src={icon2} alt="" className="" style={{ width: "80%" }} />
          </Navbar.Toggle>
          <Nav className="nav_link mx-lg-auto fs_09 order_2  d-none d-lg-flex">
            {navItems.map((item) =>
              item.id === "6" ? (
                <Dropdown
                  key={item.id}
                  show={show2 && hoveredItemId === item.id}
                  onMouseEnter={() => handleMouseHover(item.id)}
                  onMouseLeave={handleMouseLeave}
                  onToggle={handleShow2}
                  
                >
                  <Dropdown.Toggle
                    as={Nav.Link}
                    style={{
                      color: isStartups || selectedPagePath === item.path ? "#FFBE16" : ""
                    }}
                    active={location.pathname === item.path}
                  >
                    {item.items}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink
                      to={"/startups#main"}
                      className="nav-default w-100 fs_09 h-100"
                    >
                      Portfolio
                    </NavLink>
                    <NavLink
                      to={"/startups#ourValues"}
                      className="nav-default w-100 fs_09 h-100"
                    >
                      Why Us?
                    </NavLink>
                    <NavLink
                      to={"/sign-up"}
                      className="nav-default w-100 fs_09 h-100"
                    >
                      Register Now
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              ) : item.id === "7" ? (
                <Dropdown
                  key={item.id}
                  show={show2 && hoveredItemId === item.id}
                  onMouseEnter={() => handleMouseHover(item.id)}
                  onMouseLeave={handleMouseLeave}
                  onToggle={handleShow2}
                >
                  <Dropdown.Toggle
                    as={Nav.Link}
                    active={location.pathname === item.path}
                    style={{
                      color: isInvestors || selectedPagePath === item.path ? "#FFBE16" : ""
                    }}
                  >
                    {item.items}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <NavLink
                      to={"/investors#main"}
                      className=" w-100 fs_09 h-100 nav-default"
                    >
                      Portfolio
                    </NavLink>
                    <NavLink
                      to={"/investors#ourValues"}
                      className=" w-100 fs_09 h-100 nav-default"
                    >
                      Why Us?
                    </NavLink>
                    <NavLink
                      to={"/sign-up"}
                      className=" w-100 fs_09 h-100 nav-default"
                    >
                      Register Now
                    </NavLink>
                  </Dropdown.Menu>
                </Dropdown>
              ) : (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => handleHover(item.id)}
                  onMouseEnter={() => handleMouseHover(item.id)}
                  onMouseLeave={handleMouseLeave}
                  className={`nav-link ${
                    location.pathname === item.path ? "active" : ""
                  }`}
                >
                  <span
                    style={{
                      color: location.pathname === item.path ? "#FFBE16" : "",
                    }}
                  >
                    {item.items}
                  </span>
                </NavLink>
              )
            )}
          </Nav>

          <Nav>
            <Offcanvas
              show={show}
              onHide={handleClose}
              placement={"top"}
              className="main_nav pb-3"
            >
              <Offcanvas.Header closeButton></Offcanvas.Header>
              <Nav className="nav_link fs_10 justify-content-center align-items-center  gap-3">
                {navItems2.map((items) => (
                  <NavLink
                    className={""}
                    onClick={() => handleHover(items.id)}
                    key={items.id}
                    to={items.path}
                  >
                    <span className="">{items.items}</span>
                    <div
                      key={items.id}
                      className={`${
                        hoveredItemId === items.id ? "visible1" : "visible1"
                      }`}
                    >
                      <span className="border1">
                        <span></span>
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
  );
};

export default NavHeader;
