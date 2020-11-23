import React from "react";

export default function Name({person}) {
    return (
        <React.Fragment>
            <span>{person.name} {person.number}</span>
            <br />
        </React.Fragment>
    );
};