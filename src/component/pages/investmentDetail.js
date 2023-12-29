import React from 'react'
import { Accordion, Container } from 'react-bootstrap'
import profile from '../assests/png/cardimg1.png'
const InvestmentDetail = () => {
    const detail = [
        {
            name: "Atif",
            profile: profile,
            amount: "24",
        },
        {
            name: "Sarmad",
            profile: profile,
            amount: "24",
        },
        {
            name: "Zeeshan",
            profile: profile,
            amount: "20",
        },
        {
            name: "Ahmer",
            profile: profile,
            amount: "30",
        },
    ]
    return (
        <>
            <Container fluid="xxl" className="px-0">
                <section className='mt-5'>
                    <Container fluid="lg">
                        <div className='mb-5'>
                            <h5 className='popins_semibold text-center mb-0'>
                                Investment Detail
                            </h5>
                            <div className='fs_08 popins_light text-center'>Detail of your investment page</div>
                        </div>
                        <div>
                            <div className='border p-4 rounded-3 my-5 shadow1'>
                                <h6 className='popins_semibold mb-3'>
                                    Business Description
                                </h6>
                                <p className='text_secondary' style={{ fontSize: "0.85rem" }}>
                                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available.
                                    Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available
                                </p>
                            </div>
                            <div className='border p-3 rounded-3 my-5 shadow1'>
                                <h6 className='popins_semibold '>
                                    Investment Graph
                                </h6>                               
                            </div>
                            <div className='border invest p-1 rounded-3 my-5 display_flex shadow1'>
                                <Accordion className='text-center border-0 w-100' >
                                    <Accordion.Item eventKey="0" className=' border-0'>
                                        <Accordion.Header className='border-0 popins_semibold fs_10'>Investors</Accordion.Header>
                                        <Accordion.Body className='border-0'>
                                            <div className='row contentCenter' style={{ rowGap: "1rem" }}>
                                                {detail.map((items, index) => (
                                                    <div className='col-xl-3 col-lg-4 col-md-5 col-sm-6' key={index}>
                                                        <div className='border-0 p-2 rounded-3 shadow1'>
                                                            <div className='display_flex justify-content-between'>
                                                                <div className='display_flex'>
                                                                    <img alt='' className='detailCard_image' src={items.profile} />
                                                                    <div className='ms-3 fs_10'>
                                                                        {items.name}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div className='popins_semibold text-center fs_09'>${items.amount}</div>
                                                                    <div className='fs_07 popins_light1' style={{ color: "#1E2131", opacity: "0.8" }}>Total Invest </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </div>
                        </div>
                    </Container>
                </section>
            </Container>
        </>
    )
}
export default InvestmentDetail