import React from "react";
import Course from "./Course";

export default function Courses({courses}) {
    return (
        <React.Fragment>
            { courses.map((course) => 
            <Course key={ course.id }
            course={ course } />)
            }
        </React.Fragment>
    );
};