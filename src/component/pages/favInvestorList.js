/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useRef } from 'react'
import { Container, Spinner } from 'react-bootstrap'
import profile from '../assests/png/cardimg1.png'
import InvestorCard from './pagesComponent/investorCard'
import { apiRequest } from '../api/apiRequest'
import { useEffect } from 'react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import paper from '../assests/png/paper.png'

const FavInvestorList = () => {
    const { t } = useTranslation()
    const [investors, setInvestors] = useState([])
    const [array, setArray] = useState([]);
    const [lastId, setLastId] = useState(null);
    const [counts, setCounts] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const lastIdRef = useRef();
    const sectionRef = useRef();
    const [loaderCounts, setLoaderCounts] = useState(1);


    const getInvestors = (lastId) => {
        const body = new FormData()
        body.append('table_name', 'investor_favourites')
        body.append('type', 'get_data')
        body.append('user_type', "investor")
        body.append('last_id', lastId === null ? "" : lastId)
        apiRequest({ body })
            .then((result) => {
                setInvestors(result.data)
                const count = result?.data?.length
                let arr = []
                updateLastId(result?.data[count - 1].id)
            }).catch((err) => {
                console.log(err)
            });
    }
    const getInvestorOnScroll = (lastId) => {
        setIsLoading(true)
        const body = new FormData()
        body.append('table_name', 'investor_favourites')
        body.append('type', 'get_data')
        body.append('user_type', "investor")
        body.append('last_id', lastId === null ? "" : lastId)
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
        getInvestors(lastId)
    }, [])
    useEffect(() => {
        function handleScroll() {
            const windowHeight = window.innerHeight;
            const documentHeight = document.documentElement.scrollHeight;
            const scrollPosition = window.scrollY;
            if (scrollPosition + windowHeight + 6 >= documentHeight + 5) {
                // Call your function when scrolled to the bottom of the page
                const currentLastId = lastIdRef.current;
                if (isLoading === false && loaderCounts > 0) {
                    if (currentLastId !== null) {
                        getInvestorOnScroll(currentLastId);
                    }
                }
            }
        }

        // Add the scroll event listener to the window
        window.addEventListener('scroll', handleScroll);
        return () => {
            // Remove the event listener when the component unmounts
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const updateLastId = (newLastId) => {
        setLastId(newLastId);
        lastIdRef.current = newLastId;
    };
    useEffect(() => {
        if (array.length !== counts) {
            setCounts(array.length)
            setInvestors((prevData) => [...prevData, ...array]);
        }
    }, [array])
    return (
        <>
            <Container fluid="xxl" className="px-0" ref={sectionRef}>
                <section className='mt-5'>
                    <Container fluid="lg">
                        <div className='mb-5'>
                            <h5 className='popins_semibold text-center mb-0'>{t("Favorite_Investor_Lists")}</h5>
                            <div className='fs_08 popins_light text-center mt-1'>{t("investor_profile")}</div>
                        </div>
                        <div>
                            <div className='row contentCenter'>
                                {investors?.length > 0 ? investors.map((items, index) => (
                                    <div key={index} className='col-xl-4 col-lg-5 col-md-6 col-sm-9  p-2'>
                                        <InvestorCard investorId={items.id} name={items.name} profile={items.thumb} description={items.company_description} totalAmount={items.invested_amount} lastInvest={0} />
                                    </div>
                                )) :
                                    <div className='d-flex justify-content-center flex-column align-items-center'>
                                        <img src={paper} alt='' className='paper' />
                                        <div className='mt-1'>{t("No_Investor_Found")}</div>
                                    </div>}
                            </div>
                        </div>
                    </Container>
                </section>

                {loaderCounts > 0 &&
                    <div className={`d-flex justify-content-center ${isLoading === false && "visibles"}`} style={{ height: "2rem" }}>
                        <Spinner size='large' />
                    </div>}
            </Container>
        </>
    )
}

export default FavInvestorList