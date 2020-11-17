import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>
      {props.courseName}
    </h1>
  );
};

const Part = (props) => {
  return (
    <p>{props.part} {props.exercises}</p>
  );
};

const Total = (props) => {
  return (
    <p>Number of exercises {props.totalExercises} </p>
  );
};

const App = () => {
  const course="Half Stack application development";
  const parts=[{
    partName: "Fundamentals of React",
    numberOfExercises: 10
  },{
    partName: "Using props to pass data",
    numberOfExercises: 7
  },{
    partName: "State of a component",
    numberOfExercises: 14
  }];
  const total = parts.reduce((current, {numberOfExercises}) => current + numberOfExercises, 0);

  return (
    <div>
      <Header courseName={ course } />
      { parts.map(({partName, numberOfExercises}, i) =>
      <Part key={i} part={partName} exercises={numberOfExercises} />)
      }
      <Total totalExercises={ total } />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));