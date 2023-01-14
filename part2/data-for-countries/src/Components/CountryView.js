import React from "react";
import Weather from "./Weather";

const CountryView = ({ country }) => {
  const {
    name,
    capital,
    area,
    languages,
    flags,
    capitalInfo = {},
  } = country || {};
  const { latlng = [] } = capitalInfo;
  const [lat, lng] = latlng;
  return (
    <>
      <h1>{name?.official}</h1>
      <p>capital {capital}</p>
      <p>area {area}</p>

      <h3>languages:</h3>
      <ul>
        {languages &&
          Object.values(languages).map((lang) => <li key={lang}>{lang}</li>)}
      </ul>
      <img src={flags?.png} alt={`${name?.official} flag`} />
      <Weather capital={capital} lat={lat} lng={lng} />
    </>
  );
};

export default CountryView;
