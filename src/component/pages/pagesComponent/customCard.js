/* eslint-disable no-unused-vars */
import React from 'react';

function CustomCard({ image, href, title, description }) {
  return (
    // eslint-disable-next-line
    <a
      href={href}
      target="_blank"
      className="text-dec-none"
    >
      <div className="custom-card">
        <img src={image} className="card-img-top" alt="..." />
        <div className="card-body">
          <h5 className="fw-bold">{title}</h5>
          <p className="poppins_regular">
            {description}
          </p>
        </div>
      </div>
    </a>
  );
}

export default CustomCard;
