import React from "react";
import ListCountry from "./ListCountry";

export default function ListCountries(props) {
    return (
        <div>
            { props.countries.length > 1 ? (
                <React.Fragment>
                    {props.countries.map(country =>
                        <React.Fragment key={ country.name }>
                            <span>{ country.name }</span>
                            <button onClick={ props.clickFilter(country) }>show</button>
                            <br />
                        </React.Fragment>)}
                </React.Fragment>
            ) : <ListCountry country={ props.countries[0] } /> }
        </div>
    );
};