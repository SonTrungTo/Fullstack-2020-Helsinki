import React from "react";

export default function Name({person, buttonDelete}) {
    return (
        <React.Fragment>
            <span>{person.name} {person.number}</span>
            <button onClick={ buttonDelete(person) }>delete</button>
            <br />
        </React.Fragment>
    );
};