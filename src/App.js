import React, { useState, useEffect } from 'react';
import { MenuItem, FormControl, Select, Card, CardContent } from "@material-ui/core";
import StatBox from './comps/StatBox';
import Map from './comps/Map';
import Table from './comps/Table';
import Graph from './comps/Graph'
import { sortData, formatStat } from './utils'
import "leaflet/dist/leaflet.css";
import './App.css';

function App() {
  const [countries, setCountries] = useState([]);
  const [country, setCountry] = useState('worldwide');
  const [countryInfo, setCountryInfo] = useState({});
  const [tableData, setTableData] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3);
  const [mapCountries, setMapCountries] = useState([]);
  const [casesType, setCasesType] = useState("cases");

  useEffect(() => {
    fetch("https://disease.sh/v3/covid-19/all")
    .then((response) => response.json())
    .then((data) => {
      setCountryInfo(data);
    });
  }, []);
  
  useEffect(() => {
    const getCountriesData = async () => {
      await fetch("https://disease.sh/v3/covid-19/countries")
      .then((response) => response.json())
      .then((data) => {
        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso3,
            flag: country.countryInfo.flag
          }));

          const sortedData = sortData(data);
          setTableData(sortedData);
          setMapCountries(data);
          setCountries(countries);
      });

    };

    getCountriesData();
  }, []);

  const changeCountry = async (e) => {
    const currentCountry = e.target.value;

    setCountry(currentCountry);

    const url = currentCountry === 'worldwide' ? 'https://disease.sh/v3/covid-19/all' : `https://disease.sh/v3/covid-19/countries/${currentCountry}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        
        //this updates input field
        setCountry(currentCountry);

        //setting countryInfo to data that we return
        //storing country info into a variable
        setCountryInfo(data);

        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(4);
      });
    };

    console.log(countryInfo)

    
  return (
    <div className="app">
      <div className="app_left">
        <div className="app_header">
          <h1>Covid 19 Tracker</h1>
            <FormControl className="dropdown">
              <Select
                varient="outlined"
                value={country}
                onChange={changeCountry}
                >
                  <MenuItem value="worldwide">Worldwide</MenuItem>

                  {countries.map(country => (
                    <MenuItem value={country.value}>
                      <img src={country.flag} className="flag" alt="flag" /> 
                      {country.name}
                    </MenuItem>
                  ))}
              </Select>
            </FormControl>
          </div>

          <div className="stats_container">
            <StatBox 
              active={casesType === "cases"}
              isRed
              onClick={(e) => setCasesType("cases")}
              title="Current Cases" 
              cases={formatStat(countryInfo.todayCases)} 
              total={formatStat(countryInfo.cases)} />
            <StatBox 
              active={casesType === "recovered"}
              onClick={(e) => setCasesType("recovered")}title="Recovered" 
              cases={formatStat(countryInfo.todayRecovered)} 
              total={formatStat(countryInfo.recovered)} />
            <StatBox 
              active={casesType === "deaths"}
              isRed
              onClick={(e) => setCasesType("deaths")}
              title="Deaths" 
              deaths={formatStat(countryInfo.todayDeaths)} 
              total={formatStat(countryInfo.deaths)} />
            {/* <StatBox 
              title="Cases per Million" 
              cases={countryInfo.oneCasePerPeople} /> */}
          </div>
          
          {/* Map */}
          <Map 
            casesType={casesType}
            countries={mapCountries}
            center={mapCenter}
            zoom={mapZoom}
          />

      </div>
      
      <Card className="app_right">
        <CardContent>
          <div className="app_info">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />     
            <h3>Worldwide New {casesType}</h3>
            <Graph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default App;
