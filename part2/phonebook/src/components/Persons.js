import React from "react";
import Person from "./Person";

export default function Persons(props) {
    return (
        <div>
            { props.persons.map(person => 
            <Person key={person.name} person={ person }
            buttonDelete={ props.buttonDelete } />
            ) }
        </div>
    );
}