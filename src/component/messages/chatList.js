/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { apiRequest } from "../api/apiRequest";
import Moment from "react-moment";
import profileAvatar from "../assests/png/profileAvatar.png";

const ChatList = ({
  name,
  discrip,
  img,
  activeId,
  setActiveChatId,
  setShowChat,
  setChatLoading,
  id,
  timestamp,
  notify,
  data,
  setChatDetail,
  setCheckMsg,
  setCheck,
}) => {
  const [badge, setBadge] = useState(null);
  const handleFileChange = (fileName) => {
    if (fileName) {
      const fileExtension = fileName.split(".").pop().toLowerCase();
      const docExtensions = ["doc", "docx", "pdf", "txt"];
      const imageExtensions = ["jpg", "jpeg", "png"];

      if (docExtensions.includes(fileExtension)) {
        return "Document";
      } else if (imageExtensions.includes(fileExtension)) {
        return "Photo";
      } else {
        // If the extension is not explicitly defined as a document or image, try to guess based on common image formats
        if (fileExtension.match(/^(gif|bmp|svg)$/)) {
          return "Image";
        }
      }
    }
    return fileName; // or handle the case when fileName is empty or undefined
  };
  useEffect(() => {
    // if () {
    // getDataForViewContract()
    // }
  }, []);
  const toggleData = (chatData) => {
    setChatLoading(true);
    setChatDetail(chatData);
    setCheckMsg(true);
    setShowChat(true);
    setCheck(true);
    setActiveChatId(chatData?.sender_id); // Set the active chat ID
    if (notify > 0) {
      setBadge("");
      notifyUpdate(chatData?.sender_id);
    }
  };
  const isActive = id === activeId;
  useEffect(() => {
    if (isActive) {
      toggleData(data);
    }
  }, [activeId, isActive]);
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );

  const notifyUpdate = async (id) => {
    const body = new FormData();
    body.append("type", "msg_seen");
    body.append("to_id", userData?.user_id);
    await apiRequest({ body })
      .then((result) => {
        // console.log(result)
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const validImg = img && !img.endsWith("/");
  return (
    <div>
      <div
        className={`_link_  border-0 `}
        onClick={() => toggleData(data)}
        style={{ cursor: "pointer", padding: "0.6rem 0.8rem" }}
      >
        <div
          className={`d-flex align-items-center chat-list-link px-2 py-2 w-100 ${
            isActive ? "active" : ""
          }`}
        >
          <div className="position-relative">
            <img
              src={validImg ? img : profileAvatar}
              alt="Profile Avatar"
              className="chat_profile_img"
            />
            <span>
              <span
                className="noti_badges fs_06"
                style={{ height: "1.2rem", width: "1.2rem" }}
                id="chatbadge"
              >
                {badge === null ? notify : badge}
              </span>
            </span>
          </div>
          <div className="d-flex justify-content-between align-items-center w-100 pe-1">
            <div className="ps-3 mt-1">
              <h4 className="fs_09 sk_modernist_regular my-0">{name}</h4>
              <div className="chat_detail1 mt-1 fs_08 ">
                {handleFileChange(discrip)}
              </div>
            </div>
            <div>
              <h6
                className="chat_detail fs_08"
                style={{ whiteSpace: "nowrap" }}
              >
                <Moment unix fromNow>
                  {timestamp}
                </Moment>
              </h6>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatList;
