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
                <h2>Languages</h2>
                <ul>
                { props.country.languages.map(language =>
                    <li key={language.name}>{language.name}</li>
                ) }
                </ul>
                <div>
                    <img src={ props.country.flag } height="200" width="300" 
                    alt=""/>
                </div>
            </React.Fragment>}
        </div>
    );
};