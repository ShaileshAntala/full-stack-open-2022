import React from "react";

const Countries = ({ countries, handleShowCountryView }) => {
  return (
    <>
      {Array.isArray(countries) && countries.length > 1 ? (
        countries.map((country) => (
          <div key={country.name.official}>
            <p>
              {country.name.official}
              <button onClick={()=>handleShowCountryView(country)}>Show</button>
            </p>
          </div>
        ))
      ) : (
        <p>{countries}</p>
      )}
    </>
  );
};

export default Countries;
