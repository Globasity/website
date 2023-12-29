import React from 'react'
import { GiBackwardTime } from 'react-icons/gi'
const WaitForLogin = () => {
  return (
    <div className='w-100 d-grid justify-content-center align-items-center px-4 py-5' style={{height:"89vh"}} >
      <div>
        <div className='display_flex2 mb-3'>
          <GiBackwardTime  className='fs_50 text-warning'/>
        </div>
        <h6 className='popins_medium text-center'>
          Please be patient, as the activation process may require up to 24 hours.
        </h6>
      </div>

    </div>
  )
}

export default WaitForLogin
