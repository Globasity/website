import React from 'react'
import InvestmentCard from './pagesComponent/investmentCard'
import { Container } from 'react-bootstrap'
import profile from '../assests/png/cardimg1.png'

const Investment = () => {
    const detail = [
        {
            name: "Atif",
            profile: profile,
            amountPer: "22",
            description: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."
        },
        {
            name: "Sarmad",
            profile: profile,
            amountPer: "24",
            description: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."
        },
        {
            name: "Zeeshan",
            profile: profile,
            amountPer: "20",
            description: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."
        },
        {
            name: "Ahmer",
            profile: profile,
            amountPer: "30",
            description: "Lorem ipsum is a placeholder text commonly used to demonstrate the visual form of a document or a typeface without relying on meaningful content. Lorem ipsum may be used as a placeholder before final copy is available."
        },
    ]
    return (
        <>
            <Container fluid="xxl" className="px-0">
                <section className='mt-5'>
                    <Container fluid="lg">
                        <div className='mb-5'>
                        <h5 className='popins_semibold text-center mb-0'>
                            Investment
                        </h5>
                        <div className='fs_08 popins_light text-center'>Your investment business</div>
                        </div>
                        <div>
                            <div className='row contentCenter'>
                                {detail.map((items, index) => (
                                    <div key={index} className='col-xl-4 col-lg-5 col-md-6 col-sm-9  p-2'>
                                        <InvestmentCard name={items.name} profile={items.profile} description={items.description} amountPer={items.amountPer}  />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Container>
                </section>
            </Container>
        </>
    )
}

export default Investment