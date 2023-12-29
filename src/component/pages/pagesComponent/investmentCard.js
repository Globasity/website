import React from 'react'
import { Link } from 'react-router-dom'

const InvestmentCard = ({name, amountPer, description, profile}) => {
    return (
        <>
            <div className='border p-3 rounded-4 shadow1'>
                <div className='display_flex justify-content-between'>
                    <div className='display_flex'>
                        <img alt='' className='detailCard_image' src={profile} />
                        <div className='ms-3'>
                            {name}
                            <div className='fs_08'>Raised Amount: <span className=' popins_semibold '>{amountPer}%</span></div>
                        </div>
                    </div>
                </div>
                <hr className=' mx-4' style={{ opacity: "0.12" }}></hr>
                <div className='popins_light fs_08 text_detail2'>
                    {description}
                </div>
                <div  className='mt-4'>
                <Link to={'/investment-detail'}>
                    <button className='w-75 btn1 fs_09 btn_primary rounded_3 px-3 py-2 mx-auto'>
                        Investment Detail
                    </button>
                </Link>
                </div>
            </div>
        </>
    )
}

export default InvestmentCard