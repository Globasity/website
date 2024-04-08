/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import NotifyList from "./pagesComponent/notifyList";
import { Container } from "react-bootstrap";
import { apiRequest } from "../api/apiRequest";
import { useState } from "react";
import { Fragment } from "react";
import BackToTop from "./pagesComponent/backToTop";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";

const Notification = () => {
  const [pageLoad, setPageLoad] = useState(true);
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );
  const [notifyData, setNotifyData] = useState([]);
  const [check, setCheck] = useState(false);
  const getNotification = () => {
    const body = new FormData();
    body.append("table_name", "notifications");
    body.append("type", "get_data");
    body.append("to_id", userData?.user_id);
    apiRequest({ body })
      .then((result) => {
        setNotifyData(result.data);
        setPageLoad(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNotification();
    setCheck(false);
  }, [check]);
  return (
    <>
      {pageLoad ? (
        <div className="w-100 vh_90 main_app d-flex justify-content-center align-items-center">
          <div className="d-flex align-items-center position-relative">
            <div className="position-absolute"></div>
          </div>
          <CircularProgress size={"3rem"} />
        </div>
      ) : (
        <div className="mt-5">
          <BackToTop />
          <Container>
            {notifyData ? (
              notifyData?.map((items, index) => (
                <Fragment key={index}>
                  <NotifyList
                    description={items.description}
                    seen={items.seen}
                    setCheck={setCheck}
                    title={items.title}
                    to_id={items.to_id}
                  />
                </Fragment>
              ))
            ) : (
              <h6 className="my-5 px-2 text-center">No notifications!</h6>
            )}
          </Container>
        </div>
      )}{" "}
    </>
  );
};

export default Notification;
