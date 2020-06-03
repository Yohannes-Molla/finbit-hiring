import React, { useState, useEffect } from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import Country from "./components/Country";
import Duration from "./components/Duration";
import Utils from "./utils"
import "./style.css";

const App = (props) => {

  const [error, setErrors] = useState(null);
  const [isLoaded, setIsLoding] = useState(false);
  const [countries, setCountries] = useState([]);
  const [startDate, setStartDate] = useState(1);
  const [endDate, setEndDate] = useState(30);

  //Fetch data when the component is mounted
  useEffect(()=> {
    fetch("http://my-json-server.typicode.com/yisehak-awm/finbit-hiring/result")
        .then(res => res.json())
        .then(
            (result) => {
              setIsLoding(true);
              setCountries(result.map((countryData) => {
                return {
                  ...countryData,
                  isChecked: false
                }
              }))
            }
        )
        .catch((error) => setErrors(error));
  }, []);
  //check/uncheck country checkbox
  const toggleChechedCountry = country => {
    setCountries(countries.map((countryData) => {
      if (country === countryData.country) {
        return {
          ...countryData,
          isChecked: !countryData.isChecked
        }
      }
      return countryData
    }))
  }
  //Handling start date duration change
  const handleStartDate = date => setStartDate(date)

  //Handling end date duration change
  const handleEndDate = date => setEndDate(date)

  const data = Utils.getPieChartData(countries, startDate, endDate);
  const LineChartData = Utils.getLineChartData(countries, startDate, endDate);
  const countryName = Utils.getMostAffectedCountry(countries, startDate, endDate);
  return (
      <div className="App">
        { error ? (
            <h5>Error: {error.message} </h5>
        ) : !isLoaded ? (
            <h4>Loading...</h4>
        ): (
            <div>
              <h1>Data has been loaded! Use filters below to display it</h1>
              <h4>Countries</h4>
              <div>
                {countries.map((country) =>
                    <Country
                        key={country.country}
                        country={country.country}
                        isChecked={country.isChecked}
                        handleCheckedCountry={() => toggleChechedCountry(country.country)}
                    />
                )}
              </div>
              <h4>Duration</h4>
              <Duration
                  startDate={startDate}
                  endDate={endDate}
                  handleStartDate={handleStartDate}
                  handleEndDate={handleEndDate}
              />
              <div>
                {"" != countryName ? (
                    <div>
                      <LineChart
                          data={LineChartData}
                      />
                      <h4>Most affected country</h4>
                      Country name: {countryName}

                      <PieChart
                          data={data}
                      />
                    </div>
                ) : (
                    <h3>No data to display</h3>
                )
                }
              </div>
            </div>
        )
        }
      </div>
  );
};

export default App;
