import React from "react";
// import { useTranslation } from "react-i18next";
// eslint-disable-next-line
import Modal from "react-bootstrap/Modal";
import { Facebook, Linkedin, Twitter } from "react-feather";

const DetailModel = ({
  handleClose,
  header,
  detail,
  logo,
  image,
  type,
  brief,
  facebook,
  linkedin,
  twitter,
}) => {
  // const { t } = useTranslation();
  const handleClick = () => {
    handleClose();
  };
  return (
    <>
      <Modal.Header className="mx-3">
        {/* eslint-disable-next-line */}
        <a
          type="button"
          class="btn-close btn-special"
          aria-label="Close"
          onClick={handleClick}
        ></a>
        <div className="header-card-design popins_semibold">{header}</div>
      </Modal.Header>
      <div>
        <div className="p-4 image-card-detail">
          <img src={image} className="card-img-top image-custom" alt="..." />
        </div>
        <div className="logo-position image-card-detail d-flex justify-content-between align-items-end mx-3 flex-resp align-resp">
          <div className="d-flex gap-3 flex-resp">
            <div className="resp-center">
              <img
                src={logo}
                className="card-img-top image-custom logo-design"
                alt="..."
              />
            </div>
            <div className="d-flex justify-content-end flex-column resp-center resp-gap">
              <div className="popins_semibold head-design mb-2">{header}</div>
              <div className="popins_semibold">
                <span className="type-design">{type}</span>
              </div>
            </div>
          </div>
      
              <div>
                <ul
                  className="social-icons align-items-center justify-content-center"
                  style={{ listStyle: "none" }}
                >
                  <li className="fb">
                    <a href={facebook} target="_blank" rel="noreferrer">
                      <Facebook className="img_icon text-white" />
                    </a>
                  </li>
                  <li className="ins">
                    <a href={linkedin} target="_blank" rel="noreferrer">
                      <Linkedin className="img_icon text-white" />
                    </a>
                  </li>
                  <li className="twitter">
                    <a href={twitter} target="_blank" rel="noreferrer">
                      <Twitter className="img_icon text-white" />
                    </a>
                  </li>
                </ul>
              </div>
         
        </div>
      </div>
      <Modal.Body className="modal-body-custom">
        <div className="px-3">
          <div className="custom-border-top p-3 popins_semibold">{brief}</div>
          <div className="custom-border-top"></div>
          <div className="p-3 desc-design mb-3">{detail}</div>
        </div>
      </Modal.Body>
      {/* 
      <Modal.Footer style={{ justifyContent: "space-between" }}>
        <div>
          <div>
            <ul
              className="social-icons  align-items-center justify-content-center"
              style={{ listStyle: "none" }}
            >
              <li className="fb">
                <a href={facebook} target="_blank" rel="noreferrer">
                  <Facebook className="img_icon text-white" />
                </a>
              </li>
              <li className="ins">
                <a href={linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="img_icon text-white" />
                </a>
              </li>
              <li className="twitter">
                <a href={twitter} target="_blank" rel="noreferrer">
                  <Twitter className="img_icon text-white" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <span className="header-type">{type}</span>
      </Modal.Footer> */}
    </>
  );
};

export default DetailModel;
