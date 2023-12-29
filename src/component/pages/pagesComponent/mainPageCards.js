import React from 'react'



const MainPageCards = (props) => {
    return (
        <>
            <div className='mainCards mt-md-3 mt-0'>
                <span >
                    {props.amount}
                </span>
                <div className='blue_border'>
                    <img src={props.img} style={{ width: "50px" }} className=' display_flex2' alt='' />
                </div>
                <p className='m-0 pt-1'>
                    {props.name}
                </p>

            </div>
        </>


    )
}

export default MainPageCards
