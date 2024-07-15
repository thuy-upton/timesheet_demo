import React from "react";
import { Link } from "react-router-dom";

function CompanyCard({ company }) {
  return (
    <div>
      <h2>{company.name}</h2>
      <p>{company.description}</p>
      <Link to={`/companies/${company.handle}`}>Details</Link>
    </div>
  );
}

export default CompanyCard;
