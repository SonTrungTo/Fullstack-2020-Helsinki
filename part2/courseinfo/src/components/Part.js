import React from "react";

export default function Part(props) {
    return (
        <p>{props.partName} {props.numberOfExercises}</p>
    );
}