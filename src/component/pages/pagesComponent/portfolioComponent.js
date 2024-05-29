/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import NameCompanyPortfolio from "./nameCompanyPortfolio";
import DetailCompanyPortfolio from "./detailCompanyPortfolio";

function PortfolioCompany() {
  const [position, setPosition] = useState(true);
  const [activeName, setActiveName] = useState("Artificial Intelligence");

  useEffect(() => {
    if (position) {
      const timer = setTimeout(() => {
        setPosition(true);
      }, 200);
      return () => clearTimeout(timer);
    }
  }, [position]);

  const handleSelect = (name) => {
    setPosition(false);
    setTimeout(() => setPosition(true), 200);
    setActiveName(name);
  };

  return (
    <>
      <div className="row mx-3 min-height-resp">
        <div
          className="col-lg-6 bg-img-custom bottom-margin-resp"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            alignItems: "center",
            transition: "all 0.2s ease",
          }}
        >
          <NameCompanyPortfolio
            name={"Artificial Intelligence"}
            top={position ? "25px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Artificial Intelligence"}
          />

          <NameCompanyPortfolio
            name={"Construction"}
            top={position ? "100px" : "290px"}
            left={position ? "130px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Construction"}
          />
          <NameCompanyPortfolio
            name={"Healthcare"}
            top={position ? "100px" : "290px"}
            right={position ? "130px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Healthcare"}
          />
          <NameCompanyPortfolio
            name={"Cyber Security"}
            top={position ? "200px" : "290px"}
            right={position ? "20px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Cyber Security"}
          />
          <NameCompanyPortfolio
            name={"Enterprise Tech"}
            top={position ? "200px" : "290px"}
            left={position ? "20px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Enterprise Tech"}
          />
          <NameCompanyPortfolio
            name={"E-commerce"}
            top={position ? "200px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "E-commerce"}
          />
          <NameCompanyPortfolio
            name={"Contraction"}
            right={position ? "50px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Contraction"}
          />
          <NameCompanyPortfolio
            name={"Hospitality"}
            left={position ? "70px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Hospitality"}
          />
          <NameCompanyPortfolio
            name={"Tourism"}
            bottom={position ? "200px" : "290px"}
            left={position ? "20px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Tourism"}
          />
          <NameCompanyPortfolio
            name={"Fintech"}
            bottom={position ? "200px" : "290px"}
            right={position ? "30px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Fintech"}
          />
          <NameCompanyPortfolio
            name={"Software Development"}
            bottom={position ? "200px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Software Development"}
          />
          <NameCompanyPortfolio
            name={"Entertainment"}
            bottom={position ? "100px" : "290px"}
            right={position ? "100px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Entertainment"}
          />
          <NameCompanyPortfolio
            name={"Health & Wellness"}
            bottom={position ? "100px" : "290px"}
            left={position ? "100px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Health & Wellness"}
          />
          <NameCompanyPortfolio
            name={"Transport & Delivery"}
            bottom={position ? "25px" : "290px"}
            opacity={position ? "1" : "0.001"}
            handleSelect={handleSelect}
            active={activeName === "Transport & Delivery"}
          />
        </div>
        <div className="col-lg-6 px-3 width-100-responsive">
          <DetailCompanyPortfolio activeName={activeName} />
        </div>
      </div>
    </>
  );
}

export default PortfolioCompany;
