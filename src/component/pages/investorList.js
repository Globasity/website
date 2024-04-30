/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Container, Spinner } from "react-bootstrap";
import profile from "../assests/png/cardimg1.png";
import InvestorCard from "./pagesComponent/investorCard";
import { apiRequest } from "../api/apiRequest";
import { useEffect } from "react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import paper from "../assests/png/paper.png";
import BackToTop from "./pagesComponent/backToTop";
import CircularProgress from "@mui/material/CircularProgress";
import FavInvestorList from "./favInvestorList";

const InvestorList = () => {
  const { t } = useTranslation();
  const [investors, setInvestors] = useState([]);
  const [array, setArray] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [toggle, setToggle] = useState(true);
  const [pageLoad, setPageLoad] = useState(true);
  const [counts, setCounts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const lastIdRef = useRef();
  const sectionRef = useRef();
  const [loaderCounts, setLoaderCounts] = useState(1);
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );

  const getInvestors = (lastId) => {
    const body = new FormData();
    body.append("table_name", "users");
    body.append("type", "get_data");
    body.append("user_type", "investor");
    body.append("last_id", lastId === null ? "" : lastId);
    body.append("user_id", userData.user_id);
    body.append("fav", "1");
    apiRequest({ body })
      .then((result) => {
        setInvestors(result.data);
        setPageLoad(false);
        const count = result?.data?.length;
        let arr = [];
        updateLastId(result?.data[count - 1].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getInvestorOnScroll = (lastId) => {
    setIsLoading(true);
    const body = new FormData();
    body.append("table_name", "users");
    body.append("type", "get_data");
    body.append("user_type", "investor");
    body.append("user_id", userData.user_id);
    body.append("fav", "1");
    body.append("last_id", lastId === null ? "" : lastId);
    apiRequest({ body })
      .then((result) => {
        const count = result?.data?.length;
        const data = result.data;
        setLoaderCounts(data.length);
        setPageLoad(false);
        if (lastId !== result?.data[count - 1].id) {
          if (data.length > 0) {
            // setArray(data);
            // setCounts(array.length);
            setInvestors((prevData) => [...prevData, ...data]);
            updateLastId(result?.data[count - 1].id);
          }
        }
        setIsLoading(false);
      })
      .catch((err) => {
        setLoaderCounts(0);
        setIsLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    getInvestors(lastId);
  }, []);
  // useEffect(() => {
  //     function handleScroll() {
  //         const windowHeight = window.innerHeight;
  //         const documentHeight = document.documentElement.scrollHeight;
  //         const scrollPosition = window.scrollY;
  //         if (scrollPosition + windowHeight + 6 >= documentHeight + 5) {
  //             // Call your function when scrolled to the bottom of the page
  //             const currentLastId = lastIdRef.current;
  //             if (isLoading === false && loaderCounts > 0) {
  //                 if (currentLastId !== null) {
  //                     getInvestorOnScroll(currentLastId);
  //                 }
  //             }
  //         }
  //     }

  //     // Add the scroll event listener to the window
  //     window.addEventListener('scroll', handleScroll);
  //     return () => {
  //         // Remove the event listener when the component unmounts
  //         window.removeEventListener('scroll', handleScroll);
  //     };
  // }, []);
  const updateLastId = (newLastId) => {
    setLastId(newLastId);
    lastIdRef.current = newLastId;
  };
  const handleToggle = (data) => {
    setToggle(data);
  };
  // useEffect(() => {
  //   if (array.length !== counts) {
  //     setCounts(array.length);
  //     setInvestors((prevData) => [...prevData, ...array]);
  //   }
  // }, [array]);
  return <></>;
};

export default InvestorList;
