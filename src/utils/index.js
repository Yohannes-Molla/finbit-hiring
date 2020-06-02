const Utils = {
    getLineChartData: (countries, startDate, endDate) => {
      const lineChartData = [];
      countries.map((countryData) => {
        if (countryData.isChecked) {
          const data = [];
          countryData.records.forEach(record => {
            if (record.day >= startDate && record.day <= endDate) {
              let x = {
                x: record.day,
                y: record.new
              }
              data.push(x);
            }
          })
          let temp = {
            id: countryData.country,
            data: data
          };
  
          lineChartData.push(temp);
        }
      })
  
      return lineChartData;
    },
  
    getMostAffectedCountry: (countries, startDate, endDate) => {
      let country = "";
      let prevTotalAffected = 0;
      countries.map((countryData) => {
        if (countryData.isChecked) {
          let currentCountryTotalAffected = 0;
          countryData.records.forEach(record => {
            if (record.day >= startDate && record.day <= endDate) {
              currentCountryTotalAffected += record.new;
            }
          })
          if (currentCountryTotalAffected > prevTotalAffected) {
            prevTotalAffected = currentCountryTotalAffected;
            country = countryData.country;
          }
        }
      })
  
      return country;
    },
  
    getPieChartData: (countries, startDate, endDate) => {
  
      if ("" != Utils.getMostAffectedCountry(countries, startDate, endDate)) {
        let x = 0;
        let y = 0;
        let z = 0;
        let countryData = countries
          .filter(c => c.country === Utils.getMostAffectedCountry(countries, startDate, endDate));
  
        countryData[0].records.forEach(record => {
          if (record.day >= startDate && record.day <= endDate) {
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
  }
  
  export default Utils;
  