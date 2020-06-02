import React, { Component } from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import Country from "./components/Country";
import Duration from "./components/Duration";
import Utils from "./utils"
import "./style.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
      isLoaded: false,
      countries: [],
      startDate: 1,
      endDate: 30
    };
  }

//Fetch data when the component is mounted
  componentDidMount() {
    fetch("http://my-json-server.typicode.com/yisehak-awm/finbit-hiring/result")
      .then(res => res.json())
      .then(
        (result) => {
          this.setState({
            isLoaded: true,
            countries: result.map(country => {
              return {
                ...country,
                isChecked: false
              }
            })
          });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error
          });
        }
      )
  }

  //check/uncheck country checkbox 
  toggleChechedCountry = country => {
    this.setState({
      countries: this.state.countries.map((countryData) => {
        if (country === countryData.country) {
          return {
            ...countryData,
            isChecked: !countryData.isChecked
          }
        }
        return countryData
      })
    });
  }

  //Handling start date duration change
  handleStartDate = date => this.setState({ startDate: date })

  //Handling end date duration change
  handleEndDate = date => this.setState({ endDate: date })

  
  render() {
    const { error, isLoaded, countries, startDate, endDate } = this.state;
    const { country, data } = Utils.getPieChartData(countries, startDate, endDate);

    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        <div className="App">
          <h1>Data has been loaded! Use filters below to display it</h1>
          <h4>Countries</h4>

          {countries.map((country) =>
            <Country
              key={country.country}
              country={country.country}
              isChecked={country.isChecked}
              handleCheckedCountry={() => this.toggleChechedCountry(country.country)}
            />
          )}

          <h4>Duration</h4>
          <Duration
            startDate={startDate}
            endDate={endDate}
            handleStartDate={this.handleStartDate}
            handleEndDate={this.handleEndDate}
          />
          {"" != Utils.getMostAffectedCountry(countries, startDate, endDate) ? (
            <div>

              <LineChart
                data={Utils.getLineChartData(countries, startDate, endDate)}
              />

              <h4>Most affected country</h4>
              Country name: {Utils.getMostAffectedCountry(countries, startDate, endDate)}

              <PieChart
                data={Utils.getPieChartData(countries, startDate, endDate)}
              />
            </div>
          ) : (
              <h3>No data to display</h3>
            )
          }
        </div>
      )
    }
  }
}

export default App;
