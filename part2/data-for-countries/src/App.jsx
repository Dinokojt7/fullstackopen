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

  useEffect(() => {
    if (value) {
      const result = countries.filter((country) =>
        country.name.common.toLowerCase().includes(value),
      );
      setFiltered(result);
    } else {
      setFiltered([]);
    }
  }, [value, countries]);

  const handleChange = (event) => setValue(event.target.value.toLowerCase());

  const handleSelect = (selected) => {
    const item = filtered.filter((c) => c.name.common === selected);
    setValue(item[0].name.common.toLowerCase());
  };

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
            <li key={c.cca3}>
              {c.name.common}
              <button onClick={() => handleSelect(c.name.common)}>show</button>
            </li>
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
              Object.values(filtered[0].languages).map((language, i) => (
                <li key={i}>{language}</li>
              ))}
          </ul>
          <img src={filtered[0].flags.png} />
        </div>
      )}
    </div>
  );
};

export default App;
