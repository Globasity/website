import React, { useEffect, useState } from 'react';
import Slider from 'react-infinite-logo-slider';

const LogoSlider = ({ logos }) => {
  const [shouldBlur, setShouldBlur] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      setShouldBlur(window.innerWidth > 600);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <Slider
      width="250px"
      duration={10}
      pauseOnHover={false}
      blurBorders={shouldBlur}
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
