import { useState } from 'react'
import CountryViewer from './components/CountryViewer';
import axios from 'axios'
import './App.css';

function App() {
  const url = 'https://studies.cs.helsinki.fi/restcountries/api';
  const [searchText, updateSearchText] = useState('');
  const [countryData, updateCountryData] = useState([]);

  const loadCountryData = (event) => {
    const search = event.target.value;
    updateSearchText(search)
    axios.get(`${url}/all`).then(res => {
      const filteredData = res.data.filter(country => country.name.official.toLowerCase().includes(search.toLowerCase()))
      updateCountryData(filteredData)
    })
  }

  const loadSpecificCountry = name=>{
    updateSearchText(name)
    axios.get(`${url}/name/${name}`).then(res => {
      updateCountryData(res.data)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>Find countries</h1>
        <input placeholder="search" onChange={loadCountryData} value={searchText} type="search" />
        <CountryViewer loadSpecificCountry={loadSpecificCountry} countries={countryData} />
      </header>
    </div>
  );
}

export default App;