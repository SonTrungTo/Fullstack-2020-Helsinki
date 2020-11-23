import React from "react";
import shortid from "shortid";
import Courses from "./components/Courses";

const App = () => {
    const courses = [
        {
            id: shortid.generate(),
            name: 'Half Stack application development',
            parts: [
                {
                    name: 'Fundamentals of React',
                    exercises: 10,
                    id: shortid.generate()
                },
                {
                    name: 'Using props to pass data',
                    exercises: 7,
                    id: shortid.generate()
                },
                {
                    name: 'State of a component',
                    exercises: 14,
                    id: shortid.generate()
                },
                {
                    name: 'Redux',
                    exercises: 11,
                    id: shortid.generate()
                }
            ]
        },
        {
            id: shortid.generate(),
            name: 'Node.js',
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: shortid.generate()
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: shortid.generate()
                }
            ]
        }];

    return <Courses courses={ courses } />;
};

export default App;