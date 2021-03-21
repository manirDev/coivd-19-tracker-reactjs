import React, {useState, useEffect} from 'react'
import {CardContent, Card, FormControl, MenuItem, Select} from '@material-ui/core';
import './App.css';
import InfoBox from './components/InfoBox'
import CovidMap from './components/CovidMap'
import Table from './components/Table'
import {sortData, prettyPrintStat} from './components/helper(util)'
import LineGraph  from './components/Linegraph'
import 'leaflet/dist/leaflet.css'
import image from './components/Image/image.png'
import numeral from "numeral";
function App() {
  //state is how to write vvarible in ract
  const [countries, setCountries] = useState([]);
  const [country, setCountry] =useState("worldwide");
  const [countryInfo, setCountryInfo] =useState({});
  const [tableData, setTable] = useState([])
  const [casesType, setCasesType] = useState("cases");
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(3)
  //https://disease.sh/v3/covid-19/countries
//useEffect runs a piece o code
useEffect(() => {
  fetch("https://disease.sh/v3/covid-19/all")
  .then(response => response.json())
  .then(data => {
    setCountryInfo(data);
  })
}, [])
useEffect(() => {
  
  //async sends request to a server, wait or it and do ssomething
  const getCountriesData = async ()  => {
    await fetch("https://disease.sh/v3/covid-19/countries")
    .then((response)=>response.json())
    .then((data) =>{
      const countries = data.map((country)=>(
        {
          name: country.country, //france,chad,turkey...
          value:country.countryInfo.iso2 //uk,usa,fr
        }
      ));
     let sortedData =sortData(data)
      setTable(sortedData);
      setMapCountries(data);
      setCountries(countries);
    })
  }
  getCountriesData();
}, []);

const countryChange = async (event) => {
  const countryCode = event.target.value;
 // setCountry(countryCode)
  const url = 
  countryCode === "worldwide"  
  ? "https://disease.sh/v3/covid-19/all" 
  : `https://disease.sh/v3/covid-19/countries/${countryCode}`
  
  await fetch(url)
  .then((response) => response.json())
  .then((data) => {
    setCountry(countryCode);
    //all  data from ccountry response
    setCountryInfo(data);
    setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
    setMapZoom(4);
  } )
};

  return (
    <div className="app">
      <div className="app_left">
      <div className="app_header">
      <img className="logo" src={image} alt="COVID-19" />
        <FormControl className="app_dropdown">
          <Select  variant ="outlined" onChange={countryChange} value={country} >
          <MenuItem value="worldwide" >Global</MenuItem>
            {/*loop through all the countries and show a dropdown */}
            {countries.map(country => (
              <MenuItem value={country.value} >{country.name}</MenuItem>
            ))}
          { /* 
            <MenuItem value="Worldwide">option1</MenuItem>
            <MenuItem value="Worldwide">option2</MenuItem>
  <MenuItem value="Worldwide">ooption3</MenuItem>*/}
          </Select>
        </FormControl>
      </div>
      {/*Header */}  
      {/*title+select input dropdown field */}
      <div className="app_stats">
          {/*infoboxes corona virus cases*/}
         <div className="infected">
         <InfoBox 
          onClick={(event) => setCasesType("cases")}
          title="Infected" 
          total={numeral(countryInfo.cases).format("0.0a")}
          cases={prettyPrintStat(countryInfo.todayCases)}
          lastUpdate={(countryInfo.updated)}
          footer="Number of active cases from COVID-19."
          />
         </div>
          {/*infoboxes corona virus recovery */}
          <div className="recovered">
          <InfoBox  
          onClick={(e) =>setCasesType("recovered")}
          title="Recovered" 
          total={numeral(countryInfo.recovered).format("0.0a")}
          cases={prettyPrintStat(countryInfo.todayRecovered)}
          lastUpdate={(countryInfo.updated)}
          footer="Number of recoveries from COVID-19."
         / >
          </div>
          {/*infoboxes  corovirus deaths*/}
          <div className="death">
          <InfoBox 
          onClick={(e) => setCasesType("deaths")}
          title="Deaths"
          total={numeral(countryInfo.deaths).format("0.0a")}
          cases={prettyPrintStat(countryInfo.todayDeaths)}
          lastUpdate={countryInfo.updated}
          footer="Number of deaths caused by COVID-19."
           />
          </div>
      </div>
      {/*Map */}
      <CovidMap 
        caseType={casesType}
        countries={mapCountries}
        center={mapCenter}
        zoom={mapZoom}
      />
      </div>
      <Card className="app_right">
        <CardContent>
        <div className="app__information">
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </div>
        </CardContent>
      </Card>
        
    </div>
    
  );
}

export default App;
