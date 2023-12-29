/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { Fragment, useEffect, useRef } from 'react'
import './chat.css'
import ChatList from '../messages/chatList'
// import search from '../assests/search.svg'
import { Container, Form } from 'react-bootstrap'
import ChatMessageList from '../messages/chatMessageList'
import { useState } from 'react'
// import logo from '../assests/logo.svg'
// import { getChat } from '../api/instructor.js/chat'
import profileAvatar from '../assests/png/profileAvatar.png'
import { Search } from 'react-feather'
import { useLocation } from 'react-router-dom'
import { apiRequest } from '../api/apiRequest'
import { useTranslation } from 'react-i18next'

const Message2 = () => {
    const [chatlist, setChatlist] = useState([])
    const [chatlist2, setChatlist2] = useState([])
    const [chatLoading, setChatLoading] = useState(false);
    const [chatDetail, setChatDetail] = useState()
    const [reload, setReload] = useState(false)
    const [showChat, setShowChat] = useState(false);
    const [checkMsg, setCheckMsg] = useState(false)
    const [check, setCheck] = useState(false)
    const [activeChatId, setActiveChatId] = useState(null);
    const { state } = useLocation()
    const { businessUserId, investorUserId } = state ? state : {}
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const { t } = useTranslation()
    useEffect(() => {
        if (userData?.user_type === "business" && investorUserId) {
            setActiveChatId(investorUserId)
        } else if (userData?.user_type === "investor" && businessUserId) {
            setActiveChatId(businessUserId)
        }

    }, [investorUserId, businessUserId])
    const [searchInput, setSearchInput] = useState('');

    // Your code to fetch and set chatList

    const handleSearchInputChange = (event) => {
        const searchText = event.target.value;
        setSearchInput(searchText);
        const filteredChatList = chatlist2?.filter((user) => {
            // Assuming user has a 'name' property
            return user?.sender_name?.toLowerCase().includes(searchText?.toLowerCase());
        });
        setChatlist(filteredChatList)
    };

    useEffect(() => {
        if (!searchInput) {
            setChatlist(chatlist2)
        }
    }, [searchInput])
    const getChatList = async () => {
        setReload(false)
        const body = new FormData()
        body.append('type', 'chat_list')
        body.append('user_id', userData?.user_id)
        await apiRequest({ body })
            .then((result) => {
                const data = result.chat
                const sortedChatlist = data.sort((a, b) => parseInt(a.timestamp, 10) - parseInt(b.timestamp, 10));
                setChatlist(sortedChatlist);
                setChatlist2(sortedChatlist)
            }).catch((err) => {
                console.log(err)
            });
    }
    useEffect(() => {
        if (reload === true)
            getChatList()
    }, [reload])
    useEffect(() => {
        getChatList()
    }, [])
    return (
        <Container fluid={'lg'} className='px-0'>
            <div className='pt-4'>
                <div className="bg-lightgray">
                    <div className="">
                        <div className="chat_grid ">
                            <div className={` chat_screen ${!showChat ? "" : "d_chat_none"} `}>
                                <div className='pb-1' >
                                    <h4 className="fs_12 semi_bold_heading my-4 px-3 sk_modernist_regular">{t("Messages")}</h4>
                                    <hr style={{ color: "#EDEEF0" }} className="mb-1" />
                                    <div className=" px-3">
                                        <div className='position-relative ' >
                                            <div className='search_icon ' > <Search /> </div>
                                            <Form.Control
                                                type='search'
                                                className='search ps-5 py-2 rounded-3'
                                                placeholder={`${t("Search")}....`}
                                                value={searchInput}
                                                onChange={handleSearchInputChange}
                                            // onReset={handleClearSearch}

                                            />
                                        </div>
                                    </div>
                                    <hr style={{ color: "#EDEEF0" }} className="my-1" />
                                    <div className="chat_height_contol scrolbar" >
                                        {
                                            <>
                                                {chatlist?.map((chat, index) => (
                                                    <Fragment key={index}>
                                                        <ChatList
                                                            id={chat?.sender_id}
                                                            img={chat?.sender_img ? `${chat?.sender_img}` : profileAvatar}
                                                            name={chat?.sender_name}
                                                            notify={chat?.unseen > 0 ? chat?.unseen : ""}
                                                            discrip={chat?.msg}
                                                            timestamp={chat?.timestamp}
                                                            data={chat}
                                                            setChatDetail={setChatDetail}
                                                            setCheckMsg={setCheckMsg}
                                                            setCheck={setCheck}
                                                            setShowChat={setShowChat}
                                                            setChatLoading={setChatLoading}
                                                            activeId={activeChatId}
                                                            setActiveChatId={setActiveChatId} // Pass the setActiveChatId function as a prop
                                                        />
                                                    </Fragment>
                                                ))}
                                            </>
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className={`chat_screen ${showChat ? "" : "d_chat_none"} `} id='chatScreen'>
                                {
                                    check ?
                                        (<ChatMessageList chatDetail={chatDetail && chatDetail} activeId={activeChatId} setReload={setReload} setCheckMsg={setCheckMsg} checkMsg={checkMsg} setChatLoading={setChatLoading} setShowChat={setShowChat} />)
                                        :
                                        (<div className='display_flex2 flex-column h-100 w-100' >
                                            {/* <img src={logo} alt='' className='logo me-1' /> */}
                                            <h4 className='popins_semibold ms-2 my-0 fs_12' >
                                                Globasity
                                            </h4>
                                            <h6 className='text-center sk_modernist_regular text_light fs_08 w_lg_80 mt-1'>
                                                {t("About_Paragraph1")}
                                            </h6>
                                        </div>)
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Container>
    )
}

export default Message2