import React from 'react';
import Slider from 'react-infinite-logo-slider';

const LogoSlider = ({ logos }) => {
  return (
    <Slider
      width="250px"
      duration={10}
      pauseOnHover={false}
      blurBorders={true}
      blurBoderColor={'#fff'}
    >
      {logos.map((logo, index) => (
        <Slider.Slide key={index}>
          {typeof logo === 'string' ? (
            <img src={logo} alt={`logo-${index}`} className='w-36' />
          ) : (
            <div>{logo}</div>
          )}
        </Slider.Slide>
      ))}
    </Slider>
  );
};

export default LogoSlider;
