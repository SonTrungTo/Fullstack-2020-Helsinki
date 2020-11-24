import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

export default function App() {
    const [countries, setCountries] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [weatherInfo, setWeatherInfo] = useState({});
    const countriesToShow = nameFilter.length === 0 ? countries :
        countries.filter(country => country.name.toLowerCase().includes(nameFilter.toLowerCase()));
    const capital = countriesToShow.length === 1 ? countriesToShow[0].capital :
        "New York";

    useEffect(() => {
        const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

        axios
        .get('http://api.weatherstack.com/current' +
        `?access_key=${apiKey}` +
        `&query=${encodeURIComponent(capital)}`)
        .then(response => {
            console.log(response.data);
            console.log(capital);
            setWeatherInfo(response.data);
        });
    }, [capital]);
    
    useEffect(() => {
        axios
        .get('https://restcountries.eu/rest/v2/all')
        .then(response => {
            setCountries(response.data);
        });
    }, []);

    const handleChangeFilter = (event) => {
        setNameFilter(event.target.value);
    };
    const clickFilter = country => event => {
        setNameFilter(country.name.toLowerCase());
    };

    return (
        <div>
            <h2>Countries</h2>
            <Filter nameFilter={ nameFilter }
            handleChangeFilter={ handleChangeFilter } />
            <Countries countries={ countriesToShow } clickFilter={ clickFilter }
            weatherInfo={ weatherInfo } />
        </div>
    );
}