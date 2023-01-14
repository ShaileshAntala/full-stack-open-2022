import { useEffect, useState } from "react";
import axios from "axios";
import Countries from "./Components/Countries";
import CountryView from "./Components/CountryView";

function App() {
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState("");
  const [showCountry, setShowCountry] = useState(false);
  const [countryView, setCountryView] = useState({ show: false, country: {} });

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((response) => setCountries(response.data));
  }, []);

  const handleCountrySearch = (e) => {
    setSearchCountry(e.target.value);
    setShowCountry(true);
    setCountryView({ show: false, country: {} });
  };

  let list;

  const countryListToDisplay = (countries) => {
    list = countries.filter((country) =>
      country.name.official.toLowerCase().includes(searchCountry.toLowerCase())
    );

    if (list.length <= 10 && list.length > 1) {
      return list;
    } else if (list.length === 1) {
      setShowCountry(false);
      setCountryView({ show: true, country: list[0] });
      return;
    } else if (!list.length) {
      return "No matches found, specify another filter";
    } else {
      return "Too many matches, specify another filter";
    }
  };

  const handleShowCountryView = (country) => {
    setCountryView({ show: true, country: country });
  };

  return (
    <div>
      find countries &nbsp;
      <input
        type="text"
        name="countrySerach"
        value={searchCountry}
        onChange={handleCountrySearch}
      />
      {showCountry && (
        <Countries
          countries={countryListToDisplay(countries)}
          handleShowCountryView={handleShowCountryView}
        />
      )}
      {countryView.show && <CountryView country={countryView.country} />}
    </div>
  );
}

export default App;
