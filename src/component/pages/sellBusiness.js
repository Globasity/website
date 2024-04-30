/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef } from "react";
import { Button, Container, Form, Spinner } from "react-bootstrap";
import profile from "../assests/png/cardimg1.png";
import DetailCard from "./pagesComponent/detailCard";
import { useState } from "react";
import { apiRequest } from "../api/apiRequest";
import { useEffect } from "react";
import Footer from "./pagesComponent/footer";
import { useTranslation } from "react-i18next";
import paper from "../assests/png/paper.png";
import BackToTop from "./pagesComponent/backToTop";
import { countries } from "countries-list";
import CircularProgress from "@mui/material/CircularProgress";

const SellBusiness = () => {
  const userData = JSON.parse(
    window.localStorage.getItem("globasity_user_data")
  );
  const [allBusinessType, setAllBusinessType] = useState([]);
  const [businessType, setBusinessType] = useState([]);
  const [businessStatus, setBusinessStatus] = useState([]);
  const [allBusinessType2, setAllBusinessType2] = useState([]);
  const [array, setArray] = useState([]);
  const [lastId, setLastId] = useState(null);
  const [counts, setCounts] = useState(null);
  const [loaderCounts, setLoaderCounts] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [pageLoad, setPageLoad] = useState(true);
  const [display, setDisplay] = useState(true);
  const lastIdRef = useRef();
  const { t } = useTranslation();
  let userLangauge = JSON.parse(
    window.localStorage.getItem("globasity_language")
  );
  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    userLangauge = JSON.parse(
      window.localStorage.getItem("globasity_language")
    );
  }, [t]);
  const getBusinessType = () => {
    const body = new FormData();
    body.append("table_name", "business_types");
    body.append("type", "get_data");
    apiRequest({ body })
      .then((result) => {
        setBusinessType(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getStatusType = () => {
    const body = new FormData();
    body.append("table_name", "business_status");
    body.append("type", "get_data");
    apiRequest({ body })
      .then((result) => {
        setBusinessStatus(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getAllBusiness = (lastId, isLike = false) => {
    const body = new FormData();
    body.append("table_name", "business");
    body.append("type", "get_data");
    body.append("user_id", userData.user_id);
    body.append("last_id", lastId === null ? "" : lastId);
    body.append("fav", "1");
    apiRequest({ body })
      .then((result) => {
        const count = result?.data?.length;
        setAllBusinessType(result.data);
        setAllBusinessType2(result.data);
        setPageLoad(false);
        isLike === false && updateLastId(result?.data[count - 1].id);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // const getBusinessOnScroll = (lastId) => {
  //     setIsLoading(true)
  //     const body = new FormData()
  //     body.append('table_name', 'business')
  //     body.append('type', 'get_data')
  //     body.append('user_id', userData.user_id)
  //     body.append('last_id', lastId)
  //     body.append('fav', '1')
  //     apiRequest({ body })
  //         .then((result) => {
  //             const count = result?.data?.length
  //             const data = result.data
  //             setLoaderCounts(data.length)
  //             if (lastId !== result?.data[count - 1].id) {
  //                 if (data.length > 0) {
  //                     setArray(data)
  //                     updateLastId(result?.data[count - 1].id)
  //                 }
  //             }
  //             setIsLoading(false)

  //         }).catch((err) => {
  //             setLoaderCounts(0)
  //             setIsLoading(false)
  //             console.log(err)
  //         });
  // }

  const getBusinessOnScroll = (lastId) => {
    setIsLoading(true);
    const body = new FormData();
    body.append("table_name", "business");
    body.append("type", "get_data");
    body.append("user_id", userData.user_id);
    body.append("last_id", lastId);
    body.append("fav", "1");

    apiRequest({ body })
      .then((result) => {
        const count = result?.data?.length;
        const data = result.data;
        setLoaderCounts(data.length);
        if (lastId !== result?.data[count - 1].id) {
          if (data.length > 0) {
            setArray((prevArray) => [...prevArray, ...data]);
            setLastId(result?.data[count - 1].id);
            setAllBusinessType((prevData) => [...prevData, ...data]);
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
    getStatusType();
    getBusinessType();
    getAllBusiness(lastId);
  }, []);
  // useEffect(() => {
  //     if (array.length !== counts) {
  //         setCounts(array.length)
  //         setAllBusinessType((prevData) => [...prevData, ...array]);
  //         setAllBusinessType2((prevData) => [...prevData, ...array]);
  //     }
  // }, [array])
  const [formData, setFormData] = useState({
    businessStatus: "",
    businessType: "",
    searchText: "",
    location: "",
  });
  const filteredBusinessData = allBusinessType2?.filter((business) => {
    const { businessStatus, businessType } = formData;
    if (
      businessStatus &&
      businessStatus !== "" &&
      business?.business_status !== businessStatus
    ) {
      return false;
    }
    if (
      businessType &&
      businessType !== "" &&
      business?.business_type !== businessType
    ) {
      return false;
    }
    return true;
  });
  //   const handleFormSubmit = (e) => {
  //     e.preventDefault();
  //     setAllBusinessType(filteredBusinessData)
  //     console.log(formData);
  //   };

  const handleFormSubmit = (e) => {
    setDisplay(false);
    e.preventDefault();
    if (
      formData.businessStatus !== "" ||
      formData.businessType !== "" ||
      formData.searchText !== "" ||
      formData.location !== ""
    ) {
      const formData = new FormData(e.target);

      formData.append("table_name", "business");
      formData.append("type", "get_data");
      formData.append("limit", "100000");
      formData.append("user_id", userData.user_id);
      formData.append("fav", "1");

      apiRequest({ body: formData })
        .then((result) => {
          const data = result.data;
          setAllBusinessType(data);
        })
        .catch((err) => {
          console.error("Error fetching filtered business data:", err);
        });
    }
  };

  const handleClear = () => {
    setDisplay(true);
    if (
      formData.businessStatus !== "" ||
      formData.businessType !== "" ||
      formData.searchText !== "" ||
      formData.location !== ""
    ) {
      getAllBusiness(null);
      setFormData({
        businessStatus: "",
        businessType: "",
        searchText: "",
        location: "",
      });
    }
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const sectionRef = useRef();

  // useEffect(() => {
  //     function handleScroll() {
  //         const windowHeight = window.innerHeight;
  //         const documentHeight = document.documentElement.scrollHeight;
  //         const scrollPosition = window.scrollY;
  //         if (scrollPosition + windowHeight + 6 >= documentHeight + 5) {
  //             const currentLastId = lastIdRef.current;
  //             console.log(currentLastId)
  //             if (isLoading === false && loaderCounts > 0) {
  //                 if (currentLastId !== null) {
  //                     getBusinessOnScroll(currentLastId);
  //                 }
  //             }
  //         }
  //     }

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

  return <></>;
};

export default SellBusiness;
