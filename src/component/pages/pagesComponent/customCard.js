/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import DetailModel from "./detailModel";
import Modal from "react-bootstrap/Modal";

function CustomCard({ image, title, description, type, linkedin, facebook, twitter }) {
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
  const truncatedDescription = truncateDescription(description, 13);
  return (
    <>
      {/* eslint-disable-next-line */}
      <a onClick={handleShow} className="text-dec-none">
        <div className="custom-card">
          <img src={image} className="card-img-top" alt="..." />
          <div className="card-body">
            <h5 className="popins_semibold">{title}</h5>
            <p className="poppins_regular">{truncatedDescription}</p>
          </div>
        </div>
      </a>
      <Modal show={show} onHide={handleClose}>
        <DetailModel
          handleClose={handleClose}
          header={title}
          type={type}
          logo={image}
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
