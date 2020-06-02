import React, { Component } from "react";
import LineChart from "./core/LineChart";
import PieChart from "./core/PieChart";
import Country from "./core/Country";
import Duration from "./core/Duration";
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

    this.setStartDate = this.setStartDate.bind(this);
    this.toggleChechedCountry = this.toggleChechedCountry.bind(this);
    this.setEndDate = this.setEndDate.bind(this);
    this.prepareForLineChart = this.prepareForLineChart.bind(this);
    this.getMostAffectedCountry = this.getMostAffectedCountry.bind(this);
    this.prepareForPieChart = this.prepareForPieChart.bind(this);
  }

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

  toggleChechedCountry(delta){
    
      this.setState({
      countries: this.state.countries.map((countryData) => {
        
        if(delta === countryData.country){
          return {
            ...countryData,
            isChecked: !countryData.isChecked
          }
        }
        return countryData
      })
    });
  }

  setStartDate(date){

    this.setState({
      startDate: parseInt(date.match(/\d+/),10)
    });

  }

  setEndDate(date){
    this.setState({
      endDate: parseInt(date.match(/\d+/),10)
    });
  }

  prepareForLineChart(){
    const lineChartData = [];

    this.state.countries.map((countryData) => {
        if(countryData.isChecked){

          const data = [];
          countryData.records.forEach(record => {
            if(record.day >= this.state.startDate && record.day <= this.state.endDate){
              let x = {
                x: record.day,
                y: record.new
              }
              data.push(x);
            }
          })
          let x = {
                  id: countryData.country,
                  data: data
                };

          lineChartData.push(x);
        }
    })

    return lineChartData;
  }

  getMostAffectedCountry(){
    let country = "";
    let prevTotalAffected = 0;
    this.state.countries.map((countryData) => {
      if(countryData.isChecked){
        let currentCountryTotalAffected = 0;
        countryData.records.forEach(record => {
          if(record.day >= this.state.startDate && record.day <= this.state.endDate){
            currentCountryTotalAffected += record.new;
          }
        })
        if(currentCountryTotalAffected > prevTotalAffected){
          prevTotalAffected = currentCountryTotalAffected;
          country = countryData.country;
        }
      }
    })

    return country;
  }

  prepareForPieChart(){
   
    if("" != this.getMostAffectedCountry()){
      let x = 0;
      let y = 0;
      let z = 0;
      let countryData = this.state.countries
            .filter(c=> c.country === this.getMostAffectedCountry());
  
            console.log(countryData);
      countryData[0].records.forEach(record => {
          if(record.day >= this.state.startDate && record.day <= this.state.endDate){
              x += record.new;
              y += record.death;
              z += record.recovered;
          }
        }
      );
  
      return [
        {
          id: "new",
          label: "New Case",
          value: x
        },
        {
          id: "death",
          label: "Deaths",
          value: y
        },
        {
          id: "recovery",
          label: "Recoveries",
          value: z
        }
      ];
    }
   return [];
  }


  render() {
    const { error, isLoaded, data } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
      return <div>Loading...</div>;
    } else {
      return (
        
        <div className="App">
          <h1>Data has been loaded! Use filters below to display it</h1>
          <h4>Countries</h4>
          <ul>
            {this.state.countries.map((country) => 
              <Country 
                key={country.country}
                country={country.country}
                isChecked={country.isChecked}
                handleCheckedCountry={() => this.toggleChechedCountry(country.country)}
              />
            )}
          </ul>
          <h4>Duration</h4>
          <Duration
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            setStartDate={this.setStartDate}
            setEndDate={this.setEndDate}
          />
        
            {"" != this.getMostAffectedCountry() ? (
              <div>
            
                <LineChart 
                  data={this.prepareForLineChart()}
                />

                Most affected country: {this.getMostAffectedCountry()}  

                <PieChart
                    data={this.prepareForPieChart()}
                />
            </div>
            ) : (
              <h3>No data to display</h3>
            )
            }


         

        </div>

        
      );
    }
  }

}

export default App;
