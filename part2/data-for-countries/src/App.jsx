import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data));
  }, []);

  // filter whenever input changes
  useEffect(() => {
    if (value) {
      const result = countries.filter((country) =>
        country.name.common.includes(value),
      );
      setFiltered(result);
    } else {
      setFiltered([]);
    }
  }, [value, countries]);

  const handleChange = (event) => setValue(event.target.value);

  return (
    <div>
      find countries
      <input value={value} onChange={handleChange} />
      {filtered.length > 10 && (
        <p>Too many countries, specify another filter</p>
      )}
      {filtered.length <= 10 && filtered.length > 1 && (
        <ul>
          {filtered.map((c) => (
            <li key={c.cca3}>{c.name.common}</li>
          ))}
        </ul>
      )}
      {filtered.length === 1 && (
        <div>
          <h1>{filtered[0].name.common}</h1>
          <div>
            Capital {filtered[0].capital?.[0]}
            <br />
            Area {filtered[0].area}
          </div>

          <h2>Languages</h2>
          <ul>
            {filtered[0].languages &&
              Object.values(filtered[0].languages).map((lang, i) => (
                <li key={i}>{lang}</li>
              ))}
          </ul>
          <img src={filtered[0].flags.png} />
        </div>
      )}
    </div>
  );
};

export default App;
