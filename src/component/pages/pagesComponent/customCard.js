/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import DetailModel from "./detailModel";
import Modal from "react-bootstrap/Modal";

function CustomCard({ image, title, description, type, linkedin, facebook, twitter, logo, brief }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  function truncateDescription(description, maxLength) {
    const words = description.split(" ");
    if (words.length > maxLength) {
      return words.slice(0, maxLength).join(" ") + "...";
    }
    return description;
  }
  const truncatedDescription = truncateDescription(description, 10);
  return (
    <>
      {/* eslint-disable-next-line */}
      <a onClick={handleShow} className="text-dec-none">
        <div className="custom-card p-3">
          <img src={image} className="card-img-top" alt="..." />
          <div className="card-body">
            <div className="d-flex align-items-center justify-content-between mb-2 flex-resp-card">
            <div className="popins_semibold head-design">{title}</div>
            <div className="popins_semibold type-design text-center">{type}</div>
            </div>
            <div className="poppins_regular desc-design">{truncatedDescription}</div>
          </div>
        </div>
      </a>
      <Modal show={show} onHide={handleClose}>
        <DetailModel
          handleClose={handleClose}
          header={title}
          type={type}
          image={image}
          logo={logo}
          brief={brief}
          detail={description}
          linkedin={linkedin}
          facebook={facebook}
          twitter={twitter}
        />
      </Modal>
    </>
  );
}

export default CustomCard;
