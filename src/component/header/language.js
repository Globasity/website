/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Form } from 'react-bootstrap'
import { useTranslation } from 'react-i18next';

const Language = ({ login }) => {
    const { i18n } = useTranslation();
    const userLangauge = JSON.parse(window.localStorage.getItem('globasity_language'))

    const handleChangeLanguage = (lan) => {
        i18n.changeLanguage(lan)
        window.localStorage.setItem('globasity_language', JSON.stringify(lan))
        // console.clear()
    }
    useEffect(() => {
        handleChangeLanguage(userLangauge)
    }, [userLangauge])
    return (
        <div className='language'>
            <Form.Select
                className={`mb-0 ${login === true && "py-0 px-3"} bg-transparent ${login === false && " shadow3 rounded-3 py-2  ps-2 pe-5 "}`}
                align={"end"}
                onChange={(e) => handleChangeLanguage(e.target.value)} // Use onChange event on Form.Select
                value={userLangauge}>
                <option value="en" style={{ cursor: "pointer" }} className={` lang2 lang3 w-100 fs_09 h-100 ${userLangauge === ("en") && "active"}`}>English</option>
                <option value="he" style={{ cursor: "pointer" }} className={` lang2 lang3 w-100 fs_09 h-100 ${userLangauge === ("he") && "active"}`}>Hebrew</option>
            </Form.Select>

        </div>
    )
}

export default Language