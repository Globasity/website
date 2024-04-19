/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React from 'react'
import { Dropdown } from 'react-bootstrap'
import avatar from '../assests/png/profileAvatar.png'
import { NavLink } from 'react-router-dom'
import Language from './language'
import { useTranslation } from 'react-i18next'

const Profile = ({ handleLogout }) => {
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const { t } = useTranslation()
    return (
        <div className='profileData' >
            <Dropdown className='p-0' align={"end"} >
                <Dropdown.Toggle variant='white' id="" className='fs_09 px-0 border-0 display_flex' >
                    <img style={{ objectFit: 'cover' }} src={userData?.user_image ? userData?.url + userData?.user_image : avatar} className='profile' alt='' />
                    <span className='ms-1 d-sm-flex d-none'> {userData?.user_name}</span>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <NavLink to={'/my-profile'} className='dropdown-item w-100 fs_09 h-100'> {t("my_Profile")}</NavLink>
                    {/* {userData?.user_type === "business" && <NavLink to={'/my-business'} className='dropdown-item w-100 fs_09 h-100'> {t("My_bus")}</NavLink>} */}
                    {/* {userData?.user_type === "business" && <NavLink to={'/create-business'} className='dropdown-item w-100 fs_09 h-100'> {t("Bus_create")} </NavLink>} */}
                    {/* {userData?.user_type === "business" && <NavLink to={'/fav-investor'} className='dropdown-item w-100 fs_09 h-100'> {t("Favorite_Investor")} </NavLink>} */}
                    {/* Language_removed <div className='py-1 lang px-0 w-100 fs_09 h-100'>   <Language login={true} /></div> */}
                    <NavLink to={'/chat'} className='dropdown-item w-100 fs_09 h-100'> {t("Chat")}</NavLink>
                    <div onClick={handleLogout} style={{ cursor: "pointer" }} className='dropdown-item  w-100 fs_09 h-100'> {t("Logout")}</div>

                </Dropdown.Menu>
            </Dropdown>

        </div>
    )
}

export default Profile