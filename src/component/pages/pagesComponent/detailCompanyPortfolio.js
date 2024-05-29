import React from "react";
import logo1 from "../../assests/png/Logo1.png";
import StartupsData from "./startupsData";
import CustomCard from "./customCard";

const DetailCompanyPortfolio = ({ activeName }) => {
  const filteredData = StartupsData.filter((card) => card.type === activeName);
  return (
    <>
      <div className="row px-3" style={{ maxHeight: "569px", overflowY: "auto" }}>
        <h3 className="tertiary-headings popins_semibold">{activeName}</h3>
        {filteredData.map((card) => (
          <div key={card.id} className="col-lg-4 col-md-4 col-sm-4 col-12 mb-3">
            <CustomCard
              image={card.image}
              logo={card.logo}
              href={card.href}
              title={card.title}
              type={card.type}
              brief={card.brief}
              description={card.description}
              facebook={card.facebook}
              linkedin={card.linkedin}
              twitter={card.twitter}
              designChange={true}
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default DetailCompanyPortfolio;
