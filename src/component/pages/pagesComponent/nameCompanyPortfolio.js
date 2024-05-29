import React from "react";
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
  const handleSendSelected = () => {
    handleSelect(name);
  };

  return (
    <div
      className={`plus-company-name remove-position ${
        active ? "plus-company-name-active" : ""
      }`}
      style={{
        position: "absolute",
        left: left,
        right: right,
        bottom: bottom,
        top: top,
        opacity: opacity,
        transition: "all 0.2s ease",
      }}
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
