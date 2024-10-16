import axios from 'axios'
import { useState,useEffect } from "react"

const CountrySingleViewer = (props) => {
    const specs = props.country_data
    const name = specs.name.official
    const capital = specs.capital[0]
    const languages = specs.languages;

    console.log(languages)
    const area = specs.area
    const flag = specs.flags.png

    const weatherapikey = process.env.REACT_APP_APPID

    const [weatherDt, saveWeather] = useState({
        temp : '...',
        windSpeed : '...'
    });

    useEffect(()=>{
    axios.get(`//api.openweathermap.org/data/2.5/weather?q=${name}&APPID=${weatherapikey}`).then(response => {
        const temp = parseFloat(response.data.main.temp).toFixed(2) - 273.15;
        const windSpeed = response.data.wind.speed;
        saveWeather({
            temp : Math.round(temp*100)/100,
            windSpeed : windSpeed
        })
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className='mainViewer'>
            <h3>{name}</h3>
            <h4>Capital : {capital}</h4>
            <h4>Area : {area} km<sup>2</sup></h4>
            <h4>languages</h4>
            <ul>{Object.values(languages).map(element => <li>{element}</li>)}</ul>
            <img src={flag} alt="flag" />
            <hr/>
            <h4>Weather in {name}</h4>
            <p>Temperature : {weatherDt.temp} °C Today</p>
            <p>Wind Speed : {weatherDt.windSpeed} mps</p>
        </div>
    )
}

export default CountrySingleViewer