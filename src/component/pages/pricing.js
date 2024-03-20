/* eslint-disable no-unused-vars */
import React from 'react'
import { Container } from 'react-bootstrap'
import priceBanner from '../assests/png/pricingBanner.png'
import invest_img2 from '../assests/invest_img2.png'
import star from '../assests/png/Star.png'
import Footer from './pagesComponent/footer'
import PricingCard from './pagesComponent/pricingCard'
import Accordion from 'react-bootstrap/Accordion';
import Register from './pagesComponent/register'
import { useTranslation } from 'react-i18next'
import DollarIcon from '../assests/svg/DollarIcon'

const Pricing = () => {
  const { t } = useTranslation()
  return (
    <div>
      <div className='main' id="pricing">
        <Container fluid="xxl" className="px-0 mb-3">
          <section className='px-3'>
            <div className='pt-5 banner_main px-3'>
              <div className='row ps-md-5 ps-1' >
                <div className='col-md-8 pricing_col_1 ' >
                  <h4 className='m-0 p-0'>{t("Pick_Plan")} </h4>
                  <p className=''>{t("Pricing_plan")}</p>
                </div>
                <div className='col-md-4' style={{ display: 'flex', justifyContent: 'center' }}>
                    <div style={{ width: '-webkit-fill-available', maxWidth: '100px' }}>
                      <DollarIcon />
                    </div>
                </div>
              </div>
            </div>

          </section>
          <section className='pt-5'>
            <div className='d-flex align-items-center justify-content-center gap-5  flex-md-row flex-sm-column  flex-wrap  mt-4'>
              <PricingCard amount="$49.99" content={t("Professional_Plan")} bg="#FFBE16" subcription={t("Month_sub")} />
              {/* <PricingCard amount="$5" content={t("BTN_INVESTOR")} bg="#9CD161" subcription={t("Per_contract")} /> */}

            </div>
          </section>

          <section className=' py-5 my-4 ' id='queries' style={{ width: "100%" }}>
            <div className='d-flex flex-column align-items-center justify-content-center queries_header'>
              <span >
                {t("FAQ")}
              </span>
            </div>

          </section>
          <section className='d-flex justify-content-center align-items-center flex-column px-md-0 px-3'>
            <Accordion className='text-center col-md-7 col-sm-10'>
              <Accordion.Item eventKey="0" className='mb-2'>
                <Accordion.Header>{t("Q1")}</Accordion.Header>
                <Accordion.Body>
                  {t("ANS1")}
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
            <Accordion className='text-center col-md-7 col-sm-10'>
              <Accordion.Item eventKey="1"  className='mb-2'>
                <Accordion.Header>{t("Q2")}</Accordion.Header>
                <Accordion.Body>
                  {t("ANS2")}
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
            <Accordion className='text-center col-md-7 col-sm-10'>
              <Accordion.Item eventKey="2" className='mb-2'>
                <Accordion.Header >{t("Q3")}</Accordion.Header>
                <Accordion.Body>
                  {t("ANS3")}
                </Accordion.Body>
              </Accordion.Item>

            </Accordion>
            <Accordion className='text-center col-md-7 col-sm-10'>
              <Accordion.Item eventKey="3" className='mb-2'>
                <Accordion.Header>{t("Q4")}</Accordion.Header>
                <Accordion.Body>
                  {t("ANS4")}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
          </section>
        </Container>
        <Footer />
      </div>
    </div>
  )
}

export default Pricing
