import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => {
  return (
    <h1>
      {props.course.name}
    </h1>
  );
};

const Content = (props) => {
  return (
    <React.Fragment>
      { props.course.parts.map(({partName, numberOfExercises}, i) =>
      <p key={i}> {partName} {numberOfExercises} </p>)
      }
    </React.Fragment>
  );
};

const Total = (props) => {
  const total = props.course.parts.reduce((current, {numberOfExercises}) => current + numberOfExercises, 0);

  return (
    <p>Number of exercises {total} </p>
  );
};

const App = () => {
  const course = {
    name: "Half Stack application development",
    parts: [{
      partName: "Fundamentals of React",
      numberOfExercises: 10
    },{
      partName: "Using props to pass data",
      numberOfExercises: 7
    },{
      partName: "State of a component",
      numberOfExercises: 14
    }]
  };

  return (
    <div>
      <Header course={ course } />
      <Content course={ course } />
      <Total course={ course } />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));