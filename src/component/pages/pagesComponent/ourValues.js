import React from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";

const OurValues = ({ headings, paragraphs, topHeader}) => {
  const { t } = useTranslation();

  return (
    <section id="craft" className="px-md-5 px-4 light_gray_bg mx-3">
      <div className="d-flex align-items-center justify-content-center craft">
        <span className="font-custom-heading">{topHeader}</span>
      </div>
      <div className="row py-5 justify-content-between px-2">
        {headings.map((heading, index) => (
          <div key={index} className="col-lg-4 col-md-4 col-sm-6 px-4 py-2">
            <div className="d-flex flex-column gap-2 pt-lg-0 pt-md-0">
              <div className="insight d-flex flex-column gap-2">
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "center",
                  }}
                >
                  {heading.icon}
                  <div style={{ display: "flex", flexDirection: "column" }}>
                    <div style={{ flex: "1", display: "flex", alignItems: "center" }}>
                      <h5 className="fw-bold" style={{ margin: "auto" }}>{t(heading.title)}</h5>
                    </div>
                  </div>
                </div>
                <div className="mb-4">
                    <p className="text_width w-100">{t(paragraphs[index])}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

OurValues.propTypes = {
  headings: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      icon: PropTypes.element.isRequired,
    })
  ).isRequired,
  paragraphs: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default OurValues;
