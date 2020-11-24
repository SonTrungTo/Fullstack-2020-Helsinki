import React from "react";
import TooMany from "./TooMany";
import ListCountries from "./ListCountries";

export default function Countries(props) {
    return (
        <div>
            { props.countries.length > 10 ? <TooMany /> :
            <ListCountries {...props} countries={ props.countries } /> }
        </div>
    );
}