/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import ChatMessage from './chatMessage'
import { Link, useNavigate } from 'react-router-dom'
import { ChevronLeft, File, FilePlus, Image, Paperclip, Send, Trash } from 'react-feather'
import { useState } from 'react'
import { useEffect } from 'react'
// import { createChat, getChat, updateChat } from '../api/instructor.js/chat'
import profileAvatar from '../assests/png/profileAvatar.png'
import { Dropdown, Form, Spinner } from 'react-bootstrap'
import { apiRequest, apiRequestFile } from '../api/apiRequest'
import { Fragment } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'

const ChatMessageList = ({ chatDetail, setShowChat, setCheckMsg, checkMsg, setReload, activeId, }) => {
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const [chatMsg, setChatMsg] = useState([]);
    const [timeStamp, setTimeStamp] = useState('');
    const [isFileLoader, setIsFileLoader] = useState(false)
    const [isDelete, setIsDelete] = useState(false)
    const [fileType, setFileType] = useState('');
    const [isImageDelete, setIsImageDelete] = useState(false);
    const [businessData2, setBusinessData2] = useState('')
    const [lengthCount, setLengthCount] = useState(0)
    const chatMessagesRef = useRef(null);
    const { t } = useTranslation()
    const getFormattedDate = (date) => {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };
    const getFormattedTime = (date) => {
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const period = hours >= 12 ? 'pm' : 'am';
        const formattedHours = String(hours % 12 || 12).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        return `${formattedHours}:${formattedMinutes} ${period}`;
    };
    useEffect(() => {
        console.clear()
    }, []);
    useEffect(() => {
        if (checkMsg === true) {
            setCheckMsg(false)
            setChatMsg([])
        }
        if (chatDetail) {
            getBusinessContract(chatDetail)
            getChatData()
        }
    }, [chatDetail])
    const navigate = useNavigate()
    const [formInfo, setFormInfo] = useState(null)
    const handleBusinessCreate = (business2, contractDetail) => {
        navigate('/business-contract-view', { state: { businessData: business2, url: business2?.url, contractDetail: contractDetail, businessCotract: true } })
    }
    const getBusinessContract = (data) => {
        const body = new FormData()
        body.append('table_name', 'business_contract')
        body.append('type', 'get_data')
        userData.user_type === "investor" ? body.append('investor_id', userData.user_id) : body.append('investor_id', data.sender_id)
        userData.user_type === "business" ? body.append('business_user', userData.user_id) : body.append('business_user', data.sender_id)
        apiRequest({ body })
            .then((result) => {
                if (result.data.length > 0) {
                    if (result.data.length >= 2) {
                        const data = result.data
                        let count = 0
                        data.forEach(element => {
                            if (element?.business_base64 === "" || element?.investor_base64 === "") {
                                count = count + 1
                            }
                        });
                        if (count > 0) {
                            setLengthCount(result.data.length)
                        } else {
                            setLengthCount(0)
                        }
                    } else {
                        setLengthCount(0)
                    }
                    setBusinessData2(result.data[0])
                    getDataForViewContract(result.data[0])
                } else {
                    setLengthCount(0)
                }
            }).catch((err) => {
                setLengthCount(0)
                console.log(err)
            });
    }
    const getDataForViewContract = async (data) => {
        const body = new FormData();
        body.append('table_name', 'bc_form');
        body.append('type', 'get_data');
        body.append('investor_id', data.investor_id);
        body.append('business_user', data.business_user.id);
        body.append('business_id', data.business_id);
        apiRequest({ body })
            .then((result) => {
                if (result?.length > 0 || result?.data?.length > 0) {
                    setFormInfo(result.data)
                }
            }).catch((err) => {
                console.log(err)
                toast.error(err.message)
            });
    }

    const getChatData = async () => {
        const data = {
            to_chat_id: chatDetail?.sender_id,
            user_id: userData.user_id,
        };
        const body = new FormData()
        body.append('type', 'getchat')
        body.append('user_id', data.user_id)
        body.append('to_chat_id', data.to_chat_id)
        await apiRequest({ body })
            .then((result) => {
                const reversedChatArray = [...result.chat].reverse();
                setChatMsg(reversedChatArray);
            }).catch((err) => {
                console.log(err)
            });
    };
    useEffect(() => {
        if (isDelete === false) {
            if (chatMessagesRef.current) {
                chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
                window.scrollTo(0, chatMessagesRef.current.scrollHeight);
            }
        }
    }, [chatMessagesRef.current, chatMsg, isDelete]);
    const currentDate = new Date();
    const formattedDate = getFormattedDate(currentDate);
    const formattedTime = getFormattedTime(currentDate);
    const sendMessage = async (e) => {
        e.preventDefault();
        const input = document.getElementById('chatInput');
        const message = input?.value;
        await sendMessageApi(message, "text")
        input.value = '';
    };
    useEffect(() => {
        if (chatMsg.length > 0) {
            const intervalId = setInterval(() => {
                const data = {
                    sender_id: userData.user_id,
                    time: formattedTime,
                    datetime: formattedDate,
                    // msg: message,
                }
                const body = new FormData()
                body.append('type', 'checkmsg')
                body.append('user_id', data.sender_id)
                body.append('to_chat_id', chatDetail?.sender_id)
                body.append('timestamp', timeStamp)
                apiRequest({ body })
                    .then((result) => {
                        const lenghtChat = result?.chat?.length
                        // console.log(lenghtChat)
                        // console.log(chatMsg?.length, "chatmsg")
                        if (lenghtChat !== undefined) {
                            if (lenghtChat > chatMsg?.length) {
                                setTimeStamp(result.chat[lenghtChat - 1].timestamp)
                                setIsImageDelete(false)
                                const newMsg = result.chat[lenghtChat - 1]
                                setIsDelete(false)
                                setReload(true)
                                setChatMsg([...chatMsg, newMsg]);
                                return
                                // getChatData()
                            } else if (lenghtChat < chatMsg?.length) {
                                setTimeStamp(result.chat[lenghtChat - 1].timestamp)
                                const newMsg = result.chat
                                setIsDelete(false)
                                setReload(true)
                                newMsg.forEach(element => {
                                    if (element?.sender_id !== userData?.user_id) {
                                        setChatMsg([...chatMsg, element]);
                                    }
                                });
                                return
                            }
                        }

                    }).catch((err) => {
                        console.log(err)
                    });
            }, 100);
            return () => clearInterval(intervalId);
        }

    }, [chatDetail, isImageDelete, chatMsg]);
    const [showDropdown, setShowDropdown] = useState(false);
    const sendMessageApi = async (message, type) => {
        const timestamp = Math.floor(currentDate.getTime() / 1000);
        const data = {
            sender_id: userData.user_id,
            time: formattedTime,
            timestamp: timestamp,
            msg: message,
            dumyImg: imageFiles.length > 0 && (URL.createObjectURL(imageFiles[0])),
            msg_type: type,
            chatDetail: chatDetail,
        }
        setChatMsg([...chatMsg, data]);
        chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        const scrollTimeout = setTimeout(() => {
            chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
        }, 0.00000001);
        const body = new FormData()
        body.append('type', 'sendmsg')
        body.append('user_id', data.sender_id)
        body.append('msg', data.msg)
        body.append('timestamp', data.timestamp)
        body.append('to_chat_id', chatDetail?.sender_id)
        body.append('msg_type', data.msg_type)
        await apiRequest({ body })
            .then((result) => {
                if (result.result) {
                    setReload(true)
                    setTimeStamp(result.timestamp)
                    setImageFiles([])
                    setDocumentFiles([])
                    setIsDelete(false)
                    getChatData()
                    clearTimeout(scrollTimeout)
                }
            }).catch((err) => {
                console.log(err)
            });
    }
    const sendFile = async (file) => {
        setIsFileLoader(true)
        await apiRequestFile(file)
            .then(async (result) => {
                // console.log(result)
                if (result.result) {
                    setIsFileLoader(false)
                    setIsDelete(false)
                    handleDropdownHide()
                    await sendMessageApi(result.file_name, fileType)
                }
            }).catch((err) => {
                setIsFileLoader(false)
                console.log(err)
            });
    }
    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };
    const handleDropdownHide = () => {
        setShowDropdown(false);
    };
    const [documentFiles, setDocumentFiles] = useState([]);
    const [imageFiles, setImageFiles] = useState([]);

    const handleFileChange = (event, fileTypes) => {
        const selectedFiles = event.target.files;

        // Handle different file types
        if (fileTypes === 'file') {
            setDocumentFiles(selectedFiles);
            setFileType('file')

        } else if (fileTypes === 'image') {
            setFileType('image')
            setImageFiles(selectedFiles);
        }
    };
    const fileInputRef = useRef(null);
    const handleTrashBtn = () => {
        fileInputRef.current.value = null
        setImageFiles([])
        setDocumentFiles([])
    }
    return (
        <div className='chat_height position-relative' >
            <div className="px-3 py-2 boxshadow">
                <div className='d-flex justify-content-between align-items-center gap-3 flex-wrap'>
                    <div className="display_flex _link_">
                        <div className='d_left_button' onClick={() => { setShowChat(false) }}>
                            <ChevronLeft />
                        </div>
                        <div>
                            <img src={chatDetail.sender_img ? `${chatDetail.sender_img}` : profileAvatar} alt="" className="chat_profile_img" /></div>
                        <div className="ps-sm-3 ps-2">
                            <h5 className="chat_detail chat_profile">
                                {chatDetail?.sender_name}
                            </h5>
                        </div>

                    </div>
                    {
                        lengthCount >= 2 ? <>
                            <button className='btn1 chat_profile_btn btn_primary rounded_3 px-2 py-2' onClick={() => navigate('/business-contract')}>{t("Bus_create")}</button></> :
                            (businessData2?.length > 0 && ((businessData2?.business_base64 !== "" || businessData2?.investor_base64 !== "") &&
                                <div className=''>
                                    <button className='btn1 chat_profile_btn btn_primary rounded_3 px-2 py-2' onClick={() => handleBusinessCreate(businessData2, formInfo)}>{t("Bus_create")}</button>
                                </div>))
                    }
                </div>
            </div>

            <div className="position-relative">
                <div ref={chatMessagesRef} className="chat-messages scrolbar px-2 py-3"  >
                    {
                        chatMsg?.map((msg, index) => (
                            <Fragment key={index}>
                                <ChatMessage
                                    img={msg?.dumyImg}
                                    id={msg?.id}
                                    msg_type={msg?.msg_type}
                                    left={msg?.sender_id === userData?.user_id ? false : true}
                                    message={msg?.msg}
                                    date={msg?.datetime}
                                    timestamp={msg?.timestamp}
                                    setIsDelete={setIsDelete}
                                    index={index}
                                    setIsImageDelete={setIsImageDelete}
                                    time={`${msg?.time}`}
                                    chatMsg={chatMsg}
                                    setChatMsg={setChatMsg} />
                            </Fragment>))
                    }
                </div>
            </div>
            <form onSubmit={sendMessage}>
                {imageFiles.length > 0 &&
                    <div className=' position-absolute selected_img'>
                        <div className='position-relative d-flex flex-column justify-content-between h-100'>
                            <button className='text-danger trash btn1' disabled={isFileLoader} style={{ zIndex: "10" }} onClick={handleTrashBtn}>
                                <Trash />
                            </button>
                            <div className='position-relative h-100'>
                                {!isFileLoader ?
                                    <img
                                        src={URL.createObjectURL(imageFiles[0])}
                                        alt='SelectedImage'
                                        className='w-100 h-100'
                                    /> :
                                    <div className=' position-absolute d-flex justify-content-center align-items-center h-100' style={{ inset: "0", backgroundColor: "rgba(0,0,0,0.25)", borderRadius: "inherit", zIndex: "2" }} >
                                        <Spinner />
                                    </div>}
                            </div>
                            <div className='d-flex mt-2 justify-content-between align-items-center gap-3'>
                                <p className='m-0'> {imageFiles[0].name}</p>
                                <button className="send_btn rounded-3 ms-auto bg_darkSec" type='button' disabled={isFileLoader} onClick={() => sendFile(imageFiles[0])}>
                                    <Send className='text-white p-0 m-0' style={{ width: "1.2rem" }} />
                                </button>
                            </div>

                        </div>

                    </div>}
                {documentFiles.length > 0 &&
                    <div className=' position-absolute selected_img'>
                        <div className='position-relative d-flex flex-column justify-content-between h-100'>

                            <div className='h-100 d-grid justify-content-center align-items-center '>

                                <div className='file_doc m-auto position-relative'>
                                    <button className='text-danger trash2 btn1' disabled={isFileLoader} style={{ zIndex: "10" }} onClick={handleTrashBtn}>
                                        <Trash />
                                    </button>
                                    {!isFileLoader ?
                                        <File className='w-100 h-100'></File>
                                        : <div className=' position-absolute d-flex justify-content-center align-items-center h-100' style={{ inset: "0", backgroundColor: "rgba(0,0,0,0.25)", borderRadius: "inherit", zIndex: "2" }} >
                                            <Spinner />
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className='d-flex mt-2 justify-content-between align-items-center gap-3'>
                                <p className='m-0'> {documentFiles[0].name}</p>
                                <button className="send_btn rounded-3 ms-auto bg_darkSec " disabled={isFileLoader} type='button' onClick={() => sendFile(documentFiles[0])}>
                                    <Send className='text-white p-0 m-0' style={{ width: "1.2rem" }} />
                                </button>
                            </div>

                        </div>

                    </div>}
                <div className=" position-absolute bottom-0  w-100">
                    <div className="d-flex my-3 mx-3 gap-2">
                        <div className="send_btn2 bg-light  rounded-circle" type='button'>
                            <Dropdown show={showDropdown} onToggle={handleDropdownToggle} onHide={handleDropdownHide}>
                                <Dropdown.Toggle variant='transparent' id="dropdown-basic">
                                    <Paperclip className='text-black p-0 m-0' style={{ width: "1.2rem" }} />
                                </Dropdown.Toggle>
                                <Dropdown.Menu>
                                    <div className='position-relative dropdown-item'>
                                        <Form.Control
                                            type='file'
                                            className='file_adjust'
                                            onClick={handleDropdownHide}
                                            accept='.doc, .docx, .pdf, .txt'
                                            ref={fileInputRef}
                                            onChange={(e) => handleFileChange(e, 'file')}
                                        />
                                        <FilePlus />
                                    </div>

                                    <div className='position-relative dropdown-item'>
                                        <Form.Control
                                            type='file'
                                            className='file_adjust'
                                            onClick={handleDropdownHide}
                                            ref={fileInputRef}
                                            accept='.jpg, .png, .jpeg'
                                            onChange={(e) => handleFileChange(e, 'image')}
                                        />
                                        <Image />
                                    </div>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>

                        <div className="position-relative w-100" >
                            <input type="text" id="chatInput" disabled={imageFiles.length > 0 || documentFiles.length > 0} required className="form-control rounded-3 ps-2 py-2 fs_10 " placeholder="Try to..." />
                        </div>
                        <button className={`send_btn rounded-3 ${(imageFiles.length === 0 && documentFiles.length === 0) ? "bg_darkSec" : "bg-secondary"}`} disabled={imageFiles.length > 0 || documentFiles.length > 0} type='submit'>
                            <Send className='text-white p-0 m-0' style={{ width: "1.2rem" }} />
                        </button>
                    </div>
                </div>
            </form>

        </div>
    )
}

export default ChatMessageList