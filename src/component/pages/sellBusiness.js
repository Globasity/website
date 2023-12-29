/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import profile from '../assests/png/cardimg1.png'
import DetailCard from './pagesComponent/detailCard'
import { useState } from 'react'
import { apiRequest } from '../api/apiRequest'
import { useEffect } from 'react'
import Footer from './pagesComponent/footer'
import { useTranslation } from 'react-i18next'
import paper from '../assests/png/paper.png'
import BackToTop from './pagesComponent/backToTop'


const SellBusiness = () => {
    const userData = JSON.parse(window.localStorage.getItem('globasity_user_data'))
    const [allBusinessType, setAllBusinessType] = useState([]);
    const [businessType, setBusinessType] = useState([]);
    const [businessStatus, setBusinessStatus] = useState([]);
    const [allBusinessType2, setAllBusinessType2] = useState([]);
    const [array, setArray] = useState([]);
    const [lastId, setLastId] = useState(null);
    const [counts, setCounts] = useState(null);
    const [loaderCounts, setLoaderCounts] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const lastIdRef = useRef();
    const { t } = useTranslation()
    let userLangauge = JSON.parse(window.localStorage.getItem('globasity_language'))
    useEffect(() => {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        userLangauge = JSON.parse(window.localStorage.getItem('globasity_language'))
    }, [t])
    const getBusinessType = () => {
        const body = new FormData()
        body.append('table_name', 'business_types')
        body.append('type', 'get_data')
        apiRequest({ body })
            .then((result) => {
                setBusinessType(result.data)
            }).catch((err) => {
                console.log(err)
            });
    }
    const getStatusType = () => {
        const body = new FormData()
        body.append('table_name', 'business_status')
        body.append('type', 'get_data')
        apiRequest({ body })
            .then((result) => {
                setBusinessStatus(result.data)
            }).catch((err) => {
                console.log(err)
            });
    }
    const getAllBusiness = (lastId, isLike = false) => {
        const body = new FormData()
        body.append('table_name', 'business')
        body.append('type', 'get_data')
        body.append('user_id', userData.user_id)
        body.append('last_id', lastId === null ? "" : lastId)
        body.append('fav', '1')
        apiRequest({ body })
            .then((result) => {
                const count = result?.data?.length
                setAllBusinessType(result.data)
                setAllBusinessType2(result.data)
                isLike === false && updateLastId(result?.data[count - 1].id)
            }).catch((err) => {
                console.log(err)
            });
    }
    const getBusinessOnScroll = (lastId) => {
        setIsLoading(true)
        const body = new FormData()
        body.append('table_name', 'business')
        body.append('type', 'get_data')
        body.append('user_id', userData.user_id)
        body.append('last_id', lastId)
        body.append('fav', '1')
        apiRequest({ body })
            .then((result) => {
                const count = result?.data?.length
                const data = result.data
                setLoaderCounts(data.length)
                if (lastId !== result?.data[count - 1].id) {
                    if (data.length > 0) {
                        setArray(data)
                        updateLastId(result?.data[count - 1].id)
                    }
                }
                setIsLoading(false)

            }).catch((err) => {
                setLoaderCounts(0)
                setIsLoading(false)
                console.log(err)
            });
    }
    useEffect(() => {
        getStatusType()
        getBusinessType()
        getAllBusiness(lastId)
    }, [])
    useEffect(() => {
        if (array.length !== counts) {
            setCounts(array.length)
            setAllBusinessType((prevData) => [...prevData, ...array]);
            setAllBusinessType2((prevData) => [...prevData, ...array]);
        }
    }, [array])
    const [formData, setFormData] = useState({
        businessStatus: '',
        businessType: '',
    });
    const filteredBusinessData = allBusinessType2?.filter((business) => {
        const { businessStatus, businessType } = formData;
        if (businessStatus && businessStatus !== '' && business?.business_status !== businessStatus) {
            return false;
        }
        if (businessType && businessType !== '' && business?.business_type !== businessType) {
            return false;
        }
        return true;
    });
    const handleFormSubmit = (e) => {
        e.preventDefault();
        setAllBusinessType(filteredBusinessData)

    };
    const handleClear = () => {
        setAllBusinessType(allBusinessType2)
        setFormData({
            businessStatus: '',
            businessType: '',
        });
    }
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

    return (
        <>
            <Container fluid="xxl" className="px-0" ref={sectionRef} >
                <BackToTop />
                <section >
                    <Container fluid="lg">
                        <div className='border p-4 rounded-4 my-5 shadow1'>
                            <h6 className='popins_medium mb-3'>{t("ADVANCE_SEARCH")}</h6>
                            <Form onSubmit={handleFormSubmit}>
                                <div className='display_flex gap-md-4 flex_wrap'>
                                    <Form.Group className='w-100'>
                                        <Form.Label className='fs_08 ps-2 mb-2'>{t("TITLE_B_STATUS")}</Form.Label>
                                        <Form.Select name="businessStatus" value={formData.businessStatus} onChange={handleInputChange}>
                                            <option value="">{t("PLACE_B_STATUS")}</option>
                                            {businessStatus?.length > 0 && businessStatus?.map((item) => (
                                                userLangauge === "en" && (
                                                    <option key={item.id} value={userLangauge === "en" ? item.status_eng : item.status_heb}>
                                                        {userLangauge === "en" ? item.status_eng : item.status_heb}
                                                    </option>
                                                )
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group className='w-100'>
                                        <Form.Label className='fs_08 ps-2 mb-2'>{t("TITLE_B_TYPE")}</Form.Label>
                                        <Form.Select name="businessType" value={formData.businessType} onChange={handleInputChange}>
                                            <option value="" className='fs_09'>{t("PLACE_B_TYPE")}</option>
                                            {businessType?.length > 0 && businessType?.map((item) => (
                                                userLangauge === "en" && (
                                                    <option key={item.id} value={userLangauge === "en" ? item.name_eng : item.name_heb}>
                                                        {userLangauge === "en" ? item.name_eng : item.name_heb}
                                                    </option>
                                                )
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                </div>
                                <Form.Group>
                                    <div className='display_flex gap-3 flex_wrap'>
                                        <button type='submit' className='btn1 fs_09 btn_primary rounded_3 px-3 py-2'>{t("Search")}</button>
                                        <button onClick={handleClear} type='button' className='btn1 fs_09 btn_primary_outline rounded_3 px-3 py-2'>{t("Clear")}</button>
                                    </div>
                                </Form.Group>
                            </Form>
                        </div>
                        <div >
                            <div className='row contentCenter'>
                                {allBusinessType?.length > 0 ?
                                    allBusinessType?.map((items) => (
                                        items?.user?.is_active === "true" &&
                                        <div key={items.id} className='col-xl-4 col-lg-5 col-md-6 col-sm-9  p-2'>
                                            <DetailCard getAllBusiness={getAllBusiness}
                                                id={items.id}
                                                url={items.url}
                                                lastId={lastId}
                                                name={items.name}
                                                favourite={items.favourite}
                                                profile={items.thumb}
                                                businessData={items}
                                                description={items.description}
                                                amountPer={items.requested_amount} />
                                        </div>
                                    ))
                                    : <div className='d-flex justify-content-center flex-column align-items-center'>
                                        <img src={paper} alt='' className='paper' />
                                        <div className='mt-1'>{t("No_Business_Found")}</div>
                                    </div>}
                            </div>
                        </div>
                    </Container>
                </section>
                {(allBusinessType?.length > 0 && loaderCounts > 0 && (formData.businessStatus === '' || formData.businessType === '')) &&
                    (allBusinessType?.length >= 10 &&
                        <button button disabled={isLoading} className='btn1 fs_09 btn_primary rounded_3 px-3 py-2 mx-auto my-5' onClick={() => getBusinessOnScroll(lastId)}>
                            {isLoading ? <Spinner size='sm' /> : t("Load_More")}
                        </button>
                    )
                }
                {/* {(isLoading && loaderCounts > 0) &&
                    <div className='my-4'>
                        <div className={`d-flex justify-content-center ${isLoading === false && "visibles"}`} style={{ height: "2rem" }}>
                            <Spinner size='large' />
                        </div>
                    </div>} */}
            </Container >
        </>
    )
}

export default SellBusiness