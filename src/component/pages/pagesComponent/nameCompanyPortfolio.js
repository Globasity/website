import React, { useState, useEffect } from "react";
import IconPlusYellow from "../../assests/svg/iconPlusYellow";

function NameCompanyPortfolio({
  name,
  left = null,
  right = null,
  bottom = null,
  top = null,
  opacity,
  handleSelect,
  active,
}) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleSendSelected = () => {
    handleSelect(name);
  };

  const shouldApplyPositionStyle = windowWidth > 1305;

  return (
    <div
      className={`plus-company-name ${
        active ? "plus-company-name-active" : ""
      }`}
      style={
        shouldApplyPositionStyle
          ? {
              position: "absolute",
              left: left,
              right: right,
              bottom: bottom,
              top: top,
              opacity: opacity,
              transition: "all 0.2s ease",
            }
          : {
              opacity: opacity,
              transition: "all 0.2s ease",
            }
      }
      onClick={handleSendSelected}
    >
      <div>
        <IconPlusYellow
          color={active ? "white" : "#FFBE2E"}
          plusColor={active ? "#FFBE2E" : "white"}
        />
      </div>
      <div className="d-flex align-items-center">{name}</div>
    </div>
  );
}

export default NameCompanyPortfolio;
