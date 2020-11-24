import React, { useEffect, useState } from "react";
import axios from "axios";
import Filter from "./components/Filter";
import Countries from "./components/Countries";

export default function App() {
    const [countries, setCountries] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
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
    const countriesToShow = nameFilter.length === 0 ? countries :
    countries.filter(country => country.name.toLowerCase().includes(nameFilter.toLowerCase()));

    return (
        <div>
            <h2>Countries</h2>
            <Filter nameFilter={ nameFilter }
            handleChangeFilter={ handleChangeFilter } />
            <Countries countries={ countriesToShow } clickFilter={ clickFilter } />
        </div>
    );
}