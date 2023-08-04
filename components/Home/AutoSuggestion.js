import React, { useState } from "react";
import { ReactSearchAutocomplete } from "react-search-autocomplete";

function SearchAutocomplete({ companies, setSelectedCompany }) {
const [query,setQuery]=useState("")
  const handleOnSearch = (string, results) => {
    setQuery(string)
    // return companies.filter((item) =>
    // item.companyName.toLowerCase().startsWith(string)
  // );
    // string.startsWith(string);
  };

  const handleOnHover = (result) => {
    // console.log(result);
  };

  const handleOnSelect = (item) => {
    setSelectedCompany(item);
    // console.log(item);
  };

  const handleOnFocus = () => {
    // console.log("Focused");
  };

  const formatResult = (item, isHighlighted) => {
    const matchStartIndex = item.companyName.toLowerCase().indexOf(query.toLowerCase());
    const matchEndIndex = matchStartIndex + query.length;
    const beforeMatch = item.companyName.slice(0, matchStartIndex);
    const matchText = item.companyName.slice(matchStartIndex, matchEndIndex);
    const afterMatch = item.companyName.slice(matchEndIndex);

    return (
      <div
        key={item.id}
        style={{
          padding: '0px',
        }}
      >
        {beforeMatch}
        <span style={{ fontWeight: 'bold', color: '#0090e3' }}>{matchText}</span>
        {afterMatch}
      </div>
    );
  };


  return (
    <div className="App ">
      <header className="App-header">
            
        <div style={{}}>
          <ReactSearchAutocomplete
            items={companies}
            onSearch={handleOnSearch}
            onHover={handleOnHover}
            onSelect={handleOnSelect}
            onFocus={handleOnFocus}    
            autoFocus
            fuseOptions={{ keys: ["companyName"] }}
            resultStringKeyName="companyName"
            formatResult={formatResult}
            styling={{ zIndex: 1,clearIconMargin:"0px 25px 0 0"}}
            placeholder="Naam bedrijf"
            maxResults={5}
          />
        </div>
      </header>
    </div>
  );
}

export default SearchAutocomplete;
