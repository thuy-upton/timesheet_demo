import React, { useState, useEffect } from "react";
import JoblyApi from "../api";
import CompanyCard from "./CompanyCard";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      let companies = await JoblyApi.getCompanies();
      setCompanies(companies);
    }
    fetchCompanies();
  }, []);

  async function handleSearch(evt) {
    evt.preventDefault();
    let companies = await JoblyApi.getCompanies({ name: searchTerm });
    setCompanies(companies);
  }

  return (
    <div>
      <h1>Companies</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search companies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      <div>
        {companies.map((c) => (
          <CompanyCard key={c.handle} company={c} />
        ))}
      </div>
    </div>
  );
}

export default CompanyList;
