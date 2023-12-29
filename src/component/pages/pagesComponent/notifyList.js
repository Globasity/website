/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import notifyIcon from '../../assests/logo2.png'
import { apiRequest } from '../../api/apiRequest'
import { useNavigate } from 'react-router-dom'

const NotifyList = ({ to_id, description, title, seen, setCheck }) => {
    const navigate = useNavigate()
    const updateNotification = (data) => {
        setCheck(true)
        const body = new FormData()
        body.append('type', 'noti_seen')
        body.append('to_id', data)
        apiRequest({ body })
            .then((result) => {
                navigate('/notification')
                // console.log(result)

            }).catch((err) => {
                console.log(err)
            });
    }



    return (
        <div className='d-flex col-xl-6 col-lg-8 mx-auto align-items-center gap-3 px-2 py-2 rounded_4 mb-3 shadow2 ' style={{ position: "relative", cursor: "pointer" }} onClick={() => updateNotification(to_id)} >
            <div className='position-relative'>
                <img src={notifyIcon} alt='' className='bg-light rounded-circle' style={{ height: "3.6rem", width: '3.6rem', objectFit: "contain" }} />
                {parseInt(seen) === 0 && <div className='bell_notify2 bg-danger'></div>}
            </div>
            <div className='d-flex flex-column justify-content-between'>
                <h6 className='fs_09 popins_semibold mb-0'>
                    {title}
                </h6>
                <div className='fs_08'>
                    {description}
                </div>
            </div>

        </div>
    )
}

export default NotifyList