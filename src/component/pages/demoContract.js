import React from 'react'
import { Form } from 'react-bootstrap'

const DemoContract = () => {
    return (
        <div>
            <div className='mt-5'>
                <h6 className='popins_medium mb-3 ps-4'>I, from now on: ("the recipient of the information"), </h6>
                <h6 className='popins_medium mb-4 ps-4'>The undersigned, </h6>
                <h6 className='fs_09 popins_medium mb-3 display_flex gap-sm-4 gap-2 flex_wrap2'>Full name: <Form.Control type='text' className='w-auto' /> </h6>
                <h6 className='fs_09 popins_medium mb-3 display_flex gap-sm-4 gap-2 flex_wrap2'>ID:<Form.Control type='text' className='w-auto' /></h6>
                <h6 className='fs_09 popins_medium mb-3 display_flex gap-sm-4 gap-2 flex_wrap2'>Address: <Form.Control type='text' className='w-auto' /></h6>
                <h6 className='fs_09 popins_medium mb-3 display_flex gap-sm-4 gap-2 flex_wrap2'>H.P. (if applicable):  <Form.Control type='text' className='w-auto' /></h6>
                <h6 className='fs_09 popins_medium mb-3 display_flex gap-sm-4 gap-2 flex_wrap2'>In my name and in the name of the company (Am relevant): <Form.Control type='text' className='w-auto' /></h6>

                <div className='mt-4 pt-3 ps-3'>
                    <h6 className='fs_09 popins_medium mb-3'>Commits to: </h6>
                    <h6 className='fs_09 popins_medium mb-3'>Full name: </h6>
                    <h6 className='fs_09 popins_medium mb-3'>ID: </h6>
                    <h6 className='fs_09 popins_medium mb-3'>Hereafter: ("The Inventor")</h6>
                </div>
                <ol className='fs_09 mt-4 pt-4 ' style={{ minHeight: "20rem" }}>
                    <li>
                        Because I will keep in full confidentiality any confidential information given to me by the inventor, including all
                        idea, information, knowledge, trade information, trade secret, manufacturing method, information regarding to open
                        and planning, diagram, sketch, specification, procedure, process, plan, knowledge documents, proposals between
                        If and technical/commercial/technological and other data, commercial information
                        whether theoretical or practical, whether they are protected by legal rights
                        and whether or not.
                        <ol className='fs_09' type='I' style={{ lineHeight: "1.6", textAlign: "justify" }}>
                            <li>
                                It is hereby clarified that despite what is stated in section 1, it is agreed that this obligation is not
                                Applies to information currently in the public domain
                            </li>
                        </ol>
                    </li>
                    <li>
                        I confirm that I know the special value of the information and that I will use the information
                        Only for the purpose of checking the possibility of cooperation with the inventor.
                    </li>
                    <li>
                        I undertake not to disclose the above to any third party and that I will not act on it
                        Use other than as stated in section 2 above.
                    </li>
                    <li>
                        Harini undertakes to keep the secret information fully confidential, I will not reveal it, no
                        I will allow it to be used, I will not allow it after discovering it, and I will not allow access to it to the uninitiated
                        Licensed, I will not make copies of it or its derivatives, either by myself or through
                        others.
                    </li>
                    <li>
                        Harini undertakes to keep the information at least as carefully and guarded as them
                        It is guarded by the inventor and while taking actual security and safety measures as usual
                        in the industry to prevent its discovery.
                    </li>
                    <li>
                        Harini undertakes to destroy or hand over to the inventor any physical embodiment of the information
                        (of any kind and type) that is in my possession or delivered by and/or on my behalf to another, immediately
                        with the inventor's request to do so.
                    </li>
                </ol>
                <div className='mt-4'>
                    <h6 className='fs_09 popins_medium mb-3'>In witness whereof I have come Signed,</h6>
                    <h6 className='fs_09 popins_medium mb-3'>Full name: </h6>
                    <h6 className='fs_09 popins_medium mb-3'>Date: </h6>
                </div>
            </div>
        </div>
    )
}

export default DemoContract