import React from 'react'
import tick from "../../assests/png/Tick Square.png"
import { Container } from 'react-bootstrap'
const Register = () => {
    return (
        <div>
            <section className='main' id='register'>
                <Container fluid="xxl" className="px-0" >
                    <div className='registration ' >
                        <p className='text-center'>
                            Register for our ‍Free 7-Day Trial now!
                        </p>

                    </div>

                    <div className='d-flex flex-lg-row  flex-column  justify-content-lg-between align-items-center mx-auto gap-4 w-75 mt-3' style={{ padding: "1rem 10rem" }}>
                        <div className='d-flex align-items-center gap-2 suggestion'>
                            <img width="24px" src={tick} alt='tick' />
                            <p className='m-0' style={{ fontFamily: "Popins_medium", whiteSpace: "nowrap" }}>
                                No credit card required
                            </p>
                        </div>
                        <div className='d-flex align-items-center suggestion  gap-2'>
                            <img width="24px" src={tick} alt='tick' />
                            <p className='m-0 ' style={{ fontFamily: "Popins_medium", whiteSpace: "nowrap" }}>
                                Cancel anytime
                            </p>
                        </div>
                    </div>
                    <div className='pb-5 pt-2 mb-5' >
                        <div className='email_section  mx-auto'>
                            <input type="email" placeholder="Enter your email address" className="form-control" />
                            <button className='child_btn'>
                                Subscribe Now
                            </button>
                        </div>
                        <button className='child_btn2 d-sm-none mt-3 mx-auto' >
                            Subscribe Now
                        </button>
                    </div>
                </Container>

            </section>
        </div>
    )
}
export default Register