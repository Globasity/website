import React from "react";
import { useTranslation } from "react-i18next";
// eslint-disable-next-line
import Modal from "react-bootstrap/Modal";
import { Facebook, Linkedin, Twitter, Mail } from "react-feather";

const DetailModel = ({ handleClose, header, detail, logo, type, facebook, linkedin, twitter }) => {
  const { t } = useTranslation();
  const handleClick = () => {
    handleClose();
  };
  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title style={{ display: "flex" }}>
          {header}
          <span className="header-type">{type}</span>
        </Modal.Title>
      </Modal.Header>
      <img src={logo} className="card-img-top" alt="..." />
      <Modal.Body>{detail}</Modal.Body>

      <Modal.Footer style={{ justifyContent: "space-between" }}>
        <div>
          <div>
            <ul
              className="social-icons  align-items-center justify-content-center"
              style={{ listStyle: "none" }}
            >
              <li className="fb">
                <a href={facebook} target="_blank">
                  <Facebook className="img_icon text-white" />
                </a>
              </li>
              <li className="ins">
                <a href={linkedin} target="_blank">
                  <Linkedin className="img_icon text-white" />
                </a>
              </li>
              <li className="twitter">
                <a href={twitter} target="_blank">
                  <Twitter className="img_icon text-white" />
                </a>
              </li>
              {/* <li className="mail">
                <a href={twitter} target="_blank">
                  <Mail className="img_icon text-white" />
                </a>
              </li> */}
            </ul>
          </div>
        </div>
        <button
          type="button"
          onClick={handleClick}
          className="btn1 fs_09 btn_primary_outline rounded_3 px-3 py-2"
        >
          {t("Close")}
        </button>
      </Modal.Footer>
    </>
  );
};

export default DetailModel;
