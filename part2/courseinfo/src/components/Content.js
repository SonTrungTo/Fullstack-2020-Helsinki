import React from "react";
import Part from "./Part";

export default function Content({ course }) {
    return (
        <React.Fragment>
            { course.parts.map(({name, exercises, id}) =>
            <Part key={id} partName={ name } numberOfExercises={ exercises } />)
            }
        </React.Fragment>
    );
}