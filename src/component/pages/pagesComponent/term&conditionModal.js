/* eslint-disable no-unused-vars */
import React from 'react'
import { Modal } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

const TermConditionModal = ({ show, setShow, title, data }) => {
    return (
        <div> <Modal show={show} onHide={() => setShow(false)} centered>
            <Modal.Header className="border-0 fs_11 popins_semibold" closeButton>
                {title}
            </Modal.Header>
            <Modal.Body className='px-4'>
                <ul className='ps-4 gap-3'>
                    {data?.map((items, index) => (
                        <li key={index} className='mb-2' style={{ textAlign: "justify" }}>
                            {items}
                        </li>
                    ))}
                </ul>
                {/* <button type='button' onClick={() => setShow(false)} className='btn1 mx-auto btn2 btn2 mt-4 fs_09 btn_primary rounded_3 px-4 py-2' >
                    {t("Close")}
                </button> */}
            </Modal.Body>
        </Modal></div>
    )
}

export default TermConditionModal