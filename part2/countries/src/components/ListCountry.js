import React from "react";

export default function ListCountry(props) {
    return (
        <div>
            {props.country === undefined ? "No countries found" :
            <React.Fragment>
                <h1>{props.country.name}</h1>
                <div>
                    <span>capital {props.country.capital}</span>
                    <br />
                    <span>population {props.country.population}</span>
                </div>
                <h2>Spoken languages</h2>
                <ul>
                { props.country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>
                ) }
                </ul>
                <div>
                    <img src={ props.country.flag } height="200" width="300" 
                    alt=""/>
                </div>
                <h2>Weather in { props.country.capital }</h2>
                <p><span style={{fontWeight: 'bold'}}>Temperature: </span>
                { props.weatherInfo.current.temperature } Celsius</p>
                <div>
                    <img src={ props.weatherInfo.current.weather_icons[0] }
                    alt="" />
                </div>
                <p>
                    <span style={{fontWeight: 'bold'}}>Wind: </span>
                { props.weatherInfo.current.wind_speed } mph direction { props.weatherInfo.current.wind_dir }
                </p>
            </React.Fragment>}
        </div>
    );
};